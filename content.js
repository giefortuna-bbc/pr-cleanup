let prCleanupStyle = null;

function enableCleanup() {
  if (!prCleanupStyle) {
    prCleanupStyle = document.createElement('style');
    prCleanupStyle.textContent = `
      .js-targetable-element:has(.TimelineItem-badge .octicon-rocket) {
        display: none !important;
      }
    `;
    document.head.appendChild(prCleanupStyle);
  }
}

function disableCleanup() {
  if (prCleanupStyle && prCleanupStyle.parentNode) {
    prCleanupStyle.parentNode.removeChild(prCleanupStyle);
    prCleanupStyle = null;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TOGGLE_PR_CLEANUP') {
    if (message.enabled) {
      enableCleanup();
    } else {
      disableCleanup();
    }
  }
});

// Enable by default on load
enableCleanup();
