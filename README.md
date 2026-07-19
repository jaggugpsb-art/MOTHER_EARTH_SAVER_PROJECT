```md
# WattWise AI ♻️

WattWise AI is a browser-based household energy planner that forecasts next-day electricity demand with an explainable regression model. It recommends cleaner, lower-cost times to run flexible appliances and privately saves recent plans in a local browser database.

## Theme

**Clean & Green Technology — Energy Management**

## Features

- Personalised next-day household energy forecast
- Inputs for home size, occupancy, weather, and work-from-home routine
- Flexible-load planning for washing machines, dishwashers, and EV charging
- Carbon-impact estimate and peak-shifting recommendation
- Responsive UI for smartphones, tablets, laptops, and desktops
- Private IndexedDB browser database for saved forecast history
- No account, backend, API key, or smart-meter hardware required

## AI Implementation

WattWise uses an explainable linear-regression forecasting model.

The model combines:

- Home size
- Number of occupants
- Temperature deviation from 22°C
- Work-from-home activity
- Selected flexible appliance loads

It estimates expected energy use in kWh, calculates approximate CO₂ impact, and identifies how much flexible demand can be moved away from the high-demand 6–9 pm evening window.

The AI logic is central to the app: changing any user input updates the forecast, carbon estimate, and recommended action.

## Database

WattWise uses **IndexedDB**, a persistent browser database.

Saved energy plans are stored only on the user’s device. No household data is sent to a server, making the app private, fast, and easy to deploy using GitHub Pages.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- IndexedDB
- Explainable local regression model

## Run Locally

Download or clone the repository, then open `index.html` in a modern browser.

No installation or API key is required.

## Deploy

This is a static website and can be deployed for free using GitHub Pages.

1. Push the files to a public GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select branch **main** and folder **/ (root)**.
5. Click **Save**.
6. GitHub will provide the live website URL.

## Files

- `index.html` — Website structure
- `styles.css` — Responsive visual design
- `app.js` — AI forecasting logic and IndexedDB database
- `PROBLEM_STATEMENT.md` — Hackathon problem statement
- `SOLUTION_DESCRIPTION.md` — Solution and AI implementation details
- `DEMO_SCRIPT.md` — 2–3 minute demo video script

## Impact

WattWise helps households make small, realistic changes before energy demand peaks. Shifting flexible appliances to lower-demand hours can reduce electricity costs, lower peak-time carbon impact, and support a cleaner energy future.
```
