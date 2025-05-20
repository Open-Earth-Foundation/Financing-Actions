import { Language } from "../../types";

export interface FundingSource {
    id: string;
    translations: {
        [lang in Language]: {
            title: string;
            region: string;
            currency: string;
            scope: string;
            description: string;
            priorityThemes: string[];
            typesOfFunding: string[];
            fundedProjectExample: {
                title: string;
                description: string;
            };
            eligibilityRequirements: string[];
            link: string;
        };
    };
}

const idb = {
    id: "IDB - Interamerican Development Bank",
    translations: {
        en: {
            title: "IDB - Interamerican Development Bank",
            region: "Latin America and the Caribbean",
            currency: "USD",
            scope: "Multisectoral – public infrastructure, resilience, social programs, sustainability",
            description: "The IDB provides financial and technical support for development projects across Latin America and the Caribbean. It offers a wide range of instruments, including sovereign-guaranteed loans, policy-based lending, technical cooperation grants, and guarantees. These resources are designed to strengthen institutional capacity, finance infrastructure, and promote inclusive and climate-resilient development.",
            priorityThemes: [
                "Integrated urban development",
                "Environmental restoration",
                "Flood risk reduction",
                "Environmental protection"
            ],
            typesOfFunding: [
                "Sovereign-guaranteed loans",
                "Investment loans",
                "Policy-Based Loans (PBLs)",
                "Specific projects",
                "Multiple work programs",
                "Conditional Credit Lines (CCLIP)",
                "Performance-Driven Loans (PDL)",
                "Sector Wide Approach(SWAp)",
                "Technical Cooperations(TC)"
            ],
            fundedProjectExample: {
                title: "Belo Horizonte Environmental Restoration Program",
                description: "A $46.5 million loan aimed at improving waterway quality and reducing flood risks through environmental restoration efforts. ",

            },
            eligibilityRequirements: [
                "Projects must be specific and indivisible(cannot be broken into smaller parts without losing their purpose).",
                "Projects must undergo analysis to assess their cost, technical, financial, and economic feasibility.",
                "For definition of payment conditions, IDB sets loan repayment terms and borrowers must indicate intermediary banks involved.",
                "Projects may include technical cooperation programs, studies, and diagnostics.",
                "Projects must be aligned with IDB's policies and strategic priorities.",
                "Municipalities must demonstrate creditworthiness and fiscal responsibility, ensuring they can manage and repay loans.",
                "In Brazil, municipal access to external financing often requires approvals from: The Ministry of Finance, The Commission of Economic Affairs, The Federal Senate",
            ],
            link: "https://portal.bndes.gov.br/habilitacao/"
        },
        pt: {
            title: "BID - Banco Interamericano de Desenvolvimento",
            region: "América Latina e Caribe",
            currency: "USD",
            scope: "Multissetorial – infraestrutura pública, resiliência, programas sociais, sustentabilidade",
            description: "O BID oferece apoio financeiro e técnico para projetos de desenvolvimento em toda a América Latina e Caribe. Disponibiliza uma ampla gama de instrumentos, incluindo empréstimos com garantia soberana, empréstimos baseados em políticas, doações para cooperação técnica e garantias. Esses recursos visam fortalecer a capacidade institucional, financiar infraestrutura e promover o desenvolvimento inclusivo e resiliente ao clima.",
            priorityThemes: [
                "Desenvolvimento urbano integrado",
                "Restauração ambiental",
                "Redução de riscos de inundação",
                "Proteção ambiental"
            ],
            typesOfFunding: [
                "Empréstimos com garantia soberana",
                "Empréstimos para investimento",
                "Empréstimos baseados em políticas (PBLs)",
                "Projetos específicos",
                "Programas de trabalho múltiplos",
                "Linhas de Crédito Condicionais (CCLIP)",
                "Empréstimos baseados em desempenho (PDL)",
                "Abordagem Setorial Ampla (SWAp)",
                "Cooperações Técnicas (TC)"
            ],
            fundedProjectExample: {
                title: "Programa de Restauração Ambiental de Belo Horizonte",
                description: "Empréstimo de US$ 46,5 milhões para melhorar a qualidade dos cursos d'água e reduzir riscos de enchentes por meio de ações de restauração ambiental."
            },
            eligibilityRequirements: [
                "Os projetos devem ser específicos e indivisíveis (não podem ser fragmentados sem perder o propósito).",
                "Os projetos devem passar por análise de custo, viabilidade técnica, financeira e econômica.",
                "Para definição das condições de pagamento, o BID estabelece os termos do empréstimo e os tomadores devem indicar bancos intermediários envolvidos.",
                "Os projetos podem incluir programas de cooperação técnica, estudos e diagnósticos.",
                "Os projetos devem estar alinhados às políticas e prioridades estratégicas do BID.",
                "Os municípios devem demonstrar capacidade de crédito e responsabilidade fiscal, garantindo a gestão e o pagamento dos empréstimos.",
                "No Brasil, o acesso municipal a financiamento externo geralmente requer aprovações do: Ministério da Fazenda, Comissão de Assuntos Econômicos, Senado Federal."
            ],
            link: "https://portal.bndes.gov.br/habilitacao/"
        }
    }
}

