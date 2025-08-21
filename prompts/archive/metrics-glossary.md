# OTA Metrics & Hospitality Glossary

## Core Business Metrics

### NetRevPAR (Net Revenue Per Available Room)
**Definition**: Total revenue minus distribution costs, divided by available room nights
**Formula**: (Total Revenue - OTA Commissions - Operating Costs) / Available Rooms
**Why it matters**: True profitability metric, not just top-line revenue
**Example**: Gross $200/night - 15% OTA fee - $20 cleaning = $150 NetRevPAR

### RevPAR (Revenue Per Available Room)
**Definition**: Total room revenue divided by available rooms
**Formula**: ADR × Occupancy Rate
**Example**: $150 ADR × 80% occupancy = $120 RevPAR

### ADR (Average Daily Rate)
**Definition**: Average price paid per occupied room
**Formula**: Total Room Revenue / Rooms Sold
**Note**: Only counts occupied rooms, not available rooms

### Occupancy Rate
**Definition**: Percentage of available rooms that are occupied
**Formula**: (Rooms Occupied / Rooms Available) × 100
**Benchmark**: 70-85% is typically healthy for short-term rentals

## OTA Performance Metrics

### Impressions
**Definition**: Number of times your listing appears in search results
**What impacts it**: 
- Search ranking
- Pricing competitiveness
- Availability
- Filters applied by guests

### Page Views / Clicks
**Definition**: Number of times guests click through to view your full listing
**Healthy ratio**: 2-5% click-through rate from impressions

### Conversion Rate
**Definition**: Percentage of page views that result in bookings
**Formula**: (Bookings / Page Views) × 100
**Benchmark**: 1-3% is typical, varies by market

### Booking Velocity
**Definition**: Rate at which future dates are being booked
**Measurement**: Bookings per day for future dates
**Use case**: Detect demand changes early

### Search Ranking
**Definition**: Position in search results for relevant queries
**Factors affecting ranking**:
- Response rate (>90% ideal)
- Acceptance rate
- Cancellation rate (<5%)
- Review scores (>4.7)
- Pricing competitiveness
- Instant Book enabled

### Response Rate
**Definition**: Percentage of inquiries responded to within 24 hours
**Target**: >90% for Airbnb Superhost, affects search ranking

### Response Time
**Definition**: Average time to first response to guest inquiries
**Target**: <1 hour optimal, <24 hours required

## OTA-Specific Terms

### Extranet
**Definition**: OTA's partner portal for managing listings
**Examples**: 
- Airbnb Host Dashboard
- Booking.com Extranet
- Expedia Partner Central

### Channel Manager
**Definition**: Software that syncs inventory across multiple OTAs
**Purpose**: Prevent double bookings, sync pricing/availability

### Rate Parity
**Definition**: Maintaining consistent pricing across all channels
**Note**: Some OTAs require this contractually

### Commission Structure
**Typical rates**:
- Airbnb: 3% host fee + guest fee
- Booking.com: 15-18% commission
- Expedia: 15-25% commission

### Instant Book / Book Now
**Definition**: Allowing guests to book without host approval
**Impact**: Higher search ranking, more bookings, less control

## Anomaly Types to Monitor

### Hard Failures
- **Listing Offline**: 0 impressions, complete failure
- **Calendar Blocked**: No availability showing
- **Pricing Missing**: Certain dates without rates

### Performance Degradation
- **Conversion Collapse**: >25% drop in booking rate
- **Impression Decline**: Gradual loss of visibility
- **Ranking Drop**: Lost search position

### Competitive Threats
- **Price Undercut**: Competitors pricing below you
- **New Inventory**: New listings in your area
- **Review Impact**: Recent negative reviews

### Seasonal Patterns
- **Day of Week**: Business vs leisure travel patterns
- **Monthly Cycles**: Beginning/end of month booking patterns
- **Event Driven**: Local events, conferences, holidays

## Financial Impact Calculations

### Lost Revenue Calculation
```
Daily Loss = (Expected Bookings - Actual Bookings) × ADR
Example: (3 expected - 1 actual) × $150 = $300/day loss
```

### Opportunity Cost
```
Opportunity = (Competitor Occupancy - Your Occupancy) × ADR × Rooms
Example: (85% - 70%) × $150 × 10 rooms = $225/day opportunity
```

### Commission Impact
```
Net Revenue = Gross Revenue × (1 - Commission Rate)
Example: $10,000 × (1 - 0.15) = $8,500 net
```

## Alert Priority Framework

### Critical (Immediate Action)
- Revenue impact >$500/day
- Complete listing failure
- >50% metric degradation

### High (Same Day)
- Revenue impact $100-500/day
- 25-50% metric degradation
- Competitive threats

### Medium (Within 48 hours)
- Revenue impact $50-100/day
- 10-25% metric degradation
- Optimization opportunities

### Low (Weekly Review)
- Revenue impact <$50/day
- <10% variance
- Informational updates

## Common Issues & Solutions

### "Listing Not Showing"
**Causes**: 
- No availability in next 30 days
- Pricing missing
- Listing paused/unlisted
- Policy violation

### "Low Conversion"
**Causes**:
- Uncompetitive pricing
- Poor photos
- Missing amenities
- Bad reviews
- Slow response time

### "Ranking Dropped"
**Causes**:
- Low response rate
- High cancellation rate
- Price too high
- Instant Book disabled
- New competition

## Industry Benchmarks

### Urban Markets
- Occupancy: 75-85%
- ADR: Varies widely
- Booking Window: 7-14 days

### Resort/Vacation Markets
- Occupancy: 65-75%
- ADR: Higher, seasonal
- Booking Window: 30-60 days

### Business Travel Markets
- Occupancy: 70-80%
- ADR: Stable year-round
- Booking Window: 3-7 days