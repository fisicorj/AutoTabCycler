const saveButton = document.getElementById("saveInterval");
const stopButton = document.getElementById("stopRotation");
const intervalSelect = document.getElementById("interval");

saveButton.addEventListener("click", () => {
  const interval = parseInt(intervalSelect.value);
  chrome.runtime.sendMessage({ action: "setInterval", interval: interval }, (response) => {
    if (response && response.success) {
      window.close(); // Close the popup after saving
    }
  });
});

stopButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "stopRotation" }, (response) => {
    if (response && response.success) {
      window.close(); // Close the popup after stopping
    }
  });
});



