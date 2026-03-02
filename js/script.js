document.addEventListener("DOMContentLoaded", () => {

  /* PRELOADER */
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
  }, 2000);

  /* SCROLL EFFECT */
  window.addEventListener("scroll", () => {
    document.querySelector(".navbar")
      .classList.toggle("scrolled", window.scrollY > 50);
  });

  /* MOBILE MENU */
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuBtn.classList.toggle("active");
  });

  /* DROPDOWN (ARROW ONLY) */
  document.querySelectorAll(".dropdown .arrow").forEach(arrow => {
    arrow.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      arrow.closest(".dropdown").classList.toggle("active");
    });
  });

});

/*AUTO SLIDING FOR HEADER CONTENT*/
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let index = 0;

function showSlide(i){
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  slides[i].classList.add("active");
  dots[i].classList.add("active");
}

setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 4000);

/* Optional: click dots */
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i;
    showSlide(index);
  });
});

/*COUNT UP*/
  const statsSection = document.querySelector(".dm-stats");
  const counters = document.querySelectorAll(".counter");

  let started = false;

  const startCounter = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const speed = target / 500; // smoothness

      const updateCount = () => {
        if (count < target) {
          count += speed;
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target; // final fixed number
        }
      };

      updateCount();
    });
  };


// ABOUT SECTION
{
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        statsSection.classList.add("active");
        startCounter();
        started = true;
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

document.querySelectorAll(".team-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});


document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();

  let isValid = true;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  // clear errors
  document.querySelectorAll(".form-group").forEach(group => {
    group.classList.remove("error");
    group.querySelector("small").innerText = "";
  });

  // Name validation
  if(name.value.trim() === ""){
    showError(name, "Name is required");
    isValid = false;
  }

  // Email validation
  if(email.value.trim() === ""){
    showError(email, "Email is required");
    isValid = false;
  } else if(!isValidEmail(email.value)){
    showError(email, "Enter a valid email address");
    isValid = false;
  }

  // Message validation
  if(message.value.trim() === ""){
    showError(message, "Message is required");
    isValid = false;
  }

  // Redirect if valid
  if(isValid){
    window.location.href = "404.html";
  }
});

function showError(input, message){
  const group = input.parentElement;
  group.classList.add("error");
  group.querySelector("small").innerText = message;
}

function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
