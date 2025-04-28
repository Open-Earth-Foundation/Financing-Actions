import { CATEGORIES } from "./types";

export interface AnswerRecommendation {
    answer: string | number;
    recommendations: {
        en: string[];
        pt: string[];
    };
    references: string[];
}

export interface QuestionRecommendation {
    number: number;
    question: string;
    weight: number;
    answers: AnswerRecommendation[];
    observation?: string;
}

export interface CategoryRecommendation {
    category: string;
    questions: QuestionRecommendation[];
}

const q14RecommendationsForYes = {
    en: [
        "Strengthen current savings.",
        "Improve liquidity.",
        "Reduce debt levels.",
        "Reach out to targeted cities for a peer exchange on specific themes."
    ],
    pt: [
        "Fortalecer a poupança atual.",
        "Melhorar a liquidez.",
        "Reduzir os níveis de endividamento.",
        "Entrar em contato com cidades-alvo para uma troca de experiências sobre temas específicos."
    ]
}

export const recommendationsData: CategoryRecommendation[] = [
    {
        category: CATEGORIES.governance,
        questions: [
            {
                number: 1,
                question: "question.question1",
                weight: 2,
                answers: [
                    {
                        answer: 2,
                        recommendations: {
                            en: ["Map possible financing sources to the plan's actions."],
                            pt: ["Mapear possíveis fontes de financiamento para as ações do plano."]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
                        recommendations: {
                            en: [
                                "Secure political and institutional commitment to climate action.",
                                "Align strategies with international climate goals.",
                                "Engage stakeholders, communities, and experts in the planning process.",
                                "Define a long-term vision for sustainable and resilient urban development.",
                                "Set science-based targets for emissions reduction and climate resilience.",
                                "Identify priority actions for mitigation and adaptation based on the GHG emissions inventory and climate risk assesment's results.",
                                "Develop implementation strategies."
                            ],
                            pt: [
                                "Garantir o compromisso político e institucional com a ação climática.",
                                "Alinhar estratégias com as metas climáticas internacionais.",
                                "Envolver partes interessadas, comunidades e especialistas no processo de planejamento.",
                                "Definir uma visão de longo prazo para o desenvolvimento urbano sustentável e resiliente.",
                                "Estabelecer metas baseadas em ciência para redução de emissões e resiliência climática.",
                                "Identificar ações prioritárias para mitigação e adaptação com base nos resultados do inventário de GEE e avaliação de riscos climáticos.",
                                "Desenvolver estratégias de implementação."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            },
            {
                number: 2,
                question: "question.question2",
                weight: 2,
                answers: [
                    {
                        answer: 2,
                        recommendations: {
                            en: ["Check whether the team is adequately trained in the climate agenda and whether the municipality has already verified the need for training."],
                            pt: ["Verificar se a equipe está adequadamente treinada na agenda climática e se o município já verificou a necessidade de treinamento."]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
                        recommendations: {
                            en: [
                                "Map relevant staff roles and responsibilities related to climate action.",
                                "Establish clear institutional roles and responsibilities for climate governance.",
                                "Define structures and mechanisms for cross-agency coordination.",
                                "Invest in human resources and capacity-building for climate leadership.",
                                "Create coordination mechanisms to integrate climate action across sectors."
                            ],
                            pt: [
                                "Mapear funções e responsabilidades relevantes da equipe relacionadas à ação climática.",
                                "Estabelecer papéis e responsabilidades institucionais claras para a governança climática.",
                                "Definir estruturas e mecanismos para coordenação entre agências.",
                                "Investir em recursos humanos e capacitação para liderança climática.",
                                "Criar mecanismos de coordenação para integrar a ação climática entre setores."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            },
            {
                number: 3,
                question: "question.question3",
                weight: 1,
                answers: [
                    {
                        answer: 1,
                        recommendations: {
                            en: ["It is advisable to evaluate the possibility of creating a governance space to strengthen the links, by means of a legal regulation, so that the group can be consulted on an ongoing basis."],
                            pt: ["É aconselhável avaliar a possibilidade de criar um espaço de governança para fortalecer os vínculos, por meio de uma regulamentação legal, para que o grupo possa ser consultado de forma contínua."]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
                        recommendations: {
                            en: [
                                "Leverage key knowledge references.",
                                "Invite them to participate in an initial dialogue about local climate risks and opportunities - always have in mind applicable theory of change (problem identification, possible solutions and impact)."
                            ],
                            pt: [
                                "Aproveitar referências-chave de conhecimento.",
                                "Convidá-los a participar de um diálogo inicial sobre riscos e oportunidades climáticas locais - sempre tendo em mente a teoria da mudança aplicável (identificação do problema, possíveis soluções e impacto)."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            }
        ]
    },
    {
        category: CATEGORIES.capacity,
        questions: [
            {
                number: 4,
                question: "question.question4",
                weight: 2,
                answers: [
                    {
                        answer: 2,
                        recommendations: {
                            en: ["Reach out to targeted cities for a peer exchange on specific themes."],
                            pt: ["Entrar em contato com cidades-alvo para uma troca de experiências sobre temas específicos."]
                        },
                        references: ["https://unfccc.int/topics/capacity-building/resources/capacity-building-portal/history-of-the-portal/capacity-building-e-learning?utm_source=chatgpt.com"]
                    },
                    {
                        answer: 0,
                        recommendations: {
                            en: [
                                "Identify existing knowledge gaps.",
                                "Enroll municipal staff in climate governance and project management training.",
                                "Collaborate with state/national agencies for technical assistance.",
                                "Engage universities, development banks, international organizations for knowledge-sharing."
                            ],
                            pt: [
                                "Identificar lacunas de conhecimento existentes.",
                                "Inscrever funcionários municipais em treinamentos de governança climática e gerenciamento de projetos.",
                                "Colaborar com agências estaduais/nacionais para assistência técnica.",
                                "Envolver universidades, bancos de desenvolvimento e organizações internacionais para compartilhamento de conhecimento."
                            ]
                        },
                        references: ["https://unfccc.int/topics/capacity-building/resources/capacity-building-portal/history-of-the-portal/capacity-building-e-learning?utm_source=chatgpt.com"]
                    }
                ]
            },
            {
                number: 5,
                question: "question.question5",
                weight: 1,
                answers: [
                    {
                        answer: 1,
                        recommendations: {
                            en: [
                                "Organize lessons learned from previous financed projects.",
                                "Maintain a centralized and regularly updated repository with key data, including sources, approval processes, and lessons learned.",
                                "Organize knowledge-sharing sessions with other technicians to disseminate best practices and avoid recurring challenges."
                            ],
                            pt: [
                                "Organizar lições aprendidas de projetos financiados anteriormente.",
                                "Manter um repositório centralizado e regularmente atualizado com dados-chave, incluindo fontes, processos de aprovação e lições aprendidas.",
                                "Organizar sessões de compartilhamento de conhecimento com outros técnicos para disseminar melhores práticas e evitar desafios recorrentes."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
                        recommendations: {
                            en: [
                                "Identify existing knowledge gaps.",
                                "Leverage key knowledge references.",
                                "Reach out to targeted cities for a peer exchange on specific themes."
                            ],
                            pt: [
                                "Identificar lacunas de conhecimento existentes.",
                                "Aproveitar referências-chave de conhecimento.",
                                "Entrar em contato com cidades-alvo para uma troca de experiências sobre temas específicos."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            },
            {
                number: 6,
                question: "question.question6",
                weight: 1,
                answers: [
                    {
                        answer: 1,
                        recommendations: {
                            en: [],
                            pt: []
                        },
                        references: ["C40 Cities Climate Leadership Group, ICLEI – Local Governments for Sustainability, Global Covenant of Mayors for Climate & Energy (GCoM), Rede Nossa São Paulo / Programa Cidades Sustentáveis, Rede de Governança Climática da FNP (Frente Nacional de Prefeitos)."]
                    },
                    {
                        answer: 0,
                        recommendations: {
                            en: [
                                "Leverage key knowledge references.",
                                "Reinforce relationships with city networks and national programs."
                            ],
                            pt: [
                                "Aproveitar referências-chave de conhecimento.",
                                "Reforçar relacionamentos com redes de cidades e programas nacionais."
                            ]
                        },
                        references: ["C40 Cities Climate Leadership Group, ICLEI – Local Governments for Sustainability, Global Covenant of Mayors for Climate & Energy (GCoM), Rede Nossa São Paulo / Programa Cidades Sustentáveis, Rede de Governança Climática da FNP (Frente Nacional de Prefeitos)."]
                    }
                ]
            },
            {
                number: 7,
                question: "question.question7",
                weight: 2,
                answers: [
                    {
                        answer: 2,
                        recommendations: {
                            en: [
                                "Organize lessons learned from previous financed projects.",
                                "Maintain a centralized and regularly updated repository with key data, including sources, approval processes, and lessons learned.",
                                "Organize knowledge-sharing sessions with other technicians to disseminate best practices and avoid recurring challenges."
                            ],
                            pt: [
                                "Organizar lições aprendidas de projetos financiados anteriormente.",
                                "Manter um repositório centralizado e regularmente atualizado com dados-chave, incluindo fontes, processos de aprovação e lições aprendidas.",
                                "Organizar sessões de compartilhamento de conhecimento com outros técnicos para disseminar melhores práticas e evitar desafios recorrentes."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
                        recommendations: {
                            en: [
                                "Identify existing knowledge gaps.",
                                "Leverage key knowledge references.",
                                "Reach out to targeted cities for a peer exchange on specific themes."
                            ],
                            pt: [
                                "Identificar lacunas de conhecimento existentes.",
                                "Aproveitar referências-chave de conhecimento.",
                                "Entrar em contato com cidades-alvo para uma troca de experiências sobre temas específicos."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            }
        ]
    },
    {
        category: CATEGORIES.structuring,
        questions: [
            {
                number: 8,
                question: "question.question8",
                weight: 3,
                answers: [
                    {
                        answer: 3,
                        recommendations: {
                            en: [
                                "Review local legislation, master plans, and policy frameworks (e.g., Climate Action Plan, Waste, Sanitation, and Energy Plans).",
                                "Ensure project compliance with urban planning regulations and municipal strategic priorities.",
                                "Integrate the project into existing or upcoming municipal programs (e.g., infrastructure investments, resilience initiatives).",
                                "Identify the specific climate risks and mitigation/adaptation needs based on GHG inventories and climate risk assessments.",
                                "Define targeted solutions that address the identified challenges effectively.",
                                "Benchmark against best practices from other municipalities or international standards.",
                                "Analyze governance, operational, and financial risks associated with project implementation.",
                                "Develop risk mitigation strategies, including legal safeguards and contingency planning.",
                                "Establish a monitoring framework to track and manage risks throughout the project cycle.",
                                "Evaluate Economic, Social, and Environmental Impacts",
                                "Quantify expected benefits, such as emissions reductions, job creation, or resilience improvements.",
                                "Ensure stakeholder engagement to address concerns and maximize co-benefits.",
                                "Identify relevant municipal departments, civil society organizations, and potential investors.",
                                "Define roles and responsibilities for each stakeholder in project development and implementation.",
                                "Engage stakeholders through participatory processes to enhance project legitimacy and support.",
                                "Estimate the total funding needs and potential financing mechanisms (grants, loans, green bonds, PPPs).",
                                "Set a preliminary timeline for project execution, from planning to completion.",
                                "Determine the need for technical assistance to refine project scope, feasibility, and financial structuring."
                            ],
                            pt: [
                                "Revisar a legislação local, planos diretores e estruturas políticas (por exemplo, Plano de Ação Climática, Planos de Resíduos, Saneamento e Energia).",
                                "Garantir a conformidade do projeto com regulamentos de planejamento urbano e prioridades estratégicas municipais.",
                                "Integrar o projeto em programas municipais existentes ou futuros (por exemplo, investimentos em infraestrutura, iniciativas de resiliência).",
                                "Identificar os riscos climáticos específicos e as necessidades de mitigação/adaptação com base em inventários de GEE e avaliações de riscos climáticos.",
                                "Definir soluções direcionadas que abordem efetivamente os desafios identificados.",
                                "Comparar com as melhores práticas de outros municípios ou padrões internacionais.",
                                "Analisar riscos de governança, operacionais e financeiros associados à implementação do projeto.",
                                "Desenvolver estratégias de mitigação de riscos, incluindo salvaguardas legais e planejamento de contingência.",
                                "Estabelecer um framework de monitoramento para acompanhar e gerenciar riscos durante todo o ciclo do projeto.",
                                "Avaliar Impactos Econômicos, Sociais e Ambientais",
                                "Quantificar benefícios esperados, como reduções de emissões, criação de empregos ou melhorias na resiliência.",
                                "Garantir o engajamento das partes interessadas para abordar preocupações e maximizar co-benefícios.",
                                "Identificar departamentos municipais relevantes, organizações da sociedade civil e potenciais investidores.",
                                "Definir papéis e responsabilidades para cada parte interessada no desenvolvimento e implementação do projeto.",
                                "Envolver as partes interessadas por meio de processos participativos para melhorar a legitimidade e o apoio ao projeto.",
                                "Estimar as necessidades totais de financiamento e os mecanismos potenciais de financiamento (subsídios, empréstimos, títulos verdes, PPPs).",
                                "Estabelecer um cronograma preliminar para a execução do projeto, desde o planejamento até a conclusão.",
                                "Determinar a necessidade de assistência técnica para refinar o escopo, viabilidade e estruturação financeira do projeto."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
                        recommendations: {
                            en: [
                                "Define a long-term vision for sustainable and resilient urban development.",
                                "Set science-based targets for emissions reduction and climate resilience.",
                                "Identify priority actions for mitigation and adaptation based on the GHG emissions inventory and climate risk assesment's results.",
                                "Develop implementation strategies."
                            ],
                            pt: [
                                "Definir uma visão de longo prazo para o desenvolvimento urbano sustentável e resiliente.",
                                "Estabelecer metas baseadas em ciência para redução de emissões e resiliência climática.",
                                "Identificar ações prioritárias para mitigação e adaptação com base nos resultados do inventário de GEE e avaliação de riscos climáticos.",
                                "Desenvolver estratégias de implementação."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            },
            {
                number: 9,
                question: "question.question9",
                weight: 2,
                answers: [
                    {
                        answer: "A",
                        recommendations: {
                            en: [],
                            pt: []
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "B",
                        recommendations: {
                            en: [
                                "Design or enhance a consistent theory of change (problem identification, possible solutions and impact).",
                                "(afterwards, follow recommendations for the next stage)"
                            ],
                            pt: [
                                "Projetar ou aprimorar uma teoria da mudança consistente (identificação do problema, possíveis soluções e impacto).",
                                "(posteriormente, seguir as recomendações para a próxima etapa)"
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "C",
                        recommendations: {
                            en: [
                                "Review local legislation, master plans, and policy frameworks (e.g., Climate Action Plan, Waste, Sanitation, and Energy Plans).",
                                "Ensure project compliance with urban planning regulations and municipal strategic priorities.",
                                "Integrate the project into existing or upcoming municipal programs (e.g., infrastructure investments, resilience initiatives).",
                                "Identify the specific climate risks and mitigation/adaptation needs based on GHG inventories and climate risk assessments.",
                                "Define targeted solutions that address the identified challenges effectively.",
                                "Benchmark against best practices from other municipalities or international standards.",
                                "Analyze governance, operational, and financial risks associated with project implementation.",
                                "Develop risk mitigation strategies, including legal safeguards and contingency planning.",
                                "Establish a monitoring framework to track and manage risks throughout the project cycle.",
                                "Evaluate Economic, Social, and Environmental Impacts",
                                "Quantify expected benefits, such as emissions reductions, job creation, or resilience improvements.",
                                "Ensure stakeholder engagement to address concerns and maximize co-benefits.",
                                "Identify relevant municipal departments, civil society organizations, and potential investors.",
                                "Define roles and responsibilities for each stakeholder in project development and implementation.",
                                "Engage stakeholders through participatory processes to enhance project legitimacy and support.",
                                "Estimate the total funding needs and potential financing mechanisms (grants, loans, green bonds, PPPs).",
                                "Set a preliminary timeline for project execution, from planning to completion.",
                                "Determine the need for technical assistance to refine project scope, feasibility, and financial structuring."
                            ],
                            pt: [
                                "Revisar a legislação local, planos diretores e estruturas políticas (por exemplo, Plano de Ação Climática, Planos de Resíduos, Saneamento e Energia).",
                                "Garantir a conformidade do projeto com regulamentos de planejamento urbano e prioridades estratégicas municipais.",
                                "Integrar o projeto em programas municipais existentes ou futuros (por exemplo, investimentos em infraestrutura, iniciativas de resiliência).",
                                "Identificar os riscos climáticos específicos e as necessidades de mitigação/adaptação com base em inventários de GEE e avaliações de riscos climáticos.",
                                "Definir soluções direcionadas que abordem efetivamente os desafios identificados.",
                                "Comparar com as melhores práticas de outros municípios ou padrões internacionais.",
                                "Analisar riscos de governança, operacionais e financeiros associados à implementação do projeto.",
                                "Desenvolver estratégias de mitigação de riscos, incluindo salvaguardas legais e planejamento de contingência.",
                                "Estabelecer um framework de monitoramento para acompanhar e gerenciar riscos durante todo o ciclo do projeto.",
                                "Avaliar Impactos Econômicos, Sociais e Ambientais",
                                "Quantificar benefícios esperados, como reduções de emissões, criação de empregos ou melhorias na resiliência.",
                                "Garantir o engajamento das partes interessadas para abordar preocupações e maximizar co-benefícios.",
                                "Identificar departamentos municipais relevantes, organizações da sociedade civil e potenciais investidores.",
                                "Definir papéis e responsabilidades para cada parte interessada no desenvolvimento e implementação do projeto.",
                                "Envolver as partes interessadas por meio de processos participativos para melhorar a legitimidade e o apoio ao projeto.",
                                "Estimar as necessidades totais de financiamento e os mecanismos potenciais de financiamento (subsídios, empréstimos, títulos verdes, PPPs).",
                                "Estabelecer um cronograma preliminar para a execução do projeto, desde o planejamento até a conclusão.",
                                "Determinar a necessidade de assistência técnica para refinar o escopo, viabilidade e estruturação financeira do projeto."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "D",
                        recommendations: {
                            en: [],
                            pt: []
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ],
                observation: "This question is only applied if the answer to question 6 is affirmative"
            },
            {
                number: 10,
                question: "question.question10",
                weight: 2,
                answers: [
                    {
                        answer: 2,
                        recommendations: {
                            en: ["Work on developing KPIs (Key Performance Indicators) for monitoring and evaluating actions."],
                            pt: ["Trabalhar no desenvolvimento de KPIs (Indicadores-Chave de Desempenho) para monitoramento e avaliação de ações."]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
                        recommendations: {
                            en: [
                                "Review local legislation, master plans, and policy frameworks (e.g., Climate Action Plan, Waste, Sanitation, and Energy Plans).",
                                "Ensure project compliance with urban planning regulations and municipal strategic priorities.",
                                "Integrate the project into existing or upcoming municipal programs (e.g., infrastructure investments, resilience initiatives)."
                            ],
                            pt: [
                                "Revisar a legislação local, planos diretores e estruturas políticas (por exemplo, Plano de Ação Climática, Planos de Resíduos, Saneamento e Energia).",
                                "Garantir a conformidade do projeto com regulamentos de planejamento urbano e prioridades estratégicas municipais.",
                                "Integrar o projeto em programas municipais existentes ou futuros (por exemplo, investimentos em infraestrutura, iniciativas de resiliência)."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ],
                observation: "This question is only applied if the answer to question 6 is affirmative"
            },
            {
                number: 11,
                question: "question.question11",
                weight: 1,
                answers: [
                    {
                        answer: 1,
                        recommendations: {
                            en: [],
                            pt: []
                        },
                        references: []
                    },
                    {
                        answer: 0,
                        recommendations: {
                            en: ["Design a consistent theory of change (problem identification, possible solutions and impact)."],
                            pt: ["Projetar uma teoria da mudança consistente (identificação do problema, possíveis soluções e impacto)."]
                        },
                        references: []
                    }
                ],
                observation: "This question is only applied if the answer to question 6 is affirmative"
            },
            {
                number: 12,
                question: "question.question12",
                weight: 1,
                answers: [
                    {
                        answer: 1,
                        recommendations: {
                            en: [],
                            pt: []
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
                        recommendations: {
                            en: [
                                "Identify existing knowledge gaps.",
                                "Leverage key knowledge references.",
                                "Reach out to targeted cities for a peer exchange on specific themes."
                            ],
                            pt: [
                                "Identificar lacunas de conhecimento existentes.",
                                "Aproveitar referências-chave de conhecimento.",
                                "Entrar em contato com cidades-alvo para uma troca de experiências sobre temas específicos."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            },
            {
                number: 13,
                question: "question.question13",
                weight: 1,
                answers: [
                    {
                        answer: 1,
                        recommendations: {
                            en: [],
                            pt: []
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
                        recommendations: {
                            en: [
                                "Identify existing knowledge gaps.",
                                "Identify technicians and/or teams to lead this process internally, with attention to sustainability strategies.",
                                "Leverage key knowledge references.",
                                "Reach out to targeted cities for a peer exchange on specific themes."
                            ],
                            pt: [
                                "Identificar lacunas de conhecimento existentes.",
                                "Identificar técnicos e/ou equipes para liderar este processo internamente, com atenção às estratégias de sustentabilidade.",
                                "Aproveitar referências-chave de conhecimento.",
                                "Entrar em contato com cidades-alvo para uma troca de experiências sobre temas específicos."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            }
        ]
    },
    {
        category: CATEGORIES.funding,
        questions: [
            {
                number: 14,
                question: "question.question14",
                weight: 3,
                answers: [
                    {
                        answer: "A",
                        recommendations: {
                            en: [
                                "Identify opportunities to knowledge strengthening.",
                                "Engange on a peer exchange to contribute with other cities, universities, key experts."
                            ],
                            pt: [
                                "Identificar oportunidades para fortalecimento do conhecimento.",
                                "Participar de uma troca de experiências para contribuir com outras cidades, universidades e especialistas-chave."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "B",
                        recommendations: q14RecommendationsForYes,
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "C",
                        recommendations: q14RecommendationsForYes,
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "D",
                        recommendations: q14RecommendationsForYes,
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            },
            {
                number: 15,
                question: "question.question15",
                weight: 1,
                answers: [
                    {
                        answer: 0,
                        recommendations: {
                            en: [
                                "Identify existing knowledge gaps.",
                                "Leverage key knowledge references.",
                                "Reach out to targeted cities for a peer exchange on specific themes.",
                                "Reach out to financial institutions to participate in an initial dialogue about local climate risks and opportunities - always have in mind applicable theory of change (problem identification, possible solutions and impact) and require technical assistance."
                            ],
                            pt: [
                                "Identificar lacunas de conhecimento existentes.",
                                "Aproveitar referências-chave de conhecimento.",
                                "Entrar em contato com cidades-alvo para uma troca de experiências sobre temas específicos.",
                                "Entrar em contato com instituições financeiras para participar de um diálogo inicial sobre riscos e oportunidades climáticas locais - sempre tendo em mente a teoria da mudança aplicável (identificação do problema, possíveis soluções e impacto) e solicitar assistência técnica."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
                        recommendations: {
                            en: ["Identify existing knowledge gaps."],
                            pt: ["Identificar lacunas de conhecimento existentes."]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            },
            {
                number: 16,
                question: "question.question16",
                weight: 1,
                answers: [
                    {
                        answer: 1,
                        recommendations: {
                            en: [
                                "Organize lessons learned from previous financed projects.",
                                "Maintain a centralized and regularly updated repository with key data, including sources, approval processes, and lessons learned.",
                                "Organize knowledge-sharing sessions with other technicians to disseminate best practices and avoid recurring challenges."
                            ],
                            pt: [
                                "Organizar lições aprendidas de projetos financiados anteriormente.",
                                "Manter um repositório centralizado e regularmente atualizado com dados-chave, incluindo fontes, processos de aprovação e lições aprendidas.",
                                "Organizar sessões de compartilhamento de conhecimento com outros técnicos para disseminar melhores práticas e evitar desafios recorrentes."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
                        recommendations: {
                            en: [
                                "Leverage key knowledge references.",
                                "Invite them to participate in an initial dialogue about local climate risks and opportunities - always have in mind applicable theory of change (problem identification, possible solutions and impact)."
                            ],
                            pt: [
                                "Aproveitar referências-chave de conhecimento.",
                                "Convidá-los a participar de um diálogo inicial sobre riscos e oportunidades climáticas locais - sempre tendo em mente a teoria da mudança aplicável (identificação do problema, possíveis soluções e impacto)."
                            ]
                        },
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            }
        ]
    }
]; 