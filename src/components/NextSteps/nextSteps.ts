export interface NextStep {
    en: {
        title: string;
        items: string[];
    },
    pt: {
        title: string;
        items: string[];
    }
}

export const nextSteps: NextStep[] = [
    {
        en: {
            title: "Step 1: Map and Prioritize Your Project",
            items: [
                "List eligible projects aligned with IDB’s sectors: energy, transport, AFOLU, water, health, and disaster resilience.",
                "Choose IDB if your project is multi-sector, above R$150M, or involves multiple components."
            ],
        },
        pt: {
            title: "Passo 1: Mapear e Priorizar Seu Projeto",
            items: [
                "Liste projetos elegíveis alinhados com os setores do IDB: energia, transporte, AFOLU, água, saúde e resiliência a desastres.",
                "Escolha o IDB se seu projeto for multi-setorial, acima de R$150M ou envolver várias componentes."
            ],
        }
    }
];
