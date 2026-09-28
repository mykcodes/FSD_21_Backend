document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('requestForm');
  const requestIdInput = document.getElementById('requestId');
  const submitBtn = document.getElementById('submitBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const formTitle = document.getElementById('formTitle');
  const formMessage = document.getElementById('formMessage');
  const requestsList = document.getElementById('requestsList');
  const loadingMessage = document.getElementById('loadingMessage');

  // Load all requests on startup
  fetchRequests();

  // Handle form submission (Create or Update)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const requestData = {
      studentName: document.getElementById('studentName').value,
      email: document.getElementById('email').value,
      category: document.getElementById('category').value,
      description: document.getElementById('description').value,
      priority: document.getElementById('priority').value
    };

    const requestId = requestIdInput.value;

    try {
      submitBtn.disabled = true;
      if (requestId) {
        await updateRequest(requestId, requestData);
      } else {
        await createRequest(requestData);
      }
      resetForm();
      fetchRequests();
    } catch (error) {
      showMessage(error.message, 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });

  // Handle cancel edit
  cancelBtn.addEventListener('click', resetForm);

  // Fetch all requests
  async function fetchRequests() {
    try {
      loadingMessage.classList.remove('hidden');
      requestsList.innerHTML = '';
      
      const response = await fetch('/api/requests');
      if (!response.ok) throw new Error('Failed to fetch requests');
      
      const data = await response.json();
      
      // Sort to show newest first, assuming id is timestamp-based
      data.sort((a, b) => b.id - a.id);
      
      loadingMessage.classList.add('hidden');
      
      if (data.length === 0) {
        requestsList.innerHTML = '<p class="text-muted" style="text-align: center; grid-column: 1 / -1;">No requests submitted yet.</p>';
      } else {
        data.forEach(request => {
          const card = createRequestCard(request);
          requestsList.appendChild(card);
        });
      }
    } catch (error) {
      loadingMessage.classList.add('hidden');
      requestsList.innerHTML = `<p class="message error" style="grid-column: 1 / -1;">Error loading requests: ${error.message}</p>`;
    }
  }

  // Create a new request
  async function createRequest(data) {
    const response = await fetch('/api/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create request');
    }

    showMessage('Request submitted successfully!', 'success');
  }

  // Update an existing request
  async function updateRequest(id, data) {
    const response = await fetch(`/api/requests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update request');
    }

    showMessage('Request updated successfully!', 'success');
  }

  // Delete a request
  async function deleteRequest(id) {
    if (!confirm('Are you sure you want to delete this request?')) return;

    try {
      const response = await fetch(`/api/requests/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete request');
      }

      showMessage('Request deleted successfully!', 'success');
      fetchRequests();
    } catch (error) {
      showMessage(error.message, 'error');
    }
  }

  // Edit request (populate form)
  window.editRequest = async function(id) {
    try {
      const response = await fetch(`/api/requests/${id}`);
      if (!response.ok) throw new Error('Failed to fetch request details');
      
      const request = await response.json();
      
      requestIdInput.value = request.id;
      document.getElementById('studentName').value = request.studentName;
      document.getElementById('email').value = request.email;
      document.getElementById('category').value = request.category;
      document.getElementById('description').value = request.description;
      document.getElementById('priority').value = request.priority;

      formTitle.textContent = 'Update Request';
      submitBtn.textContent = 'Update Request';
      cancelBtn.classList.remove('hidden');
      
      // Scroll to form
      document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      showMessage(error.message, 'error');
    }
  };

  // Attach delete to window object so it can be called from inline onclick
  window.deleteRequest = deleteRequest;

  // Helper to create UI card
  function createRequestCard(request) {
    const div = document.createElement('div');
    div.className = 'request-card';
    div.innerHTML = `
      <div class="request-header">
        <div>
          <div class="request-title">${escapeHTML(request.studentName)}</div>
          <div class="request-meta">${escapeHTML(request.email)} | ID: ${request.id}</div>
        </div>
        <span class="priority-badge priority-${request.priority}">${request.priority}</span>
      </div>
      <div class="request-category">${escapeHTML(request.category)}</div>
      <div class="request-body">${escapeHTML(request.description)}</div>
      <div class="request-actions">
        <button onclick="editRequest('${request.id}')" class="btn btn-secondary">Edit</button>
        <button onclick="deleteRequest('${request.id}')" class="btn btn-danger">Delete</button>
      </div>
    `;
    return div;
  }

  // Helper to escape HTML to prevent XSS
  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag])
    );
  }

  // Reset form to default create mode
  function resetForm() {
    form.reset();
    requestIdInput.value = '';
    formTitle.textContent = 'Submit a Request';
    submitBtn.textContent = 'Submit Request';
    cancelBtn.classList.add('hidden');
  }

  // Show status message
  function showMessage(msg, type) {
    formMessage.textContent = msg;
    formMessage.className = `message ${type}`;
    formMessage.classList.remove('hidden');
    
    // Hide after 5 seconds
    setTimeout(() => {
      formMessage.classList.add('hidden');
    }, 5000);
  }
});
