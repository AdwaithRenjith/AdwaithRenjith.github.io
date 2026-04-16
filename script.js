// ============================================
// LOADING SCREEN
// ============================================
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 1000);
});

// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
  // Cursor follows immediately
  cursorX += (mouseX - cursorX) * 0.5;
  cursorY += (mouseY - cursorY) * 0.5;
  
  // Follower has more lag
  followerX += (mouseX - followerX) * 0.15;
  followerY += (mouseY - followerY) * 0.15;
  
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Enhanced cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag, input, textarea');
interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    cursorFollower.style.width = '70px';
    cursorFollower.style.height = '70px';
    cursorFollower.style.opacity = '0.8';
  });
  
  element.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.width = '50px';
    cursorFollower.style.height = '50px';
    cursorFollower.style.opacity = '0.6';
  });
});

// ============================================
// PARTICLE ANIMATION
// ============================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 50;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  
  draw() {
    ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  // Draw connections
  particles.forEach((p1, i) => {
    particles.slice(i + 1).forEach(p2 => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 150)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });
  });
  
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// ============================================
// NAVIGATION BAR
// ============================================
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Show navbar after scrolling down
  if (scrollTop > 100) {
    navbar.classList.add('visible');
  } else {
    navbar.classList.remove('visible');
  }
  
  lastScrollTop = scrollTop;
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ============================================
// SCROLL SPY
// ============================================
const sections = document.querySelectorAll('section, header');
const navLinksArray = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksArray.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// DARK/LIGHT MODE TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
  document.body.classList.add('light-mode');
  themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  
  if (document.body.classList.contains('light-mode')) {
    themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  }
});

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // TODO: Replace this with your actual form handling
  // Option 1: Use Formspree (https://formspree.io/)
  // Option 2: Use Netlify Forms (if hosting on Netlify)
  // Option 3: Set up your own backend endpoint
  
  try {
    // Simulate form submission (replace with actual endpoint)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: Uncomment and configure when ready
    /*
    const response = await fetch('YOUR_FORM_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Form submission failed');
    */
    
    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
    formStatus.className = 'form-status success';
    contactForm.reset();
    
    // TODO: Remove the alert below once form handling is set up
    alert('Form submission is not yet configured. Please add your form endpoint in script.js');
    
  } catch (error) {
    formStatus.textContent = 'Oops! Something went wrong. Please try again.';
    formStatus.className = 'form-status error';
  }
  
  // Hide status message after 5 seconds
  setTimeout(() => {
    formStatus.style.display = 'none';
  }, 5000);
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll('.card, .project-card, .skill-category, .experience-item, .achievement-card, .currently-card, .testimonial-card');
animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ============================================
// SCROLL INDICATOR
// ============================================
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollIndicator.style.opacity = '0';
  } else {
    scrollIndicator.style.opacity = '1';
  }
});

// ============================================
// EASTER EGG: KONAMI CODE
// ============================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateEasterEgg() {
  // Fun animation or message
  document.body.style.animation = 'rainbow 2s linear';
  setTimeout(() => {
    alert('🎉 You found the easter egg! Thanks for exploring!');
    document.body.style.animation = '';
  }, 2000);
}

// Add rainbow animation dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);

// ============================================
// CV DOWNLOAD FUNCTIONALITY - PROFESSIONAL FORMAT
// ============================================
const cvDownloadBtn = document.getElementById('cvDownloadBtn');

cvDownloadBtn.addEventListener('click', downloadCV);

