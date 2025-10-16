/**
 * Multi-Step Form Navigation
 * For Submit Art Entry Form
 */

let currentStep = 1;
const totalSteps = 5;

/**
 * Move to next step
 * @param {number} step - Step number to move to
 */
function nextStep(step) {
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
        return;
    }

    // Hide current step
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (currentStepElement) {
        currentStepElement.classList.remove('active');
    }

    // Update progress indicator
    const currentProgressStep = document.querySelector(`.progress-step[data-step="${currentStep}"]`);
    if (currentProgressStep) {
        currentProgressStep.classList.add('completed');
        currentProgressStep.classList.remove('active');
    }

    // Show next step
    const nextStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
    if (nextStepElement) {
        nextStepElement.classList.add('active');
    }

    // Update progress indicator
    const nextProgressStep = document.querySelector(`.progress-step[data-step="${step}"]`);
    if (nextProgressStep) {
        nextProgressStep.classList.add('active');
    }

    // Update current step
    currentStep = step;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Move to previous step
 * @param {number} step - Step number to move to
 */
function prevStep(step) {
    // Hide current step
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (currentStepElement) {
        currentStepElement.classList.remove('active');
    }

    // Update progress indicator
    const currentProgressStep = document.querySelector(`.progress-step[data-step="${currentStep}"]`);
    if (currentProgressStep) {
        currentProgressStep.classList.remove('active');
    }

    // Show previous step
    const prevStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
    if (prevStepElement) {
        prevStepElement.classList.add('active');
    }

    // Update progress indicator
    const prevProgressStep = document.querySelector(`.progress-step[data-step="${step}"]`);
    if (prevProgressStep) {
        prevProgressStep.classList.add('active');
        prevProgressStep.classList.remove('completed');
    }

    // Update current step
    currentStep = step;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Validate current step
 * @param {number} step - Step number to validate
 * @returns {boolean} - Whether the step is valid
 */
function validateStep(step) {
    let isValid = true;
    const stepElement = document.querySelector(`.form-step[data-step="${step}"]`);

    if (!stepElement) return true;

    // Get all required fields in current step
    const requiredFields = stepElement.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        // Clear previous errors
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }

        // Check if field is empty
        if (!field.value || field.value.trim() === '') {
            isValid = false;
            
            // Show error message
            if (errorElement) {
                errorElement.textContent = 'This field is required';
                errorElement.style.display = 'block';
            }

            // Highlight field
            field.style.borderColor = '#ef4444';
        } else {
            // Clear error styling
            field.style.borderColor = '';
        }
    });

    // Step-specific validations
    if (step === 2) {
        // Validate location is selected
        const latitude = document.getElementById('latitude');
        const longitude = document.getElementById('longitude');

        if (!latitude.value || !longitude.value) {
            isValid = false;
            const locationError = document.getElementById('location-error');
            if (locationError) {
                locationError.textContent = 'Please select a location on the map';
                locationError.style.display = 'block';
                locationError.style.color = '#ef4444';
            }
        }
    }

    if (!isValid) {
        // Scroll to first error
        const firstError = stepElement.querySelector('.error-message:not(:empty), input[style*="border-color: rgb(239, 68, 68)"]');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    return isValid;
}

/**
 * Initialize form on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Ensure first step is active
    currentStep = 1;
    
    const firstStep = document.querySelector('.form-step[data-step="1"]');
    if (firstStep) {
        firstStep.classList.add('active');
    }

    const firstProgressStep = document.querySelector('.progress-step[data-step="1"]');
    if (firstProgressStep) {
        firstProgressStep.classList.add('active');
    }

    // Handle form submission
    const submitForm = document.getElementById('submit-art-form');
    if (submitForm) {
        submitForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validate all steps
            let allValid = true;
            for (let i = 1; i <= totalSteps; i++) {
                if (!validateStep(i)) {
                    allValid = false;
                    // Go to first invalid step
                    nextStep(i);
                    return;
                }
            }

            if (!allValid) {
                alert('Please fill in all required fields');
                return;
            }

            // Collect form data
            const formData = new FormData(submitForm);
            const data = Object.fromEntries(formData.entries());

            // Show loading state
            const submitButton = submitForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            try {
                // Submit to API
                const result = await API.createEntry(data);

                if (result.success) {
                    alert('Art entry submitted successfully! It will be reviewed by our admin team.');
                    window.location.href = 'dashboard.html';
                } else {
                    alert(result.message || 'Failed to submit entry. Please try again.');
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }
            } catch (error) {
                console.error('Submission error:', error);
                alert('An error occurred. Please try again.');
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }
});