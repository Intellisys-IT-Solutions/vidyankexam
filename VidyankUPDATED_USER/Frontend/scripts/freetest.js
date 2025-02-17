// Function to redirect to the selected test page
function startTest(testId) {
    // Ensure testId is a valid number before redirection
    if (!isNaN(testId) && testId > 0) {
        window.location.href = `./test-series.html`; // Redirects to test1.html, test2.html, etc.
    } else {
        console.error("Invalid test ID:", testId); // Debugging in case of invalid IDs
    }
}

// Attach event listeners dynamically (safer approach)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".test-card").forEach((button, index) => {
        button.addEventListener("click", () => startTest(index + 1));
    });
});
