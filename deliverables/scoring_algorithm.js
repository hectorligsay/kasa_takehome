/**
 * OTA Competitive Intelligence Scoring Algorithm
 * For use in n8n Code Node or standalone Node.js
 */

function analyzePropertyPerformance(kasaProperty, competitors) {
    // Stage 1: First Impressions Analysis
    function analyzeFirstImpressions(property, topPerformers) {
        const photoAppeal = property.photoScore || 4; // 1-10 scale
        const competitorAvg = topPerformers.reduce((sum, c) => sum + (c.photoScore || 7), 0) / topPerformers.length;
        
        const priceGap = Math.abs(property.adr - competitorAvg) / competitorAvg;
        const priceCompetitive = 1 - priceGap;
        
        return {
            score: (photoAppeal / 10 * 0.5) + (priceCompetitive * 0.5),
            gap: competitorAvg - photoAppeal,
            action: photoAppeal < competitorAvg ? 
                `Update photos to match top performers (score ${competitorAvg.toFixed(1)}/10)` : 
                "Photos performing well"
        };
    }
    
    // Stage 2: Conversion Factors
    function analyzeConversion(property, topPerformers) {
        const descScore = property.descriptionScore || 0.6;
        const reviewScore = (property.reviewRating || 4.5) / 5;
        const competitorReviews = topPerformers.reduce((sum, c) => sum + (c.reviewRating || 4.5), 0) / topPerformers.length / 5;
        
        return {
            score: (descScore * 0.4) + (reviewScore * 0.6),
            gap: competitorReviews - reviewScore,
            action: descScore < 0.7 ? "Improve description readability" : "Description optimized"
        };
    }
    
    // Stage 3: Performance Metrics
    function analyzePerformance(property, marketData) {
        const occupancy = property.occupancy || 0.46;
        const marketAvg = marketData.avgOccupancy || 0.56;
        const occupancyGap = marketAvg - occupancy;
        const monthlyLoss = occupancyGap > 0 ? occupancyGap * 30 * property.adr : 0;
        
        return {
            score: occupancy / marketAvg,
            monthlyLoss: monthlyLoss,
            occupancyGap: (occupancyGap * 100).toFixed(1),
            action: `Improve to market avg to gain $${monthlyLoss.toFixed(0)}/month`
        };
    }
    
    // Test with different personas
    function testPersonas(property) {
        const personas = {
            budget_conscious: property.adr < 250 ? 8 : 4,
            family_vacation: property.bedrooms >= 3 ? 7 : 3,
            luxury_seeker: property.amenityScore > 0.8 ? 9 : 5
        };
        
        const weakestPersona = Object.entries(personas).reduce((min, [persona, score]) => 
            score < min.score ? {persona, score} : min, {persona: '', score: 10});
        
        return {
            scores: personas,
            weakness: weakestPersona,
            recommendation: `Focus on ${weakestPersona.persona} segment (score: ${weakestPersona.score}/10)`
        };
    }
    
    // Calculate weighted score
    const weights = {
        photos: 0.30,
        pricing: 0.25,
        reviews: 0.20,
        description: 0.15,
        amenities: 0.10
    };
    
    // Get top 5 performers
    const sortedCompetitors = competitors.sort((a, b) => calculateScore(b) - calculateScore(a));
    const top5 = sortedCompetitors.slice(0, 5);
    
    // Run analysis
    const stage1 = analyzeFirstImpressions(kasaProperty, top5);
    const stage2 = analyzeConversion(kasaProperty, top5);
    const stage3 = analyzePerformance(kasaProperty, {avgOccupancy: 0.56});
    const personas = testPersonas(kasaProperty);
    
    // Calculate ranking
    const kasaScore = calculateScore(kasaProperty);
    const ranking = competitors.filter(c => calculateScore(c) > kasaScore).length + 1;
    const percentile = ((competitors.length - ranking + 1) / competitors.length * 100).toFixed(0);
    
    // Determine severity for Slack routing
    let severity, channel;
    if (ranking > competitors.length * 0.8 || stage3.monthlyLoss > 3000) {
        severity = "CRITICAL";
        channel = "#ota-critical";
    } else if (stage3.monthlyLoss > 1500) {
        severity = "HIGH";
        channel = "#ota-quick-wins";
    } else {
        severity = "MEDIUM";
        channel = "#ota-insights";
    }
    
    // Format Slack alert
    return {
        propertyId: kasaProperty.id,
        ranking: `#${ranking} of ${competitors.length + 1}`,
        percentile: `${percentile}%`,
        severity: severity,
        channel: channel,
        monthlyLoss: stage3.monthlyLoss,
        netRevPARImpact: `${(stage3.monthlyLoss / (kasaProperty.adr * 30) * 100).toFixed(1)}% NetRevPAR erosion`,
        analysis: {
            firstImpressions: stage1,
            conversion: stage2,
            performance: stage3,
            personas: personas
        },
        recommendations: [
            stage1.action,
            stage2.action,
            stage3.action,
            personas.recommendation
        ],
        slackPayload: {
            channel: channel,
            text: `🚨 ${severity}: Property ${kasaProperty.id} ranking ${ranking}/${competitors.length + 1}`,
            attachments: [{
                color: severity === 'CRITICAL' ? 'danger' : 'warning',
                fields: [
                    {title: 'NetRevPAR Impact', value: `-$${stage3.monthlyLoss.toFixed(0)}/month`, short: true},
                    {title: 'Ranking', value: `#${ranking} of ${competitors.length + 1}`, short: true},
                    {title: 'Top Action', value: stage1.action, short: false}
                ]
            }]
        }
    };
}

function calculateScore(property) {
    return (property.photoScore || 7) / 10 * 0.3 +
           (property.descriptionScore || 0.7) * 0.15 +
           (property.reviewRating || 4.5) / 5 * 0.2 +
           (property.priceCompetitive || 0.8) * 0.25 +
           (property.amenityScore || 0.7) * 0.1;
}

// Example usage (would come from n8n's input data)
const kasaProperty = {
    id: 'KASA_MIAMI_001',
    photoScore: 4,
    adr: 326,
    occupancy: 0.46,
    descriptionScore: 0.6,
    reviewRating: 4.5,
    bedrooms: 2,
    amenityScore: 0.7,
    priceCompetitive: 0.75
};

const competitors = [
    {photoScore: 7, adr: 310, occupancy: 0.58, descriptionScore: 0.8, reviewRating: 4.6},
    {photoScore: 8, adr: 340, occupancy: 0.62, descriptionScore: 0.75, reviewRating: 4.7},
    {photoScore: 6, adr: 295, occupancy: 0.54, descriptionScore: 0.7, reviewRating: 4.4}
    // Would have 20-30 in production
];

// Run analysis
const result = analyzePropertyPerformance(kasaProperty, competitors);
console.log(JSON.stringify(result, null, 2));

// For n8n: return the result object
// return result;