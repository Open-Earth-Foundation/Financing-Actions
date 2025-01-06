// Create translations object directly in the utility file
const translations = {
  en: {
    report: {
      title: "Climate Risk Assessment Report",
      generated: "Generated",
      executive_summary: {
        title: "Executive Summary",
        overview: "This Climate Change Risk Assessment (CCRA) report analyzes climate-related risks across key strategic sectors. The assessment evaluates hazards, exposure, and vulnerability to determine risk levels and prioritize adaptation actions.",
        sections: "The report contains five main sections:",
        section_1: "1. Methodology overview of risk calculations and scoring",
        section_2: "2. Top climate risks requiring immediate attention",
        section_3: "3. Complete risk assessment data across all sectors",
        section_4: "4. Qualitative assessment findings from stakeholder engagement",
        section_5: "5. Recommended next steps for climate adaptation"
      },
      methodology: {
        title: "Methodology",
        formula: "Risk scores are calculated using the formula: Risk = Hazard x Exposure x Vulnerability, where each component is normalized on a 0-1 scale. Vulnerability considers both sensitivity and adaptive capacity indicators.",
        scoring: "Scores are normalized within hazard groups to enable comparison, with risk levels defined as: Very High (>0.8), High (0.6-0.8), Medium (0.4-0.6), Low (0.2-0.4), Very Low (<0.2)"
      },
      tables: {
        title: "Complete Risk Assessment",
        headers: {
          sector: "Strategic Sector",
          hazard: "Climate Hazard",
          risk_score: "Risk Score",
          hazard_score: "Hazard Score",
          exposure_score: "Exposure Score",
          vulnerability_score: "Vulnerability Score",
          adaptive_capacity: "Adaptive Capacity"
        }
      },
      next_steps: {
        title: "Recommended Next Steps",
        steps: {
          1: "Develop detailed adaptation strategies for high-risk sectors",
          2: "Engage stakeholders to validate findings and gather additional insights",
          3: "Identify funding sources for priority adaptation measures",
          4: "Establish monitoring systems to track risk indicators",
          5: "Update emergency response plans based on identified risks",
          6: "Integrate findings into city planning and policy development"
        }
      },
      footer: "CityCatalyst CCRA Report"
    }
  },
  'pt-BR': {
    report: {
      title: "Relatório de Avaliação de Risco Climático",
      generated: "Gerado em",
      executive_summary: {
        title: "Sumário Executivo",
        overview: "Este relatório de Avaliação de Risco das Mudanças Climáticas (ARMC) analisa os riscos climáticos em setores estratégicos principais. A avaliação considera ameaças, exposição e vulnerabilidade para determinar níveis de risco e priorizar ações de adaptação.",
        sections: "O relatório contém cinco seções principais:",
        section_1: "1. Visão geral da metodologia de cálculos e pontuação de risco",
        section_2: "2. Principais riscos climáticos que requerem atenção imediata",
        section_3: "3. Dados completos de avaliação de risco em todos os setores",
        section_4: "4. Resultados da avaliação qualitativa do engajamento das partes interessadas",
        section_5: "5. Próximos passos recomendados para adaptação climática"
      },
      methodology: {
        title: "Metodologia",
        formula: "As pontuações de risco são calculadas usando a fórmula: Risco = Ameaça x Exposição x Vulnerabilidade, onde cada componente é normalizado em uma escala de 0-1. A vulnerabilidade considera indicadores de sensibilidade e capacidade adaptativa.",
        scoring: "As pontuações são normalizadas dentro dos grupos de ameaças para permitir comparação, com níveis de risco definidos como: Muito Alto (>0,8), Alto (0,6-0,8), Médio (0,4-0,6), Baixo (0,2-0,4), Muito Baixo (<0,2)"
      },
      tables: {
        title: "Avaliação Completa de Risco",
        headers: {
          sector: "Setor Estratégico",
          hazard: "Ameaça Climática",
          risk_score: "Pontuação de Risco",
          hazard_score: "Pontuação de Ameaça",
          exposure_score: "Pontuação de Exposição",
          vulnerability_score: "Pontuação de Vulnerabilidade",
          adaptive_capacity: "Capacidade Adaptativa"
        }
      },
      next_steps: {
        title: "Próximos Passos Recomendados",
        steps: {
          1: "Desenvolver estratégias detalhadas de adaptação para setores de alto risco",
          2: "Engajar partes interessadas para validar descobertas e coletar insights adicionais",
          3: "Identificar fontes de financiamento para medidas prioritárias de adaptação",
          4: "Estabelecer sistemas de monitoramento para acompanhar indicadores de risco",
          5: "Atualizar planos de resposta a emergências com base nos riscos identificados",
          6: "Integrar descobertas ao planejamento e desenvolvimento de políticas da cidade"
        }
      },
      footer: "Relatório ARMC CityCatalyst"
    }
  }
};

export const getTranslation = (key, language = 'en') => {
  try {
    const keys = key.split('.');
    let current = translations[language] || translations.en;

    for (const k of keys) {
      current = current[k];
      if (current === undefined) {
        // Fallback to English if translation is missing
        current = keys.reduce((obj, key) => obj && obj[key], translations.en);
        break;
      }
    }

    return current || key;
  } catch (error) {
    console.error('Translation error:', error);
    return key;
  }
};