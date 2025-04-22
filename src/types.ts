export enum MATURITY {
    'initial' = 'initial',
    'intermediate' = 'intermediate',
    'advanced' = 'advanced'
}

export type SurveyAnswers = { [question: string]: number | string }

interface AnswersAndScores {
    score: number
    maturity: MATURITY
    answers: SurveyAnswers
}

export type AnswersAndScoresPerCategory = {
    [CATEGORIES.governance]: AnswersAndScores,
    [CATEGORIES.capacity]: AnswersAndScores,
    [CATEGORIES.structuring]: AnswersAndScores,
    [CATEGORIES.funding]: AnswersAndScores
}

export enum CATEGORIES {
    'governance' = 'climate-governance-and-planning',
    'capacity' = 'technical-and-institutional-capacity',
    'structuring' = 'projects-structuring',
    'funding' = 'funding-and-fundraising'
}