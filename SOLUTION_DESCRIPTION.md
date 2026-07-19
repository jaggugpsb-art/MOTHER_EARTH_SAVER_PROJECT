# Solution Description — WattWise AI

WattWise AI is an interactive energy-management web application that turns simple household inputs into an actionable next-day energy plan. The user selects their home size, number of occupants, expected temperature, work-from-home level, and appliances that can be scheduled flexibly. WattWise immediately generates a projected energy use, estimated carbon impact, and an evening-peak avoidance recommendation.

## AI method

The application uses an explainable linear-regression forecasting model. The model combines a baseline demand with weighted features for bedrooms, occupants, weather-driven cooling/heating demand, and work-from-home activity. This produces a forecast in kWh. A second optimisation layer sums selected flexible appliance loads and calculates the potential peak-impact reduction from scheduling them after 10 pm rather than during 6–9 pm.

This method was chosen because it is fast enough to run on the client, transparent enough for users and judges to understand, and aligned with the decision the product needs to make. The AI output is central to the product: every displayed forecast, CO₂ estimate, saving percentage, and recommendation changes according to the model’s input features.

## Implementation

The application uses vanilla HTML, CSS, and JavaScript. It has no backend, API key, tracking, or dependency installation requirement. The prediction code lives in `app.js`, which makes it easy to inspect and deploy to any static host. The responsive user interface is designed for a short live demo: users can change values and immediately see the AI’s recommendation update.
