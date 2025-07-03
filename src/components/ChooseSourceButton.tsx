import { useTranslation } from "react-i18next";
import { Button, Dialog } from "@chakra-ui/react";
import { FundingSource } from "./FundingSourceDrawer/fundingSources.ts";
import { ButtonMedium } from "./Texts/Button.tsx";
import { useState } from "react";
import { DisplaySmall } from "./Texts/Display.tsx";
import { BodyLarge } from "./Texts/Body.tsx";
import { TitleLarge } from "./Texts/Title.tsx";
import { MdCheckCircleOutline } from "react-icons/md";

export default function ChooseSourceButtonAndModal({
  source,
  isChosenSource,
  setChosenSource,
  onOpenNextStepsDrawer,
}: {
  source: FundingSource;
  isChosenSource: boolean;
  setChosenSource: (chosenSource: FundingSource) => void;
  onOpenNextStepsDrawer: (source: FundingSource) => void;
}) {
  const { t } = useTranslation("translation");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSourceSelected = () => {
    setChosenSource(source);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog.Root
        size="xl"
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) handleCloseDialog();
        }}
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger />
            <Dialog.Header display="flex" justifyContent="center">
              <Dialog.Title>
                <DisplaySmall color="black">
                  {t("funding.nextStepsDialogTitle")}
                </DisplaySmall>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <MdCheckCircleOutline color="#24BE00" size={"265px"} />
              <TitleLarge textAlign={"center"} py={4}>
                {t("funding.nextStepsTitle")}{" "}
                {t(
                  `fundingSources.${source.institutionId}.sources.${source.sourceKey}.name`
                )}
              </TitleLarge>
              <BodyLarge textAlign={"center"}>
                {t("funding.nextStepsDescription")}
              </BodyLarge>
            </Dialog.Body>
            <Dialog.Footer>
              {isDialogOpen && (
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    handleCloseDialog();
                    onOpenNextStepsDrawer(source);
                  }}
                >
                  {t("funding.generateNextSteps")}
                </Button>
              )}
              <Button variant="ghost" onClick={handleCloseDialog}>
                {t("close")}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
      {!isChosenSource ? (
        <Button
          px={6}
          py={4}
          mb={6}
          color="#0D44EC"
          alignSelf="center"
          justifyContent="center"
        >
          <ButtonMedium onClick={onSourceSelected} color="white">
            {t("funding.chooseSource")}
          </ButtonMedium>
        </Button>
      ) : (
        <Button
          colorScheme="blue"
          onClick={() => onOpenNextStepsDrawer(source)}
          px={6}
          py={4}
          mb={6}
          color="#0D44EC"
          alignSelf="center"
          justifyContent="center"
        >
          <ButtonMedium color="white">{t("funding.seeNextSteps")}</ButtonMedium>
        </Button>
      )}
    </>
  );
}