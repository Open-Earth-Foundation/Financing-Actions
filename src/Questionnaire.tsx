import {useEffect} from "react";
import {Model} from "survey-core";
import {Survey} from "survey-react-ui";
import "survey-core/survey-core.min.css";
import "./index.css";
import {json} from "./json.ts";
import i18n from "i18next";
import {Box} from "@chakra-ui/react";

function SurveyComponent() {
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
            // @ts-expect-error Element doesn't have style property in TS type definitions
            surveyMain.style.margin = '0 auto';
            // @ts-expect-error Element doesn't have style property in TS type definitions
            surveyMain.style.maxWidth = '800px';
            // @ts-expect-error Element doesn't have style property in TS type definitions
            surveyMain.style.width = '100%';
        }
    }, []);

    survey.onComplete.add((sender, _options) => {
        localStorage.setItem('surveyAnswers', JSON.stringify(sender.data));
        window.location.href = '/results';
    });
    return (<Box width={"100vw"}><Survey model={survey}/></Box>);
}

export default SurveyComponent;