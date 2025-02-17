document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('supportForm');
    const responseMessage = document.getElementById('responseMessage');

    if (!form) {
        console.error("❌ Form not found! Check your HTML structure.");
        return;
    }

    document.getElementById('image').addEventListener('change', function() {
        let discardBtn = document.getElementById('discardImage');
        discardBtn.style.display = this.files.length > 0 ? 'inline-block' : 'none';
    });

    document.getElementById('discardImage').addEventListener('click', function() {
        document.getElementById('image').value = "";
        this.style.display = 'none';
    });

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // ✅ Prevent page reload
        console.log("📩 Submit button clicked!");

        const formData = new FormData();
        const fileInput = document.getElementById('image');
        const user_id = localStorage.getItem("user_id") || "7";

        formData.append('user_id', user_id);
        formData.append('description', document.getElementById('description').value);

        if (fileInput.files.length === 0) {
            alert("⚠️ Please select an image file before submitting.");
            return;
        }

        formData.append('image', fileInput.files[0]);

        try {
            const response = await fetch('http://localhost:5000/support/submit-support', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            console.log("✅ Server Response:", result);

            // 🚀 Fix: Only Show Error If `success: false`
            if (result.success) {
                responseMessage.innerText = "✅ " + result.message;
                responseMessage.style.color = "lightgreen";
                alert("✅ Support request submitted successfully!");

                form.reset(); // ✅ Clear form
                document.getElementById('discardImage').style.display = 'none';
            } else {
                responseMessage.innerText = "❌ " + result.error;
                responseMessage.style.color = "red";
            }
        } catch (error) {
            console.error("❌ Fetch Error:", error);
            responseMessage.innerText = "❌ Unable to connect to server.";
            responseMessage.style.color = "red";
        }
    });
});
