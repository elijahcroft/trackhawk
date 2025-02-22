
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

function calculateSafteyScore(){
  let score =0 ;
  let thirdPartyCount = thirdParty.length % 100;
 

  score += thirdPartyCount;
  if (checkURL() == "http" ){
    score += 100;
  }else if (checkURL() == "https" ){
    score += 0;}
  
  
  
  

  if( score <= 100 ){
    return "Safe";
  }else if( score <= 200){
    return "Moderate";
  }else if (score <= 300){
    return "Unsafe";
  }


}
