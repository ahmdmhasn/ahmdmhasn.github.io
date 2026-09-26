// Personal Website Interactive Logic & Screen Navigation

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('[data-screen]');
  const screens = document.querySelectorAll('.screen');
  const appNavLinks = document.querySelectorAll('.app-nav a[data-screen]');

  // Screen Switching Logic
  function showScreen(screenId) {
    const targetScreen = document.getElementById(screenId);
    if (!targetScreen) return;

    const updateDOM = () => {
      screens.forEach((screen) => {
        const isTarget = screen.id === screenId;
        if (isTarget) {
          screen.removeAttribute('hidden');
        } else {
          screen.setAttribute('hidden', '');
        }
      });

      // Update Navigation active states
      appNavLinks.forEach((link) => {
        if (link.getAttribute('data-screen') === screenId) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });

      // Scroll main area to top
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    if (document.startViewTransition) {
      document.startViewTransition(() => updateDOM());
    } else {
      updateDOM();
    }
  }

  // Handle click events on data-screen links
  document.addEventListener('click', (e) => {
    const targetLink = e.target.closest('[data-screen]');
    if (targetLink) {
      const screenId = targetLink.getAttribute('data-screen');
      if (screenId) {
        e.preventDefault();
        window.location.hash = screenId;
        showScreen(screenId);
      }
    }
  });

  // Handle hash changes in URL
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
      showScreen(hash);
    }
  });

  // Initial load check for hash
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && document.getElementById(initialHash)) {
    showScreen(initialHash);
  } else {
    showScreen('home');
  }

  // Work Section Project Slider Logic
  const projects = document.querySelectorAll('.project-stage .project');
  const prevBtn = document.getElementById('project-prev');
  const nextBtn = document.getElementById('project-next');
  const countSpan = document.getElementById('project-count');

  let currentProjectIndex = 0;

  function updateProject(index) {
    if (projects.length === 0) return;
    currentProjectIndex = (index + projects.length) % projects.length;

    projects.forEach((proj, idx) => {
      if (idx === currentProjectIndex) {
        proj.removeAttribute('hidden');
      } else {
        proj.setAttribute('hidden', '');
      }
    });

    if (countSpan) {
      const formattedCurrent = String(currentProjectIndex + 1).padStart(2, '0');
      const formattedTotal = String(projects.length).padStart(2, '0');
      countSpan.textContent = `${formattedCurrent} / ${formattedTotal}`;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateProject(currentProjectIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateProject(currentProjectIndex + 1);
    });
  }

  // Keyboard navigation for projects
  document.addEventListener('keydown', (e) => {
    const workScreen = document.getElementById('work');
    if (workScreen && !workScreen.hasAttribute('hidden')) {
      if (e.key === 'ArrowLeft') {
        updateProject(currentProjectIndex - 1);
      } else if (e.key === 'ArrowRight') {
        updateProject(currentProjectIndex + 1);
      }
    }
  });
});
