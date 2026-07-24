// Admin Dashboard JavaScript

// Check authentication
(function checkAuth() {
  const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
  const loginTime = sessionStorage.getItem('loginTime');

  if (isLoggedIn !== 'true') {
    window.location.href = 'admin-login.html';
    return;
  }

  // Check session timeout (24 hours)
  const now = new Date().getTime();
  const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours

  if (loginTime && (now - parseInt(loginTime)) > sessionDuration) {
    logout();
    return;
  }

  // Display username
  const username = sessionStorage.getItem('adminUsername');
  document.getElementById('admin-username').textContent = username || 'Admin';
})();

// Logout function
function logout() {
  sessionStorage.clear();
  window.location.href = 'admin-login.html';
}

// Tab switching
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.admin-tab');
  const contents = document.querySelectorAll('.admin-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.dataset.tab;

      // Remove active from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Add active to clicked tab and corresponding content
      this.classList.add('active');
      document.getElementById(targetTab + '-content').classList.add('active');
    });
  });

  // Load portfolio images
  loadPortfolioImages();

  // Load projects list
  loadProjectsList();

  // Display browser info
  document.getElementById('browser-info').textContent = navigator.userAgent.split(' ').pop();

  const loginTime = sessionStorage.getItem('loginTime');
  if (loginTime) {
    const date = new Date(parseInt(loginTime));
    document.getElementById('login-time').textContent = date.toLocaleString('ro-RO');
  }

  // Change password form
  document.getElementById('change-password-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('⚠️ Funcția de schimbare parolă necesită un backend. Modifică credențialele direct în admin-login.html pentru demonstrație.');
  });

  // Project edit form
  document.getElementById('project-edit-form').addEventListener('submit', function(e) {
    e.preventDefault();
    saveProjectEdits();
  });
});

// Portfolio Management
const portfolioImages = [
  { src: 'img/canapea.jpg', alt: 'Canapea loft metal & lemn', title: 'Canapea Loft Metal & Lemn', url: 'proiecte/canapea-loft.html' },
  { src: 'img/scara.jpg', alt: 'Scară metalică interioară', title: 'Scară Metalică Interioară', url: 'proiecte/scara-metalica.html' },
  { src: 'img/scaune.jpg', alt: 'Scaune stil industrial', title: 'Scaune Stil Industrial', url: 'proiecte/scaune-industrial.html' },
  { src: 'img/consola.jpg', alt: 'Consolă metalică modernă', title: 'Consolă Metalică Modernă', url: 'proiecte/consola-metalica.html' },
  { src: 'img/balustrada.jpg', alt: 'Balustradă metalică exterioară', title: 'Balustradă Metalică Exterioară', url: 'proiecte/balustrada-exterioara.html' },
  { src: 'img/raft.jpg', alt: 'Raft metalic industrial', title: 'Raft Metalic Industrial', url: 'proiecte/raft-industrial.html' },
  { src: 'img/cuier.jpg', alt: 'Cuier metalic de perete', title: 'Cuier Metalic de Perete', url: 'proiecte/cuier-metalic.html' },
  { src: 'img/francesco-ungaro-c3FMTjT1pfo-unsplash.jpg', alt: 'Scară metalică premium', title: 'Scară Metalică Premium', url: 'proiecte/scara-premium.html' },
  { src: 'img/nikita-kachanovsky-5hkvSrL0Nk4-unsplash.jpg', alt: 'Balustradă interioară modernă', title: 'Balustradă Interioară Modernă', url: 'proiecte/balustrada-interioara.html' }
];

