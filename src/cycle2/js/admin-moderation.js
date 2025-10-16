/**
 * Admin Art Submission Moderation
 */

let adminUser = null;
let allSubmissions = [];
let currentStatus = 'pending';

document.addEventListener('DOMContentLoaded', async () => {
    adminUser = checkAdminAuth();
    if (!adminUser) return;

    await loadSubmissions();
    setupEventListeners();
});

async function loadSubmissions() {
    const container = document.getElementById('submissions-container');
    container.innerHTML = '<p>Loading submissions...</p>';

    try {
        const response = await fetch('../cycle3/api/get-entries.php?admin=true');
        const result = await response.json();

        if (result.success && result.entries) {
            allSubmissions = result.entries;
            updateSubmissionCounts();
            displaySubmissions(currentStatus);
        }
    } catch (error) {
        console.error('Error loading submissions:', error);
        container.innerHTML = '<p>Error loading submissions</p>';
    }
}

function setupEventListeners() {
    document.querySelectorAll('.admin-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.admin-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentStatus = e.target.dataset.status;
            displaySubmissions(currentStatus);
        });
    });
}

function updateSubmissionCounts() {
    const counts = {
        pending: allSubmissions.filter(s => s.status === 'pending').length,
        approved: allSubmissions.filter(s => s.status === 'approved').length,
        rejected: allSubmissions.filter(s => s.status === 'rejected').length,
        all: allSubmissions.length
    };

    document.getElementById('pending-count').textContent = counts.pending;
    document.getElementById('approved-count').textContent = counts.approved;
    document.getElementById('rejected-count').textContent = counts.rejected;
    document.getElementById('all-count').textContent = counts.all;
}

function displaySubmissions(status) {
    let filtered = allSubmissions;

    if (status !== 'all') {
        filtered = allSubmissions.filter(s => s.status === status);
    }

    renderSubmissions(filtered);
}

