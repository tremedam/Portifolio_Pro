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
    // Centralizar o slide ativo (ajustado para 260px + 16px de margin)
    const imgWidth = 260 + 16; // largura + margin
    const totalImgs = imgs.length;
    const offset = (track.offsetWidth / 2) - (imgWidth / 2);
    // Loop visual: reordena DOM para sempre mostrar 3 imagens (esquerda, ativa, direita)
    imgs.forEach((img, i) => {
      img.classList.remove('active', 'left', 'right');
      img.style.order = '';
    });
    // Calcula índices circularmente
    const leftIdx = (current - 1 + totalImgs) % totalImgs;
    const rightIdx = (current + 1) % totalImgs;
    imgs[leftIdx].classList.add('left');
    imgs[leftIdx].style.zIndex = 1;
    imgs[leftIdx].style.opacity = 0.7;
    imgs[leftIdx].style.transform = 'scale(0.92)';
    imgs[leftIdx].style.order = 1;
    imgs[current].classList.add('active');
    imgs[current].style.zIndex = 3;
    imgs[current].style.opacity = 1;
    imgs[current].style.transform = 'scale(1.35)';
    imgs[current].style.order = 2;
    imgs[rightIdx].classList.add('right');
    imgs[rightIdx].style.zIndex = 1;
    imgs[rightIdx].style.opacity = 0.7;
    imgs[rightIdx].style.transform = 'scale(0.92)';
    imgs[rightIdx].style.order = 3;
    // Esconde as demais
    imgs.forEach((img, i) => {
      if (i !== leftIdx && i !== current && i !== rightIdx) {
        img.style.zIndex = 0;
        img.style.opacity = 0.2;
        img.style.transform = 'scale(0.85)';
        img.style.order = 4;
      }
    });
    // Centraliza o ativo
    track.style.transform = `translateX(${offset - imgWidth}px)`;
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