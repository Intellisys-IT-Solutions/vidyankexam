document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Login Script Loaded");

    const loginButton = document.getElementById("login-btn");
    const API_BASE_URL = "http://localhost:5000"; // Backend URL

    if (!loginButton) {
        console.error("❌ Login button not found");
        return;
    }

    // ✅ Login Button Click Event (Without OTP)
    loginButton.addEventListener("click", async () => {
        const email = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("⚠ Please enter your email and password.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            alert(data.message);

            if (data.token && data.user) {
                // ✅ Store authentication token
                localStorage.setItem("authToken", data.token);

                // ✅ Store user details
                localStorage.setItem("user", JSON.stringify(data.user));
                console.log("✅ User data stored in localStorage:", data.user);

                // ✅ Redirect to dashboard
                if (data.redirect) {
                    console.log(`🔀 Redirecting to: ${data.redirect}`);
                    window.location.href = data.redirect; 
                } else {
                    console.log("🚀 Redirecting to default dashboard...");
                    window.location.href = "/dashboard.html"; 
                }
            }
        } catch (error) {
            alert("❌ Error logging in. Try again.");
            console.error(error);
        }
    });
});
