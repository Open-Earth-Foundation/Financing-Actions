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
} from "@chakra-ui/react";

import { institutions } from "./components/institutions";
import { useState } from "react";
import { FundingSourceDrawer } from "./components/FundingSourceDrawer/FundingSourceDrawer.tsx";

export default function Finance() {
  const { t } = useTranslation("translation");
  const [selectedFundingSourceForDetails, setSelectedFundingSource] = useState<
    any | null
  >(null);
  const [chosenSourceId, setChosenSourceId] = useState<string | null>(
    localStorage.getItem("chosenSourceId")
  );

  const onSourceChosen = (source: any) => {
    localStorage.setItem("chosenSourceId", source.sourceKey);
    setChosenSourceId(source.sourceKey);
  };

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
          isChosenSource={
            chosenSourceId === selectedFundingSourceForDetails.sourceKey
          }
          setChosenSource={onSourceChosen}
        />
      )}

      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        minWidth={"100%"}
        my={"3%"}
      >
        <Box width={"100%"} maxWidth={"1200px"} px={4} mx="auto">
          <Heading mb={4}>{t("funding.title" as any)}</Heading>
          <Heading fontSize={"16px"} mb={6}>
            {t("funding.breakdown" as any)}
          </Heading>
          <Accordion.Root collapsible>
            {institutions.map((institution) => (
              <Accordion.Item key={institution.id} value={institution.id}>
                <Accordion.ItemTrigger>
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