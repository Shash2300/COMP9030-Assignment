/**
 * Admin Dashboard Logic
 */

let adminUser = null;

document.addEventListener('DOMContentLoaded', async () => {
    adminUser = checkAdminAuth();
    if (!adminUser) return;

    await loadDashboardStats();
    await loadRecentActivity();
});

async function loadDashboardStats() {
    try {
        const response = await fetch('../cycle3/api/get-admin-stats.php');
        const result = await response.json();

        if (result.success && result.stats) {
            const stats = result.stats;

            document.getElementById('pending-count').textContent = stats.pending_submissions || 0;
            document.getElementById('total-users').textContent = stats.total_users || 0;
            document.getElementById('approved-count').textContent = stats.approved_entries || 0;
            document.getElementById('reports-count').textContent = stats.pending_reports || 0;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

async function loadRecentActivity() {
    const activityContainer = document.getElementById('recent-activity');

    try {
        const response = await fetch('../cycle3/api/get-recent-activity.php?limit=10');
        const result = await response.json();

        if (result.success && result.activities && result.activities.length > 0) {
            activityContainer.innerHTML = `
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>User</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${result.activities.map(activity => `
                            <tr>
                                <td>${formatDateTime(activity.created_at)}</td>
                                <td><span class="badge">${activity.type}</span></td>
                                <td>${activity.description}</td>
                                <td>${activity.username || 'System'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            activityContainer.innerHTML = '<p>No recent activity</p>';
        }
    } catch (error) {
        console.error('Error loading activity:', error);
        activityContainer.innerHTML = '<p>Error loading recent activity</p>';
    }
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-AU', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