// Projects data structure (extindere cu toate detaliile)
const projectsData = [
  {
    id: 'canapea-loft',
    title: 'Canapea Loft Metal & Lemn',
    category: 'Mobilier Loft',
    lead: 'Design industrial modern cu structură metalică vopsită negru mat și șezut din lemn masiv de stejar.',
    description: 'Această canapea în stil loft combină robustețea metalului cu căldura lemnului masiv de stejar. Structura este sudată din profil tubular 40x40mm, vopsit în negru mat, iar șezutul și spătarul sunt realizate din scânduri de stejar de 40mm grosime, tratate cu ulei natural.',
    characteristics: [
      'Dimensiuni: L 200cm x H 85cm x A 80cm',
      'Material structură: Profil tubular oțel 40x40mm',
      'Material șezut: Lemn masiv de stejar 40mm',
      'Finisaj metal: Vopsea în pulbere negru mat',
      'Finisaj lemn: Ulei natural pentru lemn',
      'Capacitate: 3 persoane',
      'Greutate: ~65 kg'
    ],
    client: 'Showroom Design, Chișinău',
    date: 'Februarie 2026',
    duration: '5 zile',
    location: 'Chișinău, Moldova',
    image: 'img/canapea.jpg',
    gallery: ['img/canapea.jpg', 'img/canapea.jpg', 'img/canapea.jpg'], // Galerie foto
    url: 'proiecte/canapea-loft.html'
  },
  {
    id: 'scara-metalica',
    title: 'Scară Metalică Interioară',
    category: 'Scări Metalice',
    lead: 'Scară metalică cu design minimalist, trepte suspendate și balustradă cu sticlă securizată.',
    description: 'Scară metalică de interior cu structură centrală din profil CHS 120mm și trepte din tablă pliată 8mm. Designul minimalist și liniile curate creează un element arhitectural spectaculos.',
    characteristics: [
      'Înălțime totală: 3.2m (2 nivele)',
      'Număr trepte: 14 trepte',
      'Dimensiune treaptă: 90cm x 30cm',
      'Structură centrală: Profil tubular CHS 120mm',
      'Material trepte: Tablă pliată 8mm vopsită negru mat',
      'Balustradă: Sticlă securizată laminată 12mm',
      'Capacitate de încărcare: 250 kg/treaptă'
    ],
    client: 'Reședință Privată, Chișinău',
    date: 'Ianuarie 2026',
    duration: '14 zile',
    location: 'Chișinău, Moldova',
    image: 'img/scara.jpg',
    gallery: ['img/scara.jpg', 'img/scara.jpg', 'img/scara.jpg'],
    url: 'proiecte/scara-metalica.html'
  },
  {
    id: 'scaune-industrial',
    title: 'Scaune Stil Industrial',
    category: 'Mobilier Industrial',
    lead: 'Set de 6 scaune robuste din metal și lemn masiv, perfecte pentru dining, restaurante sau birouri.',
    description: 'Set de scaune cu design industrial care combină durabilitatea metalului cu confortul lemnului masiv. Structura din profil pătrat 30x30mm asigură stabilitate maximă.',
    characteristics: [
      'Cantitate: Set de 6 scaune',
      'Dimensiuni: H 85cm x L 45cm x A 50cm',
      'Material cadru: Profil pătrat oțel 30x30mm',
      'Material șezut/spătar: Lemn masiv de fag 25mm',
      'Finisaj metal: Vopsea în pulbere negru mat',
      'Capacitate încărcare: 150 kg/scaun'
    ],
    client: 'Restaurant Urban, Chișinău',
    date: 'Martie 2026',
    duration: '4 zile',
    location: 'Chișinău, Moldova',
    image: 'img/scaune.jpg',
    gallery: ['img/scaune.jpg', 'img/scaune.jpg', 'img/scaune.jpg'],
    url: 'proiecte/scaune-industrial.html'
  },
  {
    id: 'consola-metalica',
    title: 'Consolă Metalică Modernă',
    category: 'Mobilier Loft',
    lead: 'Consolă elegantă pentru hol cu structură metalică minimalistă și blat din lemn masiv de stejar.',
    description: 'Consolă cu design minimalist modern, perfectă pentru holuri, livinguri sau dormitoare. Structura din țeavă metalică 25x25mm susține un blat din lemn masiv de stejar.',
    characteristics: [
      'Dimensiuni: L 120cm x H 80cm x A 35cm',
      'Material cadru: Profil pătrat 25x25mm',
      'Material blat: Lemn masiv stejar 40mm',
      'Finisaj metal: Vopsea pulbere negru mat',
      'Capacitate încărcare: 40 kg'
    ],
    client: 'Apartament Modern, Chișinău',
    date: 'Aprilie 2026',
    duration: '3 zile',
    location: 'Chișinău, Moldova',
    image: 'img/consola.jpg',
    gallery: ['img/consola.jpg', 'img/consola.jpg', 'img/consola.jpg'],
    url: 'proiecte/consola-metalica.html'
  },
  {
    id: 'balustrada-exterioara',
    title: 'Balustradă Metalică Exterioară',
    category: 'Balustrade Exterioare',
    lead: 'Balustradă robustă pentru terasă cu protecție anticorozivă și finisaj rezistent la intemperii.',
    description: 'Balustradă metalică exterioară realizată din profil dreptunghiular 40x20mm cu montanți verticali. Zincată la cald și vopsită cu vopsea în pulbere rezistentă UV.',
    characteristics: [
      'Lungime totală: 8 metri liniari',
      'Înălțime balustradă: 110cm',
      'Material: Profil dreptunghiular oțel 40x20mm',
      'Tratament: Zincare la cald + vopsire în pulbere',
      'Culoare: Negru mat RAL 9005',
      'Rezistență la coroziune: ≥ 20 ani'
    ],
    client: 'Reședință Privată, Anenii Noi',
    date: 'Decembrie 2025',
    duration: '7 zile',
    location: 'Anenii Noi, Moldova',
    image: 'img/balustrada.jpg',
    gallery: ['img/balustrada.jpg', 'img/balustrada.jpg', 'img/balustrada.jpg'],
    url: 'proiecte/balustrada-exterioara.html'
  },
  {
    id: 'raft-industrial',
    title: 'Raft Metalic Industrial',
    category: 'Depozitare',
    lead: 'Sistem modular de rafturi pentru depozitare sau display - design versatil și capacitate mare.',
    description: 'Sistem de rafturi industrial cu 5 nivele, perfect pentru ateliere, depozite sau showroom-uri. Structura robustă din profil UNP.',
    characteristics: [
      'Dimensiuni: L 200cm x H 200cm x A 60cm',
      'Nivele: 5 rafturi reglabile',
      'Material: Profil UNP 80 + tablă 3mm',
      'Capacitate: 200 kg/raft',
      'Modular - se poate extinde'
    ],
    client: 'Atelier Auto',
    date: 'Mai 2026',
    duration: '5 zile',
    location: 'Chișinău, Moldova',
    image: 'img/raft.jpg',
    gallery: ['img/raft.jpg', 'img/raft.jpg'],
    url: 'proiecte/raft-industrial.html'
  },
  {
    id: 'cuier-metalic',
    title: 'Cuier Metalic de Perete',
    category: 'Accesorii',
    lead: 'Cuier minimalist industrial cu 6 cârlige metalice rezistente pentru hol sau birou.',
    description: 'Cuier de perete cu design industrial minimalist. Bara orizontală din țeavă 25mm cu 6 cârlige metalice cilindrice.',
    characteristics: [
      'Lungime: 90cm',
      '6 cârlige metalice',
      'Capacitate: 10 kg/cârlig',
      'Montare pe perete'
    ],
    client: 'Birou Corporate',
    date: 'Aprilie 2026',
    duration: '1 zi',
    location: 'Chișinău, Moldova',
    image: 'img/cuier.jpg',
    gallery: ['img/cuier.jpg', 'img/cuier.jpg'],
    url: 'proiecte/cuier-metalic.html'
  },
  {
    id: 'scara-premium',
    title: 'Scară Metalică Premium',
    category: 'Scări Premium',
    lead: 'Scară de lux cu design arhitectural complex - finisaj impecabil și structură robustă.',
    description: 'Scară premium cu design spectaculos și execuție de înaltă precizie. Element central pentru interioare exclusive.',
    characteristics: [
      'Înălțime: 4.5m (3 nivele)',
      'Design custom arhitectural',
      'Structură CHS 140mm',
      'Trepte inox + sticlă',
      'Iluminare LED integrată'
    ],
    client: 'Vila Premium, Chișinău',
    date: 'Mai 2026',
    duration: '7 săptămâni',
    location: 'Chișinău, Moldova',
    image: 'img/francesco-ungaro-c3FMTjT1pfo-unsplash.jpg',
    gallery: ['img/francesco-ungaro-c3FMTjT1pfo-unsplash.jpg', 'img/francesco-ungaro-c3FMTjT1pfo-unsplash.jpg', 'img/francesco-ungaro-c3FMTjT1pfo-unsplash.jpg'],
    url: 'proiecte/scara-premium.html'
  },
  {
    id: 'balustrada-interioara',
    title: 'Balustradă Interioară Modernă',
    category: 'Balustrade Interior',
    lead: 'Balustradă elegantă cu design contemporan pentru scări interioare - siguranță și estetică.',
    description: 'Balustradă interioară cu design minimalist modern, realizată din profil rectangular și sticlă securizată. Liniile curate și transparența sticlei mențin spațiul deschis.',
    characteristics: [
      'Lungime: 6 metri liniari',
      'Înălțime: 100cm',
      'Material: Profil dreptunghiular 40x20mm + sticlă 10mm',
      'Finisaj: Vopsea pulbere negru mat',
      'Montare: Pe lateralul scării'
    ],
    client: 'Apartament Duplex',
    date: 'Iunie 2026',
    duration: '5 zile',
    location: 'Chișinău, Moldova',
    image: 'img/nikita-kachanovsky-5hkvSrL0Nk4-unsplash.jpg',
    gallery: ['img/nikita-kachanovsky-5hkvSrL0Nk4-unsplash.jpg', 'img/nikita-kachanovsky-5hkvSrL0Nk4-unsplash.jpg'],
    url: 'proiecte/balustrada-interioara.html'
  }
];

