/**
 * MAIN JAVASCRIPT FILE
 * Modular structure for better maintenance and performance.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initTheme();
    initScrollHeader();
    initMegaMenuTabs();
    initMobileMenu();
    initSearchModal();
});

/* =================================================================
   MODULE 1: THEME TOGGLE (Dark/Light Mode)
   ================================================================= */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');

    // 1. Check Local Storage or System Preference
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        lightIcon?.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        darkIcon?.classList.remove('hidden');
    }

    // 2. Toggle Event Listener
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // Toggle Icons
            darkIcon?.classList.toggle('hidden');
            lightIcon?.classList.toggle('hidden');

            // Toggle HTML Class & Save Preference
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        });
    }
}

/* =================================================================
   MODULE 2: SCROLL HEADER EFFECT
   ================================================================= */
function initScrollHeader() {
    const mainHeader = document.getElementById('main-header');
    
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                mainHeader.classList.add('scrolled-header');
            } else {
                mainHeader.classList.remove('scrolled-header');
            }
        });
    }
}

/* =================================================================
   MODULE 3: DESKTOP MEGA MENU TABS
   ================================================================= */
function initMegaMenuTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                const targetId = btn.getAttribute('data-target');

                // Remove active class from all
                tabBtns.forEach(b => b.classList.remove('active-tab'));
                tabContents.forEach(c => c.classList.remove('active-content'));

                // Add active class to current
                btn.classList.add('active-tab');
                document.getElementById(targetId)?.classList.add('active-content');
            });
        });
    }
}

/* =================================================================
   MODULE 4: MOBILE MENU & ACCORDION (UPDATED & ROBUST)
   ================================================================= */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const internalCloseBtn = document.getElementById('internal-close-btn'); // New close button inside menu
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuBtn?.querySelector('i');
    const body = document.body;

    // Helper: Open Menu
    const openMenu = () => {
        mobileMenu.classList.add('open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        mobileMenuBtn?.setAttribute('aria-expanded', 'true');
        
        // Change Hamburger to Close Icon (Optional, since we have internal close button now)
        if(menuIcon) {
            menuIcon.classList.remove('ri-menu-4-line');
            menuIcon.classList.add('ri-close-line');
        }
        body.style.overflow = 'hidden'; // Lock Scroll
    };

    // Helper: Close Menu
    const closeMenu = () => {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenuBtn?.setAttribute('aria-expanded', 'false');
        
        if(menuIcon) {
            menuIcon.classList.add('ri-menu-4-line');
            menuIcon.classList.remove('ri-close-line');
        }
        body.style.overflow = ''; // Unlock Scroll
    };

    // 1. Toggle Button Click
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop click from propagating
            if (mobileMenu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // 2. Internal Close Button Click
    if (internalCloseBtn) {
        internalCloseBtn.addEventListener('click', closeMenu);
    }

    // 3. Close when clicking outside (Overlay)
    /* Note: Since this is a full-screen overlay, clicking "outside" 
       conceptually means clicking strictly on a backdrop if content doesn't cover 100%. 
       For full screen menu, usually we rely on the close button. */

    // 4. Mobile Accordion Logic
    const accordionBtns = document.querySelectorAll('.mobile-accordion-btn');
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.ri-add-line');

            // Toggle Content
            content.classList.toggle('open');
            
            // Toggle Styles
            if (content.classList.contains('open')) {
                content.classList.remove('hidden'); 
                icon.style.transform = 'rotate(45deg)';
                icon.style.color = '#fe7b00'; // Primary
                btn.style.color = '#fe7b00';
                btn.setAttribute('aria-expanded', 'true');
            } else {
                // Wait for animation to finish before hiding (handled by CSS max-height usually)
                // For simplicity in JS:
                icon.style.transform = 'rotate(0deg)';
                icon.style.color = ''; 
                btn.style.color = '';
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

/* =================================================================
   MODULE 5: SEARCH MODAL (Command Palette)
   ================================================================= */
function initSearchModal() {
    const searchTriggers = [
        document.getElementById('search-trigger'), 
        document.getElementById('mobile-search-trigger')
    ];
    const searchModal = document.getElementById('search-modal');
    const searchContainer = document.getElementById('search-container');
    const closeSearch = document.getElementById('close-search');
    const overlayClose = document.getElementById('search-overlay-close');
    const searchInput = searchModal?.querySelector('input');

    // Helper: Open
    const openSearch = () => {
        if (!searchModal) return;
        searchModal.classList.remove('hidden');
        // Delay for CSS transition
        setTimeout(() => {
            searchModal.classList.remove('opacity-0');
            searchContainer.classList.remove('scale-95', 'opacity-0');
            if (searchInput) searchInput.focus();
        }, 10);
        document.body.style.overflow = 'hidden';
    };

    // Helper: Close
    const closeSearchModal = () => {
        if (!searchModal) return;
        searchModal.classList.add('opacity-0');
        searchContainer.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            searchModal.classList.add('hidden');
        }, 200);
        document.body.style.overflow = '';
    };

    // 1. Add Event Listeners to Triggers
    searchTriggers.forEach(btn => {
        if(btn) btn.addEventListener('click', openSearch);
    });

    // 2. Close Events
    if(closeSearch) closeSearch.addEventListener('click', closeSearchModal);
    if(overlayClose) overlayClose.addEventListener('click', closeSearchModal);

    // 3. Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        // Cmd+K or Ctrl+K to Open
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        // Esc to Close
        if (e.key === 'Escape' && searchModal && !searchModal.classList.contains('hidden')) {
            closeSearchModal();
        }
    });
}