document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once faded in
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with .fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // 2. Active State for Navigation Items on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navigation a');
    const navBar = document.querySelector('.navigation');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = navBar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust detection offset
            if (pageYOffset >= (sectionTop - navHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Smooth scrolling offset override
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = navBar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Image Modal Logic
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("expanded-img");
    const closeBtn = document.querySelector(".close-modal");
    
    if (modal && modalImg && closeBtn) {
        // Find all images EXCEPT the profile picture
        const images = document.querySelectorAll('.content-img');
        
        images.forEach(img => {
            img.addEventListener('click', function() {
                modal.classList.add('active');
                modalImg.src = this.src;
                // Prevent body scrolling when modal is open
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal when clicking the X
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside the image
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