function loadPortfolioImages() {
  const grid = document.getElementById('portfolio-grid');
  grid.innerHTML = '';

  portfolioImages.forEach((image, index) => {
    const item = document.createElement('div');
    item.className = 'portfolio-item';
    item.innerHTML = `
      <img src="${image.src}" alt="${image.alt}" loading="lazy">
      <div class="portfolio-item-info" style="position: absolute; top: 8px; left: 8px; right: 8px; background: rgba(0,0,0,0.8); padding: 8px; border-radius: 6px; font-size: 0.85rem;">
        <strong>${image.title}</strong>
      </div>
      <div class="portfolio-item-actions">
        <a href="${image.url}" class="btn btn-small btn-ghost" target="_blank" style="text-decoration: none;">👁️ Vezi</a>
        <button class="btn btn-small btn-ghost" onclick="editImage(${index})">✏️ Edit</button>
        <button class="btn btn-small btn-danger" onclick="deleteImage(${index})">🗑️</button>
      </div>
    `;
    grid.appendChild(item);
  });

  // Update counter
  document.getElementById('portfolio-count').textContent = portfolioImages.length;
}

function handleFileUpload(event) {
  const files = event.target.files;

  if (files.length === 0) return;

  // Validate files
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('❌ Doar fișiere imagine sunt permise!');
      return;
    }

    // Check file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(`❌ ${file.name} este prea mare! Maximum 5MB per imagine.`);
      return;
    }
  }

  // In a real application, this would upload to server
  alert(`✅ ${files.length} imagine(i) pregătite pentru upload!\n\n⚠️ Nota: Într-un sistem real, aceste imagini ar fi încărcate pe server. Pentru demonstrație, adaugă manual imaginile în folderul /img și actualizează array-ul portfolioImages din admin.js`);

  // Show preview (demo)
  const reader = new FileReader();
  reader.onload = function(e) {
    const preview = document.createElement('div');
    preview.className = 'card';
    preview.style.marginTop = '16px';
    preview.style.padding = '16px';
    preview.innerHTML = `
      <h4>Preview: ${files[0].name}</h4>
      <img src="${e.target.result}" style="max-width: 300px; border-radius: 8px; margin-top: 12px;">
      <p style="color: var(--muted); margin-top: 12px; font-size: 0.9rem;">
        Pentru a adăuga permanent, încarcă fișierul în <code>/img</code> și adaugă-l în portofoliu.html
      </p>
    `;
    document.getElementById('portfolio-content').querySelector('.card').appendChild(preview);
  };
  reader.readAsDataURL(files[0]);
}

