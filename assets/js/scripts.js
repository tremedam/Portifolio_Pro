// Carrossel moderno de imagens
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel__track');
  const imgs = document.querySelectorAll('.carousel__img');
  const prevBtn = document.querySelector('.carousel__btn--prev');
  const nextBtn = document.querySelector('.carousel__btn--next');
  const dotsContainer = document.querySelector('.carousel__dots');
  if (!track || !imgs.length || !prevBtn || !nextBtn || !dotsContainer) return;
  let current = 0;
  // Criar dots
  dotsContainer.innerHTML = '';
  imgs.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir para slide ${i+1}`);
    dotsContainer.appendChild(dot);
    dot.addEventListener('click', () => goTo(i));
  });
  const dots = dotsContainer.querySelectorAll('.carousel__dot');
  function updateCarousel() {
    const totalImgs = imgs.length;

    // Remove todas as classes de estado
    imgs.forEach((img) => {
      img.classList.remove('active', 'left', 'right');
    });

    // Calcula índices circularmente
    const leftIdx = (current - 1 + totalImgs) % totalImgs;
    const rightIdx = (current + 1) % totalImgs;

    // Aplica as classes CSS apropriadas
    imgs[leftIdx].classList.add('left');
    imgs[current].classList.add('active');
    imgs[rightIdx].classList.add('right');

    // Atualiza os dots
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }
  function goTo(idx) {
    current = idx;
    updateCarousel();
  }
  function nextImage() {
    current = (current + 1) % imgs.length;
    updateCarousel();
  }
  function prevImage() {
    current = (current - 1 + imgs.length) % imgs.length;
    updateCarousel();
  }
  nextBtn.addEventListener('click', nextImage);
  prevBtn.addEventListener('click', prevImage);
  let interval = setInterval(nextImage, 3500);
  // Pausar ao passar o mouse
  track.addEventListener('mouseenter', () => clearInterval(interval));
  track.addEventListener('mouseleave', () => interval = setInterval(nextImage, 3500));
  
  // Criar modal para visualização das imagens
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <img class="modal-image" src="" alt="">
    </div>
  `;
  document.body.appendChild(modal);
  
  const modalImage = modal.querySelector('.modal-image');
  const closeBtn = modal.querySelector('.modal-close');
  
  // Função para abrir o modal
  function openModal(imageSrc, imageAlt) {
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Impede scroll da página
  }
  
  // Função para fechar o modal
  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restaura scroll da página
  }
  
  // Event listeners para fechar o modal
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  // Fechar modal com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  
  // Adicionar funcionalidade de clique nas imagens
  imgs.forEach(img => {
    img.addEventListener('click', () => {
      openModal(img.src, img.alt);
    });
  });
  
  updateCarousel();
});
const toggleTheme = document.getElementById("toggleTheme");
const rootHtml = document.documentElement
const accordionHeaders = document.querySelectorAll(".accordion__header");
const menuLinks = document.querySelectorAll(".menu__link");

function changeTheme(){
  const currentTheme = rootHtml.getAttribute("data-theme");

  currentTheme === "dark" ? rootHtml.setAttribute("data-theme", "light") : rootHtml.setAttribute("data-theme", "dark")

  toggleTheme.classList.toggle("bi-sun")
  toggleTheme.classList.toggle("bi-moon-stars")
}

toggleTheme.addEventListener("click", changeTheme);

accordionHeaders.forEach(header => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement;
    const accordionActive = accordionItem.classList.contains("active");

    accordionActive ? accordionItem.classList.remove("active") : accordionItem.classList.add("active");
  })
})

menuLinks.forEach(item => {
  item.addEventListener("click", () => {
    menuLinks.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  })
})