function extractCVDataFromPage() {
  // Dynamically extract ALL data from the HTML page
  const cvData = {
    name: 'Adwaith Renjith',
    title: document.querySelector('.subtitle')?.innerText?.trim() || 'CS Student | AI Researcher | Full-Stack Engineer',
    email: 'adwaithr2006@gmail.com',
    location: 'Corvallis, Oregon',
    github: 'https://github.com/adwaithrenjith',
    linkedin: 'https://www.linkedin.com/in/adwaith-renjith/',
    
    // Extract About section
    about: document.querySelector('.about-section .glass-card')?.innerText?.trim() || '',
    
    // Extract Research papers (all from research section)
    research: Array.from(document.querySelectorAll('#research .card')).map(card => ({
      title: card.querySelector('h3')?.innerText?.trim(),
      details: Array.from(card.querySelectorAll('li')).map(li => li.innerText?.trim()),
      badges: Array.from(card.querySelectorAll('.tag')).map(tag => tag.innerText?.trim()).join(', ')
    })).filter(r => r.title),
    
    // Extract ALL Projects with full descriptions and tech stacks
    projects: Array.from(document.querySelectorAll('.project-card')).map(card => ({
      name: card.querySelector('.project-header h3')?.innerText?.trim(),
      icon: card.querySelector('.project-icon')?.innerText?.trim(),
      description: card.querySelector('.project-description')?.innerText?.trim(),
      tech: Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.innerText?.trim())
    })).filter(p => p.name),
    
    // Extract ALL Skills by category
    skills: {},
    
    // Extract Experience/Leadership items
    experience: Array.from(document.querySelectorAll('.experience-item')).map(item => {
      const strong = item.querySelector('strong')?.innerText?.trim();
      const link = item.querySelector('.link-accent');
      const company = link?.innerText?.trim() || '';
      return { role: strong, company: company };
    }).filter(e => e.role),
    
    // Extract Awards
    awards: Array.from(document.querySelectorAll('.achievement-card')).map(card => ({
      icon: card.querySelector('.achievement-icon')?.innerText?.trim(),
      title: card.querySelector('h4')?.innerText?.trim(),
      organization: card.querySelector('p')?.innerText?.trim(),
      year: card.querySelector('.achievement-year')?.innerText?.trim()
    })).filter(a => a.title),
    
    // Extract Currently Working On section
    currently: Array.from(document.querySelectorAll('.currently-card')).map(card => ({
      title: card.querySelector('h4')?.innerText?.trim(),
      description: card.querySelector('p')?.innerText?.trim()
    })).filter(c => c.title)
  };
  
  // Extract ALL Skills by category
  document.querySelectorAll('.skill-category').forEach(category => {
    const categoryName = category.querySelector('h4')?.innerText?.trim();
    const skills = Array.from(category.querySelectorAll('.skill-tag')).map(tag => tag.innerText?.trim());
    if (categoryName && skills.length > 0) {
      cvData.skills[categoryName] = skills;
    }
  });
  
  return cvData;
}

