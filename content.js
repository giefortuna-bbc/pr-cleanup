let prCleanupStyle = null;

const badgeOptions = [
  { key: 'octicon-rocket', label: 'Hide deployment messages' },
  { key: 'octicon-git-commit', label: 'Hide commit messages' },
  { key: 'octicon-eye', label: 'Hide eye messages' },
  { key: 'octicon-repo-push', label: 'Hide repo push messages' },
];

let badgesToHide = [];


function enableCleanup() {
  if (badgesToHide.length === 0) {
    disableCleanup();
    return;
  }
  if (!prCleanupStyle) {
    const selectorTextContent = badgesToHide
      .map(badge => `.TimelineItem:has(.TimelineItem-badge .${badge})`)
      .join(',\n');
    prCleanupStyle = document.createElement('style');
    prCleanupStyle.textContent = `
      ${selectorTextContent} {
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

function updateCleanup() {
  disableCleanup();
  enableCleanup();
}

function showBadgeTogglesUI() {
  if (!document.getElementById('pr-cleanup-badge-toggles')) {
    injectBadgeTogglesUI();
  }
}

function removeBadgeTogglesUI() {
  const container = document.getElementById('pr-cleanup-badge-toggles');
  if (container) {
    container.remove();
  }
  badgesToHide = [];
  updateCleanup();
}

function setBadgeTogglesEnabled(enabled) {
  if (enabled) {
    showBadgeTogglesUI();
    badgeOptions.forEach(opt => {
      const box = document.getElementById('toggle-' + opt.key);
      if (box) {
        box.disabled = false;
        box.checked = true;
      }
    });
    badgesToHide = [...badgeOptions.map(opt => opt.key)];
    updateCleanup();
  } else {
    removeBadgeTogglesUI();
  }
}

// Inject toggles UI for each badge
function injectBadgeTogglesUI() {
  if (document.getElementById('pr-cleanup-badge-toggles')) return;
  const container = document.createElement('div');
  container.id = 'pr-cleanup-badge-toggles';
  container.style.position = 'fixed';
  container.style.top = '80px';
  container.style.right = '32px';
  container.style.zIndex = '9999';
  container.style.background = 'white';
  container.style.border = '1px solid #d0d7de';
  container.style.borderRadius = '8px';
  container.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
  container.style.padding = '12px 16px';
  container.style.fontSize = '14px';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = '8px';
  container.innerHTML = badgeOptions.map(opt => `
    <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
      <input type="checkbox" id="toggle-${opt.key}" /> ${opt.label}
    </label>
  `).join('') + `
    <button id="show-all-hidden" style="margin-top:10px;padding:6px 12px;border-radius:4px;border:1px solid #d0d7de;background:#f6f8fa;cursor:pointer;">Show all hidden items</button>
  `;
  document.body.appendChild(container);
  badgesToHide = []; // All unticked by default
  badgeOptions.forEach(opt => {
    document.getElementById('toggle-' + opt.key).addEventListener('change', (e) => {
      if (e.target.checked) {
        if (!badgesToHide.includes(opt.key)) badgesToHide.push(opt.key);
      } else {
        badgesToHide = badgesToHide.filter(k => k !== opt.key);
      }
      updateCleanup();
    });
  });
  // Add event for load hidden conversations button
  document.getElementById('show-all-hidden').addEventListener('click', showAllHiddenItems);
// Button handler to load all hidden conversations
function showAllHiddenItems() {
  // Repeatedly click all 'Load more…' buttons until none remain
  function clickAllLoadMoreButtons() {
    const loadMoreBtns = Array.from(document.querySelectorAll('button.ajax-pagination-btn'))
      .filter(btn => btn.textContent.trim() === 'Load more…' && !btn.disabled);
    if (loadMoreBtns.length === 0) return;
    loadMoreBtns.forEach(btn => btn.click());
    // Wait for DOM to update, then try again
    setTimeout(clickAllLoadMoreButtons, 5 * 1000);
  }
  clickAllLoadMoreButtons();
}
}

// On load, inject the badge toggles UI immediately
showBadgeTogglesUI();
