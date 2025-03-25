import './App.css';
import {ChakraProvider, Heading, VStack} from "@chakra-ui/react";
import { theme } from "./theme.ts";
import Hero from "./Hero.tsx";
import Questionnaire from "./Questionaire.tsx";
import { I18nextProvider, useTranslation } from "react-i18next";
import { NavBar } from "./components/NavBar.tsx";
import { useState } from "react";
import { Question } from "./types.ts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    const { i18n } = useTranslation();
    const [answers, setAnswers] = useState<Question[]>();
    const [language, setLanguage] = useState(i18n.language);

     return (
        <I18nextProvider i18n={i18n}>
            <ChakraProvider value={theme}>
                <Router>
                    <NavBar onLanguageChange={setLanguage} />
                    <Heading color={"black"}>lang: NINA {language}</Heading>
                    <VStack justifyContent="space-between" width="100%" height="100vh" paddingTop="150px">
                        <Routes>
                            <Route path="/" element={<Hero />} />
                            <Route path="/questionnaire" element={<Questionnaire setAnswers={setAnswers} answers={answers} />} />
                        </Routes>
                    </VStack>
                </Router>
            </ChakraProvider>
        </I18nextProvider>
    );
}

export default App;