function downloadCV() {
  // Extract data from page
  const cvData = extractCVDataFromPage();
  
  // Generate CV HTML
  const cvHTML = generateCVHTML(cvData);
  
  // Configure html2pdf options for professional document
  const options = {
    margin: [8, 8, 8, 8],
    filename: 'Adwaith_Renjith_CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  // Generate PDF
  html2pdf()
    .set(options)
    .from(cvHTML)
    .save();
  
  // Visual feedback
  cvDownloadBtn.innerHTML = '<span class="cv-icon">✓</span><span class="cv-text">Downloaded!</span>';
  setTimeout(() => {
    cvDownloadBtn.innerHTML = '<span class="cv-icon">📄</span><span class="cv-text">Download CV</span>';
  }, 2000);
}

function generateCVHTML(data) {
  // Helper function to clean multi-line text
  const cleanText = (text) => text ? text.replace(/\n+/g, ' ').trim() : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Adwaith Renjith - CV</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; }
        body {
          font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
          color: #000;
          line-height: 1.3;
          font-size: 11px;
        }
        .container { 
          width: 8.5in; 
          height: 11in; 
          margin: 0 auto; 
          padding: 0.5in 0.6in;
          background: white;
        }
        
        /* Header */
        .header {
          text-align: center;
          margin-bottom: 10px;
          padding-bottom: 8px;
          border-bottom: 2px solid #000;
        }
        .name {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 2px;
        }
        .title {
          font-size: 11px;
          font-weight: 500;
          margin-bottom: 4px;
        }
        .contact {
          font-size: 10px;
          display: flex;
          justify-content: center;
          gap: 15px;
        }
        
        /* Sections */
        .section {
          margin-bottom: 8px;
          page-break-inside: avoid;
        }
        .section-title {
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
          padding: 3px 0;
          margin-bottom: 6px;
          border-bottom: 1px solid #000;
          letter-spacing: 0.5px;
        }
        
        /* Entries */
        .entry {
          margin-bottom: 6px;
          page-break-inside: avoid;
        }
        .entry-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2px;
        }
        .entry-title {
          font-weight: bold;
          font-size: 11px;
        }
        .entry-org {
          font-weight: 500;
          font-size: 10.5px;
        }
        .entry-date {
          font-size: 10px;
          color: #333;
        }
        .entry-desc {
          font-size: 10px;
          margin-left: 0px;
          line-height: 1.3;
        }
        .bullet-list {
          list-style: none;
          margin: 3px 0 0 12px;
        }
        .bullet-list li {
          font-size: 10px;
          margin-bottom: 1px;
          padding-left: 10px;
          position: relative;
          line-height: 1.3;
        }
        .bullet-list li:before {
          content: "•";
          position: absolute;
          left: 0;
          font-weight: bold;
        }
        
        /* Skills Grid */
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 15px;
        }
        .skill-block {
          margin-bottom: 6px;
        }
        .skill-header {
          font-weight: bold;
          font-size: 10.5px;
          margin-bottom: 2px;
          border-bottom: 1px dotted #999;
        }
        .skill-list {
          font-size: 10px;
          line-height: 1.3;
        }
        
        /* Projects */
        .project {
          margin-bottom: 6px;
          page-break-inside: avoid;
        }
        .project-title {
          font-weight: bold;
          font-size: 11px;
          margin-bottom: 1px;
        }
        .project-desc {
          font-size: 10px;
          margin-bottom: 1px;
          line-height: 1.3;
        }
        .project-tech {
          font-size: 9.5px;
          color: #333;
          font-weight: 500;
        }
        
        /* Summary */
        .summary {
          font-size: 10px;
          line-height: 1.4;
          text-align: justify;
          margin-bottom: 8px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- HEADER -->
        <div class="header">
          <div class="name">${data.name}</div>
          <div class="title">${data.title}</div>
          <div class="contact">
            <span>${data.email}</span>
            <span>|</span>
            <span>${data.location}</span>
            <span>|</span>
            <span><u>GitHub | LinkedIn</u></span>
          </div>
        </div>

        <!-- SUMMARY -->
        ${data.about ? `
        <div class="section">
          <div class="summary">${cleanText(data.about)}</div>
        </div>
        ` : ''}

        <!-- EXPERIENCE / LEADERSHIP -->
        ${data.experience && data.experience.length > 0 ? `
        <div class="section">
          <div class="section-title">Experience & Leadership</div>
          ${data.experience.map(exp => `
            <div class="entry">
              <div class="entry-header">
                <div class="entry-title">${exp.role || ''}</div>
              </div>
              <div class="entry-org">${exp.company || ''}</div>
            </div>
          `).join('')}
        </div>
        ` : ''}

        <!-- RESEARCH -->
        ${data.research && data.research.length > 0 ? `
        <div class="section">
          <div class="section-title">Research</div>
          ${data.research.map(research => `
            <div class="entry">
              <div class="entry-title">${research.title}</div>
              ${research.badges ? `<div style="font-size: 9px; color: #666; margin-bottom: 2px;">${research.badges}</div>` : ''}
              ${research.details && research.details.length > 0 ? `
                <ul class="bullet-list">
                  ${research.details.filter(d => d).map(detail => `<li>${cleanText(detail)}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        <!-- PROJECTS -->
        ${data.projects && data.projects.length > 0 ? `
        <div class="section">
          <div class="section-title">Projects</div>
          ${data.projects.map(project => `
            <div class="project">
              <div class="project-title">${project.name}</div>
              <div class="project-desc">${cleanText(project.description)}</div>
              ${project.tech && project.tech.length > 0 ? `<div class="project-tech"><strong>Tech:</strong> ${project.tech.join(' • ')}</div>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        <!-- SKILLS -->
        ${Object.keys(data.skills).length > 0 ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills-grid">
            ${Object.entries(data.skills).map(([category, skills]) => `
              <div class="skill-block">
                <div class="skill-header">${category}</div>
                <div class="skill-list">${skills.filter(s => s).join(', ')}</div>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <!-- AWARDS -->
        ${data.awards && data.awards.length > 0 ? `
        <div class="section">
          <div class="section-title">Awards & Achievements</div>
          ${data.awards.filter(a => a.title).map(award => `
            <div class="entry">
              <div class="entry-header">
                <div class="entry-title">${award.title}</div>
                ${award.year ? `<div class="entry-date">${award.year}</div>` : ''}
              </div>
              ${award.organization ? `<div class="entry-org">${award.organization}</div>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        <!-- CURRENT WORK -->
        ${data.currently && data.currently.length > 0 ? `
        <div class="section">
          <div class="section-title">Current Work</div>
          ${data.currently.map(item => `
            <div class="entry">
              <div class="entry-title">${item.title}</div>
              <div class="entry-desc">${item.description}</div>
            </div>
          `).join('')}
        </div>
        ` : ''}
      </div>
    </body>
    </html>
  `;
}

console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cLooking at the code? Feel free to reach out if you have questions!', 'font-size: 14px; color: #94a3b8;');
