import {useEffect} from "react";
import {Model} from "survey-core";
import {Survey} from "survey-react-ui";
import "survey-core/survey-core.min.css";
import "./index.css";
import {json} from "./json.ts";
import i18n from "i18next";
import {AbsoluteCenter, Box, Center} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import "survey-core/survey.i18n";
import './questionnaire.css';
import  themeJson  from "./survey_theme.json";

function SurveyComponent() {
    const navigate = useNavigate();
    const survey = new Model(json);

    survey.locale = i18n.language;
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
        navigate('/results');
    });

    survey.applyTheme(themeJson);

     return (
        <Box
            width="100%"
            minHeight="100vh"
            bg="gray.100" // Set this to match your desired gray color
            py={8} // Add some padding
        >
            <Center>
                <Box
                    width="100%"
                    maxWidth="800px"
                    bg="gray.100" // Same as parent
                >
                    <Survey model={survey} />
                </Box>
            </Center>
        </Box>
    );
}

export default SurveyComponent;