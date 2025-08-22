// Paste this into a Code node in n8n to simulate OTA data with real anomalies

// Simulate data that would come from OTA APIs/Data Warehouse
const otaData = [
  {
    property_id: "kasa_miami_beach_101",
    property_name: "Kasa Miami Beach Ocean View",
    platform: "airbnb",
    date: "2024-08-20",
    impressions: 380,  // 70% drop from 1250 average!
    impressions_avg: 1250,
    clicks: 3,
    bookings: 0,
    conversion_rate: 0.000,
    net_revenue: 0,
    avg_daily_revenue: 737,
    listing_status: "live",
    search_rank: 47,  // Dropped from 12
    alert_triggered: true
  },
  {
    property_id: "kasa_seattle_apt_405", 
    property_name: "Kasa Seattle Downtown Loft",
    platform: "expedia",
    date: "2024-08-20",
    impressions: 180,  // 75% drop
    impressions_avg: 680,
    clicks: 1,
    bookings: 0,
    net_revenue: 0,
    avg_daily_revenue: 467,
    listing_status: "error",  // Critical issue!
    calendar_last_updated: "2024-08-19T15:30:00Z",
    alert_triggered: true
  },
  {
    property_id: "kasa_nashville_house_809",
    property_name: "Kasa Nashville Music Row House",
    platform: "booking.com",
    date: "2024-08-20", 
    impressions: 450,  // 70% drop
    impressions_avg: 1465,
    clicks: 4,
    bookings: 0,
    net_revenue: 0,
    avg_daily_revenue: 1602,
    listing_status: "live",
    calendar_last_updated: "2024-08-20T08:15:00Z",  // 10+ hours stale
    alert_triggered: true
  },
  {
    property_id: "kasa_portland_studio_505",
    property_name: "Kasa Portland Pearl District",
    platform: "airbnb",
    date: "2024-08-20",
    impressions: 90,  // 73% drop
    impressions_avg: 330,
    clicks: 1,
    bookings: 0,
    net_revenue: 0,
    avg_daily_revenue: 106,
    listing_status: "suspended",  // Account suspended!
    instant_book: false,
    alert_triggered: true
  },
  {
    property_id: "kasa_austin_loft_203",
    property_name: "Kasa Austin Downtown Loft",
    platform: "airbnb",
    date: "2024-08-20",
    impressions: 1050,
    impressions_avg: 1016,
    clicks: 42,
    bookings: 4,
    conversion_rate: 0.095,
    net_revenue: 813,
    avg_daily_revenue: 814,
    listing_status: "live",
    search_rank: 3,
    alert_triggered: false  // Performing well
  },
  {
    property_id: "kasa_chicago_apt_606",
    property_name: "Kasa Chicago River North",
    platform: "booking.com",
    date: "2024-08-20",
    impressions: 400,  // 55% drop - triggers HIGH
    impressions_avg: 890,
    clicks: 15,
    bookings: 1,
    net_revenue: 180,
    avg_daily_revenue: 380,
    listing_status: "live",
    search_rank: 25,
    alert_triggered: true
  },
  {
    property_id: "kasa_boston_studio_707",
    property_name: "Kasa Boston Back Bay Studio",
    platform: "expedia",
    date: "2024-08-20",
    impressions: 280,  // 40% drop - triggers MEDIUM
    impressions_avg: 470,
    clicks: 8,
    bookings: 1,
    net_revenue: 150,
    avg_daily_revenue: 220,
    listing_status: "live",
    search_rank: 18,
    alert_triggered: true
  }
];

// Process each property and create alerts
const alerts = [];

