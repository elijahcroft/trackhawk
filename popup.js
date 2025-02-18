chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>{
    if(message.type === "fromBackground"){
        console.log('Received third-party cookie domains:', message.data);
        alert(message.data);
        
    }
    
})

console.log("hello world");
