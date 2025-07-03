import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/react";
import { FundingSource } from "./FundingSourceDrawer/fundingSources.ts";
import { ButtonMedium } from "./Texts/Button.tsx";

export default function ChooseSourceButton({
  source,
  onOpenNextStepsDrawer,
}: {
  source: FundingSource;
  onOpenNextStepsDrawer: (source: FundingSource) => void;
}) {
  const { t } = useTranslation("translation");

  return (
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
  );
}