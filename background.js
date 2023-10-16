chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "checkMatch") {
      let jobDescription = getJobDescription();  // This would need to fetch the job description from the active tab
      let matchPercentage = compareSkills(request.data, jobDescription);
      
      sendResponse({matchPercentage: matchPercentage});
    }
  });
  
  function getJobDescription() {
    // Use content scripts or other methods to fetch the job description from the active tab
    return description;
  }
  
  function compareSkills(resume, jobDescription) {
    // Your comparison logic here...
    return percentageMatch;
  }