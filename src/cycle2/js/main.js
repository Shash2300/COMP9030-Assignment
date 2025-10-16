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
            alert(result.message || 'Failed to delete entry.');
            btn.disabled = false;
            btn.textContent = originalText;
        }
    } catch (error) {
        console.error('Error deleting entry:', error);
        alert('An error occurred while deleting the entry.');
        btn.disabled = false;
        btn.textContent = originalText;
    }
}

// Update user info in header
function updateUserInfo() {
    if (currentUser && currentUser.username) {
        const header = document.querySelector('.dashboard-header h1');
        if (header) {
            header.textContent = `My Submissions - ${currentUser.username}`;
        }
    }
}

// Helper functions
function formatArtType(type) {
    const mapping = {
        'rock_art': 'Rock Art',
        'bark_painting': 'Bark Painting',
        'contemporary': 'Contemporary',
        'sculpture': 'Sculpture',
        'ceremonial': 'Ceremonial',
        'other': 'Other'
    };
    return mapping[type] || type;
}

function formatPeriod(period) {
    const mapping = {
        'ancient': 'Ancient',
        'historical': 'Colonial Era',
        'contemporary': 'Contemporary'
    };
    return mapping[period] || period;
}

function formatDate(dateString) {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: 'numeric' });
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}