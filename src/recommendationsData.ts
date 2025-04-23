import { CATEGORIES } from "./types";

export interface AnswerRecommendation {
    answer: string;
    score: number;
    recommendations: string[];
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

export const recommendationsData: CategoryRecommendation[] = [
    {
        category: CATEGORIES.governance,
        questions: [
            {
                number: 1,
                question: "Does the municipality have a climate action plan or strategy for mitigation and adaptation to climate change?",
                weight: 2,
                answers: [
                    {
                        answer: "Yes",
                        score: 1,
                        recommendations: [
                            "Map possible financing sources to the plan's actions."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "No",
                        score: 0,
                        recommendations: [
                            "Secure political and institutional commitment to climate action.",
                            "Align strategies with international climate goals.",
                            "Engage stakeholders, communities, and experts in the planning process.",
                            "Define a long-term vision for sustainable and resilient urban development.",
                            "Set science-based targets for emissions reduction and climate resilience.",
                            "Identify priority actions for mitigation and adaptation based on the GHG emissions inventory and climate risk assesment's results.",
                            "Develop implementation strategies."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            },
            {
                number: 2,
                question: "Is there an agency, secretariat, or team responsible for the climate agenda locally?",
                weight: 2,
                answers: [
                    {
                        answer: "Yes",
                        score: 1,
                        recommendations: [
                            "Check whether the team is adequately trained in the climate agenda and whether the municipality has already verified the need for training."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "No",
                        score: 0,
                        recommendations: [
                            "Map relevant staff roles and responsibilities related to climate action.",
                            "Establish clear institutional roles and responsibilities for climate governance.",
                            "Define structures and mechanisms for cross-agency coordination.",
                            "Invest in human resources and capacity-building for climate leadership.",
                            "Create coordination mechanisms to integrate climate action across sectors."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            },
            {
                number: 3,
                question: "Have discussions/relationships been established with the departments and/or stakeholders that should be involved?",
                weight: 1,
                answers: [
                    {
                        answer: "Yes",
                        score: 1,
                        recommendations: [
                            "It is advisable to evaluate the possibility of creating a governance space to strengthen the links, by means of a legal regulation, so that the group can be consulted on an ongoing basis."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "No",
                        score: 0,
                        recommendations: [
                            "Leverage key knowledge references.",
                            "Invite them to participate in an initial dialogue about local climate risks and opportunities - always have in mind applicable theory of change (problem identification, possible solutions and impact)."
                        ],
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
                question: "Does the municipality have trained technicians to develop and manage climate projects?",
                weight: 2,
                answers: [
                    {
                        answer: "Yes",
                        score: 1,
                        recommendations: [
                            "Reach out to targeted cities for a peer exchange on specific themes."
                        ],
                        references: ["https://unfccc.int/topics/capacity-building/resources/capacity-building-portal/history-of-the-portal/capacity-building-e-learning?utm_source=chatgpt.com"]
                    },
                    {
                        answer: "No",
                        score: 0,
                        recommendations: [
                            "Identify existing knowledge gaps.",
                            "Enroll municipal staff in climate governance and project management training.",
                            "Collaborate with state/national agencies for technical assistance.",
                            "Engage universities, development banks, international organizations for knowledge-sharing."
                        ],
                        references: ["https://unfccc.int/topics/capacity-building/resources/capacity-building-portal/history-of-the-portal/capacity-building-e-learning?utm_source=chatgpt.com"]
                    }
                ]
            },
            {
                number: 5,
                question: "Is there experience in raising and executing external resources for climate projects?",
                weight: 1,
                answers: [
                    {
                        answer: "Yes",
                        score: 1,
                        recommendations: [
                            "Organize lessons learned from previous financed projects.",
                            "Maintain a centralized and regularly updated repository with key data, including sources, approval processes, and lessons learned.",
                            "Organize knowledge-sharing sessions with other technicians to disseminate best practices and avoid recurring challenges."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "No",
                        score: 0,
                        recommendations: [
                            "Identify existing knowledge gaps.",
                            "Leverage key knowledge references.",
                            "Reach out to targeted cities for a peer exchange on specific themes."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            },
            {
                number: 6,
                question: "Has the municipality initiated any articulation with State and National Governments departments regarding potential funds from development banks?",
                weight: 1,
                answers: [
                    {
                        answer: "Yes",
                        score: 1,
                        recommendations: [],
                        references: ["C40 Cities Climate Leadership Group, ICLEI – Local Governments for Sustainability, Global Covenant of Mayors for Climate & Energy (GCoM), Rede Nossa São Paulo / Programa Cidades Sustentáveis, Rede de Governança Climática da FNP (Frente Nacional de Prefeitos)."]
                    },
                    {
                        answer: "No",
                        score: 0,
                        recommendations: [
                            "Leverage key knowledge references.",
                            "Reinforce relationships with city networks and national programs."
                        ],
                        references: ["C40 Cities Climate Leadership Group, ICLEI – Local Governments for Sustainability, Global Covenant of Mayors for Climate & Energy (GCoM), Rede Nossa São Paulo / Programa Cidades Sustentáveis, Rede de Governança Climática da FNP (Frente Nacional de Prefeitos)."]
                    }
                ]
            },
            {
                number: 7,
                question: "Does the municipality have technicians with knowledge on the legislation for loans and financing processes?",
                weight: 2,
                answers: [
                    {
                        answer: "Yes",
                        score: 1,
                        recommendations: [
                            "Organize lessons learned from previous financed projects.",
                            "Maintain a centralized and regularly updated repository with key data, including sources, approval processes, and lessons learned.",
                            "Organize knowledge-sharing sessions with other technicians to disseminate best practices and avoid recurring challenges."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "No",
                        score: 0,
                        recommendations: [
                            "Identify existing knowledge gaps.",
                            "Leverage key knowledge references.",
                            "Reach out to targeted cities for a peer exchange on specific themes."
                        ],
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
                question: "Is there a project or portfolio of projects corresponding to the selected mitigation and adaptation actions?",
                weight: 3,
                answers: [
                    {
                        answer: "Yes",
                        score: 1,
                        recommendations: [
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
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "No",
                        score: 0,
                        recommendations: [
                            "Define a long-term vision for sustainable and resilient urban development.",
                            "Set science-based targets for emissions reduction and climate resilience.",
                            "Identify priority actions for mitigation and adaptation based on the GHG emissions inventory and climate risk assesment's results.",
                            "Develop implementation strategies."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            },
            {
                number: 9,
                question: "Stage in which the projects to be considered for the forwarding of actions are:",
                weight: 2,
                answers: [
                    {
                        answer: "The project is being conceived",
                        score: 0,
                        recommendations: [
                            "Design or enhance a consistent theory of change (problem identification, possible solutions and impact).",
                            "(afterwards, follow recommendations for the next stage)"
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "The project is being structured/planned",
                        score: 1,
                        recommendations: [
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
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "The project is structured",
                        score: 2,
                        recommendations: [],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ],
                observation: "This question is only applied if the answer to question 6 is affirmative"
            },
            {
                number: 10,
                question: "Is the project aligned with the municipal ordinance (Master Plan, climate goals, sectoral plans, legislation, etc.)?",
                weight: 2,
                answers: [
                    {
                        answer: "Yes",
                        score: 1,
                        recommendations: [
                            "Work on developing KPIs (Key Performance Indicators) for monitoring and evaluating actions."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "No",
                        score: 0,
                        recommendations: [
                            "Review local legislation, master plans, and policy frameworks (e.g., Climate Action Plan, Waste, Sanitation, and Energy Plans).",
                            "Ensure project compliance with urban planning regulations and municipal strategic priorities.",
                            "Integrate the project into existing or upcoming municipal programs (e.g., infrastructure investments, resilience initiatives)."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ],
                observation: "This question is only applied if the answer to question 6 is affirmative"
            },
            {
                number: 11,
                question: "Does the project outline the expected changes (theory of change) related to the outcomes?",
                weight: 1,
                answers: [
                    {
                        answer: "Yes",
                        score: 1,
                        recommendations: [],
                        references: []
                    },
                    {
                        answer: "No",
                        score: 0,
                        recommendations: [
                            "Design a consistent theory of change (problem identification, possible solutions and impact)."
                        ],
                        references: []
                    }
                ],
                observation: "This question is only applied if the answer to question 6 is affirmative"
            },
            {
                number: 12,
                question: "Is there experience in the preparation of technical and financial proposals for external fundraising?",
                weight: 1,
                answers: [
                    {
                        answer: "Yes",
                        score: 1,
                        recommendations: [],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "No",
                        score: 0,
                        recommendations: [
                            "Identify existing knowledge gaps.",
                            "Leverage key knowledge references.",
                            "Reach out to targeted cities for a peer exchange on specific themes."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            },
            {
                number: 13,
                question: "Does the municipality have any software or system for financial project management?",
                weight: 1,
                answers: [
                    {
                        answer: "Yes",
                        score: 1,
                        recommendations: [],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "No",
                        score: 0,
                        recommendations: [
                            "Identify existing knowledge gaps.",
                            "Identify technicians and/or teams to lead this process internally, with attention to sustainability strategies.",
                            "Leverage key knowledge references.",
                            "Reach out to targeted cities for a peer exchange on specific themes."
                        ],
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
                question: "CAPAG (Payment capacity)",
                weight: 3,
                answers: [
                    {
                        answer: "A – High payment capacity (low tax risk)",
                        score: 1,
                        recommendations: [],
                        references: ["https://www.tesourotransparente.gov.br/temas/estados-e-municipios/capacidade-de-pagamento-capag"]
                    },
                    {
                        answer: "B, C or D",
                        score: 0,
                        recommendations: [
                            "Strengthen current savings.",
                            "Improve liquidity.",
                            "Reduce debt levels.",
                            "Reach out to targeted cities for a peer exchange on specific themes."
                        ],
                        references: ["https://www.tesourotransparente.gov.br/temas/estados-e-municipios/capacidade-de-pagamento-capag"]
                    }
                ],
                observation: "Add note: The analysis of the payment capacity ascertains the fiscal situation of Subnational Entities that want to take on new loans guaranteed by the Union. CAPAG's purpose is to present in a simple and transparent way whether a new indebtedness represents a credit risk for the National Treasury. The calculation methodology is composed of three indicators: indebtedness, current savings and liquidity ratio. Therefore, it evaluates the degree of solvency, the relationship between current revenues and expenses, and the cash situation."
            },
            {
                number: 15,
                question: "Is there a need for technical assistance for project development or improvement?",
                weight: 1,
                answers: [
                    {
                        answer: "Yes",
                        score: 0,
                        recommendations: [
                            "Identify existing knowledge gaps.",
                            "Leverage key knowledge references.",
                            "Reach out to targeted cities for a peer exchange on specific themes.",
                            "Reach out to financial institutions to participate in an initial dialogue about local climate risks and opportunities - always have in mind applicable theory of change (problem identification, possible solutions and impact) and require technical assistance."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "No",
                        score: 1,
                        recommendations: [
                            "Identify existing knowledge gaps."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            },
            {
                number: 16,
                question: "Has the municipality already accessed or tried to access sources of climate financing, such as the Climate Fund, the GCF (Green Climate Fund), development banks (e.g. BNDES) or the PAC (Programa de Aceleração do Crescimento - Growth Acceleration Program)?",
                weight: 1,
                answers: [
                    {
                        answer: "Yes",
                        score: 1,
                        recommendations: [
                            "Organize lessons learned from previous financed projects.",
                            "Maintain a centralized and regularly updated repository with key data, including sources, approval processes, and lessons learned.",
                            "Organize knowledge-sharing sessions with other technicians to disseminate best practices and avoid recurring challenges."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "No",
                        score: 0,
                        recommendations: [
                            "Leverage key knowledge references.",
                            "Invite them to participate in an initial dialogue about local climate risks and opportunities - always have in mind applicable theory of change (problem identification, possible solutions and impact)."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    }
                ]
            }
        ]
    }
]; 