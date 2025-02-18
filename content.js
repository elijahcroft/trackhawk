console.log('hello world');
chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>{
    if(message.type === "fromBackground"){
        console.log(message.data);
        alert(message.data);
        
    }
    
})