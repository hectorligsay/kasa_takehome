# Case Study Option 2 - OTA Monitoring

## Scenario
Kasa distributes room inventory across OTAs like Airbnb, Expedia, and Booking.com, managing hundreds of listings with a lean centralized team. Kasa currently relies on OTA-reported performance metrics (e.g., search rank, page impressions, clicks, conversions, and booking velocity) to optimize revenue and fix distribution issues. However, many of these metrics are reviewed manually and not integrated into a real-time alert system.

As a result, many high-impact errors—such as listings being down, lacking fees or policies, or under-converting due to bad rate plans or length of stay restrictions—can go undetected until revenue performance has been compromised. While we've built manual tracking in spreadsheets (e.g. OTA uptime and conversion tracking), these tools don't scale well and require constant human monitoring. Distribution and Revenue teams waste time triaging preventable issues, reducing focus on strategic improvements.

One of Kasa's core goals is to improve NetRevPAR (net revenue per available room), not just topline bookings. That means we must minimize preventable revenue loss from broken listings and ensure high-ROI visibility across OTAs. Automating alerts when listing performance drops is critical to drive higher uptime, conversion, and ultimately NetRevPAR—all while reducing manual QA overhead.

## Your Mission
As Kasa's new AI Innovation Specialist, your first mission is to design an automated alert system to automatically detect and alert on underperforming OTA listings across Kasa's portfolio. Your solution should proactively flag conversion drops, missing fees, poor search visibility, or anomalies in booking velocity—enabling Distribution and Revenue teams to respond before revenue is lost.

## Deliverables
Candidates are encouraged to focus on breadth of thought and clarity of automation architecture over polished code. Final output should include:

### Memo
Brief overview of methodology and key assumptions, recommendations, and next steps (e.g., follow-up questions, QA, future refinement). This should include:
- **The Why**: Explain why you chose specific tools (e.g., Apollo, Clay, Clearbit, n8n, Airbyte, Google Maps API, etc.).
- **The How**: Your recommendation for where and how these alerts get surfaced to Distribution, Revenue Management, or other team members.
- **Error handling**.
- **The "And Then What"**: Your recommendation for how to translate insights into action items for respective teams.

### Workflow Output
- **Working Automation**: Share a simple proof of concept using Zapier, n8n, or custom scripts that executes part of this pipeline.
- **Automation Architecture Diagram**: Visual layout of the end-to-end workflow, including tools, data flow, and dependencies.
- **Sample Alert Logic**: A scoring logic or anomaly detection approach to flag listings

## What We're Looking For
- Comfort combining data, AI and enrichment tools to build scalable workflows that minimize human effort and intervention.
- Hands-on knowledge of API integration and automation platforms.
- An automation-first mindset that aligns with business goals
- Ability to translate insight to action
- Accuracy of model logic (does it truly reflect profitability?)
- Creativity in automation and integration approach!