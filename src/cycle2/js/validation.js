/**
 * Indigenous Art Atlas - Form Validation
 * Cycle 2: Frontend Prototype
 * COMP9030 Assignment
 *
 * Client-side form validation for:
 * - Login forms
 * - Registration forms
 * - Submit art forms
 * - Real-time validation feedback
 */

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid
 */
function validateEmail(email) {
    return EMAIL_REGEX.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and message
 */
function validatePassword(password) {
    const minLength = 8;
    const errors = [];

    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long`);
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    return {
        isValid: errors.length === 0,
        errors: errors,
        message: errors.join('. ')
    };
}

/**
 * Validate required field
 * @param {string} value - Field value
 * @returns {boolean} True if not empty
 */
function validateRequired(value) {
    return value.trim().length > 0;
}

/**
 * Validate coordinates
 * @param {string} lat - Latitude
 * @param {string} lng - Longitude
 * @returns {Object} Validation result
 */
function validateCoordinates(lat, lng) {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    const errors = [];

    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        errors.push('Latitude must be between -90 and 90');
    }

    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        errors.push('Longitude must be between -180 and 180');
    }

    return {
        isValid: errors.length === 0,
        errors: errors,
        message: errors.join('. ')
    };
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
function validateURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validate file upload
 * @param {File} file - File object
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
function validateFile(file, options = {}) {
    const {
        maxSize = 5 * 1024 * 1024, // 5MB default
        allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    } = options;

    const errors = [];

    if (file.size > maxSize) {
        errors.push(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
    }

    if (!allowedTypes.includes(file.type)) {
        errors.push('Invalid file type. Only images (JPEG, PNG, GIF, WebP) are allowed');
    }

    return {
        isValid: errors.length === 0,
        errors: errors,
        message: errors.join('. ')
    };
}

/**
 * Add real-time validation to a form field
 * @param {HTMLElement} field - Form field element
 * @param {Function} validator - Validation function
 */
function addFieldValidation(field, validator) {
    if (!field) return;

    // Validate on blur (when user leaves the field)
    field.addEventListener('blur', () => {
        const value = field.value;
        const result = validator(value);

        if (!result.isValid) {
            field.classList.add('error');
            showFieldError(field, result.message);
        } else {
            field.classList.remove('error');
            hideFieldError(field);
        }
    });

    // Clear error on focus
    field.addEventListener('focus', () => {
        field.classList.remove('error');
        hideFieldError(field);
    });
}

/**
 * Show error message for a field
 * @param {HTMLElement} field - Form field
 * @param {string} message - Error message
 */
function showFieldError(field, message) {
    // Remove existing error message
    hideFieldError(field);

    const errorEl = document.createElement('span');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    errorEl.setAttribute('role', 'alert');

    field.parentElement.appendChild(errorEl);
}

/**
 * Hide error message for a field
 * @param {HTMLElement} field - Form field
 */
function hideFieldError(field) {
    const errorEl = field.parentElement.querySelector('.error-message');
    if (errorEl) {
        errorEl.remove();
    }
}

/**
 * Validate entire form
 * @param {HTMLFormElement} form - Form element
 * @returns {boolean} True if all validations pass
 */
function validateForm(form) {
    if (!form) return false;

    let isValid = true;

    // Get all required fields
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            showFieldError(field, 'This field is required');
        }
    });

    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !validateEmail(field.value)) {
            isValid = false;
            field.classList.add('error');
            showFieldError(field, 'Please enter a valid email address');
        }
    });

    // Password validation (only for registration forms)
    const passwordFields = form.querySelectorAll('input[type="password"]');
    const isRegistrationForm = form.id === 'register-form';

    passwordFields.forEach(field => {
        if (field.value && field.name === 'password' && isRegistrationForm) {
            const result = validatePassword(field.value);
            if (!result.isValid) {
                isValid = false;
                field.classList.add('error');
                showFieldError(field, result.message);
            }
        }
    });

    // Confirm password validation
    const passwordField = form.querySelector('input[name="password"]');
    const confirmPasswordField = form.querySelector('input[name="confirm-password"], input[name="confirmPassword"]');

    if (passwordField && confirmPasswordField) {
        if (passwordField.value !== confirmPasswordField.value) {
            isValid = false;
            confirmPasswordField.classList.add('error');
            showFieldError(confirmPasswordField, 'Passwords do not match');
        }
    }

    // Coordinate validation
    const latField = form.querySelector('input[name="latitude"]');
    const lngField = form.querySelector('input[name="longitude"]');

    if (latField && lngField && (latField.value || lngField.value)) {
        const result = validateCoordinates(latField.value, lngField.value);
        if (!result.isValid) {
            isValid = false;
            if (result.errors[0]) {
                latField.classList.add('error');
                showFieldError(latField, result.errors[0]);
            }
            if (result.errors[1]) {
                lngField.classList.add('error');
                showFieldError(lngField, result.errors[1]);
            }
        }
    }

    return isValid;
}

/**
 * Initialize form validation
 */
function initializeFormValidation() {
    // Get all forms
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        // Add submit handler
        form.addEventListener('submit', (e) => {
            // Remove existing errors
            form.querySelectorAll('.error').forEach(field => {
                field.classList.remove('error');
            });
            form.querySelectorAll('.error-message').forEach(msg => {
                msg.remove();
            });

            // Validate form
            if (!validateForm(form)) {
                e.preventDefault();

                // Scroll to first error
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });

        // Add real-time validation to email fields
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            addFieldValidation(field, (value) => ({
                isValid: !value || validateEmail(value),
                message: 'Please enter a valid email address'
            }));
        });

        // Add real-time validation to password fields (only for registration)
        const isRegistrationForm = form.id === 'register-form';
        if (isRegistrationForm) {
            const passwordFields = form.querySelectorAll('input[name="password"]');
            passwordFields.forEach(field => {
                addFieldValidation(field, validatePassword);
            });
        }

        // Add real-time validation to confirm password
        const confirmPasswordField = form.querySelector('input[name="confirm-password"], input[name="confirmPassword"]');
        if (confirmPasswordField) {
            const passwordField = form.querySelector('input[name="password"]');
            if (passwordField) {
                confirmPasswordField.addEventListener('blur', () => {
                    if (confirmPasswordField.value !== passwordField.value) {
                        confirmPasswordField.classList.add('error');
                        showFieldError(confirmPasswordField, 'Passwords do not match');
                    }
                });
            }
        }

        // Add validation to file inputs
        const fileInputs = form.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const files = e.target.files;
                let hasError = false;

                Array.from(files).forEach(file => {
                    const result = validateFile(file);
                    if (!result.isValid) {
                        hasError = true;
                        input.classList.add('error');
                        showFieldError(input, result.message);
                    }
                });

                if (!hasError) {
                    input.classList.remove('error');
                    hideFieldError(input);
                }
            });
        });

        // Add validation to required fields on blur
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', () => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    showFieldError(field, 'This field is required');
                }
            });

            field.addEventListener('input', () => {
                if (field.value.trim()) {
                    field.classList.remove('error');
                    hideFieldError(field);
                }
            });
        });
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeFormValidation);

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validatePassword,
        validateRequired,
        validateCoordinates,
        validateURL,
        validateFile,
        validateForm,
        showFieldError,
        hideFieldError
    };
}
