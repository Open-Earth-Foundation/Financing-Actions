export const json = {
  "title": {
    "default": "Finance Readiness Assessment",
    "pt": "Avaliação de Preparação Financeira"
  },
  "description": {
    "default": "Take the finance readiness questionnaire to determine your maturity level to raise funds for financing your climate mitigation and adaptation actions.",
    "pt": "Faça o questionário de prontidão financeira para determinar seu nível de maturidade para levantar fundos para financiar suas ações de mitigação e adaptação climática."
  },
  "pages": [
    {
      "name": "page1",
      "title": {
        "default": "Finance Readiness Assessment",
        "pt": "Avaliação de Preparação Financeira"
      },
      "description": {
        "default": "Refers to a city's ability to develop, implement, and oversee climate policies, strategies, and action plans. It assesses how well a city integrates climate action into its governance structure, institutional framework, and long-term development plans.",
        "pt": "Refere-se à capacidade de uma cidade de desenvolver, implementar e supervisionar políticas climáticas, estratégias e planos de ação. Avalia como uma cidade integra a ação climática em sua estrutura de governança, quadro institucional e planos de desenvolvimento a longo prazo."
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "question1",
          "title": {
            "default": "Does the municipality have a climate action plan or strategy for mitigation and adaptation to climate change?",
            "pt": "O município possui um plano ou estratégia de ação climática para mitigação e adaptação às mudanças climáticas?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": 2,
              "text": {
                "default": "Yes. The municipality has a climate action plan or strategy for mitigation and adaptation to climate change.",
                "pt": "Sim. O município possui um plano ou estratégia de ação climática para mitigação e adaptação às mudanças climáticas."
              }
            },
            {
              "value": 0,
              "text": {
                "default": "No. The municipality does not have a climate action plan or strategy for mitigation and adaptation to climate change.",
                "pt": "Não. O município não possui um plano ou estratégia de ação climática para mitigação e adaptação às mudanças climáticas."
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question2",
          "title": {
            "default": "Is there an agency, secretariat, or team responsible for the climate agenda locally?",
            "pt": "Existe uma agência, secretaria ou equipe responsável pela agenda climática localmente?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": 2,
              "text": {
                "default": "Yes. There is an agency, secretariat, or team responsible for the climate agenda locally.",
                "pt": "Sim. Existe uma agência, secretaria ou equipe responsável pela agenda climática localmente."
              }
            },
            {
              "value": 0,
              "text": {
                "default": "No. There is no agency, secretariat, or team responsible for the climate agenda locally.",
                "pt": "Não. Não há uma agência, secretaria ou equipe responsável pela agenda climática localmente."
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question3",
          "title": {
            "default": "Have discussions/relationships been established with the departments and/or stakeholders that should be involved?",
            "pt": "Foram estabelecidas discussões/relacionamentos com os departamentos e/ou partes interessadas que devem ser envolvidos?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": 1,
              "text": {
                "default": "Yes. Discussions/relationships have been established with the departments and/or stakeholders that should be involved",
                "pt": "Sim. Foram estabelecidas discussões/relacionamentos com os departamentos e/ou partes interessadas que devem ser envolvidos."
              }
            },
            {
              "value": 0,
              "text": {
                "default": "No. Discussions/relationships have not been established with the departments and/or stakeholders that should be involved",
                "pt": "Não. Não foram estabelecidas discussões/relacionamentos com os departamentos e/ou partes interessadas que devem ser envolvidos."
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page2",
      "title": {
        "default": "Technical and Institutional Capacity",
        "pt": "Capacidade Técnica e Institucional"
      },
      "description": {
        "default": "Refers to a city's ability to effectively design, implement, and manage climate initiatives through skilled personnel, institutional frameworks, and operational structures",
        "pt": "Refere-se à capacidade de uma cidade de projetar, implementar e gerenciar efetivamente iniciativas climáticas por meio de pessoal qualificado, estruturas institucionais e estruturas operacionais"
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "question4",
          "title": {
            "default": "Does the municipality have trained technicians to develop and monitor climate projects?",
            "pt": "O município possui técnicos capacitados para desenvolver e monitorar projetos climáticos?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": 2,
              "text": {
                "default": "Yes. The municipality has trained technicians to develop and monitor climate projects",
                "pt": "Sim. Município capacitou técnicos para desenvolver e monitorar projetos climáticos"
              }
            },
            {
              "value": 0,
              "text": {
                "default": "No. The municipality does not have trained technicians to develop and monitor climate projects",
                "pt": "Não. O município não possui técnicos capacitados para desenvolver e monitorar projetos climáticos"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question5",
          "title": {
            "default": "Is there experience in raising and executing external resources for climate projects?",
            "pt": "Existe experiência na captação e execução de recursos externos para projetos climáticos?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": 1,
              "text": {
                "default": "Yes. There is experience in raising and executing external resources for climate projects",
                "pt": "Sim. Há experiência na captação e execução de recursos externos para projetos climáticos"
              }
            },
            {
              "value": 0,
              "text": {
                "default": "No. There is no experience in raising and executing external resources for climate projects",
                "pt": "Não. Não há experiência em captação e execução de recursos externos para projetos climáticos"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question6",
          "title": {
            "default": "Is the municipality in contact with State and National Governments departments regarding potential funds from\ndevelopment banks?",
            "pt": "O município está em contato com os governos estadual e nacional sobre possíveis recursos de\nbancos de desenvolvimento?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": 1,
              "text": {
                "default": "Yes. The municipality is in contact with State and National Governments departments regarding potential funds from development",
                "pt": "Sim. O município está em contato com os departamentos dos governos estadual e nacional sobre possíveis fundos de desenvolvimento"
              }
            },
            {
              "value": 0,
              "text": {
                "default": "No. The municipality is not in contact with State and National Governments departments regarding potential funds from development",
                "pt": "Não. O município não está em contato com os departamentos dos governos estaduais e nacionais sobre possíveis fundos de desenvolvimento"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question7",
          "title": {
            "default": "Does the municipality have technicians with knowledge on the legislation for loans and financing processes?",
            "pt": "O município possui técnicos com conhecimento sobre a legislação para empréstimos e processos de financiamento?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": 2,
              "text": {
                "default": "Yes. The municipality has technicians with knowledge on the legislation for loans and financing processes",
                "pt": "Sim. O município conta com técnicos com conhecimento sobre a legislação para empréstimos e processos de financiamento"
              }
            },
            {
              "value": 0,
              "text": {
                "default": "No. The municipality has no technicians with knowledge on the legislation for loans and financing processes",
                "pt": "Não. O município não possui técnicos com conhecimento sobre a legislação para empréstimos e processos de financiamento"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page3",
      "title": {
        "default": "Project Structuring",
        "pt": "Estruturação de Projetos"
      },
      "description": {
        "default": "Refers to a city's ability to design, develop, and prepare climate projects in a way that makes them financially viable, technically feasible, and ready for implementation",
        "pt": "Refere-se à capacidade de uma cidade de projetar, desenvolver e preparar projetos climáticos de forma a torná-los financeiramente viáveis, tecnicamente viáveis e prontos para implementação"
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "question8",
          "title": {
            "default": "Is there a project or portfolio of projects corresponding to the selected mitigation and adaptation actions?",
            "pt": "Existe um projeto ou portfólio de projetos correspondente às ações de mitigação e adaptação selecionadas?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": 3,
              "text": {
                "default": "Yes. There is a project or portfolio of projects corresponding to the selected mitigation and adaptation actions",
                "pt": "Sim. Existe um projeto ou carteira de projetos correspondente às ações de mitigação e adaptação selecionadas"
              }
            },
            {
              "value": 0,
              "text": {
                "default": "No. There is no project or portfolio of projects corresponding to the selected mitigation and adaptation actions",
                "pt": "Não. Não existe um projeto ou carteira de projetos correspondente às ações de atenuação e adaptação selecionadas"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question9",
          "visibleIf": "{question8} = 3",
          "title": {
            "default": "How developed is the project in terms of planning and structuring, considering that more advanced projects have",
            "pt": "Quão desenvolvido é o projeto em termos de planejamento e estruturação, considerando que projetos mais avançados têm"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "A",
              "text": {
                "default": "The project is being conceived. The project is still in the idea stage, with no formal planning or feasibility studies conducted",
                "pt": "O projeto está sendo concebido. O projeto ainda está em fase de ideia, sem planejamento formal ou estudos de viabilidade realizados"
              }
            },
            {
              "value": "B",
              "text": {
                "default": "The project is being structured/Planned. The project is in the initial planning phase, with feasibility studies, risk assessments, and financial models being developed",
                "pt": "O projeto está sendo estruturado/planejado. O projeto está em fase inicial de planejamento, com estudos de viabilidade, avaliações de risco e modelos financeiros sendo desenvolvidos"
              }
            },
            {
              "value": "C",
              "text": {
                "default": "The project is structured. The project has a clear structure, including feasibility studies, technical documentation, and financial planning, making it ready for funding and implementation",
                "pt": "O projeto está estruturado. O projeto tem uma estrutura clara, incluindo estudos de viabilidade, documentação técnica e planejamento financeiro, tornando-o pronto para financiamento e implementação"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question10",
          "visibleIf": "{question8} = 3",
          "title": {
            "default": "Is the project aligned with the municipal ordinance (Master Plan, climate goals, sectoral plans, legislation, etc.)?",
            "pt": "O projeto está alinhado com a portaria municipal (Plano Diretor, metas climáticas, planos setoriais, legislação, etc.)?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": 2,
              "text": {
                "default": "Yes. The project is aligned with the municipal ordinance (Master Plan, climate goals, sectoral plans, legislation, etc.)",
                "pt": "Sim. O projeto está alinhado com a portaria municipal (Plano Diretor, metas climáticas, planos setoriais, legislação, etc.)"
              }
            },
            {
              "value": 0,
              "text": {
                "default": "No. The project is not aligned with the municipal ordinance (Master Plan, climate goals, sectoral plans, legislation, etc.)",
                "pt": "Não. O projeto não está alinhado com a portaria municipal (Plano Diretor, metas climáticas, planos setoriais, legislação, etc.)"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question11",
          "visibleIf": "{question8} = 3",
          "title": {
            "default": "Does the project outline the expected changes (theory of change) related to the outcomes?s, sectoral plans, legislation, etc.)?",
            "pt": "O projeto descreve as mudanças esperadas (teoria da mudança) relacionadas aos resultados, planos setoriais, legislação, etc.)?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": 1,
              "text": {
                "default": "Yes. The project outlines the expected changes (theory of change) related to the outcomes.",
                "pt": "Sim. O projeto descreve as mudanças esperadas (teoria da mudança) relacionadas aos resultados."
              }
            },
            {
              "value": "Item 2",
              "text": {
                "default": "No. The project does not outline the expected changes (theory of change) related to the outcomes.",
                "pt": "Não. O projeto não descreve as mudanças esperadas (teoria da mudança) relacionadas aos resultados."
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question12",
          "title": {
            "default": "Is there experience in the preparation of technical and financial proposals for external fundraising?",
            "pt": "Existe experiência na elaboração de propostas técnicas e financeiras para captação de recursos externos?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": 1,
              "text": {
                "default": "Yes. There is a project or portfolio of projects corresponding to the selected mitigation and adaptation actions",
                "pt": "Sim. Existe um projeto ou carteira de projetos correspondente às ações de mitigação e adaptação selecionadas"
              }
            },
            {
              "value": 0,
              "text": {
                "default": "No. There is no project or portfolio of projects corresponding to the selected mitigation and adaptation actions",
                "pt": "Não. Não existe um projeto ou carteira de projetos correspondente às ações de atenuação e adaptação selecionadas"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question13",
          "title": {
            "default": "Does the municipality have any software or system for financial project management?",
            "pt": "O município possui algum software ou sistema para gerenciamento financeiro de projetos?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": 1,
              "text": {
                "default": "Yes. The municipality has a software or system for financial project management",
                "pt": "Sim. O município possui um software ou sistema para gerenciamento de projetos financeiros"
              }
            },
            {
              "value": 0,
              "text": {
                "default": "No. The municipality does not have a software or system for financial project management",
                "pt": "Não. O município não possui software ou sistema para gestão de projetos financeiros"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "page4",
      "title": {
        "default": "Funding and Fundraising",
        "pt": "Financiamento e Captação de Recursos"
      },
      "description": {
        "default": "Assesses a municipality's ability to secure and manage financial resources for climate initiatives. It evaluates the city's experience, capacity, and strategies in accessing national and international funding sources, including grants, loans, public-private partnerships (PPPs), and green finance instruments.",
        "pt": "Avalia a capacidade de um município de garantir e gerenciar recursos financeiros para iniciativas climáticas. Ele avalia a experiência, a capacidade e as estratégias da cidade no acesso a fontes de financiamento nacionais e internacionais, incluindo doações, empréstimos, parcerias público-privadas (PPPs) e instrumentos de financiamento verde."
      },
      "elements": [
        {
          "type": "radiogroup",
          "name": "question14",
          "title": {
            "default": "What is the municipality's CAPAG (Payment Capacity) rating, which evaluates its fiscal situation and ability to take on\nnew loans guaranteed by the Union, based on indebtedness, current savings, and liquidity ratio?",
            "pt": "Qual é a classificação CAPAG (Capacidade de Pagamento) do município, que avalia sua situação fiscal e capacidade de assumir\nnovos empréstimos garantidos pela União, com base no endividamento, poupança corrente e índice de liquidez?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "A",
              "text": {
                "default": "A – High payment capacity (low fiscal risk). The municipality has strong solvency, stable revenues, and a solid liquidity position, posing minimal credit risk to the National Treasury.",
                "pt": "A – Alta capacidade de pagamento (baixo risco fiscal). O município tem forte solvência, receitas estáveis e uma sólida posição de liquidez, representando um risco de crédito mínimo para o Tesouro Nacional."
              }
            },
            {
              "value": "B",
              "text": {
                "default": "B – Medium payment capacity (moderate fiscal risk). The municipality has a balanced financial situation but may face some constraints in taking on new debt.",
                "pt": "B – Capacidade de pagamento média (risco fiscal moderado). O município tem uma situação financeira equilibrada, mas pode enfrentar algumas restrições para assumir novas dívidas."
              }
            },
            {
              "value": "C",
              "text": {
                "default": "C – Low payment capacity (high fiscal risk). The municipality has financial vulnerabilities, with limited ability to sustain new debt without increasing fiscal pressure.",
                "pt": "C – Baixa capacidade de pagamento (alto risco fiscal). O município tem vulnerabilidades financeiras, com capacidade limitada de sustentar novas dívidas sem aumentar a pressão fiscal."
              }
            },
            {
              "value": "D",
              "text": {
                "default": "D – Critical fiscal situation (high risk of default). The municipality faces significant fiscal instability, making it a high credit risk for the National Treasury.",
                "pt": "D – Situação fiscal crítica (alto risco de inadimplência). O município enfrenta uma instabilidade fiscal significativa, tornando-se um alto risco de crédito para o Tesouro Nacional."
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question15",
          "title": {
            "default": "Is there a need for technical assistance for project development or improvement?",
            "pt": "Há necessidade de assistência técnica para desenvolvimento ou melhoria de projetos?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": 1,
              "text": {
                "default": "Yes. There is a need for technical assistance for project development or improvement",
                "pt": "Sim. Há necessidade de assistência técnica para desenvolvimento ou melhoria de projetos"
              }
            },
            {
              "value": 0,
              "text": {
                "default": "No. There is no need for technical assistance for project development or improvement",
                "pt": "Não. Não há necessidade de assistência técnica para desenvolvimento ou melhoria de projetos"
              }
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question16",
          "title": {
            "default": "Has the municipality already accessed or tried to access sources of climate financing, such as the Climate Fund, the \nGCF (Green Climate Fund), development banks (e.g. BNDES) or the PAC (Programa de Aceleração do Crescimento - \nGrowth Acceleration Program)?",
            "pt": "O município já acessou ou tentou acessar fontes de financiamento climático, como o Fundo Clima, o \nGCF (Fundo Verde para o Clima), bancos de desenvolvimento (por exemplo, BNDES) ou o PAC (Programa de Aceleração do Crescimento - \nPrograma de Aceleração do Crescimento)?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": 1,
              "text": {
                "default": "Yes. The municipality has already accessed or tried to access sources of climate financing",
                "pt": "Sim. O município já acessou ou tentou acessar fontes de financiamento climático"
              }
            },
            {
              "value": 0,
              "text": {
                "default": "No. The municipality has not accessed or tried to access sources of climate financing",
                "pt": "Não. O município não acessou ou tentou acessar fontes de financiamento climático"
              }
            }
          ]
        }
      ]
    }
  ],
  "showTitle": false,
  // "navigateToUrl": "http://localhost:5173/results",
  "navigateToUrl": "https://city-catalyst-maturity-assessment.replit.app/results",
  "showQuestionNumbers": "on",
  "showProgressBar": true,
  "progressBarLocation": "bottom",
  "progressBarType": "requiredQuestions",
  "autoAdvanceEnabled": true,
  "questionsOnPageMode": "questionPerPage",
  "headerView": "advanced"
}