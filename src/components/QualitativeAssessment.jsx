import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatScore } from "../constants/riskLevels";
import { getResilienceLevel } from "../constants/resilienceLevels";

const QualitativeAssessment = ({
  showQuestionnaire,
  setShowQuestionnaire,
  showResults,
  setShowResults,
  onScoreUpdate,
  currentScore
}) => {
  const { t } = useTranslation('qualitative-assessment');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  // Updated to 8 questions instead of 5
  const questions = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    text: t(`questions.${i + 1}.text`),
    options: Array.from({ length: 5 }, (_, j) => ({
      value: j,
      label: t(`questions.${i + 1}.options.${j}.label`),
      description: t(`questions.${i + 1}.options.${j}.description`),
    })),
  }));

  const handleAnswer = (questionId, value) => {
    const newAnswers = {
      ...answers,
      [questionId]: value,
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Updated calculation to divide by 32 (8 questions × max score of 4)
      const finalScore = Object.values(newAnswers).reduce((sum, val) => sum + val, 0) / 32;
      onScoreUpdate(finalScore);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    onScoreUpdate(null);
  };

  const handleClose = () => {
    setShowQuestionnaire(false);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (!showResults) {
      setShowQuestionnaire(false);
    }
  };

  if (showResults) {
    const resilienceLevel = getResilienceLevel(currentScore);
    const level = resilienceLevel.label.toLowerCase().replace(' ', '_');

    return (
      <div className="flex flex-col items-center p-8 gap-6">
        <h2 className="text-[32px] font-normal font-poppins text-center">
          {t('results.title')}
        </h2>
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-sm p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="text-6xl font-bold" style={{ color: resilienceLevel.color }}>
              {formatScore(currentScore)}
            </div>
            <div 
              className="text-2xl font-semibold px-4 py-2 rounded-lg"
              style={{ 
                backgroundColor: resilienceLevel.backgroundColor,
                color: resilienceLevel.textColor 
              }}
            >
              {t(`resilience_levels.${level}.label`)} {t('results.resilience_level')}
            </div>
            <p className="text-center text-gray-600">
              {t(`resilience_levels.${level}.description`)}
            </p>
            <div className="mt-4 flex flex-col gap-2 w-full max-w-md">
              <button
                onClick={handleReset}
                className="bg-[#2351DC] hover:bg-[#1a3fa0] text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                {t('buttons.retake')}
              </button>
              <button
                onClick={handleClose}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-6 rounded-lg transition-colors"
              >
                {t('buttons.close')}
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
        {t('title')}
      </h2>

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          {t('progress', {
            current: currentQuestion + 1,
            total: questions.length,
          })}
        </div>
        <button
          onClick={handleBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          {t('buttons.back')}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-6">
          {questions[currentQuestion].text}
        </h3>
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option) => (
            <div
              key={option.value}
              className={`p-4 rounded-lg border cursor-pointer transition-all
                ${answers[questions[currentQuestion].id] === option.value
                  ? "border-[#2351DC] bg-[#2351DC]/5"
                  : "border-gray-200 hover:border-[#2351DC]/50"
                }`}
              onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                  answers[questions[currentQuestion].id] === option.value
                    ? "border-[#2351DC]"
                    : "border-gray-300"
                }`}>
                  {answers[questions[currentQuestion].id] === option.value && (
                    <div className="w-3 h-3 rounded-full bg-[#2351DC]" />
                  )}
                </div>
                <div>
                  <div className="font-medium mb-1">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </div>
              </div>
            </div>
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