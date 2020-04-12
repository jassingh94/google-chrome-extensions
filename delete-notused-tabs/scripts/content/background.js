
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
    if (tabIdIndex[tabId]) {
        tabsAndLastActivity.splice(tabIdIndex[tabId], 1)
        delete tabIdIndex[tabId]
    }
    //<TODO> need to think of a better implentation here
    tabIdIndex = {}
    for (let index = 0; index < tabsAndLastActivity.length; index++) {
        const element = tabsAndLastActivity[index];
        if (element.id) {
            tabIdIndex[element.id] = index
        }
    }
})


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.data && message.data == "Popup-Handshake") {
        chrome.runtime.sendMessage({ "data": "Popup-Set-Variable", "variable": tabsAndLastActivity, message: "Background Message" }, function (response) {

        });
    }
});