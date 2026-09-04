/* Add a project object here to show it on the Projects page. */
const projects = [
  { title: 'Cortex', type: 'AI systems', description: 'A closed-loop AI system built at BeaverHacks that connects GitHub, logs, analytics, Discord, and documentation to monitor and respond to operational issues. 2nd Place, C1 Best Agent Infrastructure Track.', tags: ['AI agents', 'Node.js', 'Realtime'], url: 'https://lnkd.in/ghH7u2n7', linkLabel: 'View demo' },
  { title: 'MetaCluster', type: 'Research', description: 'Research on clustering-based parameter sharing for Kolmogorov–Arnold Networks. Reported up to 80× parameter-storage reduction on evaluated image-classification models without accuracy loss.', tags: ['PyTorch', 'KANs', 'Compression'], url: 'https://arxiv.org/abs/2510.19105', linkLabel: 'Read paper' },
  { title: 'Njobvu-AI', type: 'Research software', description: 'Open-source collaborative image-labeling and computer-vision research software. I contribute debugging, implementation, Docker configuration, and code-quality improvements.', tags: ['Node.js', 'Express', 'Docker'], url: 'https://github.com/sullichrosu/Njobvu-AI', linkLabel: 'View repository' },
  { title: 'LiftLog', type: 'Web application', description: 'Fitness tracking application built in an Agile/Scrum team with workout logging and data management.', tags: ['React', 'TypeScript', 'MongoDB'] },
  { title: 'Vision Cursor', type: 'Computer vision', description: 'Hands-free cursor control that processes camera input and maps hand gestures to cursor movement, clicks, and dragging.', tags: ['Python', 'OpenCV', 'MediaPipe'] },
  { title: 'CareSync', type: 'Full-stack application', description: 'Healthcare management application with JWT authentication, prescriptions and appointments, medication inventory, and refill alerts.', tags: ['React', 'Node.js', 'SQLite'] },
  { title: 'AI Quiz Application', type: 'Hackathon project', description: 'Web quiz application built during a 24-hour hackathon. Integrated Gemini API and Groq SDK to generate and validate questions and answers.', tags: ['Node.js', 'Express', 'Gemini API'] },
  { title: 'DocuVault', type: 'Secure web application', description: 'Document-management system with authenticated access, bcrypt password hashing, CSRF protection, and role-based access control.', tags: ['Python', 'Flask', 'SQLite'] },
  { title: 'FinTrack', type: 'Web application', description: 'Personal finance application with expense categories, tracking, and dynamic spending-trend visualizations.', tags: ['Python', 'Flask', 'JavaScript'] },
  { title: 'Digital Portfolio Website', type: 'Web development', description: 'Responsive portfolio website built to present projects, technical skills, and academic work.', tags: ['HTML', 'CSS', 'JavaScript'] }
];

function projectCard(project) {
  const tags = project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
  const link = project.url
    ? `<a class="project-link" href="${project.url}" target="_blank" rel="noreferrer" aria-label="${project.linkLabel || `Open ${project.title}`}">↗</a>`
    : '';

  return `
    <article class="project-card">
      <span class="project-type">${project.type}</span>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-bottom">
        <div class="tech-tags">${tags}</div>
        ${link}
      </div>
    </article>
  `;
}

const featured = document.querySelector('#featured-projects');
if (featured) featured.innerHTML = projects.slice(0, 3).map(projectCard).join('');

const all = document.querySelector('#all-projects');
if (all) all.innerHTML = projects.map(projectCard).join('');

const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
if (toggle) toggle.addEventListener('click', () => links.classList.toggle('open'));
