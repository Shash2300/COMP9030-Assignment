/**
 * Indigenous Art Atlas - Authentication Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        initRegisterForm(registerForm);
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        initLoginForm(loginForm);
    }
});

/**
 * Initializes the registration form.
 * @param {HTMLFormElement} form The registration form element.
 */
function initRegisterForm(form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm(form)) {
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Disable submit button during submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating account...';

        try {
            const response = await fetch('../cycle3/api/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success || response.ok) {
                // Store user data in localStorage
                if (result.user) {
                    localStorage.setItem('userLoggedIn', 'true');
                    localStorage.setItem('userData', JSON.stringify(result.user));
                }
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert(result.message || 'Registration failed. Please try again.');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

/**
 * Initializes the login form.
 * @param {HTMLFormElement} form The login form element.
 */
function initLoginForm(form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm(form)) {
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Disable submit button during submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';

        try {
            const response = await fetch('../cycle3/api/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success || response.ok) {
                // Store user data in localStorage
                if (result.user) {
                    localStorage.setItem('userLoggedIn', 'true');
                    localStorage.setItem('userData', JSON.stringify(result.user));
                }
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert(result.message || 'Login failed. Please check your credentials.');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}
