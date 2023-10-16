document.getElementById('resumeUpload').addEventListener('change', function(e) {
    const fileLabel = document.getElementById('fileName');
    fileLabel.textContent = e.target.files[0] ? e.target.files[0].name : "No file chosen";
  });
  
  
document.getElementById('checkMatch').addEventListener('click', function() {
    let resumeFile = document.getElementById('resumeUpload').files[0];
    
    if (!resumeFile) return;
  
    // Parse the resume (you might need a library or API for this, like pdf.js for PDFs)
    let parsedResume = parseResume(resumeFile);
    
    // Send the parsed resume to the background script
    chrome.runtime.sendMessage({action: "checkMatch", data: parsedResume}, function(response) {
      document.getElementById('matchResult').innerText = `Match: ${response.matchPercentage}%`;
    });
  });
  
  function parseResume(file) {
    // Your parsing logic here...
    return parsedData;
  }