const caf = {
    id: "CAF – Development Bank of Latin America and the Caribbean",
    translations: {
        en: {
            title: "CAF – Development Bank of Latin America and the Caribbean",
            region: "Latin America and the Caribbean",
            currency: "USD",
            scope: "Sustainable urban development, infrastructure, environmental and social programs",
            description: "CAF provides financial and technical support to strengthen sustainable development across Latin America. It supports municipalities with concessional and non-concessional loans, equity investments, technical assistance, and blended finance to boost climate resilience, infrastructure, and social equity. CAF works closely with local governments from the early planning phase to increase funding success.",
            priorityThemes: [
                "Sustainable urban development",
                "Environmental management",
                "Social development",
            ],
            typesOfFunding: [
                "Concessional loans",
                "Non-concessional loans",
                "Equity Investments",
                "Grants and technical assistance",
                "Blended finance",
            ],
            fundedProjectExample: {
                title: "Mais Mogi Ecotietê Program",
                description: "A $69.4 million initiative aimed at urban and environmental development.",

            },
            eligibilityRequirements: [
                "Municipalities should engage with CAF representatives early in the planning process to receive tailored guidance and improve funding success.",
                "Projects must align with CAF's strategic objectives.",
                "Projects must be technically feasible.",
                "Must comply with national and local regulations.",
                "Projects are assessed for their economic, financial, and institutional sustainability.",
                "Borrowing municipalities must have a solid financial structure to ensure repayment capacity.",
            ],
            link: "https://portal.bndes.gov.br/habilitacao/"
        },
        pt: {
            title: "CAF – Banco de Desenvolvimento da América Latina e Caribe",
            region: "América Latina e Caribe",
            currency: "USD",
            scope: "Desenvolvimento urbano sustentável, infraestrutura, programas ambientais e sociais",
            description: "A CAF oferece apoio financeiro e técnico para fortalecer o desenvolvimento sustentável na América Latina. Apoia municípios com empréstimos concessionais e não concessionais, investimentos em participação, assistência técnica e financiamento combinado para aumentar a resiliência climática, infraestrutura e equidade social. Atua junto aos governos locais desde o planejamento para aumentar o sucesso na captação de recursos.",
            priorityThemes: [
                "Desenvolvimento urbano sustentável",
                "Gestão ambiental",
                "Desenvolvimento social"
            ],
            typesOfFunding: [
                "Empréstimos concessionais",
                "Empréstimos não concessionais",
                "Investimentos em participação",
                "Doações e assistência técnica",
                "Financiamento combinado"
            ],
            fundedProjectExample: {
                title: "Programa Mais Mogi Ecotietê",
                description: "Iniciativa de US$ 69,4 milhões voltada ao desenvolvimento urbano e ambiental."
            },
            eligibilityRequirements: [
                "Os municípios devem buscar orientação da CAF desde o início do planejamento para receber orientações personalizadas e aumentar o sucesso na captação.",
                "Os projetos devem estar alinhados aos objetivos estratégicos da CAF.",
                "Os projetos devem ser tecnicamente viáveis.",
                "Deve cumprir as normas nacionais e locais.",
                "Os projetos são avaliados quanto à sustentabilidade econômica, financeira e institucional.",
                "Os municípios tomadores devem ter estrutura financeira sólida para garantir a capacidade de pagamento."
            ],
            link: "https://portal.bndes.gov.br/habilitacao/"
        }
    }
}

