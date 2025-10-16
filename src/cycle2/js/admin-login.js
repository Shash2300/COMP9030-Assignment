/**
 * Admin Login Handler
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn) {
        window.location.href = 'admin-dashboard.html';
        return;
    }

    const form = document.getElementById('admin-login-form');
    if (form) {
        form.addEventListener('submit', handleAdminLogin);
    }
});

async function handleAdminLogin(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
        is_admin: true
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Authenticating...';

    try {
        const response = await fetch('../cycle3/api/admin-login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success && result.admin) {
            // Store admin session
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminData', JSON.stringify(result.admin));

            // Redirect to admin dashboard
            window.location.href = 'admin-dashboard.html';
        } else {
            alert(result.message || 'Invalid admin credentials');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}
