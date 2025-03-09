// 🚀 Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  initializeSlider();
  initializeFormValidation();
});

const projects = [
  { title: "Project 1", description: "Description of the first project" },
  { title: "Project 2", description: "Description of the second project" },
  { title: "Project 3", description: "Description of the third project" },
];

const divContainer = document.querySelector(".container");
const projectDivs = projects.map((project) => {
  const projectDiv = document.createElement("div");
  projectDiv.className = "project";
  projectDiv.innerHTML = `<h3>${project.title}</h3><p class='description'>${project.description}</p>`;
  return projectDiv;
});
projectDivs.forEach((projectDiv) => divContainer.appendChild(projectDiv));

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
        sendEmail();
      }
    });
}

// 🛠 Validate form fields
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const nameRegExp = /^(?!.*  )[a-zA-Z ]{2,}$/;
  const email = document.getElementById("email").value.trim();
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const message = document.getElementById("message").value.trim();

  // ✅ Name Validation
  if (!name) {
    alert("The name is required. Please enter your name.");
    return false;
  }
  if (!nameRegExp.test(name)) {
    alert(
      "The name must be at least 2 letters, contain only letters and spaces, and have no extra spaces or line breaks."
    );
    return false;
  }

  // ✅ Email Validation
  if (!email) {
    alert("The email is required. Please enter your email.");
    return false;
  }
  if (!emailRegExp.test(email)) {
    alert("Please enter a valid email address (e.g., example@mail.com).");
    return false;
  }

  // ✅ Message Validation
  if (!message) {
    alert("The message is required. Please write your message.");
    return false;
  }

  return true;
}

// ✉️ Send an email using EmailJS
const sendEmail = async () => {
  const url = "https://api.emailjs.com/api/v1.0/email/send";

  const data = {
    service_id: "service_tjk4vcw",
    template_id: "template_76cpx2c",
    user_id: "HYJ9rNlhhrXT4tlMY",
    template_params: {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim(),
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Email sent successfully!");
    } else {
      alert("Email sending failed:" + await response.text());
    }
  } catch (error) {
    alert("An error occurred:" + error);
  }
};
