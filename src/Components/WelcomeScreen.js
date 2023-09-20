import React from 'react';

import "./welcomeScreen.css"

const WelcomeScreen = ({ onStartSurvey }) => {
  return (
    <div className="welcome-screen">
      <h1>Welcome to our Customer Survey!</h1>
      <p>Thank you for choosing to participate. Let's get started!</p>
      <button onClick={onStartSurvey}>Start Survey</button>
    </div>
  );
};

export default WelcomeScreen;
