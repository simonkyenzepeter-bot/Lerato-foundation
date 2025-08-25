/* ---------------- Hamburger Menu ---------------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

/* ---------------- Smooth Scroll ---------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ---------------- Gallery Slider ---------------- */
const slides = document.querySelectorAll('.gallery-grid img');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
}

// Initialize first slide
if(slides.length > 0) showSlide(currentSlide);

// Next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

/* ---------------- Auto Slide (Optional) ---------------- */
// Uncomment below to auto-slide every 5 seconds
/*
setInterval(() => {
  nextSlide();
}, 5000);
*/

/* ---------------- Optional Animations ---------------- */
// Fade in cards when scrolling
const cards = document.querySelectorAll('.card');
const observerOptions = { threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

cards.forEach(card => observer.observe(card));

/* ---------------- Impact Numbers Animation ---------------- */
const impactNumbers = document.querySelectorAll('.impact h3');

impactNumbers.forEach(number => {
  const target = +number.innerText.replace('+',''); // numeric value
  let count = 0;
  const speed = 50; // lower = faster

  function updateNumber(){
    if(count < target){
      count += Math.ceil(target / speed);
      number.innerText = count + (number.innerText.includes('+') ? '+' : '');
      setTimeout(updateNumber, 50);
    } else {
      number.innerText = target + (number.innerText.includes('+') ? '+' : '');
    }
  }
  updateNumber();
});
