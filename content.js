function extractJobDetails() {
    const lists = document.querySelectorAll('ol, ul');
    const extractedData = [];

    lists.forEach(list => {
        let items = Array.from(list.querySelectorAll('li')).map(li => li.textContent);
        extractedData.push(items);
    });

    return extractedData;
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
