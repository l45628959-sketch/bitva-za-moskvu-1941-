document.addEventListener("DOMContentLoaded", () => {
  const transitionEl = document.querySelector(".page-transition");
  if (transitionEl) {
    setTimeout(() => transitionEl.classList.add("hidden"), 200);
  }

  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add("active");
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  document.querySelectorAll(".stat-number").forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let current = 0;
    const timer = setInterval(() => {
      current += target / 50;
      if (current >= target) {
        counter.innerText = target.toLocaleString("ru-RU");
        clearInterval(timer);
      } else {
        counter.innerText = Math.floor(current).toLocaleString("ru-RU");
      }
    }, 25);
  });

  const dispatches = [
    { date: "16 НОЯБРЯ 1941 ГОДА • РАЗЪЕЗД ДУБОСЕКОВО", text: "«В течение дня на Волоколамском направлении наши части вели ожесточённые бои с танками противника. Бойцы дивизии Панфилова отбили несколько массированных атак, уничтожив 18 вражеских танков.»" },
    { date: "6 ДЕКАБРЯ 1941 ГОДА • НАЧАЛО КОНТРНАСТУПЛЕНИЯ", text: "«Войска Западного фронта перешли в контрнаступление против ударных фланговых группировок врага. Противник спешно отступает, бросая технику и боеприпасы.»" },
    { date: "7 НОЯБРЯ 1941 ГОДА • ПАРАД НА КРАСНОЙ ПЛОЩАДИ", text: "«Сегодня в Москве состоялся традиционный военный парад. Прямо с Красной площади полки пехоты, артиллерии и танков уходили на передовую.»" }
  ];

  let idx = 0;
  const dateEl = document.getElementById("dispatch-date");
  const textEl = document.getElementById("dispatch-text");
  const nextBtn = document.getElementById("next-dispatch-btn");
  if (nextBtn && dateEl && textEl) {
    dateEl.innerText = dispatches.date;
    textEl.innerText = dispatches.text;
    nextBtn.addEventListener("click", () => {
      idx = (idx + 1) % dispatches.length;
      dateEl.innerText = dispatches[idx].date;
      textEl.innerText = dispatches[idx].text;
    });
  }

  const modal = document.getElementById("hero-modal");
  const closeBtn = document.getElementById("modal-close");
  if (modal && closeBtn) {
    document.querySelectorAll(".open-modal-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.getElementById("modal-name").innerText = btn.getAttribute("data-name");
        document.getElementById("modal-role").innerText = btn.getAttribute("data-role");
        document.getElementById("modal-bio").innerText = btn.getAttribute("data-bio");
        document.getElementById("modal-quote").innerText = btn.getAttribute("data-quote");
        const modalImg = document.getElementById("modal-img");
        if (modalImg) {
          const imgSrc = btn.getAttribute("data-img");
          modalImg.src = imgSrc || "";
          modalImg.style.display = imgSrc ? "block" : "none";
        }
        modal.classList.add("open");
      });
    });
    closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("open"); });
  }
});

function filterHeroes(cat, btn) {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".hero-card").forEach(card => {
    card.classList.toggle("hidden-card", cat !== "all" && card.getAttribute("data-category") !== cat);
  });
}

function filterTimeline(stage, btn) {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".timeline-item").forEach(item => {
    item.classList.toggle("hidden-item", stage !== "all" && item.getAttribute("data-stage") !== stage);
  });
}
