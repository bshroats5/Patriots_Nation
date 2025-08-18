  <!-- Load Twitter script -->
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

  <!-- CAROUSEL SCRIPT -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const carouselSlider = document.querySelector('.carousel-slider');
      const carouselNav = document.querySelector('.carousel-nav');
      const prevBtn = document.querySelector('.carousel-btn.prev');
      const nextBtn = document.querySelector('.carousel-btn.next');

      let posts = [];
      let currentIndex = 0;
      let slideInterval;

      // Fetch data and build the carousel
      async function fetchAndBuildCarousel() {
        try {
          const response = await fetch('posts.json');
          const allPosts = await response.json();
          posts = allPosts.slice(0, 5); // Get the latest 5

          if (posts.length === 0) return;

          buildCarousel();
          setupEventListeners();
          startAutoRotate();
        } catch (error) {
          console.error("Failed to fetch or build carousel:", error);
          carouselSlider.innerHTML = '<p style="color: black; padding: 20px;">Could not load news stories.</p>';
        }
      }

      function buildCarousel() {
        carouselSlider.innerHTML = '';
        carouselNav.innerHTML = '';

        posts.forEach((post, index) => {
          // Create slide
          const slide = document.createElement('div');
          slide.className = 'carousel-slide';
          slide.innerHTML = `
            <img src="${post.image}" alt="">
            <div class="carousel-content">
              <h3>${post.title}</h3>
              <p class="date">${post.date}</p>
              <a href="${post.url}" class="read-more-btn">Read More</a>
            </div>
          `;
          carouselSlider.appendChild(slide);

          // Create nav dot
          const dot = document.createElement('button');
          dot.className = 'carousel-dot';
          dot.dataset.index = index;
          carouselNav.appendChild(dot);
        });

        updateCarousel();
      }

      function updateCarousel() {
        carouselSlider.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update active dot
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
      }

      function showNextSlide() {
        currentIndex = (currentIndex + 1) % posts.length;
        updateCarousel();
      }

      function showPrevSlide() {
        currentIndex = (currentIndex - 1 + posts.length) % posts.length;
        updateCarousel();
      }

      function startAutoRotate() {
        stopAutoRotate(); // Prevent multiple intervals
        slideInterval = setInterval(showNextSlide, 5000); // Rotate every 5 seconds
      }

      function stopAutoRotate() {
        clearInterval(slideInterval);
      }

      function setupEventListeners() {
        nextBtn.addEventListener('click', () => {
          showNextSlide();
          startAutoRotate(); // Restart timer on manual navigation
        });

        prevBtn.addEventListener('click', () => {
          showPrevSlide();
          startAutoRotate(); // Restart timer
        });

        carouselNav.addEventListener('click', (e) => {
          if (e.target.matches('.carousel-dot')) {
            currentIndex = parseInt(e.target.dataset.index);
            updateCarousel();
            startAutoRotate(); // Restart timer
          }
        });

        // Pause on hover
        const container = document.querySelector('.carousel-container');
        container.addEventListener('mouseenter', stopAutoRotate);
        container.addEventListener('mouseleave', startAutoRotate);
      }

      // Initialize
      fetchAndBuildCarousel();
    });
  </script>