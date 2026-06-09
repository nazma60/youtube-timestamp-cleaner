function removeTranscriptTimestamps() {
  const panel = document.querySelector("ytd-engagement-panel-section-list-renderer");
  if (!panel) return;

  panel.querySelectorAll("*").forEach(el => {
    const text = el.textContent?.trim();

    if (/^\d{1,2}:\d{2}(?::\d{2})?$/.test(text)) {
      el.style.display = "none";
    }
  });
}

new MutationObserver(removeTranscriptTimestamps).observe(document.body, {
  childList: true,
  subtree: true
});

removeTranscriptTimestamps();