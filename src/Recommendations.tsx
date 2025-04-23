import { useTranslation } from "react-i18next";
import { Box, Button, Flex, Heading, HStack, Badge, Text, List, ListItem, Link as ChakraLink, Icon } from "@chakra-ui/react";
import { Accordion } from "@chakra-ui/react";
import { AnswersAndScoresPerCategory, MATURITY, SurveyAnswers } from "./types.ts";
import { Link } from "react-router-dom";
import { calculateResults, getRecommendations } from "./surveyHelper.ts";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface RecommendationsProps {
    answers: SurveyAnswers
}

export default function Recommendations({ answers }: RecommendationsProps) {
    const recommendations = getRecommendations(answers);
    const { t } = useTranslation('translation');
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
                <Heading mb={4}>{t('recommendations.title' as any)}</Heading>
                <Heading fontSize={"16px"} mb={6}>{t('recommendations.breakdown' as any)}</Heading>

                <Text>{JSON.stringify(recommendations, null, 2)}</Text>

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
            </Box>
        </Flex>
    );
}