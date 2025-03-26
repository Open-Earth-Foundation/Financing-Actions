import {useTranslation} from "react-i18next";
import {Box, Button, Flex, Heading, HStack, Table, Tag} from "@chakra-ui/react";
import {MATURITY, SurveyAnswers} from "./types.ts";
import {Link} from "react-router-dom";

function normalizeAnswers(answers: SurveyAnswers) {
    const mappedAnswers: { [key: number]: number | string } = {};
    Object.entries(answers).forEach(([key, value]) => {
        mappedAnswers[(key.split('question')[1]) - 1] = value
    });

    // questions 9 and 14 are multiple choice, so we need to map them to a numeric value
    mappedAnswers[8] = ["C"].includes(mappedAnswers[13] as string) ? 2 : 0;
    mappedAnswers[13] = ["A", "B"].includes(mappedAnswers[13] as string) ? 3 : 0;

    return mappedAnswers;
}

const sumQuestions = (answers: SurveyAnswers) => {
    const normalizedAnswers = normalizeAnswers(answers);

    const questionsPerCategory = [[0, 1, 2], [3, 4, 5, 6], [7, 8, 9, 10, 11, 12], [13, 14, 15]];
    const calculateCategoryScore = (categoryQuestions: number[]) => {
        return categoryQuestions.reduce((acc, curr) => acc + (normalizedAnswers[curr] || 0), 0);
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
        return MATURITY.initial
    if (score < rule[1])
        return MATURITY.intermediate
    return MATURITY.advanced
}

const calculateResults = (answers: Record<String, number>) => {
    const answersWithScore: Record<String, number> = sumQuestions(answers);
    return {
        "climate-governance-and-planning": {score: answersWithScore["climate-governance-and-planning"], maturity: calculateMaturity(answersWithScore["climate-governance-and-planning"], between2and5)},
        "technical-and-institutional-capacity": {score: answersWithScore["technical-and-institutional-capacity"], maturity: calculateMaturity(answersWithScore["technical-and-institutional-capacity"], between2and5)},
        "projects-structuring": {score: answersWithScore["projects-structuring"], maturity: calculateMaturity(answersWithScore["projects-structuring"], between3and8)},
        "funding-and-fundraising": {score: answersWithScore["funding-and-fundraising"], maturity: calculateMaturity(answersWithScore["funding-and-fundraising"], between2and5)},
    }
}


interface ResultsProps {
    answers: SurveyAnswers | {}
}

export default function Results({answers}: ResultsProps) {
    const results = calculateResults(answers);
    const {t} = useTranslation('translation');
    const getColorPalette = (maturity: MATURITY) => {
        switch (maturity) {
            case MATURITY.initial:
                return 'red'
            case MATURITY.intermediate:
                return 'yellow'
            default:
                return 'green'
        }
    }
    return (
        <Flex alignItems={'center'} justifyContent={'center'} width={'100vw'} my={"3%"}>
            <Box width={'70%'}>
                <Heading>{t('results.title' as any)}</Heading>
                <Heading fontSize={"16px"}>{t('results.breakdown' as any)}</Heading>
                <Table.Root size="sm">
                    <Table.Body>
                        {Object.entries(results).map(([key, {score, maturity}]) => (
                            <Table.Row key={key}>
                                <Table.Cell>{`${t(`results.${key}` as any)}: ${score}`}</Table.Cell>
                                <Table.Cell><Tag.Root colorPalette={getColorPalette(maturity)}>
                                    <Tag.Label>{maturity}</Tag.Label></Tag.Root></Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
                    <Link to="/recommendations">
                        <Button width={"400px"} backgroundColor="#dcfce7" color="#267945" size="lg" my={"10px"}>
                            {t('results.recommendations' as any)}
                        </Button>
                    </Link>
                <HStack  justifyContent="center" width="100%" my={"10px"}>
                    <Link to="/questionnaire">
                        <Button width={"200px"} backgroundColor="#dbeafe" color="#2146aa" size="md">
                            {t('results.retake' as any)}
                        </Button>
                    </Link>
                    <Link to="/">
                        <Button width={"200px"} backgroundColor="#fee2e2" color="#ba5b5b" size="md">
                            {t('results.close' as any)}
                        </Button>
                    </Link>
                </HStack>
            </Box>
        </Flex>
    );
}