import { Tag } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { getColorPalette } from "../helpers.ts";
import { MATURITY } from "../types.ts";

interface MaturityBadgeProps {
    maturity: MATURITY;
}

export default function MaturityTag({ maturity }: MaturityBadgeProps) {
    const { t } = useTranslation('translation');

    return (
        <Tag.Root colorPalette={getColorPalette(maturity)}>
            <Tag.Label>{t(`maturity.${maturity}` as any)}
            </Tag.Label>
        </Tag.Root>
    );
} 