// Scroll animations
        document.addEventListener('DOMContentLoaded', function() {
            const animateElements = document.querySelectorAll('[data-animate]');
            
            function checkScroll() {
                animateElements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementBottom = element.getBoundingClientRect().bottom;
                    const isVisible = (elementTop <= window.innerHeight * 0.8) && (elementBottom >= 0);
                    
                    if (isVisible) {
                        element.classList.add('animate');
                    }
                });
            }
            
            // Initial check
            checkScroll();
            
            // Check on scroll
            window.addEventListener('scroll', checkScroll);
            
            // Counter animation
            const counters = document.querySelectorAll('.counter');
            const speed = 200;
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target && counter.getBoundingClientRect().top < window.innerHeight) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCounter, 1);
                } else {
                    counter.innerText = target;
                }
                
                function updateCounter() {
                    const count = +counter.innerText;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCounter, 1);
                    } else {
                        counter.innerText = target;
                    }
                }
            });
            
            // Trigger counters when scrolled to
            window.addEventListener('scroll', function() {
                counters.forEach(counter => {
                    if (counter.getBoundingClientRect().top < window.innerHeight && counter.innerText === '0') {
                        const target = +counter.getAttribute('data-target');
                        const increment = target / speed;
                        updateCounter();
                    }
                });
            });
            
            // Smooth scroll for nav links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
        });