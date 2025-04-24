import { CATEGORIES } from "./types";

export interface AnswerRecommendation {
    answer: string | number;
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

const q14RecommendationsForYes = [
    "Strengthen current savings.",
    "Improve liquidity.",
    "Reduce debt levels.",
    "Reach out to targeted cities for a peer exchange on specific themes."
]

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
                        recommendations: [
                            "Map possible financing sources to the plan's actions."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
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
                question: "question.question2",
                weight: 2,
                answers: [
                    {
                        answer: 2,
                        recommendations: [
                            "Check whether the team is adequately trained in the climate agenda and whether the municipality has already verified the need for training."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
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
                question: "question.question3",
                weight: 1,
                answers: [
                    {
                        answer: 1,
                        recommendations: [
                            "It is advisable to evaluate the possibility of creating a governance space to strengthen the links, by means of a legal regulation, so that the group can be consulted on an ongoing basis."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
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
                question: "question.question4",
                weight: 2,
                answers: [
                    {
                        answer: 2,
                        recommendations: [
                            "Reach out to targeted cities for a peer exchange on specific themes."
                        ],
                        references: ["https://unfccc.int/topics/capacity-building/resources/capacity-building-portal/history-of-the-portal/capacity-building-e-learning?utm_source=chatgpt.com"]
                    },
                    {
                        answer: 0,
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
                question: "question.question5",
                weight: 1,
                answers: [
                    {
                        answer: 1,
                        recommendations: [
                            "Organize lessons learned from previous financed projects.",
                            "Maintain a centralized and regularly updated repository with key data, including sources, approval processes, and lessons learned.",
                            "Organize knowledge-sharing sessions with other technicians to disseminate best practices and avoid recurring challenges."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
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
                question: "question.question6",
                weight: 1,
                answers: [
                    {
                        answer: 1,
                        recommendations: [],
                        references: ["C40 Cities Climate Leadership Group, ICLEI – Local Governments for Sustainability, Global Covenant of Mayors for Climate & Energy (GCoM), Rede Nossa São Paulo / Programa Cidades Sustentáveis, Rede de Governança Climática da FNP (Frente Nacional de Prefeitos)."]
                    },
                    {
                        answer: 0,
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
                question: "question.question7",
                weight: 2,
                answers: [
                    {
                        answer: 2,
                        recommendations: [
                            "Organize lessons learned from previous financed projects.",
                            "Maintain a centralized and regularly updated repository with key data, including sources, approval processes, and lessons learned.",
                            "Organize knowledge-sharing sessions with other technicians to disseminate best practices and avoid recurring challenges."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
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
                question: "question.question8",
                weight: 3,
                answers: [
                    {
                        answer: 3,
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
                        answer: 0,
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
                question: "question.question9",
                weight: 2,
                answers: [
                    {
                        answer: "A",
                        recommendations: [],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "B",
                        recommendations: [
                            "Design or enhance a consistent theory of change (problem identification, possible solutions and impact).",
                            "(afterwards, follow recommendations for the next stage)"
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: "C",
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
                        answer: "D",
                        recommendations: [],
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
                        recommendations: [
                            "Work on developing KPIs (Key Performance Indicators) for monitoring and evaluating actions."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
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
                question: "question.question11",
                weight: 1,
                answers: [
                    {
                        answer: 1,
                        recommendations: [],
                        references: []
                    },
                    {
                        answer: 0,
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
                question: "question.question12",
                weight: 1,
                answers: [
                    {
                        answer: 1,
                        recommendations: [],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
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
                question: "question.question13",
                weight: 1,
                answers: [
                    {
                        answer: 1,
                        recommendations: [],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
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
                question: "question.question14",
                weight: 3,
                answers: [
                    {
                        answer: "A",
                        recommendations: [
                            "Identify opportunities to knowledge strengthening.",
                            "Engange on a peer exchange to contribute with other cities, universities, key experts."
                        ],
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
                        recommendations: [
                            "Identify existing knowledge gaps.",
                            "Leverage key knowledge references.",
                            "Reach out to targeted cities for a peer exchange on specific themes.",
                            "Reach out to financial institutions to participate in an initial dialogue about local climate risks and opportunities - always have in mind applicable theory of change (problem identification, possible solutions and impact) and require technical assistance."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
                        recommendations: [
                            "Identify existing knowledge gaps."
                        ],
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
                        recommendations: [
                            "Organize lessons learned from previous financed projects.",
                            "Maintain a centralized and regularly updated repository with key data, including sources, approval processes, and lessons learned.",
                            "Organize knowledge-sharing sessions with other technicians to disseminate best practices and avoid recurring challenges."
                        ],
                        references: ["https://www.c40knowledgehub.org/s/guide-home?language=en_US&guideId=a3t1Q0000007lEWQAY"]
                    },
                    {
                        answer: 0,
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