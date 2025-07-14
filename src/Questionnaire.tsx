  import { useEffect } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.min.css";
import "./index.css";
import { json } from "./json.ts";
import { Box, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "survey-core/survey.i18n";
import "./questionnaire.css";
import { AnswersAndScoresPerCategory } from "./types.ts";
import { calculateResults } from "./surveyHelper.ts";
import i18n from "./i18n/index.ts";

function SurveyComponent({ updateData }: { updateData: () => void }) {
  const navigate = useNavigate();
  const survey = new Model(json);

  survey.locale = i18n.language;
  survey.css = {
      root: "survey-custom-centered",
      container: "survey-container-centered"
  };
  survey.isPanelless = false;
  survey.applyTheme({
    cssVariables: {
     "--sjs-primary-backcolor": "#2351DC",
     "--sjs-primary-backcolor-dark": "#1F47B8",           /* ~10% darker */
     "--sjs-primary-backcolor-light": "rgba(35, 81, 220, 0.1)",
  
     "--sjs-primary-forecolor": "#FFFFFF",
     "--sjs-primary-forecolor-light": "rgba(255, 255, 255, 0.25)",
  
    },
    isPanelless: true,
  });
  //   const creatorOptions = {
  //     // ...
  //     showThemeTab: true,
  //   };
  //   const creator = new SurveyCreatorModel(creatorOptions);
  // Apply styling after component mounts
  useEffect(() => {
    // Find the main survey element and apply styles
    const surveyMain = document.querySelector(".sv_main");
    if (surveyMain) {
      // @ts-expect-error Element doesn't have style property in TS type definitions
      surveyMain.style.margin = "0 auto";
      // @ts-expect-error Element doesn't have style property in TS type definitions
      surveyMain.style.maxWidth = "800px";
      // @ts-expect-error Element doesn't have style property in TS type definitions
      surveyMain.style.width = "100%";
    }
  }, []);

  survey.onComplete.add((sender, _options) => {
    const results: AnswersAndScoresPerCategory = calculateResults(sender.data);
    localStorage.setItem("surveyAnswers", JSON.stringify(sender.data));
    localStorage.setItem("surveyResults", JSON.stringify(results));
    updateData();
    navigate("/results");
  });

  return (
    <Box
      width="100%"
      minHeight="100vh"
      bg="gray.100" // Set this to match your desired gray color
      py={8} // Add some padding
    >
      <Center>
        <Box
          
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