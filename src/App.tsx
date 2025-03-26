import './App.css';
import { ChakraProvider, VStack } from "@chakra-ui/react";
import { theme } from "./theme.ts";
import Hero from "./Hero.tsx";
import Questionnaire from "./Questionnaire.tsx";
import Results from "./Results.tsx";
import { I18nextProvider, useTranslation } from "react-i18next";
import { NavBar } from "./components/NavBar.tsx";
import { useState } from "react";
import { Question } from "./types.ts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    const { i18n } = useTranslation();
    const [answers, setAnswers] = useState<Question[]>();

    return (
        <I18nextProvider i18n={i18n}>
            <ChakraProvider value={theme}>
                <Router>
                    <NavBar />
                    <VStack
                        justifyContent="space-between"
                        width="100%"
                        height="100vh"
                        paddingTop="var(--navbar-height)" // Use the CSS variable here
                    >
                        <Routes>
                            <Route path="/" element={<Hero />} />
                            <Route path="/questionnaire" element={<Questionnaire setAnswers={setAnswers} />} />
                            <Route path="/results" element={<Results answers={answers} />} />
                        </Routes>
                    </VStack>
                </Router>
            </ChakraProvider>
        </I18nextProvider>
    );
}

export default App;