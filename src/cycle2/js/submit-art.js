/**
 * Indigenous Art Atlas - Submit Art Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Since validation.js is not a module, we assume its functions are globally available
    // If it were a module, we would use: import { validateRequired, validateEmail, ... } from './validation.js';
    initSubmitForm();
});

/**
 * Initializes the multi-step submit art form.
 */
function initSubmitForm() {
    const submitForm = document.getElementById('submit-art-form');
    if (!submitForm) return;

    let currentStep = 1;
    const totalSteps = 5;

    const nextButtons = submitForm.querySelectorAll('.btn-primary[onclick^="nextStep"]');
    const prevButtons = submitForm.querySelectorAll('.btn-secondary[onclick^="prevStep"]');

    /**
     * Updates the progress bar and shows the current step.
     */
    function updateProgress() {
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.toggle('completed', stepNumber < currentStep);
            step.classList.toggle('active', stepNumber === currentStep);
        });

        document.querySelectorAll('.form-step').forEach((step, index) => {
            step.classList.toggle('active', index + 1 === currentStep);
        });

        if (currentStep === totalSteps) {
            generateReviewSummary();
        }

        validateCurrentStep(); // Validate the new step to enable/disable next button
    }

    /**
     * Moves to the next step if the current step is valid.
     * @param {number} step The step to move to.
     */
    function nextStep(step) {
        if (validateCurrentStep()) {
            currentStep = step;
            updateProgress();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    /**
     * Moves to the previous step.
     * @param {number} step The step to move to.
     */
    function prevStep(step) {
        currentStep = step;
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Remove onclick attributes and add event listeners
    nextButtons.forEach(btn => {
        const step = parseInt(btn.getAttribute('onclick').match(/\d+/)[0]);
        btn.removeAttribute('onclick');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            nextStep(step);
        });
    });

    prevButtons.forEach(btn => {
        const step = parseInt(btn.getAttribute('onclick').match(/\d+/)[0]);
        btn.removeAttribute('onclick');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            prevStep(step);
        });
    });

    /**
     * Validates the current step of the form.
     * @returns {boolean} True if the current step is valid, false otherwise.
     */
    function validateCurrentStep() {
        const currentFormStep = document.querySelector('.form-step.active');
        if (!currentFormStep) return true;

        const requiredFields = currentFormStep.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!validateRequired(field.value)) {
                isValid = false;
                showFieldError(field, 'This field is required');
            } else {
                hideFieldError(field);
            }
        });

        // Disable/enable next button
        const nextBtn = currentFormStep.querySelector('.btn-primary[onclick^="nextStep"]');
        if (nextBtn) {
            nextBtn.disabled = !isValid;
        }

        return isValid;
    }

    // Add real-time validation to all required fields
    submitForm.querySelectorAll('[required]').forEach(field => {
        field.addEventListener('input', validateCurrentStep);
    });

    // Image upload with drag and drop
    const uploadArea = document.getElementById('upload-area');
    const imageUpload = document.getElementById('image-upload');

    if (uploadArea && imageUpload) {
        uploadArea.addEventListener('click', () => imageUpload.click());

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => uploadArea.classList.add('hover'));
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('hover'));
        });

        uploadArea.addEventListener('drop', (e) => {
            imageUpload.files = e.dataTransfer.files;
            handleImageUpload({ target: imageUpload });
        });

        imageUpload.addEventListener('change', handleImageUpload);
    }

    updateProgress(); // Initial call to set up the form
}

/**
 * Handles the image upload event.
 * @param {Event} event The file input change event.
 */
function handleImageUpload(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('image-previews');

    if (!previewContainer) return;

    Array.from(files).forEach(file => {
        const validation = validateFile(file);
        if (!validation.isValid) {
            alert(validation.message);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const previewHtml = `
                <div class="image-preview">
                    <img src="${e.target.result}" alt="${file.name}">
                    <div class="image-preview-actions">
                        <button type="button" class="remove-image" title="Remove">×</button>
                    </div>
                </div>
            `;
            previewContainer.insertAdjacentHTML('beforeend', previewHtml);

            const removeBtn = previewContainer.lastElementChild.querySelector('.remove-image');
            removeBtn.addEventListener('click', function() {
                this.closest('.image-preview').remove();
            });
        };
        reader.readAsDataURL(file);
    });
}

/**
 * Generates a summary of the user's input on the review step.
 */
function generateReviewSummary() {
    const summaryContainer = document.getElementById('review-summary');
    if (!summaryContainer) return;

    const formData = new FormData(document.getElementById('submit-art-form'));
    let summaryHtml = '<ul>';

    for (let [key, value] of formData.entries()) {
        if (value && typeof value === 'string') {
            summaryHtml += `<li><strong>${key.replace(/_/g, ' ')}:</strong> ${value}</li>`;
        }
    }

    summaryHtml += '</ul>';
    summaryContainer.innerHTML = summaryHtml;
}

/**
 * Shows a success modal after the form is submitted.
 */
function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 3000);
    }
}