import React from "react";
import {Model} from "survey-core";
import {Survey} from "survey-react-ui";
import "survey-core/survey-core.min.css";
import "./index.css";
import {json} from "./json.js";
import {Question} from "./types.ts";
import i18n from "i18next";

interface QuestionnaireProps {
    setAnswers: (value: (((prevState: (Question[] | undefined)) => (Question[] | undefined)) | Question[] | undefined)) => void,
    answers: Question[] | undefined
}

function SurveyComponent({setAnswers, answers}: QuestionnaireProps) {
    const selectedLanguage = i18n.language;
console.log('Selected language:', selectedLanguage);
    const survey = new Model(json);
    survey.locale = selectedLanguage;
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
        console.log("options", JSON.stringify(options, null, 2)) // TODO NINA
    });
    return (<Survey model={survey}/>);
}

export default SurveyComponent;