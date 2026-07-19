# 2–3 Minute Demo Script

## 0:00–0:25 — The problem

“Household electricity is usually invisible until the bill arrives. In the evening, many homes use cooling, lighting, cooking appliances, washing machines, and EV chargers at the same time. That pushes demand onto a more carbon-intensive grid. Existing dashboards show what happened yesterday, but don’t help a family decide what to do tomorrow.”

## 0:25–0:45 — Introduce WattWise

“This is WattWise AI: a privacy-friendly energy planner that forecasts a home’s demand and finds a practical way to avoid the evening peak. It works directly in the browser and needs no smart meter or account.”

## 0:45–1:35 — Show AI in action

“I’ll enter a two-bedroom home with two people, one person working from home, and a warm 31-degree day. I’ve selected a washer and dishwasher as flexible appliances. Now I’ll run the AI forecast.”

“The model estimates the next-day electricity use and carbon impact. Its key recommendation is to move the selected flexible appliances after 10 pm, away from the 6–9 pm peak. Here it identifies the amount of shiftable load and the lower peak impact.”

“To show that it is not static, I’ll change the temperature and add EV charging. The forecast, CO₂ estimate, and saving recommendation all update because the model uses those inputs.”

## 1:35–2:10 — Explain the model

“At the core is an explainable linear-regression model. It combines home size, occupancy, temperature deviation, work-from-home behaviour, and appliance loads. I intentionally keep it local and transparent, so it is fast, private, and easy to inspect in the public source code.”

## 2:10–2:30 — Impact and close

“WattWise makes one small, realistic change visible before it is too late to act. Lower peak demand can mean lower bills for a home and cleaner electricity use for the community. That is how we make every watt count.”
