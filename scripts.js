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

  [
  {
    "title": "The Encore: After a Historic Season, Cumberlands Soccer Faces a Gauntlet in 2025",
    "date": "2025-08-16",
    "excerpt": "After a historic run to the NAIA Semifinals, the Cumberlands Men's Soccer team faces a gauntlet of a schedule in 2025. Can they build on last year's dream season? Here's a look at the key matchups.",
    "url": "posts/msocschedule.html",
    "image": "images/Mens_Soccer.jpg"
  },
  {
    "title": "Men’s Basketball Extends Win Streak to 7",
    "date": "2024-12-09",
    "excerpt": "The Patriots’ basketball team improved to 10-2 on the season after a dominant performance against conference rival Lindsey Wilson.",
    "url": "posts/basketball.html",
    "image": "images/news2.jpg"
  }
]

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
});

function initializeCarousel() {
    const slider = document.querySelector('.carousel-slider');
    const navContainer = document.querySelector('.carousel-nav');
    
    // Clear existing content
    slider.innerHTML = '';
    navContainer.innerHTML = '';
    
    // Create slides
    newsItems.forEach((item, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="carousel-content">
                <h3>${item.title}</h3>
                <p class="date">${item.date}</p>
                <p>${item.excerpt}</p>
                <a href="${item.link}" class="read-more-btn">Read More</a>
            </div>
        `;
        slider.appendChild(slide);
        
        // Create navigation dot
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        navContainer.appendChild(dot);
    });
    
    // Set up navigation
    setupCarouselNavigation();
}

let currentSlide = 0;

function setupCarouselNavigation() {
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    prevBtn.addEventListener('click', previousSlide);
    nextBtn.addEventListener('click', nextSlide);
}

function updateSlidePosition() {
    const slider = document.querySelector('.carousel-slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % newsItems.length;
    updateSlidePosition();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + newsItems.length) % newsItems.length;
    updateSlidePosition();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlidePosition();
}

// Optional: Auto-advance slides
setInterval(nextSlide, 5000); // Change slide every 5 seconds