let enabled = true;

chrome.action.onClicked.addListener((tab) => {
  enabled = !enabled;
  chrome.action.setBadgeText({ text: enabled ? '' : 'OFF', tabId: tab.id });
  chrome.tabs.sendMessage(tab.id, { type: 'TOGGLE_PR_CLEANUP', enabled });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: '' });
});
