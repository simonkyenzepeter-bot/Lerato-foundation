/* ---------------- Hamburger Menu with Overlay ---------------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navOverlay = document.getElementById('nav-overlay');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  hamburger.classList.toggle('toggle'); // Animate hamburger icon
  navOverlay.classList.toggle('active'); // Show overlay
});

// Close menu when overlay clicked
navOverlay.addEventListener('click', () => {
  navLinks.classList.remove('show');
  hamburger.classList.remove('toggle');
  navOverlay.classList.remove('active');
});

/* ---------------- Smooth Scroll ---------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Close mobile menu on link click
    if(navLinks.classList.contains('show')){
      navLinks.classList.remove('show');
      hamburger.classList.remove('toggle');
      navOverlay.classList.remove('active');
    }
  });
});

/* ---------------- Gallery Slider (Optional: single-slide view) ---------------- */
const slides = document.querySelectorAll('.gallery-grid img');
let currentSlide = 0;

function showSlide(index){
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
  currentSlide = index;
}

// Initialize first slide if slides exist
if(slides.length > 0) showSlide(currentSlide);

function nextSlide(){
  showSlide((currentSlide + 1) % slides.length);
}
function prevSlide(){
  showSlide((currentSlide - 1 + slides.length) % slides.length);
}

// Optional auto-slide every 5 seconds
/*
setInterval(() => {
  nextSlide();
}, 5000);
*/

/* ---------------- Fade-in Cards ---------------- */
const cards = document.querySelectorAll('.card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => cardObserver.observe(card));

/* ---------------- Impact Numbers Animation ---------------- */
const impactNumbers = document.querySelectorAll('.impact-legend div span:last-child'); // Correct selector for numbers

const impactObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      animateNumber(entry.target);
      observer.unobserve(entry.target); // Animate only once
    }
  });
}, { threshold: 0.5 });

impactNumbers.forEach(number => impactObserver.observe(number));

function animateNumber(number){
  const target = +number.innerText.replace(/\D/g,''); // Remove any non-digits like "+"
  let count = 0;
  const speed = 50;

  function updateNumber(){
    if(count < target){
      count += Math.ceil(target / speed);
      if(count > target) count = target;
      number.innerText = count + (number.innerText.includes('+') ? '+' : '');
      setTimeout(updateNumber, 50);
    } else {
      number.innerText = target + (number.innerText.includes('+') ? '+' : '');
    }
  }
  updateNumber();
}

/* ---------------- Optional: Chart.js Impact Chart ---------------- */
// Keep your existing Chart.js code here if needed
