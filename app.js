```js
/* WattWise AI: local prediction engine + private IndexedDB plan history. */

const model = {
  bias: 3.4,
  bedrooms: 1.2,
  occupants: 1.05,
  temperature: 0.16,
  wfh: 1.15,
};

const appliances = {
  washer: 1.2,
  dishwasher: 1.0,
  ev: 7.0,
};

const $ = (id) => document.getElementById(id);
const form = $("energy-form");

// Browser database: persists plans locally, requires no key or server.
const dbRequest = indexedDB.open("wattwise-plans", 1);
let database;

dbRequest.onupgradeneeded = (event) => {
  database = event.target.result;

  const store = database.createObjectStore("plans", {
    keyPath: "id",
    autoIncrement: true,
  });

  store.createIndex("createdAt", "createdAt");
};

dbRequest.onsuccess = (event) => {
  database = event.target.result;
  renderHistory();
};

dbRequest.onerror = () => {
  $("history-list").innerHTML =
    '<p class="empty-state">Private history is unavailable in this browser.</p>';
};

function getPlan() {
  const bedrooms = Number($("homeSize").value);
  const occupants = Number($("occupants").value);
  const temperature = Number($("temperature").value);
  const wfh = Number($("wfh").value);

  // Energy demand rises when temperature moves away from 22°C.
  const weatherLoad = Math.abs(temperature - 22) * model.temperature;

  const base =
    model.bias +
    bedrooms * model.bedrooms +
    occupants * model.occupants +
    weatherLoad +
    wfh * model.wfh;

  const selected = Object.entries(appliances).filter(([id]) => $(id).checked);

  const flexible = selected.reduce(
    (total, [, load]) => total + load,
    0,
  );

  const forecast = base + flexible;
  const rate = flexible ? Math.min(0.26, 0.09 + flexible * 0.04) : 0;

  return {
    forecast,
    carbon: forecast * 0.44,
    flexible,
    rate,
    savedKwh: flexible * rate,
    appliances: selected.map(([id]) => id),
    createdAt: new Date().toISOString(),
  };
}

function displayPlan(plan) {
  const names = {
    washer: "washer",
    dishwasher: "dishwasher",
    ev: "EV charger",
  };

  const chosen = plan.appliances.map((item) => names[item]);

  const target =
    chosen.length === 0
      ? "your flexible devices"
      : chosen.length === 1
        ? `your ${chosen[0]}`
        : "your flexible appliances";

  $("forecast").innerHTML = `${plan.forecast.toFixed(1)} <small>kWh</small>`;
  $("carbon").textContent = plan.carbon.toFixed(1);
  $("saving").textContent = `${Math.round(plan.rate * 100)}%`;

  $("rec-title").textContent = plan.flexible
    ? `Best move: run ${target} after 10 pm.`
    : "Add a flexible appliance to unlock a cleaner schedule.";

  $("rec-text").textContent = plan.flexible
    ? `Shift ${plan.flexible.toFixed(1)} kWh away from 6–9 pm. Estimated lower-carbon energy: ${plan.savedKwh.toFixed(1)} kWh.`
    : "Your essential energy is forecasted, but there is no flexible load to move.";
}

function savePlan(plan) {
  if (!database) return;

  const transaction = database.transaction("plans", "readwrite");
  transaction.objectStore("plans").add(plan);
  transaction.oncomplete = renderHistory;
}

function renderHistory() {
  if (!database) return;

  const list = $("history-list");
  const request = database
    .transaction("plans", "readonly")
    .objectStore("plans")
    .getAll();

  request.onsuccess = () => {
    const plans = request.result.slice(-4).reverse();

    list.innerHTML = plans.length
      ? plans
          .map(
            (plan) => `
              <article>
                <span>${new Date(plan.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}</span>
                <b>${plan.forecast.toFixed(1)} kWh</b>
                <small>${plan.carbon.toFixed(1)} kg CO₂ · ${Math.round(plan.rate * 100)}% peak reduction</small>
              </article>
            `,
          )
          .join("")
      : '<p class="empty-state">Your saved plans will appear here.</p>';
  };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const plan = getPlan();

  displayPlan(plan);
  savePlan(plan);

  $("result").scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
});

$("temperature").addEventListener("input", (event) => {
  $("temp-value").textContent = `${event.target.value}°`;
});

$("clear-history").addEventListener("click", () => {
  if (!database) return;

  const transaction = database.transaction("plans", "readwrite");
  transaction.objectStore("plans").clear();
  transaction.oncomplete = renderHistory;
});

displayPlan(getPlan());
```