const fonPlata = {
    id: "FONPLATA - Financial Fund for the Development of the River Plate Basin",
    translations: {
        en: {
            title: "FONPLATA - Financial Fund for the Development of the River Plate Basin",
            region: "Argentina, Bolivia, Brazil, Paraguay, and Uruguay",
            currency: "USD",
            scope: "Sustainable urban development, infrastructure, environmental and social programs",
            description: "FONPLATA supports inclusive and sustainable development in member countries by financing pre-investment and investment projects. It focuses on urban infrastructure, mobility, and socio-environmental improvements through concessional loans and non-reimbursable technical cooperation grants. The fund is particularly well-suited for mid-sized municipalities aiming to improve quality of life and environmental outcomes.",
            priorityThemes: [
                "Socio-environmental development",
                "Urban infrastructure",
                "Sanitation",
                "Urban mobility",
                "Environmental preservation",
            ],
            typesOfFunding: [
                "Loans to fund pre-investment and investment projects, including programs, studies, and works",
                "Non-reimbursable technical cooperation funds to support specific initiatives",
            ],
            fundedProjectExample: {
                title: "Cascavel Urban Development Program",
                description: "A $32 million investment in sanitation, urban mobility, environmental parks, and social welfare facilities in Cascavel, Paraná.",

            },
            eligibilityRequirements: [
                "Municipalities should contact the liaison agency in their country for detailed information on funding criteria and procedures.",
                "Projects must be comprehensive and aligned with FONPLATA's mission of inclusive and sustainable development.",
                "Projects must be technically feasible.",
                "Must comply with all relevant national and local regulatory frameworks.",
                "Municipalities must demonstrate financial stability.",
                "Must show the capacity to manage and repay any loans or financial instruments received.",
            ],
            link: "https://portal.bndes.gov.br/habilitacao/"
        },
        pt: {
            title: "FONPLATA - Fundo Financeiro para o Desenvolvimento da Bacia do Prata",
            region: "Argentina, Bolívia, Brasil, Paraguai e Uruguai",
            currency: "USD",
            scope: "Desenvolvimento urbano sustentável, infraestrutura, programas ambientais e sociais",
            description: "O FONPLATA apoia o desenvolvimento inclusivo e sustentável nos países membros, financiando projetos de pré-investimento e investimento. Foca em infraestrutura urbana, mobilidade e melhorias socioambientais por meio de empréstimos concessionais e doações não reembolsáveis para cooperação técnica. É especialmente indicado para municípios de médio porte que buscam melhorar a qualidade de vida e os resultados ambientais.",
            priorityThemes: [
                "Desenvolvimento socioambiental",
                "Infraestrutura urbana",
                "Saneamento",
                "Mobilidade urbana",
                "Preservação ambiental"
            ],
            typesOfFunding: [
                "Empréstimos para projetos de pré-investimento e investimento, incluindo programas, estudos e obras",
                "Fundos de cooperação técnica não reembolsáveis para apoiar iniciativas específicas"
            ],
            fundedProjectExample: {
                title: "Programa de Desenvolvimento Urbano de Cascavel",
                description: "Investimento de US$ 32 milhões em saneamento, mobilidade urbana, parques ambientais e equipamentos de assistência social em Cascavel, Paraná."
            },
            eligibilityRequirements: [
                "Os municípios devem contatar o órgão de ligação em seu país para informações detalhadas sobre critérios e procedimentos de financiamento.",
                "Os projetos devem ser abrangentes e alinhados à missão do FONPLATA de desenvolvimento inclusivo e sustentável.",
                "Os projetos devem ser tecnicamente viáveis.",
                "Deve cumprir todos os marcos regulatórios nacionais e locais relevantes.",
                "Os municípios devem demonstrar estabilidade financeira.",
                "Deve demonstrar capacidade de gestão e pagamento de quaisquer empréstimos ou instrumentos financeiros recebidos."
            ],
            link: "https://portal.bndes.gov.br/habilitacao/"
        }
    }
}

