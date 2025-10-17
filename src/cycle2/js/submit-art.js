/**
 * Submit Art Form - Bulletproof Version
 * Works even with CSS loading errors
 */

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeForm);
} else {
    initializeForm();
}

// Global variables
let currentStep = 1;
let mapInstance = null;
let mapMarker = null;
let selectedCoordinates = null;
let uploadedImages = [];

function initializeForm() {
    console.log('Initializing submit art form...');
    
    const form = document.getElementById('submit-art-form');
    if (!form) {
        console.error('Form not found!');
        return;
    }
    
    // Fix all buttons
    fixAllButtons();
    
    // Set up form submission
    form.addEventListener('submit', handleSubmit);
    
    // Set up other features
    setupTitleCounter();
    setupArtistRadios();
    setupImageUpload();
    
    // Show first step
    showStep(1);
}

function fixAllButtons() {
    console.log('Fixing all buttons...');
    
    // Remove ALL onclick attributes
    document.querySelectorAll('button').forEach(btn => {
        btn.removeAttribute('onclick');
    });
    
    // Add event listeners to all buttons in form-actions
    document.querySelectorAll('.form-actions button').forEach(button => {
        // Skip if already has listener
        if (button.hasAttribute('data-listener-added')) return;
        
        button.setAttribute('data-listener-added', 'true');
        
        if (button.type === 'submit') {
            // Submit button - form handles it
            console.log('Found submit button');
        } else if (button.classList.contains('btn-primary')) {
            // Next button
            console.log('Adding click handler to Next button:', button);
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Next button clicked!');
                goToNextStep();
            });
        } else if (button.classList.contains('btn-secondary')) {
            if (button.textContent.includes('Cancel')) {
                // Cancel button
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (confirm('Are you sure you want to cancel?')) {
                        window.location.href = 'dashboard.html';
                    }
                });
            } else {
                // Back button
                console.log('Adding click handler to Back button:', button);
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Back button clicked!');
                    goToPrevStep();
                });
            }
        }
    });
}

function showStep(step) {
    currentStep = step;
    console.log('Showing step:', step);
    
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    
    // Show current step
    const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
        currentStepElement.style.display = 'block';
    }
    
    // Update progress
    document.querySelectorAll('.progress-step').forEach((s, index) => {
        const stepNum = index + 1;
        s.classList.toggle('completed', stepNum < step);
        s.classList.toggle('active', stepNum === step);
    });
    
    // Initialize map if on step 2
    if (step === 2) {
        setTimeout(initMap, 100);
    }
    
    // Generate review if on step 5
    if (step === 5) {
        generateReview();
    }
    
    // Re-fix buttons for new step
    setTimeout(fixAllButtons, 50);
}

function goToNextStep() {
    console.log('Going to next step from:', currentStep);
    
    if (!validateCurrentStep()) {
        return;
    }
    
    if (currentStep < 5) {
        showStep(currentStep + 1);
    }
}

function goToPrevStep() {
    console.log('Going to previous step from:', currentStep);
    
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

function validateCurrentStep() {
    console.log('Validating step:', currentStep);
    
    // Clear errors
    document.querySelectorAll('.error-message').forEach(e => e.textContent = '');
    
    switch(currentStep) {
        case 1:
            return validateStep1();
        case 2:
            return validateStep2();
        case 3:
            return true; // Optional
        case 4:
            return true; // Optional
        case 5:
            return validateStep5();
    }
    return true;
}

function validateStep1() {
    let valid = true;
    
    const title = document.getElementById('art-title');
    if (!title || !title.value.trim()) {
        showError('title-error', 'Title is required');
        valid = false;
    }
    
    const description = document.getElementById('art-description');
    if (!description || !description.value.trim()) {
        showError('description-error', 'Description is required');
        valid = false;
    }
    
    const artType = document.getElementById('art-type');
    if (!artType || !artType.value) {
        showError('type-error', 'Please select an art type');
        valid = false;
    }
    
    const artPeriod = document.getElementById('art-period');
    if (!artPeriod || !artPeriod.value) {
        showError('period-error', 'Please select an art period');
        valid = false;
    }
    
    console.log('Step 1 validation:', valid);
    return valid;
}

function validateStep2() {
    const lat = document.getElementById('latitude');
    const lng = document.getElementById('longitude');
    
    if (!lat || !lng || !lat.value || !lng.value) {
        showError('location-error', 'Please click on the map to select a location');
        return false;
    }
    
    // Also check our coordinates variable
    if (!selectedCoordinates) {
        selectedCoordinates = {
            lat: lat.value,
            lng: lng.value
        };
    }
    
    return true;
}

function validateStep5() {
    const checks = ['permission-check', 'cultural-check', 'guidelines-check'];
    for (let id of checks) {
        const checkbox = document.getElementById(id);
        if (!checkbox || !checkbox.checked) {
            alert('Please check all agreement boxes');
            return false;
        }
    }
    return true;
}

function showError(id, message) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = message;
    }
}

function initMap() {
    if (mapInstance || !document.getElementById('submit-map')) {
        return;
    }
    
    console.log('Initializing map...');
    
    try {
        // Create map
        mapInstance = L.map('submit-map').setView([-25.2744, 133.7751], 4);
        
        // Add tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(mapInstance);
        
        // Handle clicks
        mapInstance.on('click', function(e) {
            // Remove old marker
            if (mapMarker) {
                mapInstance.removeLayer(mapMarker);
            }
            
            // Add new marker
            mapMarker = L.marker(e.latlng).addTo(mapInstance);
            
            // Store coordinates
            selectedCoordinates = {
                lat: e.latlng.lat.toFixed(6),
                lng: e.latlng.lng.toFixed(6)
            };
            
            // Update inputs
            document.getElementById('latitude').value = selectedCoordinates.lat;
            document.getElementById('longitude').value = selectedCoordinates.lng;
            
            // Clear error
            showError('location-error', '');
            
            console.log('Map clicked:', selectedCoordinates);
        });
        
    } catch (error) {
        console.error('Map error:', error);
    }
}

