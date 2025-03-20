import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button, HStack, VStack} from '@chakra-ui/react';
import type {TFunction} from "i18next";

const Hero = () => {
    const {t}: TFunction = useTranslation();
    return (
        <HStack style={{textAlign: 'left'}} width={"100%"}>
            <VStack width={"50%"} padding="40px  40px 40px 10vw">
                <h1>{t('hero.title')}</h1>
                <p>{t('hero.description')}</p>
            </VStack>
            <VStack width={"50%"}>
                <Button backgroundColor="#2351DC" size="lg">
                {t('hero.CTA')}
            </Button>
            </VStack>
        </HStack>
    );
};

export default Hero;