let rotationInterval = 10000; // Default to 10 seconds
let intervalId;

function rotateTabs() {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    if (tabs.length > 1) {
      const activeTabIndex = tabs.findIndex((tab) => tab.active);
      const nextTabIndex = (activeTabIndex + 1) % tabs.length;
      chrome.tabs.update(tabs[nextTabIndex].id, { active: true });
      console.log(`Rotated from tab ${activeTabIndex} to ${nextTabIndex}`);
    }
  });
}

function startRotation() {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(rotateTabs, rotationInterval);
  console.log(`Tab rotation started with interval: ${rotationInterval / 1000} seconds`);
}

function stopRotation() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("Tab rotation stopped.");
  }
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed. Starting tab rotation.");
  startRotation();
});

chrome.runtime.onStartup.addListener(() => {
  console.log("Browser started. Resuming tab rotation.");
  startRotation();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "setInterval") {
    rotationInterval = message.interval;
    startRotation();
    sendResponse({ success: true });
  }
  if (message.action === "stopRotation") {
    stopRotation();
    sendResponse({ success: true });
  }
  return true;
});