function editImage(index) {
  const image = portfolioImages[index];
  const newAlt = prompt('Editează descrierea imaginii:', image.alt);

  if (newAlt && newAlt.trim() !== '') {
    portfolioImages[index].alt = newAlt.trim();
    alert('✅ Descrierea a fost actualizată!\n\n⚠️ Într-un sistem real, aceasta ar fi salvată în baza de date. Pentru demonstrație, modificările se pierd la refresh.');
    loadPortfolioImages();
  }
}

function deleteImage(index) {
  const image = portfolioImages[index];

  if (confirm(`Ești sigur că vrei să ștergi:\n"${image.alt}"?`)) {
    portfolioImages.splice(index, 1);
    alert('✅ Imaginea a fost ștearsă din listă!\n\n⚠️ Într-un sistem real, aceasta ar fi ștearsă permanent. Pentru demonstrație, modificările se pierd la refresh.');
    loadPortfolioImages();
  }
}

// Simulate request count (in a real app, this would come from backend/Formspree API)
document.addEventListener('DOMContentLoaded', function() {
  // Random number for demo
  const randomCount = Math.floor(Math.random() * 15) + 3;
  document.getElementById('new-requests-count').textContent = randomCount;
});

// Prevent accidental logout
window.addEventListener('beforeunload', function(e) {
  const tabs = document.querySelectorAll('.admin-tab');
  // Only warn if user has unsaved work (check if portfolio was modified)
  // For now, no warning to avoid annoyance
});

