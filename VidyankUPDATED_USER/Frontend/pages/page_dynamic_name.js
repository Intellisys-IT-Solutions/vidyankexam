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
            // ✅ Construct Full Name
            const fullName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
            document.getElementById("user-fullname").textContent = fullName || "User";

            // ✅ Update Profile Image
            const profileImage = userData.profileImage || "https://via.placeholder.com/100";
            document.getElementById("profile-img").src = profileImage;

            // ✅ Store user data in Local Storage
            localStorage.setItem("user", JSON.stringify(userData));
        } else {
            console.error("❌ Error fetching user data:", userData);
            //alert("Error fetching user data");
        }
    } catch (error) {
        console.error("❌ Fetch error:", error);
        //alert("Error fetching user data"); 
    }
});

// ✅ Load from Local Storage when page reloads
document.addEventListener("DOMContentLoaded", () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
        // ✅ Set Full Name
        const fullName = `${storedUser.firstName || ""} ${storedUser.lastName || ""}`.trim();
        document.getElementById("user-fullname").textContent = fullName || "User";

        // ✅ Set Profile Image
        const profileImage = storedUser.profileImage || "https://via.placeholder.com/100";
        document.getElementById("profile-img").src = profileImage;
    }
});
