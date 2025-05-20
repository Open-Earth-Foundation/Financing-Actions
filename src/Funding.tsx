import { useTranslation } from "react-i18next";
import { Box, Button, Flex, Heading, Text, Card, CardHeader, CardBody, Grid, CardFooter, VStack } from "@chakra-ui/react";
import { Language } from "./types.ts";
import { FundingSource, fundingSources } from "./components/FundingSourceDrawer/fundingSources.ts";
import { useState } from "react";
import { FundingSourceDrawer } from "./components/FundingSourceDrawer/FundingSourceDrawer.tsx";

export default function Finance() {
    const { t, i18n } = useTranslation('translation');
    const currentLanguage = i18n.language as Language;
    const [selectedFundingSource, setSelectedFundingSource] = useState<FundingSource | null>(fundingSources[0]);
    return (<>
        {selectedFundingSource && <FundingSourceDrawer isOpen={!!selectedFundingSource} onClose={() => setSelectedFundingSource(null)} fundingSource={selectedFundingSource} />}
        <Flex
            alignItems={'center'}
            justifyContent={'center'}
            width={'100%'}
            minWidth={'100%'}
            my={"3%"}
        >
            <Box
                width={'100%'}
                maxWidth={'1200px'}
                px={4}
                mx="auto"
            >
                <Heading mb={4}>{t('funding.title' as any)}</Heading>
                <Heading fontSize={"16px"} mb={6}>{t('funding.breakdown' as any)}</Heading>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
                    {fundingSources.map((source) => (
                        <Card.Root key={source.id}>
                            <CardHeader>
                                <Heading>{source.translations[currentLanguage].title}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 7,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {source.translations[currentLanguage].description}
                                </Text>
                            </CardBody>
                            <CardFooter alignItems={"center"} justifyContent={"center"}>
                                <VStack>
                                    <div className="flex justify-between items-center pt-4">
                                        <Button
                                            variant={"plain"}
                                            onClick={() => setSelectedFundingSource(source)}
                                            className="text-primary hover:text-primary-dark font-semibold underline"
                                        >
                                            {t('funding.seeMoreDetails')}
                                        </Button>

                                    </div>
                                    {/* <Button> TODO NINA ADD BUTTON WHEN WE HAVE NEXT STEPS
                                        <ButtonMedium color="white">
                                            {t('funding.chooseSource')}
                                        </ButtonMedium>
                                    </Button> */}
                                </VStack>
                            </CardFooter>
                        </Card.Root>
                    ))}
                </Grid>
            </Box >
        </Flex >
    </>
    );
}