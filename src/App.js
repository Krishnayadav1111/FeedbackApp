// App.js
import React, { useState, useEffect } from 'react';
import WelcomeScreen from './Components/WelcomeScreen';
import ThankYouScreen from './Components/ThankYouScreen';
import SurveyQuestion from './Components/SurveyQuestion';
import ConfirmationDialog from './Components/ConfirmationDialog';

import "./App.css"
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState({});
  const [sessionId, setSessionId] = useState('');

  const questions = [
    { id: 'q1', text: 'How satisfied are you with our products?', type: 'scale' },
    { id: 'q2', text: 'How fair are the prices compared to similar retailers?', type: 'scale' },
    { id: 'q3', text: 'How satisfied are you with the value for money of your purchase?', type: 'scale' },
    { id: 'q4', text: 'On a scale of 1-10, how likely are you to recommend us to your friends and family?', type: 'scale1' },
    { id: 'q5', text: 'What could we do to improve our service?', type: 'text' },
  ];

  useEffect(() => {
    const storedAnswers = localStorage.getItem('surveyAnswers');
    if (storedAnswers) {
      setSurveyAnswers(JSON.parse(storedAnswers));
    }

    const storedSessionId = localStorage.getItem('sessionId');
    console.log(storedSessionId);
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
      localStorage.setItem('sessionId', newSessionId);
    }
  }, []);

  useEffect(() => {
    
    localStorage.setItem('surveyAnswers', JSON.stringify(surveyAnswers));
  }, [surveyAnswers]);

  const startSurvey = () => {
    setCurrentQuestionIndex(0);
    setShowWelcomeScreen(false);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const previousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const skipQuestion = () => {
    nextQuestion();
  };

  const saveAnswer = (questionId, answer) => {
    setSurveyAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers, [questionId]: answer };
      console.log(updatedAnswers);
      return updatedAnswers;
    });
  };



  const submitSurvey = () => {
    setShowConfirmation(false);
    setSurveyCompleted(true);
    setSurveyAnswers({});

    setTimeout(() => {
      console.log("krishna")
      setSurveyCompleted(false);
      setShowWelcomeScreen(true);
    }, 5000);
    
  };

  const cancelSubmission = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="App">
      {surveyCompleted ? (
        <ThankYouScreen  />
      ) : (
        <>
          {showWelcomeScreen ? (
            <WelcomeScreen onStartSurvey={startSurvey} />
          ) : (
            <>
              <SurveyQuestion
                question={questions[currentQuestionIndex]}
                onNext={nextQuestion}
                options={[1, 2, 3, 4, 5]}
                onPrevious={previousQuestion}
                onSkip={skipQuestion}
                onSaveAnswer={saveAnswer}
                sessionId={sessionId}
                currentQuestionIndex={currentQuestionIndex}
                length={questions.length}
                surveyAnswers={surveyAnswers}
              />
              {currentQuestionIndex === questions.length - 1 && (
                <button onClick={() => setShowConfirmation(true)}>Submit</button>
              )}
            </>
          )}
          <ConfirmationDialog
            open={showConfirmation}
            onConfirm={submitSurvey}
            onCancel={cancelSubmission}
            position="top-center" 
          />
        </>
      )}
    </div>
  );
}

export default App;
