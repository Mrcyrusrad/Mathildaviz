// Navigation functionality for all navigation links

function initNavigation() {
  const allNavLinks = document.querySelectorAll('.nav-link, .sticky-nav-link');
  
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('data-page');
      const targetPage = document.getElementById(pageId);
      
      if (targetPage) {
        targetPage.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavigation);
} else {
  initNavigation();
}
