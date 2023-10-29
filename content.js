function extractJobDetails() {
    let jobData = [];
    
    // Generic extraction from page's paragraphs
    const lists = document.querySelectorAll('ol, ul');
    lists.forEach(list => {
        let items = Array.from(list.querySelectorAll('li')).map(li => li.textContent);
        jobData = jobData.concat(items);
    });
    console.log("Job details extracted from the page:", jobData);
    // Additional specific extraction can be added based on unique website structures
    
    return jobData;
}

console.log("Content script loaded.");
const jobDetails = extractJobDetails();

// Send extracted details to background script or popup when requested
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received in the content script : " + request.action);
    if (request.action === "getJobDetails") {
        console.log("Inside content.js >> Received request to send job details");
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        sendResponse({ data: jobDetails });
    }
});
