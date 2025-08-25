// ===================================
// PATRIOTS NATION JAVASCRIPT (Full & Final)
// ===================================

// Wait for the entire HTML document to be loaded before running any scripts
document.addEventListener('DOMContentLoaded', function() {

    // 1. MOBILE NAVIGATION TOGGLE
    // Selects the hamburger button and the navigation list
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navUl = document.querySelector('nav ul');

    // Make sure both elements exist before adding the click event
    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', function() {
            // Toggles the 'active' class on the button (for the X animation)
            menuToggle.classList.toggle('active');
            // Toggles the 'active' class on the menu (to slide it in/out)
            navUl.classList.toggle('active');
        });
    }


    // 2. BACK TO TOP BUTTON
    // Selects the button from the HTML
    const backToTopBtn = document.querySelector('.back-to-top');

    // Check if the button exists on the page
    if (backToTopBtn) {
        // Add a scroll event listener to the window
        window.addEventListener('scroll', function() {
            // If user has scrolled down more than 300px, show the button
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                // Otherwise, hide it
                backToTopBtn.classList.remove('visible');
            }
        });

        // Add a click event listener to the button
        backToTopBtn.addEventListener('click', function() {
            // Scroll the window smoothly to the top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // 3. ACTIVE NAVIGATION HIGHLIGHTING
    // Determines the current page and adds an 'active' class to the corresponding nav link
    const currentPageFile = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const linkFile = link.getAttribute('href').split('/').pop();
        // If the link's href matches the current page's file, add the active class
        if (linkFile === currentPageFile) {
            link.classList.add('active');
        }
    });


    // 4. SMOOTH SCROLLING FOR ANCHOR LINKS (e.g., links starting with #)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Prevent the default jumpy behavior
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // If the target element exists, scroll to it smoothly
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // 5. LAZY LOADING FOR IMAGES (for better performance)
    // This makes images load only when they are about to enter the viewport
    const imagesToLazyLoad = document.querySelectorAll('img.lazy-load');

    // Check if the browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                // When the image is intersecting with the viewport
                if (entry.isIntersecting) {
                    const image = entry.target;
                    // Replace the src with the data-src value
                    image.src = image.dataset.src;
                    // Remove the lazy-load class
                    image.classList.remove('lazy-load');
                    // Add the loaded class to trigger fade-in animation
                    image.classList.add('loaded');
                    // Stop observing this image
                    imageObserver.unobserve(image);
                }
            });
        });

        imagesToLazyLoad.forEach(image => imageObserver.observe(image));
    }
});