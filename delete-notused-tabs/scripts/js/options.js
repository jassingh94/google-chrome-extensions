// Saves options to chrome.storage
function save_options() {
    var tabBombTypeOfBomb = document.getElementById('tabBombTypeOfBomb').value;
    var tabBombTypeOfBombText = document.getElementById('tabBombTypeOfBombText').value;
    chrome.storage.sync.set({
      tabBombTypeOfBomb: tabBombTypeOfBomb,
      tabBombTypeOfBombText: tabBombTypeOfBombText
    }, function() {
      alert("Saved")
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
      tabBombTypeOfBomb: "random",
      tabBombTypeOfBombText: 0
    }, function(items) {
      document.getElementById('tabBombTypeOfBomb').value = items.tabBombTypeOfBomb;
      document.getElementById('tabBombTypeOfBombText').value = items.tabBombTypeOfBombText;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('singlebutton').addEventListener('click',save_options);