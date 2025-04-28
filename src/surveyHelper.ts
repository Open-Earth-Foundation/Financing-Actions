import { CATEGORIES, CategoryRecommendations, Language, MATURITY, Recommendation, SurveyAnswers } from "./types";
import { recommendationsData } from './recommendationsData';


function normalizeAnswers(answers: SurveyAnswers) {
    const mappedAnswers: { [key: number]: number } = {};
    Object.entries(answers).forEach(([key, value]) => {
        const questionNumber = parseInt(key.split('question')[1]);
        // For questions 9 and 14, we want to keep the letter value
        if (questionNumber === 9 || questionNumber === 14) {
            mappedAnswers[questionNumber - 1] = value as unknown as number;
        } else {
            const numericValue = typeof value === 'string' ? parseInt(value) : value;
            mappedAnswers[questionNumber - 1] = numericValue;
        }
    });

    // Map letter values to numeric scores for questions 9 and 14
    if (typeof mappedAnswers[8] === 'string') {
        mappedAnswers[8] = ["C"].includes(mappedAnswers[8] as unknown as string) ? 2 : 0;
    }

    if (typeof mappedAnswers[13] === 'string') {
        mappedAnswers[13] = ["A", "B"].includes(mappedAnswers[13] as unknown as string) ? 3 : 0;
    }

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

export function getRecommendations(answers: SurveyAnswers, language: Language): CategoryRecommendations[] {
    const results = calculateResults(answers);
    const recommendations: CategoryRecommendations[] = [];

    Object.entries(results).forEach(([category, { score, maturity, answers: categoryAnswers }]) => {
        // Find the category data - remove toLowerCase() since categories are exact matches
        const categoryData = recommendationsData.find(c => c.category === category);
        if (!categoryData) {
            console.log(`Category not found: ${category}`);
            return;
        }

        const categoryRecs: Recommendation[] = Object.entries(categoryAnswers)
            .filter(([_, answer]) => answer !== undefined)
            .map(([questionKey, answer]) => {
                // Extract question number from key (e.g., "question1" -> 1)
                const questionNumber = parseInt(questionKey.replace('question', ''));
                const questionData = categoryData.questions.find(q => q.number === questionNumber);

                if (!questionData) {
                    console.log(`Question not found: ${questionNumber} in category ${category}`);
                    return {
                        question: questionKey,
                        answer: answer?.toString() ?? '',
                        recommendations: [],
                        references: []
                    };
                }

                console.log(`Question ${questionNumber}: answer=${answer}`);

                const answerData = questionData.answers.find(a => a.answer === answer);

                if (!answerData) {
                    console.log(`Answer data not found for question ${questionNumber} with answer ${answer}`);
                }

                const recommendations = answerData?.recommendations[language] ?? [];

                return {
                    question: questionKey,
                    answer: answer?.toString() ?? '',
                    recommendations,
                    references: answerData?.references ?? []
                };
            });

        recommendations.push({
            category,
            maturity,
            score,
            recommendations: categoryRecs
        });
    });

    return recommendations;
}

