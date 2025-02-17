document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout-btn");

  // Logout button functionality
  // logoutButton.addEventListener("click", () => {
  //   // Clear session data or other stored user information
  //   sessionStorage.clear(); // If you're using session storage, clear all session data
  //   localStorage.clear(); // If you're using local storage, trewclear all local data

  //   // Optionally, you can also remove any cookies if they exist
  //   // document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  //   // Notify the user (optional)
  //   alert("Logging out...");

  //   // Redirect to the homepage or login page
  //   window.location.href = "login.html"; // Change this to your login page or home page
  // });

  logoutButton.addEventListener("click", () => {
    // Create a confirmation modal dynamically
    const confirmationBox = document.createElement("div");
    confirmationBox.innerHTML = `
        <div class="logout-modal">
            <p>Are you sure you want to log out?</p>
            <div class="logout-buttons">
                <button id="confirmLogout" class="logout-btn">Logout</button>
                <button id="cancelLogout" class="cancel-btn">Cancel</button>
            </div>
        </div>
    `;

    // Append modal to body
    document.body.appendChild(confirmationBox);

    // Add event listeners for buttons
    document.getElementById("confirmLogout").addEventListener("click", () => {
        sessionStorage.clear();
        localStorage.clear();
        alert("Logging out...");
        window.location.href = "login.html";
    });

    document.getElementById("cancelLogout").addEventListener("click", () => {
        confirmationBox.remove(); // Close modal on cancel
    });
});

  ///Sidebar Toggle Functionality
  const toggleButton = document.getElementById("toggleButton");
  const toggleButtonDash = document.getElementById("toggleButtonDash");
  const toggleButtonHistory = document.getElementById("toggleButtonHist");
  const settingsButton = document.getElementById("settings-btn");

  const notificationButton = document.getElementById("notification-btn");
  const helpButton = document.getElementById("help-btn");
  const profileButton = document.getElementById("profile-btn");

  const specificTestSection = document.querySelector(".specific-test");
  const dashboardSection = document.querySelector(".dashboard");
  // const testHisSection = document.querySelector('.results-section');
  const testResultSection = document.querySelector(".result-history");
  const profileSection = document.querySelector(".user-profile");
  const notificationSection = document.querySelector(".notification-section");
  const helpSection = document.querySelector(".help-section");
  const questionContainer = document.querySelector(".question-container");
  const settingsSection = document.querySelector(".settings-section");

  // Store the buttons in an array for easy access
  const navButtons = [
    toggleButtonDash,
    toggleButton,
    toggleButtonHistory,
    profileButton,
    notificationButton,
    helpButton,
    settingsButton,
  ];
  const sections = [
    dashboardSection,
    specificTestSection,
    testResultSection,
    profileSection,
    notificationSection,
    helpSection,
    settingsSection,
  ];

  // Show dashboard by default
  dashboardSection.classList.add("visible");

  // Function to hide all sections
  const hideAllSections = () => {
    sections.forEach((section) => section.classList.remove("visible"));
    navButtons.forEach((button) => button.classList.remove("active")); // Remove active class from all buttons
  };
  // Function to show the active section and highlight its corresponding button
  const showSection = (sectionIndex) => {
    hideAllSections();
    sections[sectionIndex].classList.add("visible");
    navButtons[sectionIndex].classList.add("active"); // Highlight the active button
  };
  // Event listeners for each button
  toggleButtonDash.addEventListener("click", () => {
    showSection(0); // Dashboard
  });

  toggleButton.addEventListener("click", () => {
    showSection(1); // Test Series
  });

  toggleButtonHistory.addEventListener("click", () => {
    showSection(2); // Exam History
  });

  profileButton.addEventListener("click", () => {
    showSection(3); // Profile
  });

  notificationButton.addEventListener("click", () => {
    showSection(4); // Notifications
  });

  helpButton.addEventListener("click", () => {
    showSection(5); // Help Section
  });
  settingsButton.addEventListener("click", () => {
    showSection(6); // Help Section
  });

  // Show the default section (e.g., Dashboard)
  showSection(0); // Default to Dashboard

  //  Update questions
  const categoryDropdown = document.getElementById("category-dropdown");
  const testSeriesDropdown = document.getElementById("testseries-dropdown");
  const filterButton = document.querySelector(".filter-btn");
  // const questionContainer = document.querySelector('.question-container');
  const questionPaperList = document.querySelector(".question-paper-list");

  const user = {
    Tserieses: {
      FMGE: {
        testseries1: {
          questionPaper1: [
            {
              question:
                "If <i>n</i> is a natural number, then (6n<sup>2</sup> + 6n) is always divisible by:",
              options: [
                { text: "6 only", correct: false },
                { text: "6 and 12 both", correct: true },
                { text: "12 only", correct: false },
                { text: "18 only", correct: false },
              ],
              correctAnswer: "Option B",
              explanation:
                "(6n<sup>2</sup> + 6n) = 6n(n + 1), which is always divisible by 6 and 12 both, since n(n + 1) is always even.",
            },
            {
              question: "9548 + 7314 = 8362 + (?)",
              options: [
                { text: "8230", correct: false },
                { text: "8410", correct: false },
                { text: "8500", correct: true },
                { text: "8600", correct: false },
                { text: "None of these", correct: false },
              ],
              correctAnswer: "Option C",
              explanation:
                "9548 + 7314 = 16862, and 16862 - 8362 = 8500, which gives the correct answer as 8500.",
            },
            {
              question: "The value of sin(90°) is:",
              options: [
                { text: "0", correct: false },
                { text: "1", correct: true },
                { text: "0.5", correct: false },
                { text: "Undefined", correct: false },
              ],
              correctAnswer: "Option B",
              explanation: "Sin(90°) = 1.",
            },
          ],
        },
      },
      NEET: {
        testseries1: {
          questionPaper1: [
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
          ],
        },
        testseries2: {
          questionPaper1: [
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
          ],
        },
        testseries2: {
          questionPaper1: [
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1dasdddewfwfefsdfs", correct: true },
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
          ],
          questionPaper2: [
            {
              question: "What is the atomic number of Hydrogen?",
              options: [
                { text: "1dsfsdf", correct: true },
                { text: "2dsfsfds", correct: false },
                { text: "3", correct: false },
                { text: "4", correct: false },
              ],
              correctAnswer: "Option A",
              explanation: "The atomic number of Hydrogen is 1.",
            },
          ],
        },
      },
      JEE: {
        testseries1: {
          questionPaper1: [
            {
              question: "What is the value of the speed of light in vacuum?",
              options: [
                { text: "3 x 10^8 m/s", correct: true },
                { text: "3 x 10^6 m/s", correct: false },
                { text: "3 x 10^10 m/s", correct: false },
                { text: "3 x 10^7 m/s", correct: false },
              ],
              correctAnswer: "Option A",
              explanation:
                "The speed of light in vacuum is approximately 3 x 10^8 m/s.",
            },
          ],
        },
      },
    },
  };

  // Populate categories dropdown
  const populateCategories = () => {
    const categories = Object.keys(user.Tserieses);
    categoryDropdown.innerHTML = ""; // Clear previous options
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.textContent = category;
      option.value = category;
      categoryDropdown.appendChild(option);
    });

    // Automatically load test series for the first category if available
    if (categories.length > 0) {
      populateTestSeries(categories[0]);
    }
  };

  // Populate test series dropdown based on selected category
  const populateTestSeries = (category) => {
    const testSeries = Object.keys(user.Tserieses[category]);
    testSeriesDropdown.innerHTML = ""; // Clear previous options
    testSeries.forEach((series) => {
      const option = document.createElement("option");
      option.textContent = series;
      option.value = series;
      testSeriesDropdown.appendChild(option);
    });

    // Automatically load question papers for the first test series if available
    if (testSeries.length > 0) {
      // populateQuestionPapers(category, testSeries[0]);
    }
  };

  // Populate question papers list based on selected test series
  const populateQuestionPapers = (category, testSeries) => {
    const questionPapers = Object.keys(user.Tserieses[category][testSeries]);
    questionPaperList.innerHTML = ""; // Clear previous list

    questionPapers.forEach((paper) => {
      const paperBox = document.createElement("div");
      paperBox.classList.add("question-paper-box");
      paperBox.textContent = paper;
      questionPaperList.appendChild(paperBox);

      paperBox.addEventListener("click", () => {
        loadQuestions(category, testSeries, paper); // Load questions for the clicked question paper
      });
    });
  };

  // Function to load questions based on selected category, test series, and question paper
  const loadQuestions = (category, testSeries, paper) => {
    const questions = user.Tserieses[category][testSeries][paper] || [];
    questionContainer.innerHTML = ""; // Clear existing questions

    if (questions.length > 0) {
      questions.forEach((questionData, index) => {
        const questionHTML = `
    <div class="problem">
        <p class="problem-title">${index + 1}. ${questionData.question}</p>
        <div class="options">
            ${questionData.options
            .map(
              (option, i) => `
                <div class="option">
                    <input 
                        class="form-check-input ${getOptionClass(option, questionData.correctAnswer, i)}" 
                        type="radio" 
                        name="q${index + 1}" 
                        id="q${index + 1}${i}" 
                        disabled
                    >
                    <label 
                        for="q${index + 1}${i}" 
                        class="${getOptionClass(option, questionData.correctAnswer, i)}"
                    >
                        ${option.text}
                    </label>
                </div>
            `
            )
            .join("")}
        </div>
        <p class="your-answer">Correct Answer: Option <b>${questionData.correctAnswer}</b></p>
    </div>
`;
        questionContainer.innerHTML += questionHTML;

      });
    } else {
      questionContainer.innerHTML =
        "<p>No questions available for this test series.</p>";
    }
  };

  // Function to get the class based on the selected and correct answers
  const getOptionClass = (option, correctAnswer, optionIndex) => {
    const selectedAnswer = optionIndex === 0 ? "selected" : "notSelected"; // Just for testing with the first option
    if (option.correct && selectedAnswer === "selected") {
      return "green"; // Correct + Selected
    } else if (option.correct && selectedAnswer === "notSelected") {
      return "green"; // Correct + Not Selected
    } else if (!option.correct && selectedAnswer === "notSelected") {
      return "white"; // Not Correct + Not Selected
    } else if (!option.correct && selectedAnswer === "selected") {
      return "red"; // Selected + Wrong
    }
  };

  // Event listener for category dropdown change
  categoryDropdown.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      populateTestSeries(selectedCategory);
    }
  });

  // Event listener for test series dropdown change
  testSeriesDropdown.addEventListener("change", (event) => {
    const selectedCategory = categoryDropdown.value;
    const selectedTestSeries = event.target.value;
    if (selectedCategory && selectedTestSeries) {
      populateQuestionPapers(selectedCategory, selectedTestSeries);
    }
  });

  // Event listener for filter button click
  filterButton.addEventListener("click", () => {
    const selectedCategory = categoryDropdown.value;
    const selectedTestSeries = testSeriesDropdown.value;
    if (selectedCategory && selectedTestSeries) {
      populateQuestionPapers(selectedCategory, selectedTestSeries);
    } else {
      alert("Please select both category and test series");
    }
  });

  // Initialize the categories dropdown on page load
  populateCategories();

  /** NOTIFICATION CLEAR FUNCTIONALITY */
  document.querySelectorAll(".clear-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.target.closest(".notification").remove();
    });
  });

  document.querySelector(".clear-all")?.addEventListener("click", () => {
    document.querySelector(".notifications").innerHTML = "";
  });

  /** SUPPORT FORM SUBMISSION */
  document
    .getElementById("support-form")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Your message has been submitted. We will get back to you soon.");
      document.getElementById("support-form").reset();
    });

  // Function to update the time and date from system
  function updateTime() {
    const currentTimeElement = document.getElementById("current-time");
    const currentDateElement = document.getElementById("current-date");

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const day = now.getDate();
    const month = now.getMonth() + 1; // Months are 0-indexed
    const year = now.getFullYear();

    // Update time and date in the HTML
    currentTimeElement.textContent = `Time: ${hours}:${minutes}:${seconds}`;
    currentDateElement.textContent = `Date: ${year}-${month
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  }

  // Update the time immediately and then every second
  updateTime();
  setInterval(updateTime, 1000);

  phoneInput.addEventListener("input", handleInputChange);
  emailInput.addEventListener("input", handleInputChange);

  sendOtpBtn.addEventListener("click", function () {
    const field = sendOtpBtn.dataset.field;
    const value = field === "phone" ? phoneInput.value : emailInput.value;
    if (!value) {
      alert("Please enter a valid " + field);
      return;
    }

    // Simulating OTP send request (Replace with API call)
    alert("OTP sent to " + value);

    document.getElementById("otp-modal").style.display = "block";
    document.getElementById(
      "otp-for"
    ).textContent = `Enter OTP for ${field}: ${value}`;
  });

  document.querySelector(".cancel-btn").addEventListener("click", function () {
    document.getElementById("otp-modal").style.display = "none";
  });

  document.getElementById("save-profile-btn").disabled = true; // Disable Save Button

  window.verifyOtp = function () {
    const otpInput = document.getElementById("otp");
    const otp = otpInput.value.trim();

    // Regular expression to match exactly 6 numeric digits (no alphabets or special characters)
    const otpPattern = /^[0-9]{6}$/;

    if (otpPattern.test(otp)) {
      alert("OTP verified successfully!");
      document.getElementById("otp-modal").style.display = "none";
      document.getElementById("save-profile-btn").disabled = false; // Enable Save Button
    } else {
      alert("Invalid OTP! Please enter a valid 6-digit numeric OTP.");
      otpInput.value = ""; // Clear input field
    }
  };

  // Allow only numeric input (prevent alphabets and special characters)
  document.getElementById("otp").addEventListener("input", function (event) {
    this.value = this.value.replace(/\D/g, ""); // Remove any non-numeric character
    if (this.value.length > 6) {
      this.value = this.value.slice(0, 6); // Limit to 6 digits
    }

    // Enable the "Verify OTP" button only when exactly 6 digits are entered
    document.getElementById("verify-otp-btn").disabled =
      this.value.length !== 6;
  });

  // Support help section
  const imageInput = document.getElementById("image");
  const discardButton = document.getElementById("discardImage");

  imageInput.addEventListener("change", function () {
    if (imageInput.files.length > 0) {
      discardButton.style.display = "inline-block";
    } else {
      discardButton.style.display = "none";
    }
  });

  discardButton.addEventListener("click", function () {
    imageInput.value = ""; // Clear file input
    discardButton.style.display = "none"; // Hide discard button
  });

  /** PROFILE EDIT FUNCTIONALITY */
  const editButton = document.getElementById("edit-profile-btn");
  const saveButton = document.getElementById("save-profile-btn");

  const profileDisplay = document.querySelector(".profile-display");
  const profileEdit = document.querySelector(".profile-edit");

  // Get Input Fields
  const inputFields = {
    fname: document.getElementById("fname"),
    mname: document.getElementById("mname"),
    lname: document.getElementById("lname"),
    city: document.getElementById("city"),
    phone: document.getElementById("phone"),
    email: document.getElementById("email"),
  };

  // Get Display Fields
  const displayFields = {
    fname: document.getElementById("display-fname"),
    mname: document.getElementById("display-mname"),
    lname: document.getElementById("display-lname"),
    city: document.getElementById("display-city"),
    phone: document.getElementById("display-phone"),
    email: document.getElementById("display-email"),
  };

  // Error Message Elements
  const phoneError = document.getElementById("phoneError");
  const emailError = document.getElementById("emailError");

  // Edit Profile Event
  editButton?.addEventListener("click", () => {
    profileDisplay.style.display = "none";
    profileEdit.style.display = "block";
  });

  // Save Profile Event with Validation
  saveButton?.addEventListener("click", () => {
    if (!validatePhone() || !validateEmail()) {
      return;
    }

    // Update Display Fields
    Object.keys(displayFields).forEach((key) => {
      displayFields[key].textContent = inputFields[key].value;
    });

    // Toggle Views
    profileEdit.style.display = "none";
    profileDisplay.style.display = "block";

    alert("Profile saved successfully!");
  });

  // ✅ Validate Phone Number (10-digit, starts with 6-9)
  function validatePhone() {
    const phoneValue = inputFields.phone.value.trim();
    const phonePattern = /^[6-9]\d{9}$/;

    if (!phonePattern.test(phoneValue)) {
      phoneError.textContent = "Please enter a valid 10-digit phone number.";
      inputFields.phone.focus();
      return false;
    }
    phoneError.textContent = ""; // Clear error message
    return true;
  }

  // ✅ Validate Email Format (with improved regex)
  function validateEmail() {
    const emailValue = inputFields.email.value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailValue)) {
      emailError.textContent = "Please enter a valid email address.";
      inputFields.email.focus();
      return false;
    }
    emailError.textContent = ""; // Clear error message
    return true;
  }

  // ✅ Restrict Phone Input to Numbers Only (10 Digits)
  inputFields.phone.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10); // Allow only 10 numeric digits
  });

  // ✅ Real-time Email Validation on Input
  inputFields.email.addEventListener("input", function () {
    validateEmail(); // Check email format while typing
  });

  // ✅ Handle Send OTP for Email Verification
  document
    .querySelector(".profile-edit")
    .addEventListener("click", function (event) {
      if (event.target && event.target.classList.contains("send-otp-btn")) {
        const field = event.target.getAttribute("data-field");
        sendOtp(field);
      }
    });

  // Notification Settings
  const notificationToggle = document.getElementById("notifications");
  const examReminderToggle = document.getElementById("exam-reminder");
  const resultNotificationsToggle = document.getElementById(
    "result-notifications"
  );
  const testSeriesUpdatesToggle = document.getElementById(
    "test-series-updates"
  );
  const announcementNotificationsToggle = document.getElementById(
    "announcement-notifications"
  );

  notificationToggle.addEventListener("change", (e) => {
    const isEnabled = e.target.checked;
    console.log(`Notifications are ${isEnabled ? "enabled" : "disabled"}`);
    // Save preference to the backend or local storage
  });

  examReminderToggle.addEventListener("change", (e) => {
    const isEnabled = e.target.checked;
    console.log(`Exam reminders are ${isEnabled ? "enabled" : "disabled"}`);
  });

  resultNotificationsToggle.addEventListener("change", (e) => {
    const isEnabled = e.target.checked;
    console.log(
      `Result notifications are ${isEnabled ? "enabled" : "disabled"}`
    );
  });

  testSeriesUpdatesToggle.addEventListener("change", (e) => {
    const isEnabled = e.target.checked;
    console.log(
      `Test series updates are ${isEnabled ? "enabled" : "disabled"}`
    );
  });

  announcementNotificationsToggle.addEventListener("change", (e) => {
    const isEnabled = e.target.checked;
    console.log(
      `Announcement notifications are ${isEnabled ? "enabled" : "disabled"}`
    );
  });

  // Forgot Password
  document.getElementById("forgot-password").addEventListener("click", () => {
    window.location.href = "/forgot-password.html"; // Redirect to forgot password page
  });

  document.getElementById("share-referral").addEventListener("click", () => {
    const referralLink = window.location.origin + "/profile"; // सध्याच्या साइटचा प्रोफाइल URL घ्या
    navigator.clipboard.writeText(referralLink).then(() => {
      alert("Referral Profile Link Copied!");
    });
  });

  // Forgot Password
  document.getElementById("forgot-password").addEventListener("click", () => {
    window.location.href = "./forgetpass.html";
  });

  // Rate Us
  document.getElementById("rate-us").addEventListener("click", () => {
    window.location.href =
      "https://play.google.com/store/apps/details?id=your-app-id";
  });

  // Sign Out
  document.getElementById("sign-out").addEventListener("click", () => {
    // Clear session or token
    localStorage.removeItem("authToken"); // Example
    window.location.href = "/login.html"; // Redirect to login page
  });
});
