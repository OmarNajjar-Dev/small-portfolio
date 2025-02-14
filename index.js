// 🚀 Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  initializeSlider();
  initializeFormValidation();
});

// 🎞️ Initialize the slider
function initializeSlider() {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.getElementById("prevSlide");
  const nextButton = document.getElementById("nextSlide");
  var currentIndex = 0;

  function updateSlider() {
    const translation = -currentIndex * 100;
    slider.style.transform = `translateX(${translation}%)`;
  }

  function startAutoSlide() {
    setInterval(nextSlide, 3000);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }

  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);
  startAutoSlide();
}

// ✅ Initialize form validation and email sending
function initializeFormValidation() {
  document
    .querySelector("input[type='submit']")
    .addEventListener("click", (event) => {
      event.preventDefault();
      if (validateForm()) {
        sendMail();
      }
    });
}

// 🛠 Validate form fields
function validateForm() {
  const email = document.getElementById("email").value;
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!document.getElementById("name").value) {
    alert("The name is required.");
    return false;
  }
  if (!email) {
    alert("The email is required.");
    return false;
  }
  if (!pattern.test(email)) {
    alert("The email isn't correct.");
    return false;
  }
  if (!document.getElementById("message").value) {
    alert("The message is required.");
    return false;
  }
  return true;
}

// ✉️ Send an email using EmailJS
function sendMail() {
  const info = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send("service_tjk4vcw", "template_76cpx2c", info)
    .then(() => {
      alert("Email sent successfully!");
      document.getElementById("contactForm").reset();
    })
    .catch((error) => alert("Error sending email: " + error));
}
