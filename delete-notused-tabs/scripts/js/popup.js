var tabsAndLastActivity = {}
document.addEventListener('DOMContentLoaded', function () {
    var link = document.getElementById('clickIt');
    // onClick's logic below:
    link.addEventListener('click', function () {
        removeTabs(50);
    });
});

chrome.runtime.sendMessage({ data: "Popup-Handshake" }, function (response) {
    console.log(response)
});;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.data && message.data == "Popup-Set-Variable") {
        console.log(message)
        if (message.variable) {
            tabsAndLastActivity = message.variable
        }
    }
});

function removeTabs(params) {
    chrome.tabs.getAllInWindow(null, function (tabs) {
        var technique = "lastUsedPercent";
        var tabIds = executeTechnique(technique,tabs,tabsAndLastActivity,params)
        tabIds.forEach(element => {
            if (element) {
                chrome.tabs.remove(element, () => { })
            }
        });

    });
}

function sort_by_key(array, key) {
    return array.sort(function (a, b) {
        let akey = new Date(a[key])
        let bkey = new Date(b[key])
        var x = akey; var y = bkey;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}