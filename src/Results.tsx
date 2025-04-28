import { Box, Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MaturityTag from "./components/MaturityTag.tsx";
import { calculateResults } from "./surveyHelper.ts";
import { SurveyAnswers } from "./types.ts";

interface ResultsProps {
    answers: SurveyAnswers
}

export default function Results({ answers }: ResultsProps) {
    const results = calculateResults(answers);
    const { t } = useTranslation('translation');

    return (
        <Flex alignItems={'center'} justifyContent={'center'} width={'100vw'} my={"3%"}>
            <Box width={'70%'}>
                <Heading mb={4}>{t('results.title' as any)}</Heading>
                <Heading fontSize={"16px"} mb={6}>{t('results.breakdown' as any)}</Heading>

                {Object.entries(results).map(([category, { maturity, score }]) => (
                    <Box flex="1" textAlign="left" p={4} bg="gray.50" borderRadius="md">
                        <HStack justify="space-between">
                            <HStack>
                                <Text fontWeight="bold">{t(`results.${category}` as any)}</Text>
                                <MaturityTag maturity={maturity} />
                                <Text fontSize="sm" color="gray.600">{t('score')}: {score}</Text>
                            </HStack>
                        </HStack>
                    </Box>
                ))}

                <HStack justifyContent="center" width="100%" my={8} gap={4}>
                    <Link to="/questionnaire">
                        <Button width={"215px"} backgroundColor="#dbeafe" color="#2146aa" size="md" _hover={{ bg: '#bfdbfe' }}>
                            {t('results.retake' as any)}
                        </Button>
                    </Link>
                    <Link to="/">
                        <Button width={"215px"} backgroundColor="#fee2e2" color="#ba5b5b" size="md" _hover={{ bg: '#fecaca' }}>
                            {t('results.close' as any)}
                        </Button>
                    </Link>
                    
                </HStack>
                <Link to="/recommendations">
                    <Button width={"440px"} backgroundColor="#dcfce7" color="#267945" size="lg" my={"10px"}>
                        {t('results.recommendations' as any)}
                    </Button>
                </Link>
            </Box>
        </Flex>
    );
}