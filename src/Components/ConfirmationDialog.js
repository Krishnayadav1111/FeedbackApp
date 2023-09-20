import React from 'react';
import "./confirm.css"
const ConfirmationDialog = ({ open, onConfirm, onCancel, position}) => {
  return (
    <div className={`confirmation-dialog ${position}`} style={{ display: open ? 'block' : 'none' }}>
      <h2>Confirm Submission</h2>
      <p>Are you sure you want to submit the survey?</p>
      <div className="button-container">
        <button onClick={onConfirm}>Yes</button>
        <button className="button-no" onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
