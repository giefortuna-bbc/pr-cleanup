// Injects a style to hide deployment messages in GitHub PRs
const style = document.createElement('style');
style.textContent = `
  .js-targetable-element:has(.TimelineItem-badge .octicon-rocket) {
    display: none !important;
  }
`;
document.head.appendChild(style);
