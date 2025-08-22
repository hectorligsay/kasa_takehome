# System Architecture

## POC Implementation - Competitive Intelligence System

```mermaid
graph TB
    subgraph "Data Collection"
        INTERNAL[Internal Metrics<br/>PostgreSQL/CSV]
        AIRDNA[AirDNA API<br/>Market Data $500/mo]
        GOOGLE[Google Trends API<br/>Demand Forecasting]
        COMPETITOR[Competitor Scraping<br/>Public Listings]
    end

    subgraph "n8n Orchestration & Processing"
        TRIGGER[Manual/Schedule Trigger]
        CODE[Code Node: JavaScript Analysis]
        
        subgraph "3-Stage Analysis Framework"
            S1["Stage 1: First Impressions<br/>• GPT-4 Vision: Photo appeal scoring<br/>• Competitor scraping: Price positioning<br/>• Internal data: Search rank tracking<br/>• Google Trends: Keyword demand"]
            S2["Stage 2: Conversion Factors<br/>• Custom scraper + GPT-4: Review sentiment<br/>• GPT-4: Description quality scoring<br/>• AirDNA: Amenity competitiveness<br/>• Internal data: Booking velocity"]
            S3["Stage 3: Performance Metrics<br/>• AirDNA: Market occupancy/ADR benchmarks<br/>• Google Trends: Demand forecasting<br/>• Internal data: Revenue calculations<br/>• Statistical analysis: Performance percentiles"]
        end
        
        SWITCH[Switch Node: Route by Severity]
    end

    subgraph "Alert Delivery - Slack Webhooks"
        CRITICAL["#ota-alerts-critical<br/>Bottom 20% / Errors"]
        HIGH["#ota-alerts-high<br/>Quick Wins 50-70% drop"]
        MEDIUM["#ota-alerts-medium<br/>Opportunities 40-50% drop"]
    end

    INTERNAL --> TRIGGER
    AIRDNA --> TRIGGER
    GOOGLE --> TRIGGER
    COMPETITOR --> TRIGGER
    
    TRIGGER --> CODE
    CODE --> S1
    S1 --> S2
    S2 --> S3
    S3 --> SWITCH
    
    SWITCH -->|CRITICAL| CRITICAL
    SWITCH -->|HIGH| HIGH
    SWITCH -->|MEDIUM| MEDIUM

    style AIRDNA fill:#1976d2,color:#fff
    style CODE fill:#4CAF50,color:#fff
    style CRITICAL fill:#d32f2f,color:#fff
```

### The 3-Stage Analysis Framework

**Stage 1: First Impressions (What Gets Clicks)**

- Hero image appeal scoring via GPT-4 Vision
- Title optimization for search keywords
- Price positioning vs competitors

**Stage 2: Conversion Factors (What Drives Bookings)**

- Description readability and persuasiveness
- Review sentiment analysis
- Amenity competitiveness scoring

**Stage 3: Performance Benchmarking (Backend Metrics)**

- Occupancy rate vs market average (AirDNA)
- Booking velocity comparison
- Calendar optimization analysis

### Data Sources Explained

- **Internal Data**: Your actual performance metrics
- **AirDNA API**: Market occupancy, ADR, RevPAR ($500/month)
- **Google Trends**: Demand forecasting (free)
- **Public Listings**: Competitor analysis via ethical scraping

### Cost Structure

- **n8n hosting**: $50/month (unlimited executions)
- **AirDNA API**: $500/month (market intelligence)
- **GPT-4 Vision**: ~$180/month (100 properties daily)
- **Total**: ~$730/month for complete intelligence

## Why This Architecture Wins

1. **Scales efficiently**: Same architecture works for 10 or 1000 properties
2. **Cost-effective**: Fixed $730/month vs $6000+ for Zapier at scale
3. **Intelligent insights**: Not just "what's wrong" but "why" and "how to fix"
4. **Market context**: Performance relative to competitors, not absolute thresholds
5. **Actionable alerts**: Specific fixes with expected ROI, not generic warnings
