import { DrawerRoot, DrawerBackdrop, DrawerContent, DrawerBody } from "./drawer";
import { ButtonMedium } from "../Texts/Button";
import { Heading, Stack, VStack, HStack, Text, Badge, Icon, Button, Separator } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { FundingSource } from "./fundingSources";
import { Language } from "../../types";
import { handleDownloadPDF } from "./handleDownloadPDF";

interface FundingSourceDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    fundingSource: FundingSource | null;
}

export function FundingSourceDrawer({ isOpen, onClose, fundingSource }: FundingSourceDrawerProps) {
    const { i18n, t } = useTranslation('translation');
    const currentLanguage = i18n.language as Language;

    if (!fundingSource) return null;
    const data = fundingSource.translations[currentLanguage];

    return (
        <DrawerRoot open={isOpen} placement="end" onExitComplete={onClose} size="xl">
            <DrawerBackdrop />
            <DrawerContent>
                <DrawerBody>
                    <Stack px={4} py={10}>
                        <ButtonMedium
                            as="button"
                            color="content.link"
                            alignSelf="flex-start"
                            onClick={onClose}
                            px={6}
                            py={4}
                            mb={6}
                        >
                            <Icon as={MdArrowBack} boxSize={4} mr={2} />
                            {t("goBack")}
                        </ButtonMedium>
                        <Stack gap={6} id="funding-source-info">
                            <Heading size="lg">{data.title}</Heading>
                            <HStack gap={4} flexWrap="wrap">
                                <Badge colorPalette="default" variant="outline" color="black">{t('funding.region')}: {data.region}</Badge>
                                <Badge colorPalette="default" variant="outline" color="black">{t('funding.currency')}: {data.currency}</Badge>
                                <Badge colorPalette="default" variant="outline" color="black">{t('funding.scope')}: {data.scope}</Badge>
                            </HStack>
                            <Text
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 7,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {data.description}
                            </Text>
                            <VStack align="start" gap={2}>
                                <Heading size="md">{t('funding.priorityThemes')}</Heading>
                                <ul style={{ listStyleType: "disc", paddingLeft: 20 }}>
                                    {data.priorityThemes.map((theme) => (
                                        <li key={theme}><Text as="span">{theme}</Text></li>
                                    ))}
                                </ul>
                            </VStack>
                            <VStack align="start" gap={2}>
                                <Heading size="md">{t('funding.typesOfFunding')}</Heading>
                                <ul style={{ listStyleType: "disc", paddingLeft: 20 }}>
                                    {data.typesOfFunding.map((type) => (
                                        <li key={type}><Text as="span">{type}</Text></li>
                                    ))}
                                </ul>
                            </VStack>

                            <VStack align="start" gap={2}>
                                <Heading size="md">{t('funding.fundedProjectExample')}</Heading>
                                <Text>
                                    <b>{data.fundedProjectExample.title} -</b> {data.fundedProjectExample.description}
                                </Text>
                            </VStack>

                            <VStack align="start" gap={2} backgroundColor="#D7D8FAC9" padding={4} borderRadius={8}>
                                <Heading size="md" color="#2351DC">{t('funding.eligibilityRequirements')}</Heading>
                                <ol style={{ marginLeft: 16, listStyleType: "decimal" }}>
                                    {data.eligibilityRequirements.map((item) => (
                                        <li key={item}><Text as="span">{item}</Text></li>
                                    ))}
                                </ol>
                                {/* <Text> TODO NINA ADD LINKS WHEN WE HAVE THEM
                                    <b>{t('funding.linkToAccessTheFund')}:{' '}
                                        <Link href={data.link} target="_blank" rel="noopener noreferrer">
                                            {data.link}
                                        </Link></b>
                                </Text> */}

                            </VStack>
                            <VStack align="start" gap={2}>

                            </VStack>
                        </Stack>
                        <Separator />
                        <Button px={6} py={4} mb={6}
                            color="#0D44EC"
                            alignSelf="center"
                            justifyContent="center"
                            onClick={() => handleDownloadPDF(data, t)}>
                            <ButtonMedium
                                alignSelf="center"
                                color="white"

                            >
                                {t("funding.downloadPDF")}
                            </ButtonMedium>
                        </Button>
                    </Stack>
                </DrawerBody>
            </DrawerContent>
        </DrawerRoot>
    );
}
