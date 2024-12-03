// src/constants/tooltipContent.js

export const CCRA_TOOLTIPS = {
  // General CCRA Information
  what_is_ccra: {
    title: "What is a CCRA?",
    content: "A Climate Change Risk Assessment (CCRA) helps cities understand and prepare for climate-related risks. It analyzes how different climate hazards might affect various sectors of your city, considering both current vulnerabilities and future projections."
  },

  // Risk Score Components
  risk_score: {
    title: "Understanding Risk Scores",
    content: "Risk scores combine three factors: the likelihood of a climate hazard occurring (Hazard), who/what might be affected (Exposure), and how susceptible they are to damage (Vulnerability). Higher scores indicate greater risk."
  },

  hazard_score: {
    title: "Hazard Score",
    content: "This measures how likely and severe a climate threat is for your area. It's based on historical data and climate projections."
  },

  exposure_score: {
    title: "Exposure Score",
    content: "This indicates how many people, assets, or systems could be affected by a climate hazard in your area."
  },

  vulnerability_score: {
    title: "Vulnerability Score",
    content: "This shows how sensitive your city's people and systems are to damage from climate hazards, and how well they can adapt or recover."
  },

  // Section-specific Information
  top_risks: {
    title: "Top Risks Section",
    content: "These are the climate hazards that pose the greatest threat to your city. They're calculated by combining hazard likelihood, exposure, and vulnerability scores."
  },

  hazard_comparison: {
    title: "Hazard Comparison Chart",
    content: "This chart shows how different aspects of risk (hazard, exposure, and vulnerability) contribute to your city's overall risk score for each climate threat."
  },

  sector_distribution: {
    title: "Sector Distribution",
    content: "This visualization shows how climate risks are distributed across different sectors of your city (e.g., water resources, health, infrastructure). It helps identify which sectors need the most attention."
  },

  projections: {
    title: "Future Projections",
    content: "These graphs show how climate risks might change in the future under different scenarios. 'Optimistic' assumes strong climate action, while 'Pessimistic' assumes business as usual."
  },

  qualitative_assessment: {
    title: "Qualitative Assessment",
    content: "This questionnaire helps refine your risk assessment by incorporating local knowledge and factors that might not be captured in the data, such as recent adaptations or specific vulnerabilities."
  },

  // Risk Levels
  risk_levels: {
    title: "Risk Levels Explained",
    content: "Very High (>0.8): Immediate action required\nHigh (0.6-0.8): Priority action needed\nMedium (0.4-0.6): Monitor and plan action\nLow (0.2-0.4): Keep monitoring\nVery Low (<0.2): Minimal current risk"
  },

  // Adaptation Guidance
  adaptation_strategies: {
    title: "Adaptation Strategies",
    content: "Based on your risk assessment, consider both immediate actions (like emergency response plans) and long-term strategies (like infrastructure upgrades). Focus first on sectors with the highest risk scores."
  }
};

export const INTRO_CONTENT = {
  title: "Welcome to Your Climate Change Risk Assessment",
  description: `This tool helps you understand how climate change might affect your city. By analyzing data about climate hazards, exposure, and vulnerability, we can identify your city's biggest climate risks and help you plan for them.

Key features:
• Comprehensive risk analysis across multiple sectors
• Future projections under different climate scenarios
• Customized risk scores based on local conditions
• Practical adaptation recommendations`
};