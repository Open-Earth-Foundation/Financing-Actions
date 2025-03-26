export enum MATURITY {
    'initial' = 'initial',
    'intermediate' = 'intermediate',
    'advanced' = 'advanced'
}

export type SurveyAnswers = { [question: string]: number }

export type Answers = {
    [CATEGORIES.governance]: { score: number, maturity: MATURITY },
    [CATEGORIES.capacity]: { score: number, maturity: MATURITY }
    [CATEGORIES.structuring]: { score: number, maturity: MATURITY }
    [CATEGORIES.funding]: { score: number, maturity: MATURITY }
}

export enum CATEGORIES {
    'governance' = 'climate-governance-and-planning',
    'capacity' = 'technical-and-institutional-capacity',
    'structuring' = 'projects-structuring',
    'funding' = 'funding-and-fundraising'
}