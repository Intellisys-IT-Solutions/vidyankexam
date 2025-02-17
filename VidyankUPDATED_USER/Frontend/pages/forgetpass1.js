let generatedOTP = "123456"; // Fixed Dummy OTP

function sendOTP() {
    let userContact = document.getElementById("userContact").value.trim();
    let contactError = document.getElementById("contactError");

    // Email and Mobile Number Patterns
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Strict Email Validation
    let phonePattern = /^\d{10}$/; // 10-digit phone number validation

    if (userContact === "") {
        contactError.textContent = "Please enter Email or Mobile Number.";
        return;
    }

    if (!emailPattern.test(userContact) && !phonePattern.test(userContact)) {
        contactError.textContent = "Enter a valid Email or 10-digit Mobile Number.";
        return;
    }

    // Clear error if valid
    contactError.textContent = "";

    // Simulating OTP sending
    alert("A dummy OTP (123456) has been sent to your registered Email/Mobile."); 

    // Show OTP popup only after validation
    document.getElementById("otpPopup").style.display = "block";
}

function verifyOTP() {
    let enteredOTP = document.getElementById("otpInput").value.trim();
    let otpError = document.getElementById("otpError");

    // OTP Validation: Must be exactly 6 digits and contain only numbers
    if (!/^\d{6}$/.test(enteredOTP)) {
        otpError.textContent = "OTP must be a 6-digit number.";
        return;
    }

    if (enteredOTP === generatedOTP) {
        otpError.textContent = ""; // Clear error message
        document.getElementById("otpPopup").style.display = "none"; // Hide popup
        document.getElementById("forgotPasswordForm").classList.add("hidden"); // Hide forgot form
        document.getElementById("resetPasswordForm").classList.remove("hidden"); // Show reset form
    } else {
        otpError.textContent = "Invalid OTP. Please try again.";
    }
}

function submitNewPassword() {
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword === "" || confirmPassword === "") {
        alert("Please enter a new password.");
        return;
    }
    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        location.reload();
        return;
    }

    alert("Password reset successful!");
    window.location.href = "adminlogin.html";
}

// Restrict OTP input to numbers only in real-time
document.getElementById("otpInput").addEventListener("input", function (event) {
    this.value = this.value.replace(/\D/g, '').slice(0, 6); // Allow only numbers, max length 6
});

// 🔹 Close OTP Popup when clicking "Cancel"
function closeOTP() {
    document.getElementById("otpPopup").style.display = "none";
}

// 🔹 Cancel Reset Password and Go Back to Forgot Password Form
function cancelReset() {
    document.getElementById("resetPasswordForm").classList.add("hidden");
    document.getElementById("forgotPasswordForm").classList.remove("hidden");
}
