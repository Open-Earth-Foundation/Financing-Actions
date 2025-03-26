import {useTranslation} from "react-i18next";
import {Box, Flex, Heading, Text} from "@chakra-ui/react";

type Answer = {
    [question: string]: number
}

interface ResultsProps {
    answers: Answer
}

const sumQuestions = (answers: Answer) => {
    const mappedAnswers: { [key: number]: number } = {};
    Object.entries(answers).forEach(([key, value]) => {
        mappedAnswers[(key.split('question')[1]) - 1] = value
    });

    const questionsPerCategory = [[0, 1, 2], [3, 4, 5, 6], [7, 8, 9, 10, 11, 12], [13, 14, 15]];
    const calculateCategoryScore = (categoryQuestions: number[]) => {
        return categoryQuestions.reduce((acc, curr) => acc + (mappedAnswers[curr] || 0), 0);
    };

    const categories = {
        'climate-governance-and-planning': questionsPerCategory[0],
        'technical-and-institutional-capacity': questionsPerCategory[1],
        'projects-structuring': questionsPerCategory[2],
        'funding-and-fundraising': questionsPerCategory[3]
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
        return 'initial'
    if (score < rule[1])
        return 'intermediate'
    return 'advanced'
}

const calculateResults = (_answers: Answer) => {
    // console.log("answers", JSON.stringify(answers, null, 2)) // TODO NINA
    const answers = {
        question1: 1,
        question2: 1,
        question3: 1,
        question4: 1,
        question5: 2,
        question6: 2,
        question7: 2,
        question8: 2,
        question11: 3,
        question12: 3,
        question13: 3,
        question14: 3,
        question15: 3,
        question16: 3,
    }
    const points = sumQuestions(answers);
    return {
        "climate-governance-and-planning": calculateMaturity(points["climate-governance-and-planning"], between2and5),
        "technical-and-institutional-capacity": calculateMaturity(points["technical-and-institutional-capacity"], between2and5),
        "projects-structuring": calculateMaturity(points["projects-structuring"], between3and8),
        "funding-and-fundraising": calculateMaturity(points["funding-and-fundraising"], between2and5),
    }
}

export default function Results({answers}: ResultsProps) {
    const results = calculateResults(answers || []);
    const {t} = useTranslation('translation');

    return (
        <Flex alignItems={'center'} justifyContent={'center'} width={'100vw'} my={"5%"}>
            <Box width={'70%'}>
                <Heading>{t('results.title' as any)}</Heading>
                <Heading fontSize={"16px"}>{t('results.breakdown' as any)}</Heading>
                {Object.entries(results).map(([key, value]) => (
                    <Text key={key}>
                        {t(`results.${key}` as any)}: {value}
                    </Text>
                ))}
            </Box>
        </Flex>
    );
}