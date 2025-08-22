# Technical Architecture - Implementation Details

## Alerting Engine
**n8n Workflow with Switch Node Routing**
- Manual Trigger → Code Node (analysis logic)
- Switch Node routes by severity (CRITICAL/HIGH/MEDIUM)
- 3 HTTP Request nodes with separate Slack webhooks
- Each webhook posts to dedicated channel (#ota-alerts-critical, etc.)

## 3-Stage Analysis Implementation

### Stage 1: First Impressions (Code Node - JavaScript)
```javascript
// In n8n Code node - analyzes what makes properties clickable
const impressionDropPct = ((avg - current) / avg) * 100;
const searchRank = property.search_rank || "N/A";
// Identifies: 70% impression drop, rank #47 vs normal #12
```

### Stage 2: Conversion Factors (Statistical Comparison)
```javascript
// Compares against historical averages
const avgRevenue = historical.reduce((sum, h) => sum + h.net_revenue) / historical.length;
const revenueAtRisk = avgRevenue > 0 ? avgRevenue : property.avg_nightly_rate * 0.7;
// Identifies: $737/day at risk, 0% conversion vs 3% normal
```

### Stage 3: Performance Metrics (Severity Logic)
```javascript
// Routes based on business impact
if (listing_status === "error" || "suspended") severity = "CRITICAL";
else if (dropPct > 70 && revenue > 500) severity = "CRITICAL";
else if (dropPct > 50) severity = "HIGH";
else severity = "MEDIUM";
```

## AI Enrichment Layer (Planned Enhancement)
**GPT-4 Vision API** (Not implemented in POC)
- Would analyze property photos for appeal scoring
- Compare descriptions against top performers
- Estimated cost: $0.02 per property per analysis

## Current Tech Stack (POC)
- **Orchestration**: n8n (self-hosted or cloud)
- **Data Processing**: JavaScript in n8n Code nodes
- **Alerting**: Slack Incoming Webhooks (3 separate URLs)
- **Data Source**: CSV file (simulating data warehouse)

## Future Tech Stack (Production)
- **Data Sources**: 
  - Internal: PostgreSQL/Snowflake data warehouse
  - External: AirDNA API ($500/month), Google Trends API (free)
- **AI Enhancement**: OpenAI GPT-4 Vision API
- **Orchestration**: n8n with scheduled triggers (every 4 hours)
- **Alerting**: Slack OAuth App (dynamic channel routing)

## Why This Architecture
- **n8n over Zapier**: $50/month vs $6000/month at scale
- **Code nodes over no-code**: Complex logic requires custom JavaScript
- **Switch over nested IFs**: Cleaner routing for 3+ conditions
- **Separate webhooks**: Slack webhooks are channel-locked

This is a **proof of concept** showing the alerting logic works. Production would add the external data sources and AI enrichment.