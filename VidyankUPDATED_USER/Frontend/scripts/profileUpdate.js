document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    console.log("❌ No token found, redirecting to login...");
    window.location.href = "/login";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/user-profile", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const userData = await response.json();
    console.log("🔍 User Data from API:", userData);

    if (response.status === 200) {
      populateUserData(userData);
    } else {
      console.error("❌ Error fetching user data:", userData);
      alert("Error fetching user data");
    }
  } catch (error) {
    console.error("❌ Fetch error:", error);
    alert("Error fetching user data");
  }
});

// ✅ Populate user data into fields
function populateUserData(userData) {
  document.getElementById("display-fname").textContent = userData.firstName || "N/A";
  document.getElementById("display-mname").textContent = userData.middleName || "N/A";
  document.getElementById("display-lname").textContent = userData.lastName || "N/A";
  document.getElementById("display-city").textContent = userData.city || "N/A";
  document.getElementById("display-phone").textContent = userData.contact || "N/A";
  document.getElementById("display-email").textContent = userData.email || "N/A";

  document.getElementById("fname").value = userData.firstName || "";
  document.getElementById("mname").value = userData.middleName || "";
  document.getElementById("lname").value = userData.lastName || "";
  document.getElementById("city").value = userData.city || "";
  document.getElementById("phone").value = userData.contact || "";
  document.getElementById("email").value = userData.email || "";
}

// ✅ Toggle edit mode
document.getElementById("edit-profile-btn").addEventListener("click", () => {
  document.querySelector(".profile-display").style.display = "none";
  document.querySelector(".profile-edit").style.display = "block";
});

// ✅ Variables to track OTP verification status
let isOtpVerified = false;
let editedField = null;

// ✅ Handle input changes for email and phone
document.getElementById("phone").addEventListener("input", handleInputChange);
document.getElementById("email").addEventListener("input", handleInputChange);

function handleInputChange(event) {
  if (!editedField || editedField !== event.target.id) {
    editedField = event.target.id;
    sendOtpBtn.dataset.field = editedField;
    sendOtpBtn.style.display = "inline-block";
    isOtpVerified = false; // Reset OTP verification status
    enableSaveButton(); // Re-evaluate Save button state
  }
}

// ✅ Send OTP button setup
const sendOtpBtn = document.createElement("button");
sendOtpBtn.textContent = "Send OTP";
sendOtpBtn.className = "send-otp-btn";
sendOtpBtn.style.display = "none";
document.getElementById("phone").parentNode.appendChild(sendOtpBtn);

sendOtpBtn.addEventListener("click", async () => {
  const newEmail = document.getElementById("email").value.trim();
  const oldEmail = document.getElementById("display-email").textContent.trim();

  if (!newEmail || newEmail === oldEmail) {
    alert("Enter a new email to verify.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/send-profile-update-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newEmail }),
    });

    const result = await response.json();
    if (response.status === 200) {
      alert(`OTP sent to ${newEmail}`);
      showOtpPopup("email");
    } else {
      alert(result.message || "Error sending OTP");
    }
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    alert("Error sending OTP.");
  }
});


// ✅ Show OTP Modal
function showOtpPopup(field) {
  document.getElementById("otp-modal").style.display = "flex";
  document.getElementById("otp-for").textContent = `Enter OTP for ${field}`;
  document.getElementById("verify-otp-btn").disabled = true; // Ensure button is disabled initially
}

// ✅ Close OTP Modal
function closeOtpPopup() {
  document.getElementById("otp-modal").style.display = "none";
}

// ✅ Dynamically Enable/Disable Verify OTP Button
document.getElementById("otp").addEventListener("input", (event) => {
  const otpValue = event.target.value.trim();
  const verifyOtpBtn = document.getElementById("verify-otp-btn");

  if (otpValue.length === 6) {
    verifyOtpBtn.disabled = false;
    verifyOtpBtn.style.cursor = "pointer";
  } else {
    verifyOtpBtn.disabled = true;
    verifyOtpBtn.style.cursor = "not-allowed";
  }
});

