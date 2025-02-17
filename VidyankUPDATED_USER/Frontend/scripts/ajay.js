document.addEventListener("DOMContentLoaded", function () {
    const testList = document.getElementById("test-list");

    // Example Test Series Data
    const testSeries = [
        { id: 1, name: "FMGE - Test 1" },
        { id: 2, name: "FMGE - Test 2" },
        { id: 3, name: "FMGE - Test 3" },
        { id: 4, name: "FMGE - Test 4" },
        { id: 5, name: "FMGE - Test 5" },
        { id: 6, name: "FMGE - Test 6" },
        { id: 7, name: "FMGE - Test 7" },
        { id: 8, name: "FMGE - Test 8" },
        { id: 9, name: "FMGE - Test 9" },
        { id: 10, name: "FMGE - Test 10" }
    ];

    // Render Test Series List
    testSeries.forEach(test => {
        const testItem = document.createElement("div");
        testItem.classList.add("test-item");
        testItem.textContent = test.name;
        testItem.setAttribute("data-id", test.id);

        // Click Event to Open Test Details Page
        testItem.addEventListener("click", function () {
            // window.location.href = `../mystuff/code.html?testId=${test.id}`;
            window.location.href = `test-series.html`;
        });

        testList.appendChild(testItem);
    });
});
