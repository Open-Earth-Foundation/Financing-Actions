import React, { useState } from "react";
import { motion } from "framer-motion";
import { useData } from "../data/DataContext";
import { formatScore } from "../constants/riskLevels";
import { getResilienceLevel } from "../constants/resilienceLevels";
import InfoTooltip from './InfoTooltip'; // Ensure this is imported


const questions = [
  {
    id: 1,
    text: "Does the city master plan (or other relevant strategy plan) include disaster risk reduction or disaster risk response aspects?",
    options: [
      {
        value: 0,
        label: "Not addressed at all",
        description:
          "The master plan or any other relevant strategy plan does not mention disaster risk reduction or disaster risk response.",
      },
      {
        value: 1,
        label: "Minimally addressed",
        description:
          "Disaster risk reduction or response is briefly mentioned, but there are no concrete actions or detailed strategies.",
      },
      {
        value: 2,
        label: "Partially addressed",
        description:
          "The master plan or other strategic plan includes disaster risk reduction or response, but it is limited to a few aspects or sectors without a comprehensive approach.",
      },
      {
        value: 3,
        label: "Substantially addressed",
        description:
          "Disaster risk reduction or response is well-covered in the master plan / strategic plan, with defined strategies and actions, but lacks full integration across all sectors or clear implementation mechanisms.",
      },
      {
        value: 4,
        label: "Fully integrated and actionable",
        description:
          "Disaster risk reduction or response is fully incorporated into the master plan or other strategic plan, with clear strategies, actions, and implementation plans across all sectors, including monitoring and review mechanisms.",
      },
    ],
  },
  {
    id: 2,
    text: "Is there an agency, secretariat, or institution with appropriate authority and resources for climate risk response and reduction?",
    options: [
      {
        value: 0,
        label: "No institution exists",
        description:
          "There is no agency, secretariat, or institution responsible for climate risk response and reduction, including entities like the Defesa Civil.",
      },
      {
        value: 1,
        label: "Exists but lacks authority or resources",
        description:
          "There is an institution, such as the Defesa Civil, responsible for some climate risk response tasks, but it lacks either the authority or the necessary resources (staff, funding, equipment) to be effective.",
      },
      {
        value: 2,
        label: "Institution exists with limited capacity",
        description:
          "An institution like the Defesa Civil is in place with some authority and resources, but it is underfunded or only partially equipped to handle climate risk response and reduction comprehensively.",
      },
      {
        value: 3,
        label: "Well-established institution with moderate capacity",
        description:
          "There is a well-functioning institution, such as the Defesa Civil, with clear authority and moderate resources to manage climate risk response and reduction, though some areas may still need improvement or additional resources.",
      },
      {
        value: 4,
        label: "Fully capable institution",
        description:
          "There is a dedicated institution (e.g., the Defesa Civil or similar) with full authority, sufficient resources, and demonstrated capacity to effectively manage and coordinate climate risk response and reduction across sectors, with the ability to scale operations when necessary.",
      },
    ],
  },
  {
    id: 3,
    text: "Does the city have a clear knowledge of its main impacts and areas prone to climate-related risks?",
    options: [
      {
        value: 0,
        label: "No knowledge or risk mapping",
        description:
          "The city has no understanding of its main climate-related impacts, and no risk mapping or assessment of areas prone to climate-related risks has been conducted.",
      },
      {
        value: 1,
        label: "Limited knowledge, no formal mapping",
        description:
          "The city has some awareness of its climate-related impacts, but there is no formal or comprehensive risk mapping of vulnerable areas. Knowledge is based on anecdotal evidence or isolated events.",
      },
      {
        value: 2,
        label: "Partial knowledge with basic mapping",
        description:
          "The city has identified some key climate-related risks and has conducted basic risk mapping, but the mapping is incomplete, outdated, or covers only certain regions or impacts.",
      },
      {
        value: 3,
        label: "Substantial knowledge with risk mapping",
        description:
          "The city has a good understanding of its main climate-related risks and has conducted detailed risk mapping for most vulnerable areas, although there may be gaps in data or coverage of certain impacts.",
      },
      {
        value: 4,
        label: "Comprehensive knowledge with up-to-date risk mapping",
        description:
          "The city has a clear, comprehensive understanding of its climate-related impacts and has developed up-to-date, detailed risk mapping that covers all vulnerable areas and risks. This mapping is regularly reviewed and informs policy and planning decisions.",
      },
    ],
  },
  {
    id: 4,
    text: "Does the city have a defined restricted budget or contingency fund for climate disaster reduction (mitigation, prevention, response, and recovery)?",
    options: [
      {
        value: 0,
        label: "No budget or contingency fund",
        description:
          "The city has no specific budget or contingency fund allocated for climate disaster reduction, including mitigation, prevention, response, or recovery efforts, so it depends on national or subnational aid.",
      },
      {
        value: 1,
        label: "Minimal or informal budget allocation",
        description:
          "The city has some informal or minimal allocation of funds for climate disaster reduction, but it is not clearly defined or restricted specifically for these purposes. National or subnational aid is still very important in case a climate event occur.",
      },
      {
        value: 2,
        label: "Partial or inconsistent budget",
        description:
          "The city has a partially defined budget or contingency fund for some aspects of climate disaster reduction (e.g., response and recovery), but the allocation is inconsistent, insufficient, or does not cover all areas such as mitigation and prevention. Aid from national or subnational government can complement the budget, specially in case a climate event occurs.",
      },
      {
        value: 3,
        label: "Substantial but non-comprehensive budget",
        description:
          "The city has a well-defined budget or contingency fund for climate disaster reduction, covering most areas (mitigation, prevention, response, recovery), but it may not be fully comprehensive or guaranteed for long-term needs. For extreme events, national or subnational aid will be important.",
      },
      {
        value: 4,
        label: "Comprehensive, dedicated budget or contingency fund",
        description:
          "The city has a clearly defined, dedicated budget or contingency fund specifically for climate disaster reduction that covers all aspects (mitigation, prevention, response, recovery). This budget is secure, consistently funded, and adaptable to changing climate risk scenarios.",
      },
    ],
  },
  {
    id: 5,
    text: "Does the population undergo training and know what to do in the event of extreme weather events?",
    options: [
      {
        value: 0,
        label: "No training or awareness",
        description:
          "The population has not received any training or information on how to respond to extreme weather events, and there is no public awareness of emergency procedures.",
      },
      {
        value: 1,
        label: "Limited or informal awareness",
        description:
          "There is minimal public awareness, with some informal information provided, but no formal training programs. Most of the population does not know how to respond to extreme weather events.",
      },
      {
        value: 2,
        label: "Basic awareness, limited training",
        description:
          "Some segments of the population have received basic training or information on how to respond to extreme weather events, but the training is not widespread or regularly conducted. Emergency procedures are known to some but not to all.",
      },
      {
        value: 3,
        label: "Widespread awareness, occasional training",
        description:
          "A significant portion of the population has undergone training and knows how to respond to extreme weather events. There are established procedures, and training programs are conducted occasionally, though not universally or regularly updated.",
      },
      {
        value: 4,
        label: "Comprehensive training and regular drills",
        description:
          "Most of the population regularly undergoes comprehensive training, especially the ones in risk areas, with clear knowledge of emergency procedures for extreme weather events. Regular drills and public awareness campaigns are conducted to ensure preparedness across all sectors of society.",
      },
    ],
  },
];

