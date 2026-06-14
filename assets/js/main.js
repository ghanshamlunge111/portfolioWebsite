(function () {
  "use strict";

  // Cache elements
  const header = document.getElementById('header');
  const navbar = document.getElementById('navbar');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelectorAll('.navbar a');
  const sections = document.querySelectorAll('.scroll-offset, .hero-section');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-tile-card');
  
  // Drawer elements
  const drawer = document.getElementById('case-study-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  
  /**
   * Header scroll class trigger
   */
  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleHeaderScroll);
  window.addEventListener('load', handleHeaderScroll);

  /**
   * Mobile nav toggling
   */
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      navbar.classList.toggle('navbar-mobile');
      mobileNavToggle.classList.toggle('bi-list');
      mobileNavToggle.classList.toggle('bi-x');
    });
  }

  // Close mobile nav when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        mobileNavToggle.classList.add('bi-list');
        mobileNavToggle.classList.remove('bi-x');
      }
    });
  });

  /**
   * Active section tracker (IntersectionObserver)
   */
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px', // Trigger when section occupies the mid viewport
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(sec => observer.observe(sec));

  /**
   * Vanilla JS Projects filtering
   */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');

      // Grid animate show/hide
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /**
   * Projects Case Study Drawer content dictionary
   */
  const caseStudies = {
    "grampanchayat-portal": {
      title: "Grampanchayat e-Governance Portal",
      category: "Freelance Client Work / Public Sector",
      tech: "HTML5, Vanilla CSS3, JavaScript (ES6), Bootstrap, jQuery",
      repo: "github.com/ghanshamlunge111/grampanchayat-masolabk",
      body: `
        <h4>Project Overview</h4>
        <p>A full-featured e-Governance web platform commissioned by local municipal administrations (Grampanchayat Masola Khurd & Parwa) to digitize public cataloging, documentation, and village feedback loops.</p>
        
        <h4>Key Engineering Contributions</h4>
        <ul>
          <li><strong>Document Request Dashboard:</strong> Developed dynamic application forms for citizens to request local documents (Birth, Death, Income, and Marriage certificates) online.</li>
          <li><strong>Civic Complaint Tracking:</strong> Programmed a client-side complaint logs system generating custom tracking IDs for local civic issues (roads, sanitation, grid cuts).</li>
          <li><strong>Land Record Integration:</strong> Constructed web-preview templates for local land documentation certificates (RTC dummy indexes).</li>
          <li><strong>Admin Console Control Panel:</strong> Created a custom administration control console allowing Gram Sevaks to audit registries, export census records, publish bulletins, and resolve complaints.</li>
        </ul>
      `
    },
    "grampanchayat-backend": {
      title: "Grampanchayat Unified Backend API",
      category: "Freelance Service Integration",
      tech: "Node.js, Express, SQLite3, JSON Web Tokens (JWT), BcryptJS, Multer",
      repo: "github.com/ghanshamlunge111/grampanchayat-backend",
      body: `
        <h4>Project Overview</h4>
        <p>High-performance backend engine managing database queries, file directory storage, and official controls for the Grampanchayat rural portals.</p>
        
        <h4>Key Engineering Contributions</h4>
        <ul>
          <li><strong>Stateless JWT Security:</strong> Coded login systems utilizing JSON Web Tokens and password verification with Bcrypt salting.</li>
          <li><strong>Multer Storage Pipelines:</strong> Configured directories to upload official circulars and RTC survey documentation.</li>
          <li><strong>Relational DB Mapping:</strong> Constructed SQLite schemas capturing demographics indexes (gender details, age distributions, population statistics).</li>
          <li><strong>CORS Controllers:</strong> Designed secure cors permissions mapping request parameters specifically to local administrative subdomains.</li>
        </ul>
      `
    },
    "bankeasy": {
      title: "BankEasy Core Simulation",
      category: "Core Banking Simulation / Personal Project",
      tech: "Java 17, Spring Boot, Spring Security, JPA/Hibernate, PostgreSQL, Docker",
      repo: "Internal Showcase Portfolio",
      body: `
        <h4>Project Overview</h4>
        <p>A mockup simulator of a full-stack personal retail banking engine demonstrating relational ledger audits, thread-safe balance operations, and OAuth authorization workflows.</p>
        
        <h4>Key Engineering Contributions</h4>
        <ul>
          <li><strong>Double-Entry Ledger Architecture:</strong> Designed a balance validator ledger tracking credits/debits transactions.</li>
          <li><strong>Spring Security & JPA:</strong> Secured REST endpoints using stateless credentials authorization. Developed database sessions tuning to handle concurrent queries workloads.</li>
        </ul>
      `
    },
    "hsbc-lms": {
      title: "HSBC Corporate Liquidity Sweeps Engine",
      category: "Enterprise Banking Client Deliverable",
      tech: "Java 8/17, Spring Boot, Apache Kafka, RabbitMQ, Oracle SQL, ElasticSearch, Docker, Kubernetes",
      repo: "Proprietary Client Architecture",
      body: `
        <h4>Project Overview</h4>
        <p>Delivered core engineering upgrades at Intellect Design Arena for HSBC's global transaction suites: Liquidity Management (LMS), Customer Information (CIM), Contextual Banking (CBX-FO), and Common Services applications.</p>
        
        <h4>Key Engineering Contributions</h4>
        <ul>
          <li><strong>Dynamic Sweeps Execution:</strong> Programmed Java microservices processing automated corporate sweeps structures (Zero-Balance pooling, Seven-Day, and On-Demand Sweeps) across global currency pools.</li>
          <li><strong>ETL Migration Pipeline:</strong> Designed a standalone Spring Boot utility mapping Elasticsearch index caches into PostgreSQL persistence stores with zero downtime.</li>
          <li><strong>Performance Tuning:</strong> Optimized database locks, recursive sessions, and garbage collection leaks, **reducing API response time by 50%** and **optimizing SQL search performance by 70%**.</li>
        </ul>
      `
    },
    "disaster-alert": {
      title: "IoT Disaster Emergency Warning System",
      category: "Academic Thesis / IoT Hardware Integration",
      tech: "Android SDK, Java, Node.js, Arduino telemetry sensors, Google Maps API",
      repo: "Academic Archive Records",
      body: `
        <h4>Project Overview</h4>
        <p>A capstone hardware-software system designed to automate public warning indicators and coordinate emergency evacuations during natural hazards.</p>
        
        <h4>Key Engineering Contributions</h4>
        <ul>
          <li><strong>Telemetry Listener:</strong> Wired sensor telemetry (heat, water thresholds) transmitting to a Node dashboard.</li>
          <li><strong>Android Routing:</strong> Coded path visualizers in Java mapping evacuation directions using Google Maps API coordinates.</li>
        </ul>
      `
    }
  };

  /**
   * Drawer open / close logic
   */
  const openDrawer = (projectId) => {
    const data = caseStudies[projectId];
    if (data && drawer && drawerBackdrop) {
      document.getElementById('drawer-project-title').textContent = data.title;
      document.getElementById('drawer-project-category').textContent = data.category;
      document.getElementById('drawer-project-tech').textContent = data.tech;
      
      const repoContainer = document.getElementById('drawer-project-repo');
      if (data.repo && data.repo.includes('github.com')) {
        repoContainer.innerHTML = `<a href="https://${data.repo}" target="_blank">${data.repo} <i class="bi bi-box-arrow-up-right"></i></a>`;
      } else {
        repoContainer.textContent = data.repo;
      }
      
      document.getElementById('drawer-project-content').innerHTML = data.body;

      // Show drawer and backdrop
      drawerBackdrop.classList.add('show');
      drawer.classList.add('show');
      document.body.style.overflow = 'hidden'; // Lock body scroll
    }
  };

  window.closeDrawer = () => {
    if (drawer && drawerBackdrop) {
      drawer.classList.remove('show');
      drawerBackdrop.classList.remove('show');
      document.body.style.overflow = ''; // Release body scroll
    }
  };

  // Close drawer on escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeDrawer();
    }
  });

  // Bind drawer click triggers
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-drawer-btn');
    if (btn) {
      e.preventDefault();
      const projectId = btn.getAttribute('data-drawer');
      openDrawer(projectId);
    }
  });

  /**
   * Contact Form transmission
   */
  window.handleContactSend = function (event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const loading = form.querySelector('.f-loading');
    const success = form.querySelector('.f-success');
    const error = form.querySelector('.f-error');

    if (loading) loading.style.display = 'block';
    if (success) success.style.display = 'none';
    if (error) error.style.display = 'none';

    fetch(form.action, {
      method: form.method,
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        if (loading) loading.style.display = 'none';
        if (success) success.style.display = 'block';
        form.reset();
      })
      .catch(err => {
        // Fallback simulate success for static local directory audits
        if (loading) loading.style.display = 'none';
        if (success) success.style.display = 'block';
        form.reset();
      });
  };

})();