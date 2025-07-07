import {
  DrawerRoot,
  DrawerBackdrop,
  DrawerContent,
  DrawerBody,
} from "../FundingSourceDrawer/drawer";
import { ButtonMedium } from "../Texts/Button";
import { Stack, VStack, List, Text, Icon, Button, Box } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { FundingSource } from "../FundingSourceDrawer/fundingSources";
import { institutions } from "../institutions";
import { TitleLarge } from "../Texts/Title";
import { Institution, NextStep } from "../../types";
import pdfMake from "pdfmake/build/pdfmake";

interface NextStepsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  fundingSource: FundingSource | null;
}

export function NextStepsDrawer({
  isOpen,
  onClose,
  fundingSource,
}: NextStepsDrawerProps) {
  const { t } = useTranslation();

  if (!fundingSource) return null;

  const { institutionId, sourceKey } = fundingSource;
  const institution: Institution | undefined = institutions.find(
    (inst) => inst.id === institutionId
  );
  const fundingSourceData: any = institution?.fundingSources?.find(
    (source) => source && source.sourceKey === sourceKey
  );
  const officialLink =
    fundingSourceData?.["Official Link"] || fundingSourceData?.officialLink;

  // Custom PDF download for next steps only
  const handleDownloadNextStepsPDF = () => {
    if (!fundingSourceData?.nextSteps) return;
    const fundName = fundingSourceData["Fund Name"] || t("fundingSource");
    const content = [
      {
        text: t("nextSteps.title", { fundingSource: fundName }),
        style: "mainTitle",
        lineHeight: 1.5,
      },
      { text: "\n" },
      ...fundingSourceData.nextSteps.flatMap((nextStep: any, idx: number) => {
        const blocks = [];
        blocks.push({
          text: t(nextStep.title),
          style: "stepTitle",
          margin: [0, idx === 0 ? 0 : 16, 0, 4],
        });
        if (nextStep.subtitle) {
          blocks.push({
            text: t(nextStep.subtitle),
            style: "stepSubtitle",
            margin: [0, 0, 0, 4],
          });
        }
        if (nextStep.items && nextStep.items.length > 0) {
          blocks.push({
            ul: nextStep.items.map((item: string) => t(item)),
            style: "stepList",
            margin: [0, 0, 0, 4],
          });
        }
        if (nextStep.note) {
          blocks.push({
            text: t(nextStep.note),
            style: "stepNote",
            margin: [0, 0, 0, 4],
          });
        }
        if (nextStep.timeline) {
          blocks.push({
            text: t(nextStep.timeline),
            style: "stepTimeline",
            margin: [0, 0, 0, 4],
          });
        }
        return blocks;
      }),
    ];
    const docDefinition = {
      pageSize: "A4",
      pageMargins: [40, 40, 40, 40],
      content,
      styles: {
        mainTitle: { fontSize: 18, bold: true, margin: [0, 0, 0, 16] },
        stepTitle: { fontSize: 15, bold: true, margin: [0, 0, 0, 16] },
        stepSubtitle: { fontSize: 13, bold: true, margin: [0, 0, 0, 8] },
        stepList: { fontSize: 12, margin: [0, 0, 0, 8] },
        stepNote: { fontSize: 12, bold: true, margin: [0, 0, 0, 16] },
        stepTimeline: { fontSize: 12, bold: true },
      },
    };
    (pdfMake as any)
      .createPdf(docDefinition)
      .download(`${fundName} - Next Steps.pdf`);
  };

  return (
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

            <Stack gap={6}>
              <Text fontSize="2xl" fontWeight="bold" lineHeight="1.5">
                {t("nextSteps.title", {
                  fundingSource: fundingSourceData?.["Fund Name"] || "",
                })}
              </Text>

              {fundingSourceData?.nextSteps?.map(
                (nextStep: NextStep, idx: number) => {
                  return (
                    <VStack key={idx} align="start" gap={3}>
                      <TitleLarge>{t(nextStep.title)}</TitleLarge>
                      {nextStep.subtitle && (
                        <Text fontSize="md" fontWeight="bold">
                          {t(nextStep.subtitle)}
                        </Text>
                      )}
                      <List.Root style={{ marginLeft: "16px" }}>
                        {nextStep.items.map((item: string, i: number) => (
                          <List.Item key={i} _marker={{ color: "black" }}>
                            {t(item)}
                          </List.Item>
                        ))}
                      </List.Root>
                      {nextStep.note && (
                        <Text fontSize="sm" fontWeight="bold" mt={2}>
                          {t(nextStep.note)}
                        </Text>
                      )}
                      {nextStep.timeline && (
                        <Text
                          fontSize="sm"
                          fontWeight="bold"
                          color="gray.700"
                          mt={2}
                        >
                          Timeline: {t(nextStep.timeline)}
                        </Text>
                      )}
                    </VStack>
                  );
                }
              )}
            </Stack>

            {/* Action Buttons */}
            <Box mt={10} width="100%" display="flex" justifyContent="center">
              <Stack
                gap={6}
                direction={"row"}
                width={"auto"}
                alignItems={"center"}
              >
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
                  onClick={handleDownloadNextStepsPDF}
                >
                  Download Steps PDF
                </Button>
                <Button
                  variant="outline"
                  borderColor="#2456E6"
                  color="#2456E6"
                  fontWeight="bold"
                  borderRadius="2em"
                  px={10}
                  py={6}
                  fontSize="md"
                  width={"auto"}
                  bg="#F6F8FF"
                  _hover={{ bg: "#e6edff" }}
                  onClick={() => {
                    if (officialLink) window.open(officialLink, "_blank");
                  }}
                >
                  Visit Fund Official Website
                </Button>
              </Stack>
            </Box>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
}
