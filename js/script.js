/* ---------------- Hamburger Menu with Overlay ---------------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navOverlay = document.getElementById('nav-overlay');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');        // Show desktop links if needed
  hamburger.classList.toggle('toggle');     // Animate hamburger icon
  navOverlay.classList.toggle('active');    // Show overlay
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

/* ---------------- Impact Numbers Animation & Chart ---------------- */
const impactData = [85, 29, 35, 2, 600];
const impactLabels = ['Sponsored Students', 'Counties', 'Mentored Schools', 'Supported Schools', 'Sports Youth'];
const colors = ['#1abc9c','#8e44ad','#e74c3c','#f1c40f','#3498db'];

// Create Pie Chart
const ctx = document.getElementById('impactChart').getContext('2d');
const impactChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: impactLabels,
    datasets: [{
      label: 'Impact',
      data: impactData,
      backgroundColor: colors,
      borderColor: '#fff',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Lerato Foundation Impact Overview' },
      datalabels: {
        color: '#fff',
        font: { weight: 'bold', size: 14 },
        formatter: (value) => ((value/impactData.reduce((a,b)=>a+b,0))*100).toFixed(1)+'%'
      }
    }
  },
  plugins: [ChartDataLabels]
});

// Custom Horizontal Legend
const legendContainer = document.getElementById('impactLegend');
impactLabels.forEach((label, i) => {
  const item = document.createElement('div');
  const colorBox = document.createElement('span');
  colorBox.classList.add('color-box');
  colorBox.style.backgroundColor = colors[i];
  const text = document.createElement('span');
  text.innerText = `${label}: ${impactData[i]}+`;
  item.appendChild(colorBox);
  item.appendChild(text);
  legendContainer.appendChild(item);
});

/* ---------------- Optional Gallery Slider ---------------- */
const gallerySlides = document.querySelectorAll('.gallery-grid img');
let currentSlide = 0;

// Function to show one image at a time
function showSlide(index) {
  gallerySlides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
  currentSlide = index;
}

// Initialize first slide
if(gallerySlides.length > 0) showSlide(currentSlide);

// Optional Next/Prev functions
function nextSlide() {
  showSlide((currentSlide + 1) % gallerySlides.length);
}
function prevSlide() {
  showSlide((currentSlide - 1 + gallerySlides.length) % gallerySlides.length);
}

// Optional auto-slide every 5 seconds
// setInterval(() => { nextSlide(); }, 5000);
