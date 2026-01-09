/***********************
 * 1. EMAILJS INITIALIZATION
 * (Must be at the top)
 ***********************/
(function () {
    emailjs.init({
        publicKey: "SMFg2ZfoYmbpXneca",
    });
})();

/***********************
 * 2. SCROLL REVEAL ANIMATION
 ***********************/
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/***********************
 * 3. NAVBAR & HERO EFFECTS
 ***********************/
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.scrollY > 50 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled');
    }
});

window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach((el, index) => {
        setTimeout(() => el.classList.add('active'), index * 200);
    });
});

/***********************
 * 4. STATS COUNTER
 ***********************/
const counters = document.querySelectorAll('.counter');
const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 200;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

const statsSection = document.querySelector('.why-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounters();
            statsObserver.unobserve(statsSection);
        }
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
}

/***********************
 * MOBILE MENU FIX
 ***********************/
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', (e) => {
            // This stops the click from "bubbling" up to the document
            e.stopPropagation(); 
            
            // Toggle the 'active' class
            navList.classList.toggle('active');
            
            // Change the icon from Bars to X
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
            console.log("Menu toggled!");
        });

        // Close menu when clicking anywhere else on the screen
        document.addEventListener('click', (event) => {
            if (!navList.contains(event.target) && !mobileMenu.contains(event.target)) {
                navList.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            }
        });
    } else {
        console.error("Mobile menu elements not found in HTML!");
    }
});

/***********************
 * 6. FORM SUBMISSION (EMAILJS)
 ***********************/
const form = document.getElementById('applicationForm');
const submitBtn = document.querySelector('.btn-submit');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // UI Feedback: Disable button and show "Sending"
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        emailjs.sendForm(
            'service_17d36lz', 
            'template_4kz4o5c', 
            this
        ).then(() => {
            alert('Thank you! Your application has been sent successfully.');
            form.reset();
        }).catch((error) => {
            console.error('EmailJS Error:', error);
            alert('Oops! Something went wrong. Please check your connection and try again.');
        }).finally(() => {
            // Reset button
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        });
    });
}

emailjs.sendForm('service_xxx', 'template_xxx', '#myform')
  .then(response => {
    console.log('SUCCESS!', response.status, response.text);
  })
  .catch(error => {
    console.error('FAILED...', error); // This will tell you why it's failing
  });