const calculateResilienceLevel = (score) => {
  const normalizedScore = score / 20;
  const riskLevel = getResilienceLevel(score);
  return {
    level: riskLevel.label,
    description:
      riskLevel.description || "Assessment based on questionnaire responses",
    color: riskLevel.color,
  };
};

const QualitativeAssessment = ({
  showQuestionnaire,
  setShowQuestionnaire,
  showResults,
  setShowResults,
  onScoreUpdate,
}) => {
  const { updateResilienceScore } = useData();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (questionId, value) => {
    if (isTransitioning) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    setIsTransitioning(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        handleComplete();
      }
      setIsTransitioning(false);
    }, 500);
  };

  const calculateScore = () => {
    const rawScore = Object.values(answers).reduce(
      (sum, value) => sum + value,
      0,
    );
    console.log("Raw Score:", rawScore);
    const normalized = rawScore / 20;
    console.log("Normalized Score:", normalized);
    return normalized;

  };

  
  const handleComplete = () => {
    const score = calculateScore();
    setShowResults(true);
    setTimeout(() => {
      updateResilienceScore(score);
    }, 0);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false); // Using parent's state
    updateResilienceScore(null);
  };

  const handleClose = () => {
    // Only close if we're showing results
    if (showResults) {
      setShowQuestionnaire(false);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else if (!showResults) {
      setShowQuestionnaire(false);
    }
  };

  if (showResults) {
    const normalizedScore = calculateScore(); // Already normalized
    const { level, description, color } =
      calculateResilienceLevel(normalizedScore);

    return (
      <div className="flex flex-col items-center p-8 gap-6">
        <h2 className="text-[32px] font-normal font-poppins text-center">
          Assessment Complete
        </h2>
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-sm p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="text-6xl font-bold" style={{ color }}>
              {formatScore(normalizedScore)}
            </div>
            <div className="text-2xl font-semibold text-gray-800">
              {level} Resilience
            </div>
            <p className="text-center text-gray-600">{description}</p>
            <div className="mt-4 flex flex-col gap-2 w-full max-w-md">
              <button
                onClick={handleReset}
                className="bg-[#2351DC] hover:bg-[#1a3fa0] text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Retake Assessment
              </button>
              <button
                onClick={handleClose}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Close Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-8">
      <h2 className="text-[32px] font-normal font-poppins">
        Qualitative Assessment
      </h2>

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <button
          onClick={handleBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Back
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-6">
          {questions[currentQuestion].text}
        </h3>
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-lg border cursor-pointer transition-all 
                ${isTransitioning ? "pointer-events-none" : ""} 
                ${
                  answers[questions[currentQuestion].id] === option.value
                    ? "border-[#2351DC] bg-[#2351DC]/5"
                    : "border-gray-200 hover:border-[#2351DC]/50"
                }`}
              onClick={() =>
                handleAnswer(questions[currentQuestion].id, option.value)
              }
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                    answers[questions[currentQuestion].id] === option.value
                      ? "border-[#2351DC]"
                      : "border-gray-300"
                  }`}
                >
                  {answers[questions[currentQuestion].id] === option.value && (
                    <div className="w-3 h-3 rounded-full bg-[#2351DC]" />
                  )}
                </div>
                <div>
                  <div className="font-medium mb-1">{option.label}</div>
                  <div className="text-sm text-gray-600">
                    {option.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentQuestion
                  ? "bg-[#2351DC]"
                  : answers[questions[index].id] !== undefined
                    ? "bg-[#2351DC]/30"
                    : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QualitativeAssessment;
