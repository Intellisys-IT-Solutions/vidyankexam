document.addEventListener("DOMContentLoaded", () => {
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");
    const resetPasswordForm = document.getElementById("resetPasswordForm");
    const otpPopup = document.getElementById("otpPopup");
    let userEmail = "";
    let generatedOTP = "123456"; // Dummy OTP for testing

    // Hide OTP Popup initially
    otpPopup.style.display = "none"; 

    // Email & Mobile Number Patterns
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    const phonePattern = /^\d{10}$/; 

    // ✅ Send OTP Request with Validation
    async function sendOTP() {
        userEmail = document.getElementById("userContact").value.trim();
        let contactError = document.getElementById("contactError");

        if (userEmail === "") {
            contactError.textContent = "Please enter Email or Mobile Number.";
            return;
        }
        if (!emailPattern.test(userEmail) && !phonePattern.test(userEmail)) {
            contactError.textContent = "Enter a valid Email or 10-digit Mobile Number.";
            return;
        }

        contactError.textContent = ""; // Clear error if valid

        try {
            const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail }),
            });

            const data = await response.json();
            alert(data.message);

            if (data.message.includes("OTP sent")) {
                otpPopup.style.display = "block"; // ✅ Show OTP Popup only when OTP is sent
            }
        } catch (error) {
            alert("❌ Error sending OTP. Try again.");
            console.error(error);
        }
    }

    // ✅ Verify OTP with Validation
    async function verifyOTP() {
        const enteredOTP = document.getElementById("otpInput").value.trim();
        let otpError = document.getElementById("otpError");

        if (!/^\d{6}$/.test(enteredOTP)) {
            otpError.textContent = "OTP must be a 6-digit number.";
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/verify-forgot-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail, otp: enteredOTP }),
            });

            const data = await response.json();
            alert(data.message);

            if (data.message.includes("OTP Verified")) {
                otpPopup.style.display = "none"; 
                forgotPasswordForm.classList.add("hidden");
                resetPasswordForm.classList.remove("hidden");
            } else {
                otpError.textContent = "Invalid OTP. Please try again.";
            }
        } catch (error) {
            alert("❌ Error verifying OTP. Try again.");
            console.error(error);
        }
    }

    // ✅ Submit New Password with Validation
    async function submitNewPassword() {
        let newPassword = document.getElementById("newPassword").value.trim();
        let confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (!newPassword || !confirmPassword) {
            alert("Please enter and confirm your new password.");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail, newPassword }),
            });

            const data = await response.json();
            alert(data.message);

            if (data.redirect) {
                window.location.href = "login.html"; // ✅ Redirect after reset
            }
        } catch (error) {
            alert("❌ Error resetting password. Try again.");
            console.error(error);
        }
    }

    // ✅ Restrict OTP input to numbers only
    document.getElementById("otpInput").addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, '').slice(0, 6); 
    });

    // 🔹 Close OTP Popup
    function closeOTP() {
        otpPopup.style.display = "none";
    }

    // 🔹 Cancel Reset Password & Go Back
    function cancelReset() {
        resetPasswordForm.classList.add("hidden");
        forgotPasswordForm.classList.remove("hidden");
    }

    // Attach functions to buttons
    window.sendOTP = sendOTP;
    window.verifyOTP = verifyOTP;
    window.submitNewPassword = submitNewPassword;
    window.closeOTP = closeOTP;
    window.cancelReset = cancelReset;
});