function setupTitleCounter() {
    const title = document.getElementById('art-title');
    const counter = document.getElementById('title-counter');
    
    if (title && counter) {
        title.addEventListener('input', function() {
            counter.textContent = `${this.value.length}/200`;
        });
    }
}

function setupArtistRadios() {
    document.querySelectorAll('input[name="artist_type"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('artist-self-fields').style.display = 'none';
            document.getElementById('artist-other-fields').style.display = 'none';
            
            if (this.value === 'self') {
                document.getElementById('artist-self-fields').style.display = 'block';
            } else if (this.value === 'other') {
                document.getElementById('artist-other-fields').style.display = 'block';
            }
        });
    });
}

function setupImageUpload() {
    const area = document.getElementById('upload-area');
    const input = document.getElementById('image-upload');
    
    if (!area || !input) return;
    
    area.addEventListener('click', () => input.click());
    
    area.addEventListener('dragover', (e) => {
        e.preventDefault();
        area.style.backgroundColor = '#f0f0f0';
    });
    
    area.addEventListener('dragleave', () => {
        area.style.backgroundColor = '';
    });
    
    area.addEventListener('drop', (e) => {
        e.preventDefault();
        area.style.backgroundColor = '';
        handleFiles(e.dataTransfer.files);
    });
    
    input.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
}

function handleFiles(files) {
    for (let file of files) {
        if (uploadedImages.length >= 6) {
            alert('Maximum 6 images allowed');
            break;
        }
        
        if (!file.type.match(/image\/(jpeg|png)/)) {
            alert('Only JPG and PNG allowed');
            continue;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            alert('File too large (max 5MB)');
            continue;
        }
        
        uploadedImages.push(file);
        showImagePreview(file);
    }
}

function showImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const container = document.getElementById('image-previews');
        const div = document.createElement('div');
        div.className = 'image-preview';
        div.innerHTML = `
            <img src="${e.target.result}" style="max-width: 100px; max-height: 100px;">
            <button type="button" onclick="removeImage(${uploadedImages.length - 1})">×</button>
        `;
        container.appendChild(div);
    };
    reader.readAsDataURL(file);
}

function removeImage(index) {
    uploadedImages.splice(index, 1);
    const container = document.getElementById('image-previews');
    container.innerHTML = '';
    uploadedImages.forEach(file => showImagePreview(file));
}

function generateReview() {
    const container = document.getElementById('review-summary');
    const form = document.getElementById('submit-art-form');
    
    let html = '<h3>Review Your Submission</h3>';
    
    // Art details
    html += '<p><strong>Title:</strong> ' + (form.title?.value || '') + '</p>';
    html += '<p><strong>Description:</strong> ' + (form.description?.value || '') + '</p>';
    
    const artType = form.art_type;
    if (artType && artType.selectedIndex >= 0) {
        html += '<p><strong>Type:</strong> ' + artType.options[artType.selectedIndex].text + '</p>';
    }
    
    const artPeriod = form.art_period;
    if (artPeriod && artPeriod.selectedIndex >= 0) {
        html += '<p><strong>Period:</strong> ' + artPeriod.options[artPeriod.selectedIndex].text + '</p>';
    }
    
    // Location
    if (selectedCoordinates || form.latitude?.value) {
        html += '<p><strong>Location:</strong> ' + 
                (form.latitude?.value || selectedCoordinates?.lat) + ', ' + 
                (form.longitude?.value || selectedCoordinates?.lng) + '</p>';
    }
    
    // Images
    html += '<p><strong>Images:</strong> ' + uploadedImages.length + ' uploaded</p>';
    
    container.innerHTML = html;
}

async function handleSubmit(e) {
    e.preventDefault();
    console.log('Form submitted!');
    
    if (!validateStep5()) {
        return;
    }
    
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Submitting...';
    
    try {
        const formData = new FormData();
        
        // Add form fields
        formData.append('title', form.title.value);
        formData.append('description', form.description.value);
        formData.append('art_type', form.art_type.value);
        formData.append('art_period', form.art_period.value);
        formData.append('condition', form.condition?.value || '');
        formData.append('latitude', form.latitude.value);
        formData.append('longitude', form.longitude.value);
        formData.append('location_description', form.location_description?.value || '');
        formData.append('culturally_sensitive', form.culturally_sensitive?.checked ? '1' : '0');
        
        // Artist info
        const artistType = document.querySelector('input[name="artist_type"]:checked')?.value || 'unknown';
        if (artistType === 'other') {
            formData.append('artist_name', form.artist_name?.value || '');
        } else {
            formData.append('artist_name', artistType === 'self' ? 'Self' : 'Unknown');
        }
        
        // Add images
        uploadedImages.forEach((img, i) => {
            formData.append(`images[${i}]`, img);
        });
        
        // Submit
        const response = await fetch('../cycle3/api/create-entry.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.text();
        console.log('Response:', result);
        
        const json = JSON.parse(result);
        if (json.success) {
            alert('Success! Art entry submitted.');
            window.location.href = 'dashboard.html';
        } else {
            throw new Error(json.message);
        }
        
    } catch (error) {
        alert('Error: ' + error.message);
        btn.disabled = false;
        btn.textContent = 'Submit for Review';
    }
}

// Make removeImage global
window.removeImage = removeImage;

// Debug info
console.log('Submit art script loaded');