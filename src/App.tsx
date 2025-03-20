import './App.css'
import {ChakraProvider, VStack} from "@chakra-ui/react";
import {theme} from "./theme.ts";
import Hero from "./Hero.tsx";
import Questionnaire from "./Questionaire.tsx";
import {I18nextProvider, useTranslation} from "react-i18next";
import {NavBar} from "./components/NavBar.tsx";
import {useEffect, useState} from "react";
import {Question} from "./types.ts";

function App() {
    const { i18n } = useTranslation();

    const [answers, setAnswers] = useState<Question[]>()
    return (
        <I18nextProvider i18n={i18n}>
            <ChakraProvider value={theme}>
                <VStack justifyContent="space-between" width="100%" height="100vh" paddingTop="150px">
                    <NavBar/>
                    <Hero/>
                    <Questionnaire setAnswers={setAnswers} answers={answers}/>
                </VStack>
            </ChakraProvider>
        </I18nextProvider>

    )
}

export default App
