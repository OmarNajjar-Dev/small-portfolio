// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
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
    slideInterval = setInterval(nextSlide, 3000);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }

  startAutoSlide();
  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);
  // Add your form validation code here
  // Add your EmailJS integration code here
});

function sendMail() {
  const info = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  }

  emailjs.send("service_ob9koas","template_76cpx2c", info);
}