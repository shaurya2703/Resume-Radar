// content.js

// Function to extract job details from the greenhouse.io job post
function extractJobDetails() {
    const jobTitle = document.querySelector(".app-title").textContent;
    const jobDescription = document.querySelector(".description").innerHTML;
    const jobLocation = document.querySelector(".location").textContent;

    return {
        title: jobTitle,
        description: jobDescription,
        location: jobLocation
    };
}

// You can now use this extracted data as needed, e.g., send to your extension's background page or popup
const jobDetails = extractJobDetails();
console.log(jobDetails);  // for debugging purposes
chrome.runtime.sendMessgae(jobDetails)