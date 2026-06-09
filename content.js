function hideTranscriptTimestamps() {
  // Current transcript timestamp renderer
  document.querySelectorAll(
    'ytd-transcript-segment-renderer .segment-timestamp'
  ).forEach(el => {
    el.style.display = 'none';
  });

  // Fallback for UI changes
  document.querySelectorAll(
    'ytd-transcript-segment-renderer [class*="timestamp"]'
  ).forEach(el => {
    el.style.display = 'none';
  });
}

// Run initially
hideTranscriptTimestamps();

// Watch for transcript panel opening
const observer = new MutationObserver(() => {
  hideTranscriptTimestamps();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});