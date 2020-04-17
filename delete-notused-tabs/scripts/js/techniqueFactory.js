function executeTechnique(technique, allTabs, tabsAndLastActivity, params) {
    if (technique == "last-activity") {
        return lastUsedPercent(allTabs, tabsAndLastActivity,params);
    }
    else if (technique == "random") {
        return random(allTabs, tabsAndLastActivity,params);
    }
    else if (technique == "top-n") {
        return topN(allTabs, tabsAndLastActivity,params);
    }
    else if (technique == "bottom-n") {
        return bottomN(allTabs, tabsAndLastActivity,params);
    }
}


function lastUsedPercent(allTabs, tabsAndLastActivity,params) {
    tabsAndLastActivity = sort_by_key(tabsAndLastActivity, 'time');
    var temp_tabs = JSON.parse(JSON.stringify(tabsAndLastActivity))
    var percent = params.value || 50 ;
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

function random(allTabs, tabsAndLastActivity,params) {
    var tabsRandom = Math.floor(Math.random() *allTabs.length)
    if(tabsRandom == 0 ){
        tabsRandom = Math.floor(Math.random() *allTabs.length)
    }
    var tabIDS = []
    if(tabsRandom > allTabs.length / 2 ){
        allTabs = allTabs.reverse();
    }
    allTabs = allTabs.splice(0,tabsRandom)
    allTabs.forEach(element => {
        if(element.id){
            tabIDS.push(element.id)
        }
    });
    return tabIDS;
}


function topN(allTabs, tabsAndLastActivity,params) {
    var temp_tabs = JSON.parse(JSON.stringify(allTabs))
    var value = params.value || 5 ;
    var tabIDS = []
    if(value < temp_tabs.length){
        temp_tabs = temp_tabs.splice(0,value)
    }
    temp_tabs.forEach(element => {
        if(element.id){
            tabIDS.push(element.id)
        }
    });
    return tabIDS;
}

function bottomN(allTabs, tabsAndLastActivity,params) {
    var temp_tabs = JSON.parse(JSON.stringify(allTabs))
    var value = params.value || 5 ;
    var tabIDS = []
    var length = allTabs.length;
    if(value < temp_tabs.length){
        temp_tabs = temp_tabs.reverse();
        temp_tabs= temp_tabs.splice(0,value)
    }
    temp_tabs.forEach(element => {
        if(element.id){
            tabIDS.push(element.id)
        }
    });
    return tabIDS;
}