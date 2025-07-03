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
export interface Recommendation {
    question: string;
    answer: string;
    recommendations: string[];
    references?: string[];
}export interface CategoryRecommendations {
    category: string;
    maturity: MATURITY;
    score: number;
    recommendations: Recommendation[];
}
export interface CategoryRecommendation {
    category: string;
    questions: QuestionRecommendation[];
}
export interface QuestionRecommendation {
    question: string;
    answer: string;
    score: number;
    weight: number;
    weightJustification: string;
    result: number;
    maturity: string;
    recommendations: string[];
    observation?: string;
    references: string[];
}
export type Language = 'en' | 'pt';

export interface NextStep {
  title: string;
  subtitle?: string;
  items: string[];
  note?: string;
  timeline?: string;
}

export interface FundingSource {
  sourceKey: string;
  Intitution: string;
  Description: string;
  "Fund Name": string;
  "Instrument Type": string;
  "Eligible Borrowers": string;
  "Priority Sectors": string;
  "Ticket Window": string;
  "Financing Share": string;
  "Financial Cost": string;
  Tenor: string;
  Safeguards: string;
  "Application Channel": string;
  "Official Link": string;
  nextSteps?: NextStep[];
}

export interface Institution {
  id: string;
  name: string;
  description: string;
  fundingSources: FundingSource[];
}

