```js
// WattWise's lightweight, inspectable linear model. Coefficients approximate
// training over household energy patterns (kWh/day), and are deliberately local.
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

const form = document.querySelector("#energy-form");
const el = (id) => document.getElementById(id);

function predict() {
  const beds = Number(el("homeSize").value);
  const people = Number(el("occupants").value);
  const temp = Number(el("temperature").value);
  const wfh = Number(el("wfh").value);

  // Temperature is centred at 22°C; cooling/heating demand rises away from it.
  const weatherLoad = Math.abs(temp - 22) * model.temperature;

  const base =
    model.bias +
    beds * model.bedrooms +
    people * model.occupants +
    weatherLoad +
    wfh * model.wfh;

  const selected = Object.entries(appliances).filter(([id]) => el(id).checked);

  const flexible = selected.reduce((sum, [, load]) => sum + load, 0);
  const forecast = base + flexible;
  const shiftRate = flexible ? Math.min(0.26, 0.09 + flexible * 0.04) : 0;
  const savedKwh = flexible * shiftRate;
  const carbon = forecast * 0.44;

  const applianceNames = selected.map(
    ([id]) =>
      ({
        washer: "washer",
        dishwasher: "dishwasher",
        ev: "EV charger",
      })[id],
  );

  const target =
    applianceNames.length === 0
      ? "your flexible devices"
      : applianceNames.length === 1
        ? `your ${applianceNames[0]}`
        : "your flexible appliances";

  el("forecast").textContent = forecast.toFixed(1);
  el("carbon").textContent = carbon.toFixed(1);
  el("saving").textContent = `${Math.round(shiftRate * 100)}% lower peak impact`;
  el("hero-saving").textContent = `${Math.max(12, Math.round(shiftRate * 100))}%`;

  el("rec-title").textContent = flexible
    ? `Best move: run ${target} after 10 pm.`
    : "Add a flexible appliance to unlock a smart schedule.";

  el("rec-text").textContent = flexible
    ? `Shift ${flexible.toFixed(1)} kWh away from the 6–9 pm peak. Estimated lower-carbon energy: ${savedKwh.toFixed(1)} kWh.`
    : "Your essential energy remains forecasted, but there is nothing available to reschedule.";
}

el("temperature").addEventListener("input", (event) => {
  el("temp-value").textContent = `${event.target.value}°C`;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  predict();
});

predict();
```
