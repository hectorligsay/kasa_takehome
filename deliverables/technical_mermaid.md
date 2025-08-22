# Technical Implementation Diagram

```mermaid
graph TB
    subgraph "Data Collection"
        INTERNAL[Internal Metrics<br/>PostgreSQL/CSV]
        AIRDNA[AirDNA Market Data<br/>REST API - $500/mo]
        GOOGLE[Google Trends<br/>Free API]
        COMPETITOR[Competitor Listings<br/>Web Scraping]
    end

    subgraph "Processing & Analysis - n8n Workflow"
        TRIGGER[Manual/Schedule Trigger]
        CODE[Code Node<br/>JavaScript Analysis]
        
        subgraph "3-Stage Analysis Logic"
            S1[Stage 1: Calculate Drops<br/>impressionDropPct = 70%]
            S2[Stage 2: Revenue Impact<br/>weeklyImpact = daily × 7]
            S3[Stage 3: Severity Rules<br/>if error then CRITICAL]
        end
        
        SWITCH[Switch Node<br/>Route by Severity]
    end

    subgraph "AI Enrichment (Future)"
        GPT[GPT-4 Vision API<br/>Photo Appeal Scoring<br/>$180/month]
    end

    subgraph "Alerting Engine - Slack"
        CRITICAL_HTTP[HTTP Request<br/>Webhook #1]
        HIGH_HTTP[HTTP Request<br/>Webhook #2]
        MEDIUM_HTTP[HTTP Request<br/>Webhook #3]
        
        CRITICAL_SLACK[#ota-alerts-critical]
        HIGH_SLACK[#ota-alerts-high]
        MEDIUM_SLACK[#ota-alerts-medium]
    end

    INTERNAL --> TRIGGER
    AIRDNA -.-> TRIGGER
    GOOGLE -.-> TRIGGER
    COMPETITOR -.-> TRIGGER
    
    TRIGGER --> CODE
    CODE --> S1
    S1 --> S2
    S2 --> S3
    S3 --> SWITCH
    
    CODE -.-> GPT
    GPT -.-> CODE
    
    SWITCH -->|severity=CRITICAL| CRITICAL_HTTP
    SWITCH -->|severity=HIGH| HIGH_HTTP
    SWITCH -->|severity=MEDIUM| MEDIUM_HTTP
    
    CRITICAL_HTTP --> CRITICAL_SLACK
    HIGH_HTTP --> HIGH_SLACK
    MEDIUM_HTTP --> MEDIUM_SLACK

    style CODE fill:#4CAF50,color:#fff
    style SWITCH fill:#2196F3,color:#fff
    style GPT fill:#FF9800,color:#fff,stroke-dasharray: 5 5
    style AIRDNA stroke-dasharray: 5 5
    style GOOGLE stroke-dasharray: 5 5
    style COMPETITOR stroke-dasharray: 5 5
    style CRITICAL_SLACK fill:#d32f2f,color:#fff
    style HIGH_SLACK fill:#FF8C00,color:#fff
    style MEDIUM_SLACK fill:#FFA500,color:#fff

    classDef implemented fill:#4CAF50,color:#fff
    classDef future stroke-dasharray: 5 5
    classDef critical fill:#d32f2f,color:#fff
```

## Legend
- **Solid lines**: Implemented in POC
- **Dashed lines**: Future enhancements
- **Green**: Core processing (n8n Code node)
- **Blue**: Routing logic (n8n Switch node)
- **Orange**: AI enhancement (not yet implemented)
- **Red/Orange/Yellow**: Severity-based Slack channels

## Key Technical Details Shown
1. **n8n Workflow** handles all orchestration
2. **Code Node** contains the 3-stage JavaScript analysis
3. **Switch Node** routes based on severity field
4. **3 separate HTTP Request nodes** with unique webhooks
5. **Future integrations** shown with dashed lines

This makes it clear that:
- The "3-Stage Analysis" is JavaScript code inside n8n, not separate services
- The "Alerting Engine" is n8n's Switch node + HTTP requests to Slack
- The AI enrichment is planned but not built yet