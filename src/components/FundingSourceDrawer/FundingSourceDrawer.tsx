import { DrawerRoot, DrawerBackdrop, DrawerContent, DrawerBody } from "./drawer";
import { ButtonMedium } from "../Texts/Button";
import {
  Heading,
  Stack,
  VStack,
  Text,
  Icon,
  Button,
  Separator,
  Box,
} from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { FundingSource } from "./fundingSources";
import { handleDownloadPDF } from "./handleDownloadPDF";

import { NextStepsDrawer } from "../NextStepsDrawer/NextStepsDrawer";
import { useState } from "react";

interface FundingSourceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  fundingSource: FundingSource | null;
}

export function FundingSourceDrawer({
  isOpen,
  onClose,
  fundingSource,
}: FundingSourceDrawerProps) {
  const { t } = useTranslation("translation");
  const [isNextStepsDrawerOpen, setIsNextStepsDrawerOpen] = useState(false);
  const [
    selectedFundingSourceForNextSteps,
    setSelectedFundingSourceForNextSteps,
  ] = useState<FundingSource | null>(null);

  console.log("fundingSource", JSON.stringify(fundingSource)); // TODO NINA
  if (!fundingSource) return null;
  const { institutionId, sourceKey } = fundingSource;

  const handleOpenNextStepsDrawer = (source: FundingSource) => {
    setSelectedFundingSourceForNextSteps(source);
    setIsNextStepsDrawerOpen(true);
  };

  const handleCloseNextStepsDrawer = () => {
    setIsNextStepsDrawerOpen(false);
    setSelectedFundingSourceForNextSteps(null);
  };

  return (
    <>
      <DrawerRoot
        open={isOpen}
        placement="end"
        onExitComplete={onClose}
        size="xl"
      >
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
                <Heading size="lg">
                  {t(
                    `fundingSources.${institutionId}.sources.${sourceKey}.name`
                  )}
                </Heading>
                <Text
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 7,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {t(
                    `fundingSources.${institutionId}.sources.${sourceKey}.description`
                  )}
                </Text>

                <VStack align="start" gap={2}>
                  <Heading size="md">{t("funding.prioritySectors")}</Heading>
                  <Text>
                    {t(
                      `fundingSources.${institutionId}.sources.${sourceKey}.prioritySectors`
                    )}
                  </Text>
                </VStack>
                <VStack align="start" gap={2}>
                  <Heading size="md">{t("funding.instrumentType")}</Heading>
                  <Text>
                    {t(
                      `fundingSources.${institutionId}.sources.${sourceKey}.instrumentType`
                    )}
                  </Text>
                </VStack>

                <VStack align="start" gap={2}>
                  <Heading size="md">{t("funding.eligibleBorrowers")}</Heading>
                  <Text>
                    {t(
                      `fundingSources.${institutionId}.sources.${sourceKey}.eligibleBorrowers`
                    )}
                  </Text>
                </VStack>

                <VStack align="start" gap={2}>
                  <Heading size="md">{t("funding.ticketWindow")}</Heading>
                  <Text>
                    {t(
                      `fundingSources.${institutionId}.sources.${sourceKey}.ticketWindow`
                    )}
                  </Text>
                </VStack>

                <VStack align="start" gap={2}>
                  <Heading size="md">{t("funding.financingShare")}</Heading>
                  <Text>
                    {t(
                      `fundingSources.${institutionId}.sources.${sourceKey}.financingShare`
                    )}
                  </Text>
                </VStack>

                <VStack align="start" gap={2}>
                  <Heading size="md">{t("funding.financialCost")}</Heading>
                  <Text>
                    {t(
                      `fundingSources.${institutionId}.sources.${sourceKey}.financialCost`
                    )}
                  </Text>
                </VStack>

                <VStack align="start" gap={2}>
                  <Heading size="md">{t("funding.tenor")}</Heading>
                  <Text>
                    {t(
                      `fundingSources.${institutionId}.sources.${sourceKey}.tenor`
                    )}
                  </Text>
                </VStack>

                <VStack align="start" gap={2}>
                  <Heading size="md">{t("funding.safeguards")}</Heading>
                  <Text>
                    {t(
                      `fundingSources.${institutionId}.sources.${sourceKey}.safeguards`
                    )}
                  </Text>
                </VStack>

                <VStack align="start" gap={2}>
                  <Heading size="md">{t("funding.applicationChannel")}</Heading>
                  <Text>
                    {t(
                      `fundingSources.${institutionId}.sources.${sourceKey}.applicationChannel`
                    )}
                  </Text>
                </VStack>
              </Stack>
              <Separator />
              <Box mt={10} width="100%" display="flex" justifyContent="center">
                <Stack gap={6} direction="row" width="auto" alignItems="center">
                  <Button
                    bg="#2456E6"
                    color="white"
                    fontWeight="bold"
                    borderRadius="2em"
                    px={10}
                    py={6}
                    fontSize="md"
                    width={"auto"}
                    _hover={{ bg: "#1741b6" }}
                    onClick={() => handleOpenNextStepsDrawer(fundingSource)}
                  >
                    {t("funding.seeNextSteps")}
                  </Button>
                  <Button
                    bg="#2456E6"
                    color="white"
                    fontWeight="bold"
                    borderRadius="2em"
                    px={10}
                    py={6}
                    fontSize="md"
                    width={"auto"}
                    _hover={{ bg: "#1741b6" }}
                    onClick={() => handleDownloadPDF(fundingSource, t)}
                  >
                    Download as PDF
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>

      <NextStepsDrawer
        isOpen={isNextStepsDrawerOpen}
        onClose={handleCloseNextStepsDrawer}
        fundingSource={selectedFundingSourceForNextSteps}
      />
    </>
  );
}
