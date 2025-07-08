import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Accordion,
  HStack,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";

import { institutions } from "./components/institutions";
import { useState } from "react";
import { FundingSourceDrawer } from "./components/FundingSourceDrawer/FundingSourceDrawer.tsx";
import { ButtonMedium } from "./components/Texts/Button.tsx";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
export default function Finance() {
  const { t } = useTranslation("translation");
  const [selectedFundingSourceForDetails, setSelectedFundingSource] = useState<
    any | null
  >(null);
  const navigate = useNavigate();
  const onSourceSelected = (source: any) => {
    setSelectedFundingSource(source);
  };

  return (
    <>
      {selectedFundingSourceForDetails && (
        <FundingSourceDrawer
          isOpen={!!selectedFundingSourceForDetails}
          onClose={() => setSelectedFundingSource(null)}
          fundingSource={selectedFundingSourceForDetails}
        />
      )}
      <ButtonMedium
        cursor={"pointer"}
        as="button"
        color="content.link"
        alignSelf="flex-start"
        textAlign={"left"}
        onClick={() => navigate("/")}
        width={"100%"}
        px={6}
        py={4}
      >
        <Icon as={MdArrowBack} boxSize={4} mr={2} />
        {t("goBack")}
      </ButtonMedium>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        minWidth={"100%"}
        my={"3%"}
      >
        <Box width={"100%"} maxWidth={"1200px"} px={4}>
          <Heading mb={4}>{t("funding.title" as any)}</Heading>
          <Heading fontSize={"16px"} mb={6}>
            {t("funding.breakdown" as any)}
          </Heading>
          <Accordion.Root collapsible>
            {institutions.map((institution) => (
              <Accordion.Item key={institution.id} value={institution.id}>
                <Accordion.ItemTrigger cursor={"pointer"}>
                  <Box
                    flex="1"
                    textAlign="left"
                    p={4}
                    bg="gray.50"
                    borderRadius="md"
                  >
                    <HStack justify="space-between">
                      <Box>
                        <Heading size="md">{t(`${institution.name}`)}</Heading>
                        <Text fontSize="sm" color="gray.600">
                          {t(`${institution.description}`)}
                        </Text>
                      </Box>
                      <Accordion.ItemIndicator />
                    </HStack>
                  </Box>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <Box
                      overflowX="auto"
                      width="100%"
                      alignSelf="center"
                      justifySelf="center"
                    >
                      {/* Table Rows */}
                      {institution.fundingSources
                        .filter(Boolean)
                        .map((source, idx) => {
                          if (!source) return null;
                          return (
                            <Grid
                              key={source["Fund Name"] + idx}
                              templateColumns="3fr 1fr"
                              p={4}
                              alignItems="center"
                            >
                              <GridItem>
                                <Text
                                  fontWeight="medium"
                                  alignSelf="center"
                                  justifySelf="center"
                                  width="100%"
                                  textAlign="left"
                                >
                                  {source["Fund Name"]}
                                </Text>
                              </GridItem>
                              <GridItem>
                                <Button
                                  mx={0}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    onSourceSelected({
                                      id: source["Fund Name"],
                                      institutionId: institution.id,
                                      sourceKey: source.sourceKey,
                                    })
                                  }
                                  colorScheme="blue"
                                >
                                  {t("funding.seeMoreDetails")}
                                </Button>
                              </GridItem>
                            </Grid>
                          );
                        })}
                    </Box>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Box>
      </Flex>
    </>
  );
}