// Auto-logout on session expiry
setInterval(function() {
  const loginTime = sessionStorage.getItem('loginTime');
  if (loginTime) {
    const now = new Date().getTime();
    const sessionDuration = 24 * 60 * 60 * 1000;

    if ((now - parseInt(loginTime)) > sessionDuration) {
      alert('Sesiunea ta a expirat. Te rugăm să te autentifici din nou.');
      logout();
    }
  }
}, 60000); // Check every minute

// Projects List Management
function loadProjectsList() {
  const container = document.getElementById('projects-list');
  if (!container) return;

  container.innerHTML = '';

  projectsData.forEach((project) => {
    const item = document.createElement('div');
    item.className = 'project-item';
    item.innerHTML = `
      <div class="project-item-info">
        <div class="project-item-title">${project.title}</div>
        <div class="project-item-meta">${project.category} • ${project.date}</div>
      </div>
      <div style="display: flex; gap: 8px;">
        <a href="${project.url}" class="btn btn-small btn-ghost" target="_blank" style="text-decoration: none;">👁️ Vezi</a>
        <button class="btn btn-small btn-primary" onclick="openProjectEditor('${project.id}')">✏️ Editează</button>
      </div>
    `;
    container.appendChild(item);
  });
}

function openProjectEditor(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  // Populate form
  document.getElementById('edit-project-id').value = project.id;
  document.getElementById('edit-title').value = project.title;
  document.getElementById('edit-category').value = project.category;
  document.getElementById('edit-lead').value = project.lead;
  document.getElementById('edit-description').value = project.description;
  document.getElementById('edit-characteristics').value = project.characteristics.join('\n');
  document.getElementById('edit-client').value = project.client;
  document.getElementById('edit-date').value = project.date;
  document.getElementById('edit-duration').value = project.duration;
  document.getElementById('edit-location').value = project.location;

  // Load main image
  loadMainImagePreview(project.image);

  // Load gallery images
  loadGalleryImagesPreview(project.gallery || []);

  // Update modal title
  document.getElementById('modal-project-title').textContent = `Editează: ${project.title}`;

  // Show modal
  document.getElementById('project-editor-modal').style.display = 'flex';
}

function loadMainImagePreview(imageSrc) {
  const container = document.getElementById('main-image-preview');
  container.innerHTML = `
    <div class="badge-main">IMAGINE PRINCIPALĂ</div>
    <img src="${imageSrc}" alt="Imagine principală">
  `;
}

function changeMainImage() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validate
    if (!file.type.startsWith('image/')) {
      alert('❌ Selectează un fișier imagine valid (JPG, PNG)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('❌ Imaginea este prea mare! Maximum 5MB.');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = function(event) {
      loadMainImagePreview(event.target.result);

      // Store in project data temporarily
      const projectId = document.getElementById('edit-project-id').value;
      const project = projectsData.find(p => p.id === projectId);
      if (project) {
        project.image = event.target.result;
      }
    };
    reader.readAsDataURL(file);

    alert('✅ Imagine principală actualizată!\n\n⚠️ Pentru demonstrație, imaginea este încărcată în browser. Într-un sistem real cu backend, ar fi încărcată pe server și calea ar fi salvată în baza de date.');
  };
  input.click();
}

