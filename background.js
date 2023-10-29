let jobDetails = null;  // Temporary storage for job details
console.log("Background script loaded")
// Listen for a message to retrieve job details from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in background:", request.action);
    // If the request is to fetch job details
    if (request.action === "getJobDetails") {
      console.log("inside getJobDetails in background script")
        // Request job details from the content script
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, {action: "getJobDetails"}, response => {
              if (chrome.runtime.lastError) {
                console.error("Error communicating with content script:", chrome.runtime.lastError);
                sendResponse({status: "error", message: "Failed to communicate with content script."});
                return;
            }
                if (response && response.data) {
                    console.log("Got Response from content script in background js")
                    jobDetails = response.data;
                    sendResponse({status: "success", data: jobDetails});
                } else {
                    console.log("No data received from content script in background js")
                    sendResponse({status: "error", message: "Failed to retrieve job details."});
                }
            });
        });
        return true;  // Allows asynchronous use of sendResponse
    }

    // Other message handlers can be added as needed
});