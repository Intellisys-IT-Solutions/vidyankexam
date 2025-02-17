document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get("testId");
    const testTitle = document.getElementById("test-title");
    const questionList = document.getElementById("question-list");

    console.log("Test ID from URL:", testId); // Debugging check

    if (!testId) {
        console.error("Missing testId in URL!");
        testTitle.textContent = "Error: No test selected.";
        return;
    }

    testTitle.textContent = `FMGE - Test ${testId}`;

    if (questionList) {
        console.log("Adding question papers for Test ID:", testId);

        // Generate Question Papers 1-10
        for (let i = 1; i <= 10; i++) {
            const questionItem = document.createElement("div");
            questionItem.classList.add("question-item");
            questionItem.textContent = `Question Paper ${i}`;
            questionItem.onclick = function () {
                alert(`Opening Question Paper ${i} for FMGE - Test ${testId}`);
            };

            console.log("Appending:", questionItem.textContent); // Debugging check
            questionList.appendChild(questionItem);
        }
    } else {
        console.error("Question list container not found!");
    }
});
