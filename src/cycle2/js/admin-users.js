/**
 * Admin User Management
 */

let adminUser = null;
let allUsers = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', async () => {
    adminUser = checkAdminAuth();
    if (!adminUser) return;

    await loadUsers();
    setupEventListeners();
});

async function loadUsers() {
    try {
        const response = await fetch('../cycle3/api/get-users.php');
        const result = await response.json();

        if (result.success && result.users) {
            allUsers = result.users;
            updateUserCounts();
            displayUsers(currentFilter);
        }
    } catch (error) {
        console.error('Error loading users:', error);
        document.getElementById('users-tbody').innerHTML = '<tr><td colspan="8" class="text-center">Error loading users</td></tr>';
    }
}

function setupEventListeners() {
    // Tab filters
    document.querySelectorAll('.admin-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.admin-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            displayUsers(currentFilter);
        });
    });

    // Search
    document.getElementById('user-search').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = allUsers.filter(user =>
            user.username.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
        renderUsersTable(filtered);
    });

    // Edit form submission
    document.getElementById('edit-user-form').addEventListener('submit', handleEditUser);
}

function updateUserCounts() {
    const counts = {
        all: allUsers.length,
        general: allUsers.filter(u => u.user_type === 'general').length,
        artist: allUsers.filter(u => u.user_type === 'artist').length,
        admin: allUsers.filter(u => u.user_type === 'admin').length,
        inactive: allUsers.filter(u => u.status === 'inactive').length
    };

    document.getElementById('all-count').textContent = counts.all;
    document.getElementById('general-count').textContent = counts.general;
    document.getElementById('artist-count').textContent = counts.artist;
    document.getElementById('admin-count').textContent = counts.admin;
    document.getElementById('inactive-count').textContent = counts.inactive;
}

function displayUsers(filter) {
    let filtered = allUsers;

    if (filter !== 'all') {
        if (filter === 'inactive') {
            filtered = allUsers.filter(u => u.status === 'inactive');
        } else {
            filtered = allUsers.filter(u => u.user_type === filter);
        }
    }

    renderUsersTable(filtered);
}

function renderUsersTable(users) {
    const tbody = document.getElementById('users-tbody');

    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center">No users found</td></tr>';
        return;
    }

    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.user_id}</td>
            <td>${escapeHtml(user.username)}</td>
            <td>${escapeHtml(user.email)}</td>
            <td><span class="badge">${formatUserType(user.user_type)}</span></td>
            <td><span class="badge badge-${user.status === 'active' ? 'success' : 'warning'}">${user.status}</span></td>
            <td>${formatDate(user.created_at)}</td>
            <td>${user.submission_count || 0}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editUser(${user.user_id})">Edit</button>
                ${user.status === 'active'
                    ? `<button class="btn btn-sm btn-warning" onclick="toggleUserStatus(${user.user_id}, 'inactive')">Deactivate</button>`
                    : `<button class="btn btn-sm btn-success" onclick="toggleUserStatus(${user.user_id}, 'active')">Activate</button>`
                }
                <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.user_id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function editUser(userId) {
    const user = allUsers.find(u => u.user_id === userId);
    if (!user) return;

    document.getElementById('edit-user-id').value = user.user_id;
    document.getElementById('edit-username').value = user.username;
    document.getElementById('edit-email').value = user.email;
    document.getElementById('edit-user-type').value = user.user_type;
    document.getElementById('edit-status').value = user.status || 'active';

    document.getElementById('edit-user-modal').classList.add('active');
    document.getElementById('edit-user-modal').style.display = 'flex';
}

function closeEditUserModal() {
    document.getElementById('edit-user-modal').classList.remove('active');
    document.getElementById('edit-user-modal').style.display = 'none';
}

async function handleEditUser(e) {
    e.preventDefault();

    const userId = document.getElementById('edit-user-id').value;
    const userType = document.getElementById('edit-user-type').value;
    const status = document.getElementById('edit-status').value;

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving...';

    try {
        const response = await fetch('../cycle3/api/update-user-role.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                user_type: userType,
                status: status
            })
        });

        const result = await response.json();

        if (result.success) {
            alert('User updated successfully');
            closeEditUserModal();
            await loadUsers();
        } else {
            alert(result.message || 'Failed to update user');
        }

        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    } catch (error) {
        console.error('Error updating user:', error);
        alert('An error occurred');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

async function toggleUserStatus(userId, newStatus) {
    const action = newStatus === 'active' ? 'activate' : 'deactivate';
    if (!confirm(`Are you sure you want to ${action} this user?`)) return;

    try {
        const response = await fetch('../cycle3/api/update-user-role.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                status: newStatus
            })
        });

        const result = await response.json();

        if (result.success) {
            alert(`User ${action}d successfully`);
            await loadUsers();
        } else {
            alert(result.message || `Failed to ${action} user`);
        }
    } catch (error) {
        console.error('Error toggling user status:', error);
        alert('An error occurred');
    }
}

async function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    if (!confirm('This will also delete all their submissions. Continue?')) return;

    try {
        const response = await fetch('../cycle3/api/delete-user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: userId })
        });

        const result = await response.json();

        if (result.success) {
            alert('User deleted successfully');
            await loadUsers();
        } else {
            alert(result.message || 'Failed to delete user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('An error occurred');
    }
}

function formatUserType(type) {
    const types = {
        'general': 'General Public',
        'artist': 'Artist',
        'admin': 'Administrator'
    };
    return types[type] || type;
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

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