// ✅ Verify OTP
document.getElementById("verify-otp-btn").addEventListener("click", async () => {
  const newEmail = document.getElementById("email").value.trim();
  const otp = document.getElementById("otp").value.trim();
  const token = localStorage.getItem("authToken"); // ✅ Get the auth token

  if (!newEmail || otp.length !== 6) {
      alert("Enter a valid email and 6-digit OTP.");
      return;
  }

  if (!token) {
      alert("User authentication token is missing. Please log in again.");
      window.location.href = "/login";
      return;
  }

  try {
      const response = await fetch("http://localhost:5000/api/auth/verify-profile-update-otp", {
          method: "POST",
          headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` // ✅ Attach token here
          },
          body: JSON.stringify({ newEmail, otp }),
      });

      const result = await response.json();
      
      if (response.ok) {
          alert("✅ OTP verified successfully!");
          isOtpVerified = true;
          closeOtpPopup();
          enableSaveButton();
      } else {
          alert(result.message || "❌ Invalid OTP.");
      }
  } catch (error) {
      console.error("❌ Error verifying OTP:", error);
      alert("⚠️ Error verifying OTP. Check the console for more details.");
  }
});

// ✅ Function to validate email format
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

// ✅ Save profile after validation
document.getElementById("save-profile-btn").addEventListener("click", async () => {
  const saveButton = document.getElementById("save-profile-btn");
  saveButton.disabled = true; // Prevent multiple clicks

  const token = localStorage.getItem("authToken");
  if (!token) {
      alert("User authentication token missing. Please log in again.");
      window.location.href = "/login";
      return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
      alert("User data not found. Please log in again.");
      window.location.href = "/login";
      return;
  }

  // ✅ Get current and new values
  const firstName = document.getElementById("fname").value.trim();
  const middleName = document.getElementById("mname").value.trim();
  const lastName = document.getElementById("lname").value.trim();
  const city = document.getElementById("city").value.trim();
  const newEmail = document.getElementById("email").value.trim();
  const oldEmail = user.email;
  const contact = document.getElementById("phone").value.trim();
  const oldContact = user.contact;

  // ✅ Validate Required Fields
  if (!firstName || !lastName || !city) {
      alert("First Name, Last Name, and City are required.");
      saveButton.disabled = false;
      return;
  }

  // ✅ Ensure OTP Verification for Email/Phone Change
  if ((newEmail !== oldEmail || contact !== oldContact) && !isOtpVerified) {
      alert("Please verify OTP before updating email or phone.");
      saveButton.disabled = false;
      return;
  }

  // ✅ Prepare Data for API
  const updatedUser = {
      firstName,
      middleName,
      lastName,
      city,
      contact,
      newEmail: newEmail !== oldEmail ? newEmail : undefined // Only send if changed
  };

  try {
      console.log("📤 Sending profile update request:", updatedUser);
      
      const response = await fetch("http://localhost:5000/api/auth/update-profile", {
          method: "PUT",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
      });

      const result = await response.json();
      console.log("🛠 Profile Update Response:", result);

      if (response.ok) {
          alert("✅ Profile updated successfully!");
          
          // ✅ If email changed, update local storage with new token
          if (result.token) {
              localStorage.setItem("authToken", result.token);
          }

          // ✅ Update local storage user info
          localStorage.setItem("user", JSON.stringify({ 
              ...user, 
              firstName, 
              middleName, 
              lastName, 
              city, 
              contact, 
              email: newEmail || oldEmail 
          }));

          // ✅ Redirect to user dashboard
          setTimeout(() => window.location.href = "userDash.html", 1500);
      } else {
          alert(result.message || "⚠️ Error updating profile.");
      }
  } catch (error) {
      console.error("❌ Error updating profile:", error);
      alert("⚠️ Error updating profile.");
  } finally {
      saveButton.disabled = false; // Re-enable button
  }
});

// ✅ Function to validate phone number (only digits, exactly 10 characters)
function validatePhone(phone) {
  const phonePattern = /^\d{10}$/;
  return phonePattern.test(phone);
}


// ✅ Restrict phone input to 10 digits
document.getElementById("phone").addEventListener("input", (event) => {
  event.target.value = event.target.value.replace(/\D/g, "").slice(0, 10);
});

function enableSaveButton() {
  const saveButton = document.getElementById("save-profile-btn");
  const email = document.getElementById("email").value.trim();

  if (!isOtpVerified) {
      console.error("❌ OTP verification required before updating email.");
      saveButton.disabled = true;
      saveButton.style.cursor = "not-allowed";
      return;
  }

  saveButton.disabled = false;
  saveButton.style.cursor = "pointer";
}



