
document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // 1) Sticky Navbar
    // =========================
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.style.backgroundColor = "#151a19";
        navbar.style.padding = "10px 0";
        navbar.style.transition = "0.3s";
      } else {
        navbar.style.backgroundColor = "transparent";
      }
    });
  
    // =========================
    // 1.1) Navbar Toggle (Mobile)
    // =========================
    const navToggle = document.querySelector(".nav-toggle");
    const navLinksContainer = document.querySelector(".navlinks");

    if (navToggle && navLinksContainer) {
      navToggle.addEventListener("click", () => {
        navLinksContainer.classList.toggle("open");
      });
    }
  
    // =========================
    // 2) Smooth Scroll
    // =========================
    const links = document.querySelectorAll(".navLink");
    links.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          if (navLinksContainer) {
            navLinksContainer.classList.remove("open");
          }
        }
      });
    });
  
    // =========================
    // 3) Cart System + LocalStorage
    // =========================
    const cartCounter = document.querySelector(".cartCounter");
    const productCards = document.querySelectorAll(".products .card");
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartUI();
  
    productCards.forEach(card => {
      card.addEventListener("click", () => {
        const name = card.querySelector("h5")?.innerText;
        const price = card.querySelector("p")?.innerText;
        cart.push({ name, price });
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
        animateCart();
      });
    });
  
    function updateCartUI() {
      cartCounter.innerText = cart.length;
    }
  
    function animateCart() {
      cartCounter.style.transform = "scale(1.3)";
      cartCounter.style.transition = "0.2s";
      setTimeout(() => {
        cartCounter.style.transform = "scale(1)";
      }, 200);
    }
  
    // =========================
    // 4) Scroll Reveal
    // =========================
    const revealEls = document.querySelectorAll(".card, .features, .categories, .opinions, .customers");
    window.addEventListener("scroll", () => {
      revealEls.forEach(el => {
        const pos = el.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        if (pos < screenHeight - 100) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          el.style.transition = "0.6s ease-out";
        }
      });
    });
  
    // =========================
    // 5) Flash Sale Countdown
    // =========================
    const sales = document.querySelectorAll(".sale .firstP");
    sales.forEach(saleText => {
      const endTime = new Date().getTime() + 24*60*60*1000; // 24 hours
      setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;
        if (distance <= 0) {
          saleText.innerText = "Flash Sale Ended";
          return;
        }
        const hours = Math.floor((distance % (24*60*60*1000)) / 3600000);
        const minutes = Math.floor((distance % 3600000) / 60000);
        saleText.innerText = `Flash Sale Ends In ${hours}h ${minutes}m`;
      }, 60000);
    });
  
    // =========================
    // 6) Back To Top Button
    // =========================
    const btn = document.createElement("button");
    btn.innerText = "↑";
    btn.style.position = "fixed";
    btn.style.bottom = "30px";
    btn.style.right = "30px";
    btn.style.display = "none";
    btn.style.padding = "10px 15px";
    btn.style.borderRadius = "50%";
    btn.style.border = "none";
    btn.style.backgroundColor = "#698927";
    btn.style.color = "white";
    btn.style.cursor = "pointer";
    document.body.appendChild(btn);
  
    window.addEventListener("scroll", () => {
      btn.style.display = window.scrollY > 300 ? "block" : "none";
    });
  
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // =========================
    // 7) Trending Products Slider
    // =========================
    const trendingCards = document.querySelectorAll(".trending-products .cardsContainer");
    const prevBtn = document.querySelector(".trend-prev");
    const nextBtn = document.querySelector(".trend-next");
    let currentTrendPage = 0;
    const TRENDING_PER_PAGE = 3;

    function showTrendingPage(pageIndex) {
      if (!trendingCards.length) return;
      const totalPages = Math.ceil(trendingCards.length / TRENDING_PER_PAGE);
      const safePage = ((pageIndex % totalPages) + totalPages) % totalPages;
      const start = safePage * TRENDING_PER_PAGE;
      const end = start + TRENDING_PER_PAGE;

      trendingCards.forEach((card, i) => {
        card.style.display = (i >= start && i < end) ? "block" : "none";
      });

      currentTrendPage = safePage;
    }

    if (trendingCards.length) {
      showTrendingPage(0);
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
          showTrendingPage(currentTrendPage - 1);
        });
        nextBtn.addEventListener("click", () => {
          showTrendingPage(currentTrendPage + 1);
        });
      }
    }

    // =========================
    // 8) Popular Products Pagination
    // =========================
    const popularCards = document.querySelectorAll(".popular-products .cardsContainer");
    const pageButtons = document.querySelectorAll(".popular-pagination .page-btn");

    function setPopularPage(pageIndex) {
      if (!popularCards.length) return;
      const offset = pageIndex;
      popularCards.forEach((card, i) => {
        card.style.order = (i + offset) % popularCards.length;
      });
    }

    if (popularCards.length && pageButtons.length) {
      setPopularPage(0);
      pageButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          pageButtons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          setPopularPage(index);
        });
      });
    }

  });
  