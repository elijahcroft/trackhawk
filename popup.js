chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>{
    if(message.type === "fromBackground"){
        console.log(message.data);
    }
    
})

console.log("hello world");
