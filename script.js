const cardsContainer = document.getElementById("cards");
const buttons = document.querySelectorAll(".btn");
const dailyBtn = document.getElementById("daily");
const weeklyBtn = document.getElementById("weekly");
const monthlyBtn = document.getElementById("monthly");

let timeframe = "weekly";
let data = [];

async function loadData() {
  const response = await fetch("./data.json");
  data = await response.json();
  renderCards(timeframe);
}
loadData();

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    timeframe = btn.dataset.time;
    renderCards(timeframe);
  });
});

function renderCards(timeframe) {
  cardsContainer.innerHTML = "";

  data.forEach((activity) => {
    const { title, timeframes, image } = activity;
    const current = timeframes[timeframe].current;
    const previous = timeframes[timeframe].previous;

    let label;
    if (timeframe === "daily") label = "Yesterday";
    else if (timeframe === "weekly") label = "Last Week";
    else label = "Last Month";

    const card = document.createElement("div");
    card.classList.add("card");

    const colors = {
      Work: "hsl(15, 100%, 70%)",
      Play: "hsl(195, 74%, 62%)",
      Study: "hsl(348, 100%, 68%)",
      Exercise: "hsl(145, 58%, 55%)",
      Social: "hsl(264, 64%, 52%)",
      "Self Care": "hsl(43, 84%, 65%)",
    };

    card.innerHTML = `
      <div class="top-bg" style="background-color:${colors[title]}"> <img class="top-img ${title}" src="${image}" alt="${title}"></div>
      <div class="card-content">
        <div class="card-title">
          <h2>${title}</h2>
          <img class="icon" src="./images/icon-ellipsis.svg" alt="">
          
        </div>
        <div class="icon-div">
            <p class="current">${current}hrs</p>
            <p class="previous">${label} - ${previous}hrs</p>
        </div>
      </div>
    `;

    cardsContainer.appendChild(card);
  });
}

renderCards("weekly");

dailyBtn.addEventListener("click", () => {
  renderCards("daily");
});
weeklyBtn.addEventListener("click", () => {
  renderCards("weekly");
});
monthlyBtn.addEventListener("click", () => {
  renderCards("monthly");
});
