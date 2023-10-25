document.getElementById('resumeUpload').addEventListener('change', function(e) {
  const fileLabel = document.getElementById('fileName');
  const selectedFile = e.target.files[0];
  
  if (selectedFile) {
      fileLabel.textContent = selectedFile.name;
      alert("Resume uploaded successfully!");
  } else {
      fileLabel.textContent = "No file chosen";
      alert("Failed to upload the resume. Please try again.");
  }
});


document.getElementById('checkMatch').addEventListener('click', function() {
  let resumeFile = document.getElementById('resumeUpload').files[0];
  
  if (!resumeFile) {
      alert("Please upload a resume first!");
      return;
  }

  chrome.runtime.sendMessage({action: "getJobDetails"}, function(response) {
    if (response && response.status === "success") {
        const jobDetailsFromBackground = response.data;
        console.log("Received job details from background:", jobDetailsFromBackground);
        // Handle the job details here or do whatever you need
    } else {
        console.error("Failed to get job details:", response.message);
    }

  // For now, just generate a random match percentage between 50% to 100%
  let dummyMatchPercentage = Math.floor(Math.random() * 51) + 50;  // Generates a random number between 50 and 100

  document.getElementById('matchResult').innerText = `Match: ${dummyMatchPercentage}%`;
});

});


// function parseResume(file) {
//   // Your parsing logic here...
//   return parsedData;
// }
