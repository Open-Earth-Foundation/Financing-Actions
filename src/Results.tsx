import {useTranslation} from "react-i18next";
import {Box, Button, Flex, Heading, HStack, Table, Tag, Text, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon} from "@chakra-ui/react";
import {AnswersAndScoresPerCategory, MATURITY, SurveyAnswers} from "./types.ts";
import {Link} from "react-router-dom";
import { calculateResults } from "./surveyHelper.ts";

interface ResultsProps {
    answers: SurveyAnswers 
}

export default function Results({answers}: ResultsProps) {
    const results: AnswersAndScoresPerCategory = calculateResults(answers);
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
                                    <Tag.Label>{t(`maturity.${maturity}` as any )}</Tag.Label></Tag.Root></Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>

                <Link to="/recommendations">
                    <Button width={"440px"} backgroundColor="#dcfce7" color="#267945" size="lg" my={"10px"}>
                        {t('results.recommendations' as any)}
                    </Button>
                </Link>
                <HStack justifyContent="center" width="100%" my={"10px"}>
                    <Link to="/questionnaire">
                        <Button width={"215px"} backgroundColor="#dbeafe" color="#2146aa" size="md">
                            {t('results.retake' as any)}
                        </Button>
                    </Link>
                    <Link to="/">
                        <Button width={"215px"} backgroundColor="#fee2e2" color="#ba5b5b" size="md">
                            {t('results.close' as any)}
                        </Button>
                    </Link>
                </HStack>
            </Box>
        </Flex>
    );
}