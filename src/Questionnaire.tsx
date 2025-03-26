import React, {useEffect} from "react";
import {Model} from "survey-core";
import {Survey} from "survey-react-ui";
import "survey-core/survey-core.min.css";
import "./index.css";
import {json} from "./json.js";
import {Question} from "./types.ts";
import i18n from "i18next";
import {Box} from "@chakra-ui/react";

interface QuestionnaireProps {
    setAnswers: (value: (((prevState: (Question[] | undefined)) => (Question[] | undefined)) | Question[] | undefined)) => void,
    answers: Question[] | undefined
}

function SurveyComponent({setAnswers, answers}: QuestionnaireProps) {
    const selectedLanguage = i18n.language;
    const survey = new Model(json);
    survey.locale = selectedLanguage;
    survey.css = {
        root: "survey-custom-centered",
        container: "survey-container-centered"
    };

    // Apply styling after component mounts
    useEffect(() => {
        // Find the main survey element and apply styles
        const surveyMain = document.querySelector('.sv_main');
        if (surveyMain) {
            surveyMain.style.margin = '0 auto';
            surveyMain.style.maxWidth = '800px';
            surveyMain.style.width = '100%';
        }
    }, []);

    survey.onComplete.add((sender, _options) => {
        setAnswers(sender.data);
    });
    return (<Box width={"100vw"}><Survey model={survey}/></Box>);
}

export default SurveyComponent;