import './App.css';
import { ChakraProvider, VStack } from "@chakra-ui/react";
import { theme } from "./theme.ts";
import Hero from "./Hero.tsx";
import Questionnaire from "./Questionnaire.tsx";
import Results from "./Results.tsx";
import Recommendations from "./Recommendations.tsx";
import Funding from "./Funding.tsx";
import { I18nextProvider, useTranslation } from "react-i18next";
import { NavBar } from "./components/NavBar.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { SurveyAnswers } from "./types.ts";

function App() {
    const { i18n } = useTranslation();
    const [answers, setAnswers] = useState<SurveyAnswers | {}>({});
    const updateData = () => {
        const storedData = localStorage.getItem('surveyAnswers');
        if (storedData) {
            setAnswers(JSON.parse(storedData));
        }
    }
    useEffect(() => {
        updateData();
    }, []);

    return (
        <I18nextProvider i18n={i18n}>
            <ChakraProvider value={theme}>
                <Router>
                    <NavBar />
                    <VStack
                        gap={0}
                        alignItems="stretch"
                        width="100%"
                        minW="100%"
                        minH={`calc(100vh - var(--navbar-height))`}
                        pt="var(--navbar-height)"
                    >
                        <Routes>
                            <Route path="/" element={<Hero answers={answers} />} />
                            <Route path="/questionnaire" element={<Questionnaire updateData={updateData} />} />
                            <Route path="/results" element={<Results answers={answers} />} />
                            <Route path="/recommendations" element={<Recommendations answers={answers} />} />
                            <Route path="/funding" element={<Funding />} />
                        </Routes>
                    </VStack>
                </Router>
            </ChakraProvider>
        </I18nextProvider>
    );
}

export default App;