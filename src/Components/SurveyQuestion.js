
import React, { useState, useEffect } from 'react';
import "./Survey.css"

const SurveyQuestion = ({
  question,
  onNext,
  options,
  onPrevious,
  onSkip,
  onSaveAnswer,
  
  currentQuestionIndex,
  length,
  surveyAnswers,
}) => {
  
  const [textInput, setTextInput] = useState('');

 

  const handleOptionClick = (index) => {
    
    onSaveAnswer(question.id, index + 1); 
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
    onSaveAnswer(question.id, event.target.value); 
  };

  const renderOptions = (question) => {
    return options.map((option) => {
      const isSelected = surveyAnswers[question.id] === option;
      const circleStyle = {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: isSelected ? '#006400' : '#FFFFFF',
        margin: '5px',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        color: isSelected ? '#FFFFFF' : '#000000',
      };

      return (
        <div
          key={option}
          style={circleStyle}
          onClick={() => handleOptionClick(option - 1)}
        >
          {option}
        </div>
      );
    });
  };
  const renderOptions1 = (question) => {
    const optionsCount = 10;
    const options = Array.from({ length: optionsCount }, (_, index) => index + 1);
    return options.map((option) => {
      const isSelected = surveyAnswers[question.id] === option;
      const circleStyle = {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: isSelected ? '#006400' : '#FFFFFF',
        margin: '5px',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        color: isSelected ? '#FFFFFF' : '#000000',
      };

      return (
        <div
          key={option}
          style={circleStyle}
          onClick={() => handleOptionClick(option - 1)}
        >
          {option}
        </div>
      );
    });
  };

  return (
    <div className="survey-question">
      <h2>Customer Survey</h2>
       <p className="question-number">
        Question {currentQuestionIndex + 1}/{length}
      </p>
      <h2>{question.text}</h2>
      {question.type === 'scale' && <div className="rating-container">{renderOptions(question)}</div>}
      {question.type === 'scale1' ? (
        <div className="rating-container">{renderOptions1(question)}</div>
      ) : question.type === 'text' ? (
        <input
          type="text"
          value={textInput}
          onChange={handleTextInputChange}
          placeholder="Type your response here"
          style={{ width: '300px', height: '100px' }} 
        />
      ) : (
        <p></p>
      )}
      <div className="button-container">
        {onPrevious && <button onClick={onPrevious}>Previous</button>}
        {onSkip && currentQuestionIndex !== length - 1 &&  <button onClick={onSkip}>Skip</button>}
        {onNext && currentQuestionIndex !== length - 1 && <button onClick={onNext}>Next</button>}
      </div>
    </div>
  );
};

export default SurveyQuestion;
