
var tabsAndLastActivity = {}
debugger
chrome.tabs.onActivated.addListener(function (activeInfo) {
    if (activeInfo.tabId) {
        tabsAndLastActivity[activeInfo.tabId] = new Date();
    }
})
chrome.tabs.onActiveChanged.addListener(function (tabId, info) {
    if (tabId) {
        tabsAndLastActivity[tabId] = new Date();
    }
});


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.data && message.data == "Popup-Handshake"){
        chrome.runtime.sendMessage({ "data": "Popup-Set-Variable","variable":tabsAndLastActivity,message:"Background Message" }, function (response) {

        });
    }
});