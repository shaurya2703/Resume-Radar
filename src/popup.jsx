import React from "react";
import { render } from "react-dom";

function Popup(){
    return (
        <div>
        <h2>Resume Radar</h2>
        <div>
          <label for="resumeUpload" class="upload-label">
            Choose a resume
          </label>
          {/* <input type="file" id="resumeUpload" accept=".pdf,.doc,.docx"> */}
          <span id="fileName">No file chosen</span>
        </div>
        <button id="checkMatch">Check Match</button>
        <div id="matchResult"></div>
      </div>
    );
}

render(<Popup/>,document.getElementById("react-target"));