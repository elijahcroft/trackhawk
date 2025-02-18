
let firstParty = [];
let thirdParty = [];
let currentTabUrl = "";


chrome.tabs.onActivated.addListener((activeInfo) =>{
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        currentTabUrl = tabs[0].url;
        checkCookies();
      });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>{
    if(changeInfo.url){
        
        currentTabUrl = changeInfo.url;
        checkCookies();
        checkURL();
    }
});

function checkCookies(){
    if (!currentTabUrl) {
        console.log("No URL detected");
        return;
    }
    console.log("Checking cookies for:", currentTabUrl);
    
    chrome.cookies.getAll({}, (cookieData) => {
        
        if (!cookieData || cookieData.length === 0) {
            console.log("No cookies found for this URL.");
            return;
        }
   
        cookieData.forEach(cookie => {
            if (cookie.url && cookie.url.includes(currentTabUrl)) {
              firstParty.push(cookie);
              
            } else {
              thirdParty.push(cookie);
            }
          });
        
        
      });
}

  

  setInterval(() =>{
    console.log("third party cookies",thirdParty);
    console.log(firstParty);
    console.log(currentTabUrl);
    console.log(checkURL());
    

  }, 5000);
  
function checkURL(){
    let curUrl = currentTabUrl;
    let indexColon = curUrl.indexOf(":");
    let checkedUrl = curUrl.substring(0, indexColon);
    return checkedUrl;
}