function renderSubmissions(submissions) {
    const container = document.getElementById('submissions-container');

    if (submissions.length === 0) {
        container.innerHTML = '<p class="text-center">No submissions found</p>';
        return;
    }

    container.innerHTML = submissions.map(sub => `
        <div class="submission-card">
            <div class="submission-header">
                <h3>${escapeHtml(sub.title)}</h3>
                <span class="badge badge-${sub.status}">${sub.status.toUpperCase()}</span>
            </div>
            <div class="submission-details">
                <p><strong>Type:</strong> ${formatArtType(sub.art_type)}</p>
                <p><strong>Period:</strong> ${formatPeriod(sub.time_period)}</p>
                <p><strong>Location:</strong> ${escapeHtml(sub.location_name)}</p>
                <p><strong>Submitted by:</strong> ${escapeHtml(sub.submitted_by_username || 'Unknown')}</p>
                <p><strong>Date:</strong> ${formatDate(sub.submitted_at)}</p>
            </div>
            <div class="submission-actions">
                <button class="btn btn-primary btn-sm" onclick="viewSubmissionDetail(${sub.entry_id})">View Details</button>
                ${sub.status === 'pending' ? `
                    <button class="btn btn-success btn-sm" onclick="approveSubmission(${sub.entry_id})">Approve</button>
                    <button class="btn btn-danger btn-sm" onclick="showRejectModal(${sub.entry_id})">Reject</button>
                ` : ''}
                <button class="btn btn-secondary btn-sm" onclick="editSubmission(${sub.entry_id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteSubmission(${sub.entry_id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function viewSubmissionDetail(entryId) {
    const submission = allSubmissions.find(s => s.entry_id === entryId);
    if (!submission) return;

    const modalContent = `
        <h2>${escapeHtml(submission.title)}</h2>
        <div class="submission-detail-grid">
            <div class="detail-section">
                <h3>Basic Information</h3>
                <dl>
                    <dt>Art Type:</dt><dd>${formatArtType(submission.art_type)}</dd>
                    <dt>Time Period:</dt><dd>${formatPeriod(submission.time_period)}</dd>
                    <dt>Artist:</dt><dd>${escapeHtml(submission.artist_name || 'Unknown')}</dd>
                </dl>
            </div>
            <div class="detail-section">
                <h3>Description</h3>
                <p>${escapeHtml(submission.description)}</p>
            </div>
            <div class="detail-section">
                <h3>Location</h3>
                <dl>
                    <dt>Name:</dt><dd>${escapeHtml(submission.location_name)}</dd>
                    <dt>Coordinates:</dt><dd>${submission.latitude}, ${submission.longitude}</dd>
                    <dt>Sensitivity:</dt><dd>${submission.location_sensitivity}</dd>
                </dl>
            </div>
            <div class="detail-section">
                <h3>Submission Info</h3>
                <dl>
                    <dt>Submitted By:</dt><dd>${escapeHtml(submission.submitted_by_username || 'Unknown')}</dd>
                    <dt>Date:</dt><dd>${formatDateTime(submission.submitted_at)}</dd>
                    <dt>Status:</dt><dd><span class="badge badge-${submission.status}">${submission.status}</span></dd>
                </dl>
            </div>
        </div>
        <div class="modal-actions">
            ${submission.status === 'pending' ? `
                <button class="btn btn-success" onclick="approveSubmission(${submission.entry_id}); closeModerationModal();">Approve</button>
                <button class="btn btn-danger" onclick="showRejectModal(${submission.entry_id}); closeModerationModal();">Reject</button>
            ` : ''}
            <button class="btn btn-secondary" onclick="closeModerationModal()">Close</button>
        </div>
    `;

    document.getElementById('modal-content-area').innerHTML = modalContent;
    document.getElementById('moderation-modal').classList.add('active');
    document.getElementById('moderation-modal').style.display = 'flex';
}

function closeModerationModal() {
    document.getElementById('moderation-modal').classList.remove('active');
    document.getElementById('moderation-modal').style.display = 'none';
}

async function approveSubmission(entryId) {
    if (!confirm('Approve this submission?')) return;

    try {
        const response = await fetch('../cycle3/api/approve-entry.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ entry_id: entryId })
        });

        const result = await response.json();

        if (result.success) {
            alert('Submission approved successfully');
            await loadSubmissions();
        } else {
            alert(result.message || 'Failed to approve submission');
        }
    } catch (error) {
        console.error('Error approving submission:', error);
        alert('An error occurred');
    }
}

function showRejectModal(entryId) {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;

    rejectSubmission(entryId, reason);
}

async function rejectSubmission(entryId, reason) {
    try {
        const response = await fetch('../cycle3/api/reject-entry.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                entry_id: entryId,
                rejection_reason: reason
            })
        });

        const result = await response.json();

        if (result.success) {
            alert('Submission rejected');
            await loadSubmissions();
        } else {
            alert(result.message || 'Failed to reject submission');
        }
    } catch (error) {
        console.error('Error rejecting submission:', error);
        alert('An error occurred');
    }
}

function editSubmission(entryId) {
    window.location.href = `edit-submission.html?id=${entryId}&admin=true`;
}

async function deleteSubmission(entryId) {
    if (!confirm('Are you sure you want to delete this submission? This cannot be undone.')) return;

    try {
        const response = await fetch('../cycle3/api/delete-entry.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: entryId })
        });

        const result = await response.json();

        if (result.success) {
            alert('Submission deleted successfully');
            await loadSubmissions();
        } else {
            alert(result.message || 'Failed to delete submission');
        }
    } catch (error) {
        console.error('Error deleting submission:', error);
        alert('An error occurred');
    }
}

function formatArtType(type) {
    const types = {
        'rock_art': 'Rock Art',
        'bark_painting': 'Bark Painting',
        'contemporary': 'Contemporary',
        'sculpture': 'Sculpture',
        'ceremonial': 'Ceremonial',
        'other': 'Other'
    };
    return types[type] || type;
}

function formatPeriod(period) {
    const periods = {
        'ancient': 'Ancient',
        'historical': 'Colonial Era',
        'contemporary': 'Contemporary'
    };
    return periods[period] || period;
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-AU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
