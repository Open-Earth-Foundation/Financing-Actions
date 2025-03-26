import LanguageSelector from "./LanguageSelect/LanguageSelect.tsx";
import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Text, HStack, VStack } from "@chakra-ui/react";
import type { TFunction } from "i18next";

export function NavBar() {
    const { t }: { t: TFunction } = useTranslation('translation');
    const navbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateNavbarHeight = () => {
            if (navbarRef.current) {
                const height = navbarRef.current.offsetHeight;
                document.documentElement.style.setProperty('--navbar-height', `${height}px`);
            }
        };

        // Call once on component mount
        updateNavbarHeight();

        // Set up resize observer to detect changes in navbar height
        const resizeObserver = new ResizeObserver(updateNavbarHeight);
        if (navbarRef.current) {
            resizeObserver.observe(navbarRef.current);
        }

        // Also handle window resize events
        window.addEventListener('resize', updateNavbarHeight);

        return () => {
            if (navbarRef.current) {
                resizeObserver.unobserve(navbarRef.current);
            }
            window.removeEventListener('resize', updateNavbarHeight);
        };
    }, []);

    return (
        <HStack
            ref={navbarRef}
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
                <Text as="h1" textAlign="left" fontSize="1.5rem">
                    {t("navbar.title" as any)}
                </Text>
                <Text as="h2" textAlign="left">{t("navbar.subtitle" as any)}</Text>
            </VStack>
            <LanguageSelector/>
        </HStack>
    );
}