document.addEventListener("DOMContentLoaded", async () => {
    const sendOtpButton = document.getElementById("send-otp-btn");
    const registerButton = document.getElementById("register-btn");
    // ✅ Fetch categories and populate dropdown
    try {
        const response = await fetch("http://localhost:5000/api/categories");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const categories = await response.json();
        console.log("✅ Categories Fetched:", categories);

        const categoryDropdown = document.getElementById("category");
        if (!categoryDropdown) {
            console.error("❌ categoryDropdown NOT FOUND in DOM! Check your HTML.");
            return;
        }

        categoryDropdown.innerHTML = '<option value="">Select a category</option>'; // Placeholder
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.category_id; // ✅ Send category_id, not name
            option.textContent = category.name; // ✅ Display category name
            categoryDropdown.appendChild(option);
        });

    } catch (error) {
        console.error("❌ Error fetching categories:", error);
    }

    // ✅ Send OTP Button Click Event
    sendOtpButton.addEventListener("click", async () => {
        const category = document.getElementById("category").value; // Ensure category_id is selected

        const formData = {
            firstName: document.getElementById("first-name").value,
            lastName: document.getElementById("last-name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            city: document.getElementById("city").value,
            contact: document.getElementById("contact").value,
            category, // ✅ Use category_id instead of name
            referralSource: document.getElementById("referral-source").value,
            instituteClassName: document.getElementById("institute_class_name").value
        };

        if (!formData.email) {
            alert("⚠ Please enter your email.");
            return;
        }
        if (!category) {
            alert("⚠ Please select a category.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            alert(data.message);

            if (data.message.includes("OTP sent")) {
                showOTPInput(); // ✅ Show OTP input dynamically only after sending OTP
            }
        } catch (error) {
            alert("❌ Error sending OTP. Try again.");
            console.error(error);
        }
    });



    // ✅ Function to Dynamically Show OTP Input (Only When Needed)
    function showOTPInput() {
        // ✅ Check if OTP input already exists to prevent duplicates
        if (document.getElementById("otp-container")) {
            return;
        }

        const otpContainer = document.createElement("div");
        otpContainer.id = "otp-container";
        otpContainer.innerHTML = `
            <label for="otp">Enter OTP</label>
            <input type="text" placeholder="Enter OTP" id="otp" required>
            <button type="button" id="verify-otp-btn">Verify OTP</button>
        `;
        document.querySelector("form").appendChild(otpContainer);

        // ✅ Attach OTP verification event listener
        document.getElementById("verify-otp-btn").addEventListener("click", verifyOTP);
    }

    // ✅ OTP Verification Function
    async function verifyOTP() {
        const email = document.getElementById("email").value;
        const otp = document.getElementById("otp").value;

        if (!otp) {
            alert("⚠ Please enter the OTP.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();
            alert(data.message);

            if (data.redirect) {
                window.location.href = data.redirect; // ✅ Redirect to login
            }
        } catch (error) {
            alert("❌ Error verifying OTP. Try again.");
            console.error(error);
        }
    }
});