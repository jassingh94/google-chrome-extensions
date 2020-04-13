
var tabsAndLastActivity = []
var tabIdIndex = {}


chrome.tabs.onActiveChanged.addListener(function (tabId, info) {
    if (tabId) {
        if (tabIdIndex[tabId] || tabIdIndex[tabId] == 0) {
            tabsAndLastActivity[tabIdIndex[tabId]] = {
                "id": tabId,
                "time": new Date()
            }
        }
        else {
            tabsAndLastActivity.push({
                "id": tabId,
                "time": new Date()
            })
            tabIdIndex[tabId] = tabsAndLastActivity.length - 1
        }
    }
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    if (tabIdIndex[tabId] || tabIdIndex[tabId] == 0) {
        tabsAndLastActivity[tabIdIndex[tabId]] = null
        delete tabIdIndex[tabId]
    }
})




chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.data && message.data == "Popup-Handshake") {
        // chrome.tabs.getAllInWindow(null, function (tabs) {
        //     let tempTabsActivity = []
        //     tabs.forEach(element => {
        //         if(element.id){
        //             if(tabIdIndex[element.id] || tabIdIndex[element.id] == 0 ){
        //                 tempTabsActivity.push(tabsAndLastActivity[tabIdIndex[element.id]])
        //                 tabIdIndex[element.id] = tempTabsActivity.length - 1 
        //             }
        //             else{
        //                 // <TODO> look into this case a bit more
        //                 tempTabsActivity.push({
        //                     "id": element.id,
        //                     "time": new Date()
        //                 })
        //                 tabIdIndex[element.id] = tempTabsActivity.length - 1 
        //             }
        //         }
        //     });
        //     tabsAndLastActivity = JSON.parse(JSON.stringify(tempTabsActivity))
    
        // });
        chrome.runtime.sendMessage({ "data": "Popup-Set-Variable", "variable": tabsAndLastActivity, message: "Background Message" }, function (response) {

        });
    }
});