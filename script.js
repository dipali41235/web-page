// script.js
// FRONTEND: for quick testing only.
// Recommended: Use the Node proxy (server.js) below to keep your API key secret.

const fetchBtn = document.getElementById('fetchBtn');
const clearBtn = document.getElementById('clearBtn');
const urlInput = document.getElementById('urlInput');
const jsonOutput = document.getElementById('jsonOutput');
const useProxy = document.getElementById('useProxy');

fetchBtn.addEventListener('click', async () => {
  const targetUrl = urlInput.value.trim();
  if (!targetUrl) {
    alert('Enter a valid URL');
    return;
  }

  jsonOutput.textContent = 'Fetching...';

  try {
    // If you check "Use local proxy", the request will be sent to /proxy (see server.js example).
    if (useProxy.checked) {
      const resp = await fetch(`/proxy?url=${encodeURIComponent(targetUrl)}`);
      if (!resp.ok) throw new Error(`Proxy error: ${resp.status} ${resp.statusText}`);
      const data = await resp.json();
      jsonOutput.textContent = JSON.stringify(data, null, 2);
      return;
    }

    // === CLIENT-SIDE DIRECT CALL (NOT RECOMMENDED FOR PRODUCTION) ===
    // Put your API key here ONLY for local testing. DO NOT ship this to production.
    //tmzQqPk8v0EuGfP1d7pWBw==sTExHT0IOuEvNul1
    const API_KEY = "tmzQqPk8v0EuGfP1d7pWBw==sTExHT0IOuEvNul1"


    const apiUrl = `https://api.api-ninjas.com/v1/webpage?url=${encodeURIComponent(targetUrl)}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Api-Key': API_KEY,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const txt = await response.text();
      throw new Error(`HTTP ${response.status}: ${txt}`);
    }

    const data = await response.json();
    jsonOutput.textContent = JSON.stringify(data, null, 2);
    // console.log(data);

  } catch (err) {
    jsonOutput.textContent = `Error: ${err.message}`;
    console.error(err);
  }
});

clearBtn.addEventListener('click', () => {
  jsonOutput.textContent = '{}';
});
