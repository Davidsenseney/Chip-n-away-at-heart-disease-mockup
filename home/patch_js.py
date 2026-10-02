import sys

with open('wixheader.js', 'r', encoding='utf-8') as f:
    content = f.read()

new_js = """
async function handleModalFormSubmit(event, subject, statusId) {
  event.preventDefault();
  const form = event.currentTarget;
  const submitBtn = form.querySelector('[type="submit"]');
  const statusEl = document.getElementById(statusId);

  const setStatus = (message, isError = false) => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.toggle('text-apple-red', isError);
    statusEl.classList.toggle('text-apple-dark', !isError);
  };

  const formDataObj = Object.fromEntries(new FormData(form));

  const rawEndpoint = (
    import.meta.env.VITE_FORMSPREE_ENDPOINT ||
    import.meta.env.VITE_FORMSPREE_URL ||
    import.meta.env.VITE_FORMSPREE_FORM_ID ||
    ''
  ).trim();

  const endpoint = rawEndpoint.startsWith('http://') || rawEndpoint.startsWith('https://')
    ? rawEndpoint
    : (rawEndpoint ? `https://formspree.io/f/${rawEndpoint}` : '');

  if (!endpoint || endpoint.endsWith('/YOUR_FORM_ID') || endpoint === 'YOUR_FORM_ID') {
    setStatus('Formspree endpoint is not configured.', true);
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  }
  setStatus('Sending your registration...');

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...formDataObj,
        _subject: subject
      })
    });

    let result = null;
    try { result = await response.json(); } catch {}

    if (response.ok) {
      form.innerHTML = '<p class="text-center text-apple-red font-bold text-xl my-8">Thank you for registering! We will contact you soon about payment.</p>';
    } else {
      let errorMsg = 'Request failed. Please try again.';
      if (result?.errors && Array.isArray(result.errors)) {
        errorMsg = result.errors.map(err => err.message).join(', ');
      }
      setStatus(errorMsg, true);
    }
  } catch (err) {
    console.error('Network or fetch error:', err);
    setStatus('Could not reach the server. Please check your connection and try again.', true);
  } finally {
    if (submitBtn && form.contains(submitBtn)) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Complete Registration & Pay';
    }
  }
}
"""

replacement = """  // Volunteer form — always bind when present
  const volunteerForm = document.getElementById('volunteer-form');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', handleFormSubmit);
    console.log('Volunteer form submit handler attached');
  }

  const driverForm = document.getElementById('driver-form');
  if (driverForm) {
    driverForm.addEventListener('submit', (e) => handleModalFormSubmit(e, 'New Driver Registration', 'driver-form-status'));
    console.log('Driver form submit handler attached');
  }

  const vendorForm = document.getElementById('vendor-form');
  if (vendorForm) {
    vendorForm.addEventListener('submit', (e) => handleModalFormSubmit(e, 'New Vendor Registration', 'vendor-form-status'));
    console.log('Vendor form submit handler attached');
  }"""

content = content.replace("  // Volunteer form — always bind when present\n  const volunteerForm = document.getElementById('volunteer-form');\n  if (volunteerForm) {\n    volunteerForm.addEventListener('submit', handleFormSubmit);\n    console.log('Volunteer form submit handler attached');\n  }", replacement)

content = content.replace("async function handleFormSubmit(event) {", new_js + "\nasync function handleFormSubmit(event) {")

with open('wixheader.js', 'w', encoding='utf-8') as f:
    f.write(content)