function loadGalleryImagesPreview(images) {
  const container = document.getElementById('gallery-images-preview');
  if (!images || images.length === 0) {
    container.innerHTML = '<p style="color: var(--muted); text-align: center; padding: 20px; grid-column: 1/-1;">Nu există imagini în galerie. Adaugă imagini folosind butonul de mai sus.</p>';
    return;
  }

  container.innerHTML = images.map((img, index) => `
    <div class="image-preview-item">
      <img src="${img}" alt="Galerie ${index + 1}">
      <button class="image-preview-remove" onclick="removeGalleryImage(${index})" type="button">×</button>
    </div>
  `).join('');
}

function handleGalleryUpload(event) {
  const files = Array.from(event.target.files);
  if (files.length === 0) return;

  const projectId = document.getElementById('edit-project-id').value;
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  // Initialize gallery if not exists
  if (!project.gallery) {
    project.gallery = [];
  }

  let processedCount = 0;

  files.forEach(file => {
    // Validate
    if (!file.type.startsWith('image/')) {
      alert(`❌ ${file.name} nu este o imagine validă!`);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(`❌ ${file.name} este prea mare! Maximum 5MB per imagine.`);
      return;
    }

    // Read file
    const reader = new FileReader();
    reader.onload = function(e) {
      project.gallery.push(e.target.result);
      processedCount++;

      // Update preview when all files are processed
      if (processedCount === files.length) {
        loadGalleryImagesPreview(project.gallery);
        alert(`✅ ${files.length} imagine(i) adăugată(e) în galerie!\n\n⚠️ Pentru demonstrație, imaginile sunt încărcate în browser. Într-un sistem real, ar fi încărcate pe server.`);
      }
    };
    reader.readAsDataURL(file);
  });

  // Clear input
  event.target.value = '';
}

function removeGalleryImage(index) {
  const projectId = document.getElementById('edit-project-id').value;
  const project = projectsData.find(p => p.id === projectId);
  if (!project || !project.gallery) return;

  if (confirm('Ești sigur că vrei să ștergi această imagine din galerie?')) {
    project.gallery.splice(index, 1);
    loadGalleryImagesPreview(project.gallery);
  }
}

function closeProjectEditor() {
  document.getElementById('project-editor-modal').style.display = 'none';
  document.getElementById('project-edit-form').reset();
}

function saveProjectEdits() {
  const projectId = document.getElementById('edit-project-id').value;
  const project = projectsData.find(p => p.id === projectId);

  if (!project) return;

  // Get form values
  const updatedData = {
    title: document.getElementById('edit-title').value,
    category: document.getElementById('edit-category').value,
    lead: document.getElementById('edit-lead').value,
    description: document.getElementById('edit-description').value,
    characteristics: document.getElementById('edit-characteristics').value.split('\n').filter(line => line.trim() !== ''),
    client: document.getElementById('edit-client').value,
    date: document.getElementById('edit-date').value,
    duration: document.getElementById('edit-duration').value,
    location: document.getElementById('edit-location').value
  };

  // Update project data
  Object.assign(project, updatedData);

  // Show success message
  alert(`✅ Modificările pentru "${project.title}" au fost salvate!\n\n⚠️ IMPORTANT: Într-un sistem real, aceste modificări ar fi salvate în baza de date și actualizate automat în fișierele HTML.\n\nPentru DEMO, modificările rămân doar în memorie (se pierd la refresh). Pentru a aplica permanent modificările, trebuie să:\n\n1. Copiezi conținutul editat din formular\n2. Actualizezi manual fișierul HTML corespunzător din folderul /proiecte/\n3. SAU implementezi un backend (PHP/Node.js) pentru salvare automată`);

  // Close modal
  closeProjectEditor();

  // Reload projects list
  loadProjectsList();

  // Update portfolio if title changed
  const portfolioItem = portfolioImages.find(p => p.url === project.url);
  if (portfolioItem) {
    portfolioItem.title = project.title;
    loadPortfolioImages();
  }
}

// Close modal on outside click
document.addEventListener('click', function(e) {
  const modal = document.getElementById('project-editor-modal');
  if (modal && e.target === modal) {
    closeProjectEditor();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('project-editor-modal');
    if (modal && modal.style.display === 'flex') {
      closeProjectEditor();
    }
  }
});
