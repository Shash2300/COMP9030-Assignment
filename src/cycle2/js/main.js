/**
 * Dashboard Main Logic
 * Handles dashboard UI and user submissions
 */

let currentUser = null;
let allSubmissions = [];
let currentFilter = 'all';

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication
    currentUser = checkAuthentication();
    if (!currentUser) return;

    // Load user submissions
    await loadSubmissions();

    // Set up event listeners
    setupEventListeners();

    // Update user info in header if needed
    updateUserInfo();
});

// Load user's submissions
async function loadSubmissions() {
    const submissionsList = document.getElementById('submissions-list');
    submissionsList.innerHTML = '<div class="loading-spinner"><p>Loading your submissions...</p></div>';

    try {
        allSubmissions = await getUserSubmissions(currentUser.user_id);

        if (allSubmissions.length === 0) {
            showEmptyState();
        } else {
            updateTabCounts();
            displaySubmissions(currentFilter);
        }
    } catch (error) {
        console.error('Error loading submissions:', error);
        submissionsList.innerHTML = '<div class="error-message"><p>Error loading submissions. Please try again.</p></div>';
    }
}

// Display submissions based on filter
function displaySubmissions(filter) {
    const submissionsList = document.getElementById('submissions-list');

    let filteredSubmissions = allSubmissions;
    if (filter !== 'all') {
        filteredSubmissions = allSubmissions.filter(entry => entry.status === filter);
    }

    if (filteredSubmissions.length === 0) {
        submissionsList.innerHTML = `
            <div class="empty-state">
                <h2>No ${filter === 'all' ? '' : filter} submissions</h2>
                <p>${filter === 'all' ? 'Start sharing indigenous art with the community!' : `You don't have any ${filter} submissions yet.`}</p>
            </div>
        `;
        return;
    }

    const submissionsHTML = filteredSubmissions.map(entry => createSubmissionCard(entry)).join('');
    submissionsList.innerHTML = submissionsHTML;

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', handleDelete);
    });
}

// Create submission card HTML
function createSubmissionCard(entry) {
    const statusClass = entry.status.toLowerCase();
    let statusText = entry.status.charAt(0).toUpperCase() + entry.status.slice(1);

    // Better status display names
    if (entry.status === 'pending') statusText = 'Pending Review';
    if (entry.status === 'approved') statusText = 'Approved';
    if (entry.status === 'rejected') statusText = 'Rejected';

    return `
        <div class="submission-card" data-entry-id="${entry.entry_id}">
            <div class="submission-header">
                <h3>${escapeHtml(entry.title)}</h3>
                <span class="status-badge status-${statusClass}">${statusText}</span>
            </div>
            <div class="submission-details">
                <p><strong>Type:</strong> ${formatArtType(entry.art_type)}</p>
                <p><strong>Period:</strong> ${formatPeriod(entry.time_period)}</p>
                <p><strong>Location:</strong> ${escapeHtml(entry.location_name)}</p>
                <p><strong>Submitted:</strong> ${formatDate(entry.submitted_at)}</p>
            </div>
            <div class="submission-description">
                <p>${escapeHtml(entry.description)}</p>
            </div>
            ${entry.rejection_reason ? `
            <div class="rejection-reason">
                <p><strong>Rejection Reason:</strong> ${escapeHtml(entry.rejection_reason)}</p>
            </div>
            ` : ''}
            <div class="submission-actions">
                <a href="art-detail.html?id=${entry.entry_id}" class="btn btn-outline">View Details</a>
                <a href="edit-submission.html?id=${entry.entry_id}" class="btn btn-primary">Edit</a>
                <button class="btn btn-secondary btn-delete" data-entry-id="${entry.entry_id}">Delete</button>
            </div>
        </div>
    `;
}

// Update tab counts
function updateTabCounts() {
    const counts = {
        all: allSubmissions.length,
        pending: allSubmissions.filter(e => e.status === 'pending').length,
        approved: allSubmissions.filter(e => e.status === 'approved').length,
        rejected: allSubmissions.filter(e => e.status === 'rejected').length
    };

    document.querySelector('[data-status="all"]').textContent = `All (${counts.all})`;
    document.querySelector('[data-status="pending"]').textContent = `Pending (${counts.pending})`;
    document.querySelector('[data-status="approved"]').textContent = `Approved (${counts.approved})`;
    document.querySelector('[data-status="rejected"]').textContent = `Rejected (${counts.rejected})`;
}

// Show empty state
function showEmptyState() {
    const submissionsList = document.getElementById('submissions-list');
    submissionsList.innerHTML = `
        <div class="empty-state">
            <h2>No submissions yet</h2>
            <p>Start sharing indigenous art with the community!</p>
            <a href="submit-art.html" class="btn btn-primary">Submit Your First Entry</a>
        </div>
    `;
    updateTabCounts();
}

// Set up event listeners
function setupEventListeners() {
    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            currentFilter = e.target.dataset.status;
            displaySubmissions(currentFilter);
        });
    });

    // Logout button - use ID selector for specificity
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        console.log('Found logout link, adding handler');
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Logout clicked!');
            logout();
        });
    } else {
        console.log('Warning: logout-link not found');
    }
}

// Handle delete button click
async function handleDelete(e) {
    const entryId = e.target.dataset.entryId;

    if (!confirm('Are you sure you want to delete this submission?')) {
        return;
    }

    const btn = e.target;
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Deleting...';

    try {
        const result = await deleteEntry(entryId);

        if (result.success) {
            allSubmissions = allSubmissions.filter(e => e.entry_id != entryId);

            if (allSubmissions.length === 0) {
                showEmptyState();
            } else {
                updateTabCounts();
                displaySubmissions(currentFilter);
            }

            alert('Entry deleted successfully.');
        } else {
            field.classList.remove('error');
            hideFieldError(field);
        }
    });

    return isValid;
}

/**
 * Show error message for a field
 * @param {HTMLElement} field - Form field element
 * @param {string} message - Error message
 */
function showFieldError(field, message) {
    let errorEl = field.parentElement.querySelector('.error-message');
    if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'error-message';
        field.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
}

/**
 * Hide error message for a field
 * @param {HTMLElement} field - Form field element
 */
function hideFieldError(field) {
    const errorEl = field.parentElement.querySelector('.error-message');
    if (errorEl) {
        errorEl.remove();
    }
}

/**
 * Handle image upload and preview
 * @param {Event} event - Change event
 */
function handleImageUpload(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('image-previews');

    if (!previewContainer) return;

    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewHtml = `
                    <div class="image-preview">
                        <img src="${e.target.result}" alt="Preview">
                        <div class="image-preview-actions">
                            <button type="button" class="remove-image" title="Remove">×</button>
                        </div>
                    </div>
                `;
                previewContainer.insertAdjacentHTML('beforeend', previewHtml);

                // Add remove handler
                const removeBtn = previewContainer.lastElementChild.querySelector('.remove-image');
                removeBtn.addEventListener('click', function() {
                    this.closest('.image-preview').remove();
                });
            };
            reader.readAsDataURL(file);
        }
    });
}

/**
 * Show success modal after form submission
 */
function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 3000);
    }
}

/**
 * Authentication Forms
 * Login and registration form validation
 */
function initAuthForms() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Logging in...';

            // Call backend API
            const result = await API.login(username, password);

            if (result.success) {
                window.location.href = 'dashboard.html';
            } else {
                alert(result.message || 'Login failed. Please check your credentials.');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    // Registration form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        // Password strength indicator
        const passwordInput = document.getElementById('password');
        const passwordStrength = document.querySelector('.password-strength');

        if (passwordInput && passwordStrength) {
            passwordInput.addEventListener('input', () => {
                const strength = calculatePasswordStrength(passwordInput.value);
                passwordStrength.className = 'password-strength ' + strength;
            });
        }

        // Form submission
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate passwords match
            const password = document.getElementById('reg-password');
            const confirmPassword = document.getElementById('confirm-password');

            if (password && confirmPassword && password.value !== confirmPassword.value) {
                showFieldError(confirmPassword, 'Passwords do not match');
                return;
            }

            const userData = {
                username: document.getElementById('reg-username').value,
                email: document.getElementById('reg-email').value,
                password: password.value,
                full_name: document.getElementById('reg-username').value,
                user_role: document.querySelector('input[name="role"]:checked')?.value || 'artist'
            };

            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Registering...';

            // Call backend API
            const result = await API.register(userData);

            if (result.success) {
                window.location.href = 'dashboard.html';
            } else {
                alert(result.message || 'Registration failed. Please try again.');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
}

/**
 * Calculate password strength
 * @param {string} password - Password to check
 * @returns {string} Strength level: 'weak', 'medium', or 'strong'
 */
function calculatePasswordStrength(password) {
    if (password.length < 6) return 'weak';

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 1) return 'weak';
    if (strength <= 3) return 'medium';
    return 'strong';
}

/**
 * Dashboard
 * User dashboard with tabs
 */
function initDashboard() {
    const dashboardSection = document.querySelector('.dashboard-section');
    if (!dashboardSection) return;

    // Check if user is logged in (simulated)
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');

            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding tab content
            tabContents.forEach(content => {
                if (content.id === tabName + '-tab') {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });

    // Logout functionality
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            // Call backend logout API
            await API.logout();

            // Redirect to homepage
            window.location.href = 'index.html';
        });
    }
}