/* ---------- CONFIG ---------- */

const PHASE1_ANSWER = "هلی";
const timeout = 3000;

const reactionVideos = ["./videos/noch.mp4", "./videos/me-glasses.mp4"];

const questions = [
  {
    text: "رنگ مورد علاقه من چیه ؟",
    options: ["گل بهی", "سبز", "قهوه ای", "فیروزه ای"],
    correctIndex: 2,
  },
  {
    text: "اسم کتاب مورد علاقم :)",
    options: ["مسخ", "وقتی نیچه گریست", "کوری", "ابلوموف"],
    correctIndex: 1,
  },
  {
    text: "چی باعث میشه خاطرات برام مرور بشن و جلوی چشمم بیان",
    options: ["رنگ ها", "صداها", "آهتگ ها", "بوها"],
    correctIndex: 3,
  },
];

/* ---------- STATE ---------- */

let currentQuestion = 0;

const container = document.getElementById("container");
const reactionBox = document.getElementById("reactionBox");
const reactionVideo = document.getElementById("reactionVideo");

/* ---------- INIT ---------- */

renderPhase1();
startPetals();

/* ---------- Phase 1 ---------- */

function renderPhase1() {
  container.innerHTML = `
    <h1>🧐 دوست دارم چی صدات کنم؟</h1>
    <input id="answer" autocomplete="off" />
    <br>
    <button onclick="checkPhase1()">! برو بریم</button>
  `;
}

function checkPhase1() {
  const value = document.getElementById("answer").value.trim().toLowerCase();

  if (value === PHASE1_ANSWER) {
    container.classList.add("fade-out");

    setTimeout(() => {
      container.innerHTML = `<div class="phase-text"></div>`;
      container.classList.remove("fade-out");

      animateText(
        `آفرین دختره باید مطمئن میشدم خودتی!

اولا اینکه ولنتاین شما مبارک باشه 😌☝🏻

دوما اینکه برای دریافت هدیه ی قشنگت باید یکسری سوال هارو جواب بدی دختر خوشگله!🌚🌷`,
        () => {
          setTimeout(() => {
            container.classList.add("fade-out");
            setTimeout(() => {
              container.classList.remove("fade-out");
              loadQuestion();
            }, 400);
          }, 3000);
        },
      );
    }, 400);
  } else {
    playReaction();
  }
}

/* ---------- Phase 2 ---------- */

function loadQuestion() {
  const q = questions[currentQuestion];

  container.innerHTML = `
    <div class="progress">
      ${questions
        .map(
          (_, i) =>
            `<span class="dot ${i < currentQuestion ? "filled" : ""}"></span>`,
        )
        .join("")}
    </div>

    <h1>${q.text}</h1>

    <div>
      ${q.options
        .map(
          (opt, i) =>
            `<div class="option" onclick="handleOption(${i})">${opt}</div>`,
        )
        .join("")}
    </div>
  `;
}

function handleOption(index) {
  const q = questions[currentQuestion];
  const options = document.querySelectorAll(".option");

  if (index === q.correctIndex) {
    options[index].classList.add("correct");

    setTimeout(() => {
      container.classList.add("fade-out");

      setTimeout(() => {
        currentQuestion++;

        if (currentQuestion < questions.length) {
          container.classList.remove("fade-out");
          loadQuestion();
        } else {
          container.classList.remove("fade-out");
          renderValentine();
        }
      }, 400);
    }, 700);
  } else {
    options[index].classList.add("wrong");
    playReaction();

    setTimeout(() => {
      options[index].classList.remove("wrong");
    }, timeout);
  }
}

/* ---------- Phase 3 ---------- */

function renderValentine() {
  container.innerHTML = `
    <h1>دختر قشنگ من میشی؟ :))</h1>

    <div class="valentine-buttons">
      <button id="yesBtn">Yes</button>
      <button id="noBtn" class="no-btn">No</button>
    </div>
  `;

  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  noBtn.addEventListener("mouseenter", () => {
    const x = Math.random() * 80 - 40;
    const y = Math.random() * 40 - 20;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });

  yesBtn.addEventListener("click", () => {
    transitionWithMessage("Good girl 😌", renderFinalReveal);
  });
}

/* ---------- Final Reveal ---------- */

function renderFinalReveal() {
  container.innerHTML = `
    <h1>تقدیم به سیمای فرحبخش شما 🤍</h1>

    <div class="book-card">
      <h3> 🥸 😢 وقتی نیچه گریست </h3>
      <button class="reveal-btn" data-url="https://fidibo.com/gift/invite/81098845ba22b5c3e1655fcd9a0168b1">Listen</button>
    </div>

    <div class="book-card">
      <h3>🤡 عقاید یک دلقک</h3>
      <button class="reveal-btn" data-url="https://fidibo.com/gift/invite/ccc5e6678e9a62d1f875b33e9cf647d4">Listen</button>
    </div>

    <div class="book-card">
      <h3>🌚 ابلوموفم بخون بچه </h3>
      <button class="reveal-btn" data-url="https://book.iranseda.ir/detailsalbum/?VALID=TRUE&g=618921">Listen</button>
    </div>

  `;

  document.querySelectorAll(".reveal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.outerHTML = `<div class="revealed-link">
          <a href="${btn.dataset.url}" target="_blank">${btn.dataset.url}</a>
        </div>`;
    });
  });
}

/* ---------- Shared Utilities ---------- */

function transitionWithMessage(message, callback) {
  container.classList.add("fade-out");

  setTimeout(() => {
    container.innerHTML = `<div class="goodgirl-text"></div>`;
    container.classList.remove("fade-out");

    animateText(message, () => {
      setTimeout(() => {
        container.classList.add("fade-out");
        setTimeout(() => {
          container.classList.remove("fade-out");
          callback();
        }, 400);
      }, 1500);
    });
  }, 400);
}

function animateText(text, done) {
  const target =
    document.querySelector(".goodgirl-text") ||
    document.querySelector(".phase-text");

  target.innerHTML = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      if (text[i] === "\n") {
        target.appendChild(document.createElement("br"));
        i++;
        setTimeout(type, 120);
        return;
      }

      const span = document.createElement("span");
      span.textContent = text[i];
      span.classList.add("letter");
      target.appendChild(span);

      requestAnimationFrame(() => span.classList.add("visible"));

      i++;
      setTimeout(type, 45);
    } else {
      if (done) done();
    }
  }

  type();
}

function playReaction() {
  const src = reactionVideos[Math.floor(Math.random() * reactionVideos.length)];
  reactionVideo.src = src;
  reactionVideo.currentTime = 0;
  reactionBox.classList.add("show");
  reactionVideo.play().catch(() => {});

  setTimeout(() => {
    reactionBox.classList.remove("show");
    reactionVideo.pause();
  }, timeout);
}

/* ---------- Petals ---------- */

function startPetals() {
  const layer = document.getElementById("petal-layer");

  for (let i = 0; i < 15; i++) createPetal(layer);
}

function createPetal(layer) {
  const petal = document.createElement("div");
  petal.classList.add("petal");

  const size = Math.random() * 10 + 10;
  petal.style.width = size + "px";
  petal.style.height = size + "px";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = Math.random() * 10 + 8 + "s";

  layer.appendChild(petal);

  setTimeout(() => {
    petal.remove();
    createPetal(layer);
  }, 15000);
}
