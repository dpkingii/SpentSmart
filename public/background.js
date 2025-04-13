chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "fetchData") {
      fetch("https://api.example.com/data")
        .then(res => res.json())
        .then(data => sendResponse(data));
      return true;
    }
  });