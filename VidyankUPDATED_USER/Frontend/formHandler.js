document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const popup = document.getElementById("formPopup");
    const doneButton = document.getElementById("doneButton");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const course = document.getElementById("course").value;
        const parentNumber = document.getElementById("parentNumber").value.trim();
        const studentNumber = document.getElementById("studentNumber").value.trim();
        const message = document.getElementById("message").value.trim();

        // Basic frontend validation
        if (!name || !email || !course || !parentNumber || !studentNumber || !message) {
            alert("Please fill all required fields.");
            return;
        }

        const formData = {
            name,
            email,
            course,
            parentNumber,
            studentNumber,
            message
        };

        try {
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Show success popup
                popup.style.display = "block";

                // Clear the form fields after successful submission
                form.reset();
            } else {
                alert(data.error || "Something went wrong!");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Server error. Please try again later.");
        }
    });

    // Close the popup when 'Done' button is clicked
    doneButton.addEventListener("click", function () {
        popup.style.display = "none";
    });
});
