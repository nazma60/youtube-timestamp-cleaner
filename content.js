let enabled = true;

// Load saved state
chrome.storage?.local.get(["ytTranscriptEnabled"], (res) => {
  if (res.ytTranscriptEnabled === false) {
    enabled = false;
  }
  updateUI();
  run();
});

// Create toggle button
const btn = document.createElement("button");
btn.innerText = "Transcript: ON";
btn.style.position = "fixed";
btn.style.bottom = "20px";
btn.style.right = "20px";
btn.style.zIndex = "99999";
btn.style.padding = "10px 14px";
btn.style.background = "#ff0000";
btn.style.color = "white";
btn.style.border = "none";
btn.style.borderRadius = "8px";
btn.style.cursor = "pointer";
btn.style.fontSize = "14px";

btn.onclick = () => {
  enabled = !enabled;

  chrome.storage?.local.set({
    ytTranscriptEnabled: enabled
  });

  updateUI();
  run();
};

document.body.appendChild(btn);

// Update button text
function updateUI() {
  btn.innerText = enabled
    ? "Transcript: ON"
    : "Transcript: OFF";
  btn.style.opacity = enabled ? "1" : "0.6";
}

// Remove timestamps
function run() {
  const panel = document.querySelector("ytd-engagement-panel-section-list-renderer");
  if (!panel) return;

  panel.querySelectorAll("*").forEach(el => {
    const text = el.textContent?.trim();

    if (/^\d{1,2}:\d{2}(?::\d{2})?$/.test(text)) {
      el.style.display = enabled ? "none" : "";
    }
  });
}

// Watch YouTube SPA changes
const observer = new MutationObserver(run);
observer.observe(document.body, {
  childList: true,
  subtree: true
});

run();