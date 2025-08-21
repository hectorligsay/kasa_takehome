# Kasa AI Innovation Specialist - Take-Home Test Master Context

## Project Overview

- **Company**: Kasa - Leading tech-enabled hotel and apartment hotel brand
- **Position**: AI Innovation Specialist (Remote, US-based)
- **Salary Range**: $100K-$115K base + equity + benefits
- **Timeline**: 5 days to complete take-home test (started: 2025-08-18)
- **Goal**: Design an automated OTA monitoring system that prevents revenue loss

## The Challenge: OTA Performance Monitoring

### Current Situation

- Kasa manages **hundreds of listings** across Airbnb, Expedia, and Booking.com
- Uses a **lean centralized team** for management
- Currently relies on **manual monitoring** and spreadsheets
- OTA-reported metrics reviewed manually: search rank, impressions, clicks, conversions, booking velocity
- **Critical issues go undetected**: listings down, missing fees/policies, poor conversion rates
- Teams waste time triaging preventable issues instead of strategic improvements

### Business Objective

- Improve **NetRevPAR** (Net Revenue Per Available Room) - focus on profitability, not just bookings
- Minimize preventable revenue loss from broken listings
- Ensure high-ROI visibility across all OTAs
- Reduce manual QA overhead

## Deliverables Required

### 1. Memo

- Methodology overview and key assumptions
- The Why: Tool selection rationale
- The How: Alert surfacing recommendations
- Error handling approach
- The "And Then What": Action item translation for teams
- Follow-up questions and next steps

### 2. Working Automation

- Proof of concept using Zapier, n8n, or custom scripts
- Must execute part of the pipeline

### 3. Automation Architecture Diagram

- Visual layout of end-to-end workflow
- Tools, data flow, and dependencies

### 4. Sample Alert Logic

- Scoring logic or anomaly detection approach
- How to flag underperforming listings

## What Makes This "AI-Powered" vs Basic Automation

### Basic Automation (Not What They Want)

- Simple scheduled checks (CRON jobs)
- Binary alerts (listing is up/down)
- Static thresholds (alert if views < 50)

### AI-Powered Automation (What They Want)

- **Pattern Recognition**: "This listing's Tuesday bookings are 40% below similar properties"
- **Intelligent Prioritization**: "Focus on this issue - it's costing $500/day based on historical patterns"
- **Predictive Alerts**: "This listing shows early signs of the same issue that caused revenue drop last month"
- **Context-Aware Decisions**: "Miami beach properties should get 50 views/day in December, but this one has 10"
- **Root Cause Analysis**: "Last 3 times we saw this pattern, it was missing pet fees"

## Kasa's Tech Stack & Preferences (from job posting)

### Tools They Mention

- **Orchestration**: Zapier, n8n, Make, Prefect
- **Languages**: Python, SQL, JavaScript
- **APIs**: REST/GraphQL experience required
- **Cloud Services**: General cloud automation stacks
- **Integration Focus**: API-first approach to connect systems

### Key Technical Requirements

- API integration expertise (webhooks, system integrations)
- Complex multi-step automation design
- Error handling and edge case management
- Scalable, maintainable solutions

## Candidate Background

### Relevant Experience

1. **Spectrum Sales Calculator**

   - Built automation to remove manual work during sales calls
   - Automated quote generation and note-taking
   - Shows understanding of operational efficiency

2. **AI Dance Feedback System**

   - Integrated LLM for automated personalized feedback
   - Shows AI implementation experience

3. **LLM-Triggered Web Scraping**
   - Built intelligent workflows combining AI + automation
   - Demonstrates advanced integration skills

### Strengths to Leverage

- Proven track record of identifying and eliminating manual work
- Experience with AI integration in production
- Understanding of user impact and operational efficiency

## Strategic Approach

### Phase 1: Problem Definition

- Map current manual monitoring workflow
- Identify highest-impact metrics to monitor
- Define what "underperforming" means in different contexts

### Phase 2: Solution Architecture

- Select appropriate tools (likely n8n for open-source scalability)
- Design data ingestion from OTA APIs
- Create intelligent alert scoring system
- Build escalation and routing logic

### Phase 3: Implementation

- Build POC focusing on one critical metric
- Show clear business impact calculation
- Demonstrate scalability potential

### Phase 4: Presentation

- Lead with business impact (NetRevPAR improvement)
- Show technical sophistication without overwhelming
- Include clear next steps and expansion potential

## Key Success Factors

1. **Business-First Thinking**

   - Every technical decision tied to NetRevPAR impact
   - Clear ROI calculations

2. **Scalability**

   - Solution must work for hundreds of listings
   - Minimal marginal cost per listing

3. **Actionability**

   - Alerts must be specific and actionable
   - Clear ownership and escalation paths

4. **Intelligence**
   - Goes beyond simple threshold monitoring
   - Uses historical patterns and peer comparisons

## Important Notes

- They use the term "AI Innovation Specialist" - emphasize the AI/intelligent aspects
- Remote-first company - show you can work independently
- They value automation that lets teams focus on "higher-value work"
- Engineering collaboration is key - show you can bridge technical/business

## Questions to Address in Solution

1. How do we define "underperforming" dynamically based on context?
2. What's the optimal alert frequency to avoid fatigue?
3. How do we prioritize alerts by revenue impact?
4. How do we handle OTA API rate limits?
5. What's the feedback loop for improving alert accuracy?

## Competitive Edge Ideas

- Include predictive elements (prevent issues before they happen)
- Show cost savings calculation (hours saved × hourly rate)
- Demonstrate understanding of hospitality industry metrics
- Include a learning/improvement mechanism in the system
