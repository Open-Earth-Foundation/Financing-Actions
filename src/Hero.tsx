import {useTranslation} from 'react-i18next';
import {Button, HStack, VStack} from '@chakra-ui/react';
import type {TFunction} from "i18next";
import {Link} from 'react-router-dom';
import {SurveyAnswers} from "./types.ts";

interface HeroProps {
    answers: SurveyAnswers | {}
}

const Hero = ({answers}: HeroProps) => {

    const {t}: {t: TFunction } = useTranslation();
    return (
        <HStack style={{textAlign: 'left'}} width={"100%"}>
            <VStack width={"50%"} padding="40px  40px 40px 10vw">
                <h1>{t('hero.title' as any)}</h1>
                <p>{t('hero.description' as any)}</p>
            </VStack>
            <VStack width={"50%"}>
                <Link to="/questionnaire">
                    <Button width={"200px"} backgroundColor="#2351DC" size="lg">
                        {t('hero.CTA' as any)}
                    </Button>
                </Link>
                {Object.entries(answers).length > 0 &&
                    <Link to="/results">
                        <Button width={"200px"}
                                backgroundColor='#FFFFFF'
                                color='#00001F'
                                size="md">
                            {t('hero.CTA2' as any)}
                        </Button>
                    </Link>
                }
            </VStack>
        </HStack>
    );
};

export default Hero;