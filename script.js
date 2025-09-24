const fetchBtn = document.getElementById('fetchBtn');
    const clearBtn = document.getElementById('clearBtn');
    const urlInput = document.getElementById('urlInput');
    const resultArea = document.getElementById('resultArea');
    // const useProxy = document.getElementById('useProxy')

    function showLoading() {
      resultArea.innerHTML = `
        <div class="loading">
          <div class="material-icons">sync</div>
          <p>Extracting webpage data...</p>
        </div>
      `;
    }

    function showError(message) {
      resultArea.innerHTML = `
        <div class="error">
          <span class="material-icons">error</span>
          <div>
            <strong>Error:</strong> ${message}
          </div>
        </div>
      `;
    }

    function showResults(data) {
      const favicon = data.favicon ? 
        `<img src="${data.favicon}" alt="Favicon" class="favicon" onerror="this.style.display='none'">` :
        `<div class="favicon-placeholder"><span class="material-icons">web</span></div>`;

      resultArea.innerHTML = `
        <div class="result-item">
          <span class="material-icons result-icon">title</span>
          <div class="result-info">
            <div class="result-label">Page Title</div>
            <div class="result-value ${!data.page_title ? 'empty' : ''}">${data.page_title || 'No title found'}</div>
          </div>
        </div>
        <div class="result-item">
          <span class="material-icons result-icon">description</span>
          <div class="result-info">
            <div class="result-label">Description</div>
            <div class="result-value ${!data.page_description ? 'empty' : ''}">${data.page_description || 'No description found'}</div>
          </div>
        </div>
        <div class="result-item">
          <span class="material-icons result-icon">link</span>
          <div class="result-info">
            <div class="result-label">URL</div>
            <div class="result-value">${data.url || 'N/A'}</div>
          </div>
        </div>
        <div class="result-item">
          <span class="material-icons result-icon">public</span>
          <div class="result-info">
            <div class="result-label">Domain</div>
            <div class="result-value">${data.domain || 'N/A'}</div>
          </div>
        </div>
        <div class="result-item">
          <span class="material-icons result-icon">image</span>
          <div class="result-info">
            <div class="result-label">Favicon</div>
            <div class="result-value" style="display: flex; align-items: center; gap: 12px;">
              ${favicon}
              <span class="${!data.favicon ? 'empty' : ''}">${data.favicon || 'No favicon found'}</span>
            </div>
          </div>
        </div>
      `;
    }

    fetchBtn.addEventListener('click', async () => {
      const targetUrl = urlInput.value.trim();
      if (!targetUrl) {
        showError('Please enter a valid URL');
        return;
      }

      // Disable button during fetch
      fetchBtn.disabled = true;
      fetchBtn.innerHTML = '<span class="material-icons">hourglass_empty</span> Extracting...';
      
      showLoading();

      try {
        let response;
        
          // Direct API call (for testing onl
          const API_KEY = "tmzQqPk8v0EuGfP1d7pWBw==sTExHT0IOuEvNul1";
          const apiUrl = `https://api.api-ninjas.com/v1/webpage?url=${encodeURIComponent(targetUrl)}`;

          response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              'X-Api-Key': API_KEY,
              'Accept': 'application/json'
            }
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error (${response.status}): ${errorText}`);
          }
        

        const data = await response.json();
        showResults(data);

      } catch (err) {
        console.error(err);
        showError(err.message);
      } finally {
        // Re-enable button
        fetchBtn.disabled = false;
        fetchBtn.innerHTML = '<span class="material-icons">search</span> Extract Data';
      }
    });

    clearBtn.addEventListener('click', () => {
      resultArea.innerHTML = `
        <div class="loading">
          <div class="material-icons">hourglass_empty</div>
          <p>Ready to extract webpage data</p>
        </div>
      `;
    });

     
    urlInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        fetchBtn.click();
      }
    });
