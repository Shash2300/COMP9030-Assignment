/**
 * Admin Authentication Helper
 * Checks if user is logged in as admin
 */

function checkAdminAuth() {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    const adminData = localStorage.getItem('adminData');

    if (!adminLoggedIn || !adminData) {
        window.location.href = 'admin-login.html';
        return null;
    }

    try {
        return JSON.parse(adminData);
    } catch (e) {
        window.location.href = 'admin-login.html';
        return null;
    }
}

function logoutAdmin() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminData');
    window.location.href = 'admin-login.html';
}

// Set up logout link if it exists
document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.getElementById('admin-logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                logoutAdmin();
            }
        });
    }
});
