function extractJobDetails() {
    let textContent = "";
    
    // Generic extraction from page's paragraphs
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        textContent += p.innerText + "\n";
    });
    console.log("Job details extracted from the page:", textContent);
    // Additional specific extraction can be added based on unique website structures
    
    return textContent;
}
console.log("Content script loaded.");
const jobDetails = extractJobDetails();

// Send extracted details to background script or popup when requested
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received in the content script : ",request.action)
    if (request.action === "getJobDetails") {
        console.log("Inside content.js >> Received request to send job details")
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        sendResponse({ data: jobDetails });
    }
});
