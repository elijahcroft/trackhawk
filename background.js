
let cookies = [];
let firstParty = [];
let thirdParty = [];
let currentTabUrl = "";


chrome.tabs.onActivated.addListener((activeInfo) =>{
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        currentTabUrl = tabs[0].url;
      });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>{
    if(changeInfo.url){
        currentTabUrl = changeInfo.url;
    }
});

chrome.cookies.getAll({}, (cookieData) => {
   
    cookieData.forEach(cookie => {
      if (cookie.url && cookie.url.includes(currentTabUrl)) {
        firstParty.push(cookie);
        
      } else {
        thirdParty.push(cookie);
      }
    });
    
    chrome.runtime.sendMessage({
        "type": "fromBackground",
        "firstPartyData": firstParty,
        "thirdPartyData": thirdParty
    });
  });
  

  setInterval(() =>{
    console.log("third party cookies",thirdParty);
    console.log("first party cookies",firstParty);

  }, 5000);
  
  