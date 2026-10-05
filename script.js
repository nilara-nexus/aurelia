/* ================= LOADER ================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.querySelector(".loader").style.opacity = "0";
        document.querySelector(".loader").style.pointerEvents = "none";

        setTimeout(() => {
            document.querySelector(".loader").remove();
        }, 700);

    }, 1800);

});


/* ================= NAVBAR ================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* ================= MOBILE MENU ================= */

const menu = document.getElementById("menu");
const navLinks = document.getElementById("navLinks");

menu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});


/* ================= CURSOR ================= */

const cursor = document.querySelector(".cursor");
const ring = document.querySelector(".cursor-ring");

document.addEventListener("mousemove", e => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    ring.style.left = e.clientX + "px";
    ring.style.top = e.clientY + "px";

});


document.querySelectorAll("a, button, .project, .gallery-item")
.forEach(item => {

    item.addEventListener("mouseenter", () => {

        cursor.style.width = "20px";
        cursor.style.height = "20px";

    });

    item.addEventListener("mouseleave", () => {

        cursor.style.width = "12px";
        cursor.style.height = "12px";

    });

});


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting) {
                entry.target.classList.add("active");
            }

        });

    },
    {
        threshold: .15
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* ================= COUNTERS ================= */

const counters = document.querySelectorAll("[data-target]");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting) {

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let current = 0;

            const update = () => {

                current += Math.ceil(target / 50);

                if(current > target) {
                    current = target;
                }

                counter.textContent = current + "+";

                if(current < target) {
                    requestAnimationFrame(update);
                }

            };

            update();

            counterObserver.unobserve(counter);
        }

    });

});

counters.forEach(counter => {
    counterObserver.observe(counter);
});


/* ================= BEFORE / AFTER ================= */

const compareBox = document.querySelector(".compare-box");
const after = document.getElementById("after");
const slider = document.getElementById("slider");

let dragging = false;

slider.addEventListener("mousedown", () => {
    dragging = true;
});

document.addEventListener("mouseup", () => {
    dragging = false;
});

compareBox.addEventListener("mousemove", e => {

    if(!dragging) return;

    const rect = compareBox.getBoundingClientRect();

    let position = ((e.clientX - rect.left) / rect.width) * 100;

    position = Math.max(0, Math.min(100, position));

    after.style.width = position + "%";
    slider.style.left = position + "%";

});


/* TOUCH SUPPORT */

compareBox.addEventListener("touchmove", e => {

    const rect = compareBox.getBoundingClientRect();

    let position =
        ((e.touches[0].clientX - rect.left) / rect.width) * 100;

    position = Math.max(0, Math.min(100, position));

    after.style.width = position + "%";
    slider.style.left = position + "%";

});


/* ================= GALLERY LIGHTBOX ================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const close = document.getElementById("close");

document.querySelectorAll(".gallery-item img").forEach(img => {

    img.addEventListener("click", () => {

        lightbox.style.display = "flex";
        lightboxImg.src = img.src;

    });

});

close.addEventListener("click", () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener("click", e => {

    if(e.target === lightbox) {
        lightbox.style.display = "none";
    }

});


/* ================= TESTIMONIAL SLIDER ================= */

const testimonials = [

    {
        quote:
        "Aurelia transformed our house into a place that truly feels like home.",
        client:
        "— PRIYA & ARUN"
    },

    {
        quote:
        "Every detail was carefully considered. The result exceeded our expectations.",
        client:
        "— RAHUL MENON"
    },

    {
        quote:
        "A beautiful combination of functionality, elegance and personality.",
        client:
        "— ANANYA SHARMA"
    }

];

let testimonialIndex = 0;

setInterval(() => {

    testimonialIndex++;

    if(testimonialIndex >= testimonials.length) {
        testimonialIndex = 0;
    }

    document.getElementById("quote").style.opacity = 0;
    document.getElementById("client").style.opacity = 0;

    setTimeout(() => {

        document.getElementById("quote").textContent =
            "“" + testimonials[testimonialIndex].quote + "”";

        document.getElementById("client").textContent =
            testimonials[testimonialIndex].client;

        document.getElementById("quote").style.opacity = 1;
        document.getElementById("client").style.opacity = 1;

    }, 400);

}, 4500);


/* ================= CONTACT FORM ================= */

document.getElementById("contactForm")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const type = document.getElementById("type").value;
    const message = document.getElementById("message").value.trim();

    if(!name || !email || !type || !message) {

        alert("Please complete all fields.");

        return;
    }

    alert(
        "Thank you, " +
        name +
        "! Your project enquiry has been received."
    );

    this.reset();

});


/* ================= PARALLAX HERO ================= */

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero");

    if(window.scrollY < window.innerHeight) {

        hero.style.backgroundPosition =
            `center ${window.scrollY * 0.35}px`;

    }

});