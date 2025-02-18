
async function getCurrentTab() {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
  
  
  chrome.cookies.getAll({}, (cookies) =>{
    console.log(cookies);
  }

  )
  

  setInterval(() =>{
    console.log(cookies);

  }, 2000);
  
  