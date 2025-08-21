flowchart TB
subgraph OTAs
A[Airbnb API]
B[Expedia API]
C[Booking API]
end

      A --> D[n8n Collector]
      B --> D
      C --> D
      D --> E[Anomaly Detection]
      E --> F{Alert Scoring}
      F -->|Critical| G[Slack #revenue-critical]
      F -->|High| H[Slack #ops-high]
      F -->|Medium| I[Email Digest]
