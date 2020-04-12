function executeTechnique(technique, allTabs, tabsAndLastActivity, params) {
    if (technique == "lastUsedPercent") {
        return lastUsedPercent(allTabs, tabsAndLastActivity,params);
    }
}


function lastUsedPercent(allTabs, tabsAndLastActivity,params) {
    tabsAndLastActivity = sort_by_key(tabsAndLastActivity, 'time');
    var temp_tabs = JSON.parse(JSON.stringify(tabsAndLastActivity))
    var percent = params.percentDelete || 50 ;
    var tabIDS = []
    var length = allTabs.length;
    length = length * percent;
    length = length / 100;
    length = Math.round(length)
    tabIds = temp_tabs;
    if (length < tabIds.length)
        tabIds.splice(length, tabIds.length - 1)
    temp_tabs.forEach(element => {
        if(element.id){
            tabIDS.push(element.id)
        }
    });
    return tabIDS;
}