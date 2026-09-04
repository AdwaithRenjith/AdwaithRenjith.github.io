/* Add projects here. Each object becomes a card on Home and Work & info. */
const projects = [
  {
    title: 'Cortex',
    type: 'AI systems',
    description: 'An autonomous closed-loop system that observes, reasons, acts, and verifies across a real-time decision pipeline.',
    tags: ['Agents', 'Node.js', 'Realtime'],
    url: 'https://github.com/adwaithrenjith'
  },
  {
    title: 'LiftLog',
    type: 'Full-stack product',
    description: 'A real-time workout tracker built with React and TypeScript, with persistent MongoDB storage.',
    tags: ['React', 'TypeScript', 'MongoDB'],
    url: 'https://github.com/adwaithrenjith'
  },
  {
    title: 'Vision Cursor',
    type: 'Computer vision',
    description: 'Hands-free computer control using OpenCV and MediaPipe for gesture-based click and drag interactions.',
    tags: ['Python', 'OpenCV', 'MediaPipe'],
    url: 'https://github.com/adwaithrenjith'
  },
  {
    title: 'MetaCluster',
    type: 'Research',
    description: 'Clustering-based parameter sharing for KAN MetaNet weights, achieving major storage reduction with no accuracy loss.',
    tags: ['PyTorch', 'KANs', 'Research'],
    url: 'https://arxiv.org/abs/2510.19105'
  },
  {
    title: 'CareSync',
    type: 'Application',
    description: 'A thoughtful digital experience designed to make care coordination simpler and more human.',
    tags: ['Product', 'Design', 'Web'],
    url: 'https://github.com/adwaithrenjith'
  },
  {
    title: 'FinTrack',
    type: 'Application',
    description: 'A personal finance concept focused on clarity, useful defaults, and better financial habits.',
    tags: ['JavaScript', 'UX', 'Data'],
    url: 'https://github.com/adwaithrenjith'
  }
];

function projectCard(project) {
  const tags = project.tags
    .map(tag => `<span class="tech-tag">${tag}</span>`)
    .join('');

  return `
    <article class="project-card">
      <span class="project-type">${project.type}</span>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-bottom">
        <div class="tech-tags">${tags}</div>
        <a class="project-link" href="${project.url}" target="_blank" rel="noreferrer" aria-label="Open ${project.title}">↗</a>
      </div>
    </article>
  `;
}
const featured=document.querySelector('#featured-projects');
if(featured)featured.innerHTML=projects.slice(0,3).map(projectCard).join('');
const all=document.querySelector('#all-projects');
if(all)all.innerHTML=projects.map(projectCard).join('');
const toggle=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
if(toggle)toggle.addEventListener('click',()=>links.classList.toggle('open'));



