// src/constants/sectionContent.js

export const CCRA_TOOLTIPS = {
  what_is_ccra: {
    title: "What is a CCRA?",
    content: "A Climate Change Risk Assessment (CCRA) helps cities understand and prepare for climate-related risks. It analyzes how different climate hazards might affect various sectors of your city, considering both current vulnerabilities and future projections."
  },
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
  }
};

export const SECTION_TOOLTIPS = {
  top_risks: {
    title: "Top Risks",
    description: "These are the climate hazards that pose the greatest threat to your city. They're calculated by combining hazard likelihood, exposure, and vulnerability scores.",
    insights: "Focus on risks marked 'High' or 'Very High' as they require immediate attention. Consider both the overall risk score and individual components when planning responses."
  },
  hazard_comparison: {
    title: "Hazard Comparison",
    description: "This chart shows how different aspects of risk contribute to your city's overall risk score for each climate threat.",
    insights: "Look for patterns in what drives your risks - is it high hazard likelihood, exposure, or vulnerability? This helps target your adaptation strategies effectively."
  },
  sector_distribution: {
    title: "Sector Distribution",
    description: "This visualization shows how climate risks are distributed across different sectors of your city.",
    insights: "Identify which sectors face multiple high risks - these may need cross-cutting adaptation strategies. Consider dependencies between sectors when planning responses."
  },
  projections: {
    title: "Future Projections",
    description: "These graphs show how climate risks might change in the future under different scenarios. 'Optimistic' assumes strong climate action, while 'Pessimistic' assumes business as usual.",
    insights: "Pay attention to risks that show significant increases in future scenarios - these may require long-term planning and infrastructure changes."
  },
  ccra_table: {
    title: "Complete Risk Assessment Table",
    description: "Detailed breakdown of risk assessment data showing all analyzed hazards and their components.",
    insights: "Compare risk scores and components across different hazards. Pay special attention to the relationship between hazard, exposure, and vulnerability scores to understand what drives each risk level."
  }
};

export const INTRO_CONTENT = {
  title: "Welcome to Your Climate Change Risk Assessment",
  description: "This tool helps you understand how climate change might affect your city. By analyzing data about climate hazards, exposure, and vulnerability, we can identify your city's biggest climate risks and help you plan for them.",
  features: [
    "Comprehensive risk analysis across multiple sectors",
    "Future projections under different climate scenarios",
    "Customized risk scores based on local conditions",
    "Practical adaptation recommendations"
  ]
};