const bndes = {
    id: "BNDES - National Bank for Economic and Social Development",
    translations: {
        en: {
            title: "BNDES - National Bank for Economic and Social Development",
            region: "Brazil",
            currency: "BRL",
            scope: "Climate, infrastructure, energy, urban development, social inclusion",
            description: "BNDES is Brazil's federal development bank, offering tailored financing and technical support for municipalities and public-private initiatives. It funds climate mitigation and adaptation projects through direct and indirect operations, including energy, sanitation, waste management, urban mobility, and cultural heritage preservation. Funding mechanisms are adapted based on project scale, strategic alignment, and municipal capacity.",
            priorityThemes: [
                "Climate change mitigation and adaptation",
                "Renewable energy",
                "Energy efficiency",
                "Sustainable urban development",
                "Waste management",
                "Environmental conservation",
            ],
            typesOfFunding: [
                "Indirect Financing: Through accredited financial institutions (automatic & non-automatic modes)",
                "Direct Financing: For large-scale or strategic projects via BNDES Client Portal",
                "FINAME: For acquiring new, domestically produced equipment",
                "Shareholdings: Equity investments in strategic municipal projects",
                "Non-Reimbursable Funds: For cultural, social, and environmental impact projects",
            ],
            fundedProjectExample: {
                title: "Uberaba (MG)",
                description: "Establishment of a Public-Private Partnership (PPP) to install a photovoltaic solar plant to meet the energy demand of public buildings and reduce energy costs, promoting local sustainability.",

            },
            eligibilityRequirements: [
                "Proposed projects must align with BNDES's strategic objectives, emphasizing sustainable development and social inclusion.",
                "Projects must demonstrate technical viability and a strong potential for successful implementation.",
                "Municipalities must provide financial guarantees.",
                "Must comply with Brazil's Fiscal Responsibility Law(Lei de Responsabilidade Fiscal).",
                "BNDES conducts an evaluation of the municipality's financial health before approving funding.",
            ],
            link: "https://portal.bndes.gov.br/habilitacao/"
        },
        pt: {
            title: "BNDES - Banco Nacional de Desenvolvimento Econômico e Social",
            region: "Brasil",
            currency: "BRL",
            scope: "Clima, infraestrutura, energia, desenvolvimento urbano, inclusão social",
            description: "O BNDES é o banco federal de desenvolvimento do Brasil, oferecendo financiamento personalizado e apoio técnico para municípios e iniciativas público-privadas. Financia projetos de mitigação e adaptação climática por meio de operações diretas e indiretas, incluindo energia, saneamento, gestão de resíduos, mobilidade urbana e preservação do patrimônio cultural. Os mecanismos de financiamento são adaptados conforme o porte do projeto, alinhamento estratégico e capacidade municipal.",
            priorityThemes: [
                "Mitigação e adaptação às mudanças climáticas",
                "Energia renovável",
                "Eficiência energética",
                "Desenvolvimento urbano sustentável",
                "Gestão de resíduos",
                "Conservação ambiental"
            ],
            typesOfFunding: [
                "Financiamento indireto: por meio de instituições financeiras credenciadas (modos automáticos e não automáticos)",
                "Financiamento direto: para projetos de grande porte ou estratégicos via Portal do Cliente BNDES",
                "FINAME: para aquisição de novos equipamentos produzidos nacionalmente",
                "Participações societárias: investimentos em projetos municipais estratégicos",
                "Fundos não reembolsáveis: para projetos de impacto cultural, social e ambiental"
            ],
            fundedProjectExample: {
                title: "Uberaba (MG)",
                description: "Estabelecimento de uma Parceria Público-Privada (PPP) para instalar uma usina solar fotovoltaica para suprir a demanda energética de prédios públicos e reduzir custos, promovendo a sustentabilidade local."
            },
            eligibilityRequirements: [
                "Os projetos propostos devem estar alinhados aos objetivos estratégicos do BNDES, com ênfase em desenvolvimento sustentável e inclusão social.",
                "Os projetos devem demonstrar viabilidade técnica e forte potencial de implementação bem-sucedida.",
                "Os municípios devem fornecer garantias financeiras.",
                "Deve cumprir a Lei de Responsabilidade Fiscal do Brasil.",
                "O BNDES realiza avaliação da saúde financeira do município antes de aprovar o financiamento."
            ],
            link: "https://portal.bndes.gov.br/habilitacao/"
        }
    }
}