for (const property of otaData) {
  if (!property.alert_triggered) continue;
  
  // Calculate impact metrics
  const impressionDropPct = Math.round(((property.impressions_avg - property.impressions) / property.impressions_avg) * 100);
  const revenueAtRisk = property.avg_daily_revenue;
  
  // Determine severity and create alert
  let severity = "MEDIUM";
  let emoji = "⚠️";
  let channel = "#ota-alerts-medium";
  let color = "#FFA500";
  let mentions = "";  // Who to tag
  
  // Critical conditions
  if (property.listing_status === "error" || property.listing_status === "suspended") {
    severity = "CRITICAL";
    emoji = "🚨";
    channel = "#ota-alerts-critical";
    color = "#FF0000";
    mentions = "<!channel> @revenue-team @distribution-team";  // Tag everyone for critical
  } else if (impressionDropPct > 70 && revenueAtRisk > 500) {
    severity = "CRITICAL";
    emoji = "🚨";
    channel = "#ota-alerts-critical";
    color = "#FF0000";
    mentions = "@revenue-team @ops-manager";  // Tag revenue team for high-value drops
  } else if (impressionDropPct > 50) {
    severity = "HIGH";
    emoji = "⚠️";
    channel = "#ota-alerts-high";
    color = "#FF8C00";
    mentions = "@distribution-team";  // Tag distribution for moderate issues
  }
  
  // Build alert message
  let issueDescription = "";
  let actionRequired = "";
  
  if (property.listing_status === "error") {
    issueDescription = "Listing showing ERROR status on " + property.platform;
    actionRequired = "1. Check " + property.platform + " extranet immediately\n2. Contact OTA support if needed\n3. Verify PMS sync status";
  } else if (property.listing_status === "suspended") {
    issueDescription = "Listing SUSPENDED on " + property.platform;
    actionRequired = "1. Contact " + property.platform + " support IMMEDIATELY\n2. Review account for policy violations\n3. Escalate to Revenue Management team";
  } else if (impressionDropPct > 70) {
    issueDescription = `Impressions dropped ${impressionDropPct}% (${property.impressions} vs ${property.impressions_avg} avg)`;
    actionRequired = "1. Verify listing is live on " + property.platform + "\n2. Check search ranking (currently #" + (property.search_rank || "N/A") + ")\n3. Review pricing competitiveness";
  } else {
    issueDescription = `Performance drop detected: ${impressionDropPct}% below average`;
    actionRequired = "1. Review listing content\n2. Check competitor pricing\n3. Verify availability calendar";
  }
  
  // Check for stale calendar
  if (property.calendar_last_updated) {
    const hoursStale = Math.round((Date.now() - new Date(property.calendar_last_updated)) / (1000 * 60 * 60));
    if (hoursStale > 12) {
      issueDescription += `\n📅 Calendar ${hoursStale} hours out of date`;
      actionRequired += "\n4. Force calendar sync in PMS";
    }
  }
  
  // Calculate weekly and monthly revenue impact
  const weeklyImpact = Math.round(revenueAtRisk * 7);
  const monthlyImpact = Math.round(revenueAtRisk * 30);
  
  alerts.push({
    json: {
      severity: severity,
      emoji: emoji,
      channel: channel,
      color: color,
      mentions: mentions,  // Add team mentions
      property_id: property.property_id,
      property_name: property.property_name,
      platform: property.platform.toUpperCase(),
      issue: issueDescription,
      drop_percentage: impressionDropPct,  // Make this a direct field
      revenue_impact_daily: revenueAtRisk,
      revenue_impact_weekly: weeklyImpact,
      revenue_impact_monthly: monthlyImpact,
      revenue_impact: `$${weeklyImpact}/week ($${monthlyImpact}/month) at risk`,
      action: actionRequired,
      metrics: {
        impressions: property.impressions,
        impressions_expected: property.impressions_avg,
        drop_percentage: impressionDropPct + "%",
        current_bookings: property.bookings,
        listing_status: property.listing_status,
        search_rank: property.search_rank || "N/A"
      },
      direct_link: `https://${property.platform}.com/manage/${property.property_id}`,
      timestamp: new Date().toISOString(),
      // Full message with mentions
      slack_text: `${emoji} ${mentions} *${severity} ALERT*: ${property.property_name} on ${property.platform.toUpperCase()}\n📉 Drop: ${impressionDropPct}% - ${issueDescription}\n💰 Revenue Impact: $${weeklyImpact}/week ($${monthlyImpact}/month) at risk\n🔗 <${`https://${property.platform}.com/manage/${property.property_id}`}|Fix it now>`
    }
  });
}

// Return alerts for Slack
return alerts;