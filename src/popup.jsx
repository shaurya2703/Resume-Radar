import React from 'react';
import ReactDOM from 'react-dom';

const Popup = () => {
  return (
    <div>
      <h1>Resume Radar</h1>
      <p>Check your match with the current job!</p>
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('react-target'));