const pac = {
    id: "BNDES - National Bank for Economic and Social Development",
    translations: {
        en: {
            title: "Programa de Aceleração do Crescimento (PAC)",
            region: "Brazil",
            currency: "BRL",
            scope: "Infrastructure, sustainable urban development, climate adaptation, and social inclusion",
            description: "PAC is a large-scale federal investment program that supports strategic public infrastructure and social development across Brazil. Through its latest phase, Novo PAC, it offers both loans and grants for projects in sectors like transportation, water, sanitation, energy, and disaster resilience. It aims to boost economic growth while promoting sustainability and quality of life in cities.",
            priorityThemes: [
                "Transportation",
                "Sustainable and Resilient Cities (Sustainable Urban Mobility, Solid Waste Management, Disaster Prevention, Sanitation)",
                "Water for All",
                "Energy Transition and Security",
                "Education, Science, and Technology",
                "Health",
            ],
            typesOfFunding: [
                "Loans which are granted by financial institutions such as Caixa Econômica Federal,the National Bank for Economic and Social Development (BNDES) and Banco do Brasil",
                "Non-reimbursable funds for specific projects that involve research, development and innovation initiatives"
            ],
            fundedProjectExample: {
                title: "",
                description: "On Transportation, there are R$4.4 billion for fleet renewal and another R$4 billion for infrastructure works in public transport and active mobility in large and medium-sized cities. It's worth noting that we've expanded the range of eligible municipalities, allowing cities with more than 150,000 inhabitants to also access PAC (Mininstério das Cidades, 2025).",

            },
            eligibilityRequirements: [
                "Projects must align with PAC's objectives and priority areas.",
                "Municipalities must demonstrate technical and administrative capacity to implement the projects effectively.",
                "Must comply with fiscal responsibility laws to ensure sound and transparent financial management.",
                "Collaboration with federal, state, and private institutions may be required to ensure project feasibility.",
            ],
            link: "https://portal.bndes.gov.br/habilitacao/"
        },
        pt: {
            title: "Programa de Aceleração do Crescimento (PAC)",
            region: "Brasil",
            currency: "BRL",
            scope: "Infraestrutura, desenvolvimento urbano sustentável, adaptação climática e inclusão social",
            description: "O PAC é um programa federal de investimentos em larga escala que apoia a infraestrutura pública estratégica e o desenvolvimento social em todo o Brasil. Em sua fase mais recente, o Novo PAC, oferece empréstimos e repasses para projetos em setores como transporte, água, saneamento, energia e resiliência a desastres. O objetivo é impulsionar o crescimento econômico promovendo sustentabilidade e qualidade de vida nas cidades.",
            priorityThemes: [
                "Transporte",
                "Cidades Sustentáveis e Resilientes (Mobilidade Urbana Sustentável, Gestão de Resíduos Sólidos, Prevenção de Desastres, Saneamento)",
                "Água para Todos",
                "Transição e Segurança Energética",
                "Educação, Ciência e Tecnologia",
                "Saúde"
            ],
            typesOfFunding: [
                "Empréstimos concedidos por instituições financeiras como Caixa Econômica Federal, BNDES e Banco do Brasil",
                "Recursos não reembolsáveis para projetos específicos de pesquisa, desenvolvimento e inovação"
            ],
            fundedProjectExample: {
                title: "",
                description: "No setor de transporte, são R$ 4,4 bilhões para renovação de frota e outros R$ 4 bilhões para obras de infraestrutura em transporte público e mobilidade ativa em cidades grandes e médias. Destaca-se a ampliação do acesso ao PAC para municípios com mais de 150 mil habitantes (Ministério das Cidades, 2025)."
            },
            eligibilityRequirements: [
                "Os projetos devem estar alinhados aos objetivos e áreas prioritárias do PAC.",
                "Os municípios devem demonstrar capacidade técnica e administrativa para implementar os projetos de forma eficaz.",
                "Deve cumprir as leis de responsabilidade fiscal para garantir uma gestão financeira sólida e transparente.",
                "Pode ser necessária colaboração com instituições federais, estaduais e privadas para viabilizar o projeto."
            ],
            link: "https://portal.bndes.gov.br/habilitacao/"
        }
    }
}
export const fundingSources = [idb, caf, fonPlata, bndes, pac]