function cleanTranscript() {
  document.querySelectorAll(
    'ytd-transcript-segment-renderer'
  ).forEach(segment => {
    const timestamp = segment.querySelector('[class*="timestamp"]');
    if (timestamp) {
      timestamp.remove();
    }
  });
}

new MutationObserver(cleanTranscript).observe(document.body, {
  childList: true,
  subtree: true
});

cleanTranscript();