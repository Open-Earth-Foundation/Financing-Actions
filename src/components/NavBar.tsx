import LanguageSelector from "./LanguageSelect/LanguageSelect.tsx";
import React from "react";
import {useTranslation} from "react-i18next";
import {Text, HStack, VStack} from "@chakra-ui/react";
import type {TFunction} from "i18next";

interface NavBarProps {
    onLanguageChange: (newLanguage: string) => void
}

export function NavBar({onLanguageChange}: NavBarProps) {
    const {t}: { t: TFunction } = useTranslation('translation');

    return (
        <HStack
            position="fixed"
            top="0"
            width="100%"
            color="white"
            backgroundColor="#2351DC"
            padding="20px 50px"
            justifyContent="space-between"
            alignItems="flex-start"
            zIndex="1000"
        >
            <VStack alignItems="flex-start">
                <Text as="h1" size="sm" textAlign="left">
                    {t("navbar.title" as any)}
                </Text>
                <Text as="h2" size="md" textAlign="left">{t("navbar.subtitle" as any)}</Text>
            </VStack>
            <LanguageSelector onLanguageChange={onLanguageChange}/>
        </HStack>
    );
}