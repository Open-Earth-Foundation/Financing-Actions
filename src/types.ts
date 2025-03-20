export interface QuestionOption {
    label: string;
    score: number;
}

export interface Question {
    section: string;
    number: number;
    text: string;
    weight: number;
    options: QuestionOption[];
    answer?: QuestionOption
}