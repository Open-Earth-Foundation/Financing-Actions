import { CATEGORIES, MATURITY, SurveyAnswers } from "./types";


function normalizeAnswers(answers: SurveyAnswers) {
    const mappedAnswers: { [key: number]: number } = {};
    Object.entries(answers).forEach(([key, value]) => {
        mappedAnswers[parseInt((key.split('question')[1])) - 1] = value
    });

    // questions 9 and 14 are multiple choice, so we need to map them to a numeric value
    mappedAnswers[8] = ["C"].includes(mappedAnswers[13] as unknown as string) ? 2 : 0;
    mappedAnswers[13] = ["A", "B"].includes(mappedAnswers[13] as unknown as string) ? 3 : 0;

    return mappedAnswers;
}

const questionsPerCategory = [[0, 1, 2], [3, 4, 5, 6], [7, 8, 9, 10, 11, 12], [13, 14, 15]];
const categories = {
    [CATEGORIES.governance]: questionsPerCategory[0],
    [CATEGORIES.capacity]: questionsPerCategory[1],
    [CATEGORIES.structuring]: questionsPerCategory[2],
    [CATEGORIES.funding]: questionsPerCategory[3]
};

const sumQuestions = (answers: SurveyAnswers) => {
    const normalizedAnswers = normalizeAnswers(answers);
    const calculateCategoryScore = (categoryQuestions: number[]) => {
        return categoryQuestions.reduce((acc, curr) => acc + (normalizedAnswers[curr] || 0), 0);
    };


    return Object.entries(categories).reduce((result, [category, questions]) => {
        result[category] = calculateCategoryScore(questions);
        return result;
    }, {} as Record<string, number>);
}

const between2and5 = [2, 5]
const between3and8 = [3, 8]

const calculateMaturity = (score: number, rule: number[]) => {
    if (score <= rule[0])
        return MATURITY.initial
    if (score < rule[1])
        return MATURITY.intermediate
    return MATURITY.advanced
}
export const calculateResults = (answers: SurveyAnswers) => {
    const answersWithScore: Record<string, number> = sumQuestions(answers);
    
    const getCategoryAnswers = (categoryQuestions: number[]) => {
        return categoryQuestions.reduce((acc, questionIndex) => {
            const questionKey = `question${questionIndex + 1}`;
            acc[questionKey] = answers[questionKey];
            return acc;
        }, {} as Record<string, number | string>);
    };

    return {
        [CATEGORIES.governance]: {
            score: answersWithScore[CATEGORIES.governance] as number,
            maturity: calculateMaturity(answersWithScore[CATEGORIES.governance], between2and5),
            answers: getCategoryAnswers(questionsPerCategory[0])
        },
        [CATEGORIES.capacity]: {
            score: answersWithScore[CATEGORIES.capacity] as number,
            maturity: calculateMaturity(answersWithScore[CATEGORIES.capacity], between2and5),
            answers: getCategoryAnswers(questionsPerCategory[1])
        },
        [CATEGORIES.structuring]: {
            score: answersWithScore[CATEGORIES.structuring] as number,
            maturity: calculateMaturity(answersWithScore[CATEGORIES.structuring], between3and8),
            answers: getCategoryAnswers(questionsPerCategory[2])
        },
        [CATEGORIES.funding]: {
            score: answersWithScore[CATEGORIES.funding] as number,
            maturity: calculateMaturity(answersWithScore[CATEGORIES.funding], between2and5),
            answers: getCategoryAnswers(questionsPerCategory[3])
        },
    }
}