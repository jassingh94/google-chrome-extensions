var tabsAndLastActivity = {}
document.addEventListener('DOMContentLoaded', function () {
    var link = document.getElementById('clickIt');
    // onClick's logic below:
    link.addEventListener('click', function () {
        chrome.tabs.getAllInWindow(null, function (tabs) {
            var tabIds = []
            tabIds = JSON.stringify(tabsAndLastActivity)
            alert(tabIds);
        });

    });
});

chrome.runtime.sendMessage({data:"Popup-Handshake"},function(response){
    console.log(response) 
});;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if(message.data && message.data == "Popup-Set-Variable"){
        console.log(message)
        if(message.variable){
            tabsAndLastActivity = message.variable
        }
    }
});