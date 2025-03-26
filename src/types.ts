export enum MATURITY {
    'initial' = 'initial',
    'intermediate' = 'intermediate',
    'advanced' = 'advanced'
}

export type SurveyAnswers = { [question: string]: number }

export type Answers = {
    [question: string]: { score: number, maturity?: MATURITY }
}