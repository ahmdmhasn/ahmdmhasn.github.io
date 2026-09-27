// Personal Website Interactive Logic & Screen Navigation

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('[data-screen]');
  const screens = document.querySelectorAll('.screen');
  const appNavLinks = document.querySelectorAll('.app-nav a[data-screen]');

  // Screen Switching Logic
  function showScreen(screenId, moveFocus = false) {
    const targetScreen = document.getElementById(screenId);
    if (!targetScreen || !targetScreen.classList.contains('screen')) return;

    const focusHeading = () => {
      if (moveFocus) targetScreen.querySelector('[tabindex="-1"]')?.focus({ preventScroll: true });
    };

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

      targetScreen.querySelectorAll('.scrollable-pane').forEach((pane) => {
        pane.scrollTop = 0;
      });
    };

    if (!targetScreen.hidden) {
      updateDOM();
      focusHeading();
    } else if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(updateDOM).finished.then(focusHeading, focusHeading);
    } else {
      updateDOM();
      focusHeading();
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
        showScreen(screenId, true);
      }
    }
  });

  // Handle hash changes in URL
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)?.classList.contains('screen')) {
      showScreen(hash, true);
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

  // Theme Toggling Logic
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');

  function getActiveTheme() {
    return document.documentElement.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#161618' : '#f5f5f7');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = getActiveTheme();
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  // Listen for system theme changes if no explicit user override
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    try {
      if (!localStorage.getItem('theme')) {
        const systemTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', systemTheme);
        if (themeColorMeta) {
          themeColorMeta.setAttribute('content', systemTheme === 'dark' ? '#161618' : '#f5f5f7');
        }
      }
    } catch (err) {}
  });
});
