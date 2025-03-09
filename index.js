// Wait for the DOM to fully load before initializing components
document.addEventListener("DOMContentLoaded", () => {
  initializeSlider();
  initializeFormValidation();
});

/* -------------------------------------------------------------------------
   Render Project List
   ------------------------------------------------------------------------- */

// Array of project objects
const projectList = [
  { title: "Project 1", description: "Description of the first project" },
  { title: "Project 2", description: "Description of the second project" },
  { title: "Project 3", description: "Description of the third project" },
];

// Select the container element where projects will be displayed
const projectContainer = document.querySelector(".container");

// Create a DOM element for each project and store them in an array
const projectElements = projectList.map((project) => {
  const projectDiv = document.createElement("div");
  projectDiv.className = "project";
  projectDiv.innerHTML = `
    <h3>${project.title}</h3>
    <p class="description">${project.description}</p>
  `;
  return projectDiv;
});

// Append each project element to the container at once
projectElements.forEach((element) => projectContainer.appendChild(element));

/* -------------------------------------------------------------------------
   Render Slider Content
   ------------------------------------------------------------------------- */

// Array of slide objects
const slideData = [
  {
    image: "./images/jane-doe.webp",
    quote: "This is the best service I have ever used!",
    cite: "Jane Doe",
  },
  {
    image: "./images/john-smith.webp",
    quote: "Highly recommend to everyone looking for quality!",
    cite: "John Smith",
  },
  {
    image: "./images/sarah-lee.webp",
    quote: "An outstanding portfolio with great design and functionality!",
    cite: "Sarah Lee",
  },
];

// Select the slider container element
const sliderContainer = document.querySelector(".slider");

// Create a DOM element for each slide and store them in an array
const slideElements = slideData.map((slide) => {
  const slideDiv = document.createElement("div");
  slideDiv.className = "slide";
  slideDiv.innerHTML = `
    <img src="${slide.image}" alt="${slide.cite}" />
    <p>
      <q class="description"><em>${slide.quote}</em></q>
      <cite>- ${slide.cite}</cite>
    </p>
  `;
  return slideDiv;
});

// Append each slide element to the slider container
slideElements.forEach((slideElement) =>
  sliderContainer.appendChild(slideElement)
);

/* -------------------------------------------------------------------------
   Slider Initialization
   ------------------------------------------------------------------------- */

/**
 * Initializes the slider functionality by setting up navigation
 * and automatic slide transitions.
 */
function initializeSlider() {
  // Select slider container and all its slide elements
  const sliderElement = document.querySelector(".slider");
  const sliderSlides = document.querySelectorAll(".slide");

  // Select navigation buttons (ensure your HTML has elements with these IDs)
  const prevButton = document.getElementById("prevSlide");
  const nextButton = document.getElementById("nextSlide");

  // Variable to track the current slide index
  let currentIndex = 0;

  /**
   * Updates the slider's transform style to display the current slide.
   */
  function updateSlider() {
    const translationPercentage = -currentIndex * 100;
    sliderElement.style.transform = `translateX(${translationPercentage}%)`;
  }

  /**
   * Advances to the next slide and updates the slider.
   */
  function nextSlide() {
    currentIndex = (currentIndex + 1) % sliderSlides.length;
    updateSlider();
  }

  /**
   * Moves to the previous slide and updates the slider.
   */
  function prevSlide() {
    currentIndex =
      (currentIndex - 1 + sliderSlides.length) % sliderSlides.length;
    updateSlider();
  }

  /**
   * Starts automatic slide transitions every 3 seconds.
   */
  function startAutoSlide() {
    setInterval(nextSlide, 3000);
  }

  // Attach click event listeners to navigation buttons
  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);

  // Begin automatic sliding
  startAutoSlide();
}

/* -------------------------------------------------------------------------
   Form Validation and Email Sending
   ------------------------------------------------------------------------- */

/**
 * Initializes form validation and email sending when the submit button is clicked.
 */
function initializeFormValidation() {
  // Ensure your submit button has an ID of "submit" in your HTML
  const submitButton = document.querySelector("input[type='submit']");
  submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission
    if (validateForm()) {
      sendEmail();
    }
  });
}

/**
 * Validates form fields for name, email, and message.
 * @returns {boolean} True if the form is valid; otherwise, false.
 */
function validateForm() {
  const nameInput = document.getElementById("name").value.trim();
  const nameRegex = /^(?!.*  )[a-zA-Z ]{2,}$/;

  const emailInput = document.getElementById("email").value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const messageInput = document.getElementById("message").value.trim();

  // Validate Name
  if (!nameInput) {
    alert("The name is required. Please enter your name.");
    return false;
  }
  if (!nameRegex.test(nameInput)) {
    alert(
      "The name must be at least 2 letters, contain only letters and spaces, and have no extra spaces or line breaks."
    );
    return false;
  }

  // Validate Email
  if (!emailInput) {
    alert("The email is required. Please enter your email.");
    return false;
  }
  if (!emailRegex.test(emailInput)) {
    alert("Please enter a valid email address (e.g., example@mail.com).");
    return false;
  }

  // Validate Message
  if (!messageInput) {
    alert("The message is required. Please write your message.");
    return false;
  }

  return true;
}

/**
 * Sends an email using the EmailJS service.
 */
const sendEmail = async () => {
  const emailEndpoint = "https://api.emailjs.com/api/v1.0/email/send";

  // Retrieve the submit button
  const submitButton = document.getElementById("submit");

  // Prepare the data to be sent via EmailJS
  const emailData = {
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
    // Disable the submit button to prevent multiple submissions
    submitButton.disabled = true;
    submitButton.style.backgroundColor = "gray";
    submitButton.value = "Sending...";
    submitButton.style.border = "none";

    // Send the email request to EmailJS
    const response = await fetch(emailEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData),
    });

    if (response.ok) {
      alert("Email sent successfully!");
    } else {
      alert("Email sending failed: " + (await response.text()));
    }
  } catch (error) {
    alert("An error occurred: " + error);
  } finally {
    // Re-enable the submit button regardless of success or failure
    submitButton.disabled = false;
    submitButton.style.backgroundColor = "";
    submitButton.value = "Send";
    submitButton.style.border = "";
  }
};
