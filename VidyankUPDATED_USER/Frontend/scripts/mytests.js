document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    let slideInterval;
    const sliderContainer = document.querySelector(".image-slider-container");
    const slides = document.querySelectorAll(".image-slider img");
    const totalImages = slides.length;

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalImages;
      sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function startSlideShow() {
      slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }

    function stopSlideShow() {
      clearInterval(slideInterval);
    }

    function showPopup(testSeries, questionPaper) {
      document.getElementById('popup-test-series').textContent = `Test Series: ${testSeries}`;
      document.getElementById('popup-question-paper').textContent = `Question Paper: ${questionPaper}`;

      document.getElementById('popup-overlay').style.display = 'flex';
      startSlideShow(); // Start auto-sliding when popup opens
    }

    function closePopup() {
      document.getElementById('popup-overlay').style.display = 'none';
      stopSlideShow(); // Stop auto-slide when popup is closed
    }

    function startExam() {
      window.location.href = "exam.html"; // Redirect to the test page
      closePopup();
    }

    // Close button functionality
    document.querySelector('.close-btn').addEventListener('click', closePopup);

    // Hover effect on question items
    document.querySelectorAll('.question-item').forEach(item => {
      const startBtn = item.querySelector('.start-btn');

      item.addEventListener('mouseenter', () => {
        startBtn.style.transform = 'scale(1.05)';
      });

      item.addEventListener('mouseleave', () => {
        startBtn.style.transform = 'scale(1)';
      });
    });

    // Expose functions globally
    window.showPopup = showPopup;
    window.closePopup = closePopup;
    window.startExam = startExam;
  });