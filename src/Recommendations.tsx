import { useTranslation } from "react-i18next";
import { Box, Button, Flex, Heading, HStack, Text, Link as ChakraLink, Icon, Span } from "@chakra-ui/react";
import { Accordion } from "@chakra-ui/react";
import { SurveyAnswers } from "./types.ts";
import { Link } from "react-router-dom";
import { getRecommendations } from "./surveyHelper.ts";
import MaturityTag from "./components/MaturityTag.tsx";

interface RecommendationsProps {
    answers: SurveyAnswers
}

export default function Recommendations({ answers }: RecommendationsProps) {
    const recommendations = getRecommendations(answers);
    const { t } = useTranslation('translation');

    return (
        <Flex alignItems={'center'} justifyContent={'center'} width={'100vw'} my={"3%"}>
            <Box width={'70%'}>
                <Heading mb={4}>{t('recommendations.title' as any)}</Heading>
                <Heading fontSize={"16px"} mb={6}>{t('recommendations.breakdown' as any)}</Heading>

                <Accordion.Root collapsible mt={4}>
                    {recommendations.map(({ category, maturity, score, recommendations: categoryRecs }) => (
                        <Accordion.Item key={category} value={category}>
                            <Accordion.ItemTrigger>
                                <Box flex="1" textAlign="left" p={4} bg="gray.50" borderRadius="md">
                                    <HStack justify="space-between">
                                        <HStack>
                                            <Text fontWeight="bold">{t(`results.${category}` as any)}</Text>
                                            <MaturityTag maturity={maturity} />
                                        </HStack>
                                        <Accordion.ItemIndicator />
                                    </HStack>
                                </Box>
                            </Accordion.ItemTrigger>
                            <Accordion.ItemContent>
                                <Accordion.ItemBody>
                                    <Box p={6} bg="white" borderRadius="md" boxShadow="sm">
                                        {categoryRecs.map((rec, index) => (
                                            <Box key={index} mb={6} p={4} bg="gray.50" borderRadius="md">
                                                <Text fontWeight="bold" mb={3} fontSize="lg">
                                                    {t(`questions.${rec.question}` as any)}
                                                </Text>
                                                {rec.recommendations.length > 0 && (
                                                    <Box mb={4}>
                                                        <Text fontWeight="semibold" mb={2} color="gray.700">
                                                            Recommendations:
                                                        </Text>
                                                        <Box as="ul" listStyleType="none" margin={0} padding={0}>
                                                            {rec.recommendations.map((recommendation, recIndex) => (
                                                                <Box as="li" key={recIndex} display="flex" alignItems="flex-start" mb={2}>
                                                                    <Text as="span" mr={2}>•</Text>
                                                                    <Text>{recommendation}</Text>
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                    </Box>
                                                )}
                                                {rec.references && rec.references.length > 0 && (
                                                    <Box>
                                                        <Text fontWeight="semibold" mb={2} color="gray.700">
                                                            References:
                                                        </Text>
                                                        {rec.references.map((ref, refIndex) => (
                                                            <ChakraLink
                                                                key={refIndex}
                                                                href={ref}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                color="blue.500"
                                                                fontSize="sm"
                                                                display="block"
                                                                mb={1}
                                                                _hover={{ textDecoration: 'underline' }}
                                                            >
                                                                {ref}
                                                            </ChakraLink>
                                                        ))}
                                                    </Box>
                                                )}
                                            </Box>
                                        ))}
                                    </Box>
                                </Accordion.ItemBody>
                            </Accordion.ItemContent>
                        </Accordion.Item>
                    ))}
                </Accordion.Root>

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