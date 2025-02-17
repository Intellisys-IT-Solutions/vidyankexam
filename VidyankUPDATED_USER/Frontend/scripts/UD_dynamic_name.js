document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Loading user profile...");

    // ✅ Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.firstName && user.lastName) {
        console.log("✅ User found:", user);

        // ✅ Update the displayed name
        document.getElementById("user-display-name").textContent = `${user.firstName} ${user.lastName}`;
    } else {
        console.warn("⚠ No user data found in localStorage.");

        // ✅ Default name if user data is missing
        document.getElementById("user-display-name").textContent = "Guest User";
    }
});
