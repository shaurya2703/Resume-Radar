import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const Popup = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const checkMatch = () => {
    // Logic to check matching between resume and job description
    console.log("Checking match...");
    // For now, just log if a file is uploaded and the job description
    console.log(resumeFile, jobDescription);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  return (
    <div>
      <h1>Resume Radar</h1>
      <input
        type="file"
        onChange={handleFileChange}
      />
      <textarea
        placeholder="Paste the job description here"
        value={jobDescription}
        onChange={e => setJobDescription(e.target.value)}
      ></textarea>
      <button onClick={checkMatch}>Check Match</button>
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));
