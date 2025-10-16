/**
 * Indigenous Art Atlas - Main JavaScript
 * Cycle 2: Frontend Prototype
 * COMP9030 Assignment
 *
 * This file handles:
 * - Mobile navigation menu
 * - Back to top button
 * - Featured art grid rendering
 * - Art card click handlers
 * - Smooth scroll behavior
 * - Dynamic content loading
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initBackToTop();
    initFeaturedArt();
    initBrowseFilters();
    initArtDetail();
    initSubmitForm();
    initAuthForms();
    initDashboard();
});

/**
 * Mobile Navigation Menu
 * Handles the hamburger menu toggle for mobile devices
 */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');

            // Update aria-expanded for accessibility
            const isExpanded = mainNav.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/**
 * Back to Top Button
 * Shows/hides button based on scroll position
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        // Show/hide button on scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Featured Art Grid
 * Renders recent art entries on the homepage
 */
async function initFeaturedArt() {
    const featuredArtGrid = document.getElementById('featured-art-grid');

    if (featuredArtGrid && typeof getRecentArt === 'function') {
        // Show loading state
        featuredArtGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Loading art entries...</p>';

        // Fetch from backend API
        const recentArt = await getRecentArt(6);

        if (recentArt.length > 0) {
            featuredArtGrid.innerHTML = recentArt.map(art => createArtCard(art)).join('');

            // Update total entries count
            const totalEntriesEl = document.getElementById('total-entries');
            if (totalEntriesEl) {
                const allArt = await getAllApprovedArt();
                animateCounter(totalEntriesEl, allArt.length);
            }

            // Add click handlers to cards
            addArtCardClickHandlers();
        } else {
            featuredArtGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No art entries found. Be the first to submit!</p>';
        }
    }
}

/**
 * Create HTML for an art card
 * @param {Object} art - Art entry object
 * @returns {string} HTML string for the art card
 */
function createArtCard(art) {
    const locationIcon = art.isSensitive ? '⚠️' : '📍';
    const primaryImage = art.images[art.primaryImageIndex] || art.images[0];

    return `
        <div class="art-card" data-art-id="${art.id}">
            <img src="${primaryImage}" alt="${art.title}" class="art-card-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23f5f5dc%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2220%22 fill=%22%23666%22%3EImage Not Available%3C/text%3E%3C/svg%3E'">
            <div class="art-card-content">
                <h3>${art.title}</h3>
                <div class="art-card-badges">
                    <span class="badge badge-type">${art.artType}</span>
                    <span class="badge badge-period">${art.period}</span>
                </div>
                <p class="art-card-description">${truncateText(art.description, 150)}</p>
                <p class="art-card-location">${locationIcon} ${art.locationDescription}</p>
            </div>
        </div>
    `;
}

/**
 * Add click handlers to art cards
 */
function addArtCardClickHandlers() {
    const artCards = document.querySelectorAll('.art-card');
    artCards.forEach(card => {
        card.addEventListener('click', function() {
            const artId = this.getAttribute('data-art-id');
            window.location.href = `art-detail.html?id=${artId}`;
        });

        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
function truncateText(text, length) {
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + '...';
}

/**
 * Animate counter from 0 to target value
 * @param {HTMLElement} element - Element to animate
 * @param {number} target - Target number
 */
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

/**
 * Browse Page Filters
 * Handles filtering and searching on the browse page
 */
async function initBrowseFilters() {
    const artGrid = document.querySelector('.browse-section .art-grid');

    if (!artGrid) return;

    // Show loading state
    artGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Loading art entries...</p>';

    // Initialize with all art from backend
    if (typeof getAllApprovedArt === 'function') {
        const allArt = await getAllApprovedArt();
        renderBrowseArt(allArt);
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            applyFilters();
        }, 300));
    }

    // Filter checkboxes
    const filterCheckboxes = document.querySelectorAll('.checkbox-label input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }

    // Clear filters button
    const clearFiltersBtn = document.querySelector('.btn-clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            // Clear search
            if (searchInput) searchInput.value = '';

            // Uncheck all checkboxes
            filterCheckboxes.forEach(checkbox => checkbox.checked = false);

            // Reset sort
            if (sortSelect) sortSelect.value = 'recent';

            // Reapply filters (which will show all)
            applyFilters();
        });
    }
}

/**
 * Apply all active filters
 */
function applyFilters() {
    if (typeof mockArtEntries === 'undefined') return;

    let filteredArt = [...mockArtEntries].filter(art => art.status === 'approved');

    // Apply search filter
    const searchInput = document.getElementById('search-input');
    if (searchInput && searchInput.value.trim()) {
        const searchTerm = searchInput.value.trim().toLowerCase();
        filteredArt = filteredArt.filter(art =>
            art.title.toLowerCase().includes(searchTerm) ||
            art.description.toLowerCase().includes(searchTerm) ||
            art.artistName.toLowerCase().includes(searchTerm) ||
            art.locationDescription.toLowerCase().includes(searchTerm)
        );
    }

    // Apply type filters
    const typeCheckboxes = document.querySelectorAll('input[name="artType"]:checked');
    if (typeCheckboxes.length > 0) {
        const selectedTypes = Array.from(typeCheckboxes).map(cb => cb.value);
        filteredArt = filteredArt.filter(art => selectedTypes.includes(art.artType));
    }

    // Apply period filters
    const periodCheckboxes = document.querySelectorAll('input[name="period"]:checked');
    if (periodCheckboxes.length > 0) {
        const selectedPeriods = Array.from(periodCheckboxes).map(cb => cb.value);
        filteredArt = filteredArt.filter(art => selectedPeriods.includes(art.period));
    }

    // Apply sensitivity filter
    const sensitivityCheckboxes = document.querySelectorAll('input[name="sensitivity"]:checked');
    if (sensitivityCheckboxes.length > 0) {
        const showProtected = Array.from(sensitivityCheckboxes).some(cb => cb.value === 'protected');
        const showPublic = Array.from(sensitivityCheckboxes).some(cb => cb.value === 'public');

        if (showProtected && !showPublic) {
            filteredArt = filteredArt.filter(art => art.isSensitive);
        } else if (showPublic && !showProtected) {
            filteredArt = filteredArt.filter(art => !art.isSensitive);
        }
    }

    // Apply sorting
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        const sortValue = sortSelect.value;
        switch (sortValue) {
            case 'recent':
                filteredArt.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
                break;
            case 'popular':
                filteredArt.sort((a, b) => b.views - a.views);
                break;
            case 'title':
                filteredArt.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }
    }

    renderBrowseArt(filteredArt);
}

/**
 * Render art entries in browse grid
 * @param {Array} artEntries - Array of art entries to display
 */
function renderBrowseArt(artEntries) {
    const artGrid = document.querySelector('.browse-section .art-grid');
    const resultsInfo = document.querySelector('.results-info');

    if (!artGrid) return;

    // Update results count
    if (resultsInfo) {
        const count = artEntries.length;
        resultsInfo.textContent = `${count} ${count === 1 ? 'result' : 'results'} found`;
    }

    if (artEntries.length === 0) {
        artGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1;">
                <h3>No art entries found</h3>
                <p>Try adjusting your filters or search terms.</p>
            </div>
        `;
        return;
    }

    artGrid.innerHTML = artEntries.map(art => createArtCard(art)).join('');
    addArtCardClickHandlers();
}

/**
 * Debounce function for search input
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Art Detail Page
 * Handles image gallery and lightbox functionality
 */
async function initArtDetail() {
    // Check if we're on the art detail page
    const artDetailSection = document.querySelector('.art-detail-section');
    if (!artDetailSection) return;

    // Get art ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const artId = urlParams.get('id');

    if (!artId || typeof getArtEntryById !== 'function') {
        document.querySelector('.art-detail-layout').innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem;">
                <h2>Art entry not found</h2>
                <p>The requested art entry could not be found.</p>
                <a href="browse.html" class="btn btn-primary">Browse All Art</a>
            </div>
        `;
        return;
    }

    // Show loading state
    document.querySelector('.art-detail-layout').innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Loading art details...</p>';

    // Fetch art from backend
    const art = await getArtEntryById(artId);

    if (!art) {
        document.querySelector('.art-detail-layout').innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem;">
                <h2>Art entry not found</h2>
                <p>The requested art entry could not be found.</p>
                <a href="browse.html" class="btn btn-primary">Browse All Art</a>
            </div>
        `;
        return;
    }

    // Initialize image gallery
    initImageGallery(art.images);

    // Initialize lightbox
    initLightbox(art.images);
}

/**
 * Initialize image gallery with navigation
 * @param {Array} images - Array of image URLs
 */
function initImageGallery(images) {
    let currentImageIndex = 0;

    const mainImage = document.querySelector('.main-image');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    const counter = document.querySelector('.image-counter');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (!mainImage || images.length === 0) return;

    function updateGallery() {
        mainImage.src = images[currentImageIndex];
        if (counter) {
            counter.textContent = `${currentImageIndex + 1} / ${images.length}`;
        }

        // Update thumbnail active state
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex);
        });

        // Show/hide navigation buttons
        if (prevBtn) prevBtn.style.display = images.length > 1 ? 'block' : 'none';
        if (nextBtn) nextBtn.style.display = images.length > 1 ? 'block' : 'none';
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateGallery();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateGallery();
        });
    }

    // Thumbnail click handlers
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentImageIndex = index;
            updateGallery();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && prevBtn) {
            prevBtn.click();
        } else if (e.key === 'ArrowRight' && nextBtn) {
            nextBtn.click();
        }
    });

    updateGallery();
}

/**
 * Initialize lightbox for full-screen image viewing
 * @param {Array} images - Array of image URLs
 */
function initLightbox(images) {
    const mainImage = document.querySelector('.main-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (!mainImage || !lightbox) return;

    let lightboxIndex = 0;

    mainImage.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImage.src = images[lightboxIndex];
        document.body.style.overflow = 'hidden';
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Submit Art Form
 * Multi-step form with validation and map interaction
 */
function initSubmitForm() {
    const submitForm = document.getElementById('submit-art-form');
    if (!submitForm) return;

    let currentStep = 1;
    const totalSteps = 4;

    // Update progress indicator
    function updateProgress() {
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            const stepNumber = index + 1;
            if (stepNumber < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (stepNumber === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // Show current form step
        document.querySelectorAll('.form-step').forEach((step, index) => {
            step.classList.toggle('active', index + 1 === currentStep);
        });
    }

    // Navigation buttons
    const nextBtns = document.querySelectorAll('.btn-next-step');
    const prevBtns = document.querySelectorAll('.btn-prev-step');

    nextBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (validateCurrentStep()) {
                currentStep = Math.min(currentStep + 1, totalSteps);
                updateProgress();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentStep = Math.max(currentStep - 1, 1);
            updateProgress();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Form submission
    submitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateCurrentStep()) {
            showSuccessModal();
        }
    });

    // Image upload preview
    const imageUpload = document.getElementById('image-upload');
    if (imageUpload) {
        imageUpload.addEventListener('change', handleImageUpload);
    }

    // Make upload area clickable
    const uploadArea = document.getElementById('upload-area');
    if (uploadArea && imageUpload) {
        uploadArea.addEventListener('click', () => {
            imageUpload.click();
        });
        
        // Drag and drop functionality
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary)';
            uploadArea.style.backgroundColor = 'var(--primary-light)';
        });
        
        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '';
            uploadArea.style.backgroundColor = '';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '';
            uploadArea.style.backgroundColor = '';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                imageUpload.files = files;
                handleImageUpload({ target: { files: files } });
            }
        });
    }

    // Sensitivity toggle
    const sensitivityRadios = document.querySelectorAll('input[name="sensitivity"]');
    const exactLocationFields = document.querySelector('.exact-location-fields');

    sensitivityRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (exactLocationFields) {
                exactLocationFields.style.display = radio.value === 'public' ? 'block' : 'none';
            }
        });
    });

    updateProgress();
}

/**
 * Validate current form step
 * @returns {boolean} True if validation passes
 */
function validateCurrentStep() {
    const currentFormStep = document.querySelector('.form-step.active');
    if (!currentFormStep) return true;

    const requiredFields = currentFormStep.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            showFieldError(field, 'This field is required');
        } else {
            field.classList.remove('error');
            hideFieldError(field);
        }
    });

    return isValid;
}

/**
 * Show error message for a field
 * @param {HTMLElement} field - Form field element
 * @param {string} message - Error message
 */
function showFieldError(field, message) {
    let errorEl = field.parentElement.querySelector('.error-message');
    if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'error-message';
        field.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
}

/**
 * Hide error message for a field
 * @param {HTMLElement} field - Form field element
 */
function hideFieldError(field) {
    const errorEl = field.parentElement.querySelector('.error-message');
    if (errorEl) {
        errorEl.remove();
    }
}

/**
 * Handle image upload and preview
 * @param {Event} event - Change event
 */
function handleImageUpload(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('image-previews');

    if (!previewContainer) return;

    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewHtml = `
                    <div class="image-preview">
                        <img src="${e.target.result}" alt="Preview">
                        <div class="image-preview-actions">
                            <button type="button" class="remove-image" title="Remove">×</button>
                        </div>
                    </div>
                `;
                previewContainer.insertAdjacentHTML('beforeend', previewHtml);

                // Add remove handler
                const removeBtn = previewContainer.lastElementChild.querySelector('.remove-image');
                removeBtn.addEventListener('click', function() {
                    this.closest('.image-preview').remove();
                });
            };
            reader.readAsDataURL(file);
        }
    });
}

/**
 * Show success modal after form submission
 */
function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 3000);
    }
}

/**
 * Authentication Forms
 * Login and registration form validation
 */
function initAuthForms() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Logging in...';

            // Call backend API
            const result = await API.login(username, password);

            if (result.success) {
                window.location.href = 'dashboard.html';
            } else {
                alert(result.message || 'Login failed. Please check your credentials.');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    // Registration form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        // Password strength indicator
        const passwordInput = document.getElementById('password');
        const passwordStrength = document.querySelector('.password-strength');

        if (passwordInput && passwordStrength) {
            passwordInput.addEventListener('input', () => {
                const strength = calculatePasswordStrength(passwordInput.value);
                passwordStrength.className = 'password-strength ' + strength;
            });
        }

        // Form submission
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate passwords match
            const password = document.getElementById('reg-password');
            const confirmPassword = document.getElementById('confirm-password');

            if (password && confirmPassword && password.value !== confirmPassword.value) {
                showFieldError(confirmPassword, 'Passwords do not match');
                return;
            }

            const userData = {
                username: document.getElementById('reg-username').value,
                email: document.getElementById('reg-email').value,
                password: password.value,
                full_name: document.getElementById('reg-username').value,
                user_role: document.querySelector('input[name="role"]:checked')?.value || 'artist'
            };

            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Registering...';

            // Call backend API
            const result = await API.register(userData);

            if (result.success) {
                window.location.href = 'dashboard.html';
            } else {
                alert(result.message || 'Registration failed. Please try again.');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
}

/**
 * Calculate password strength
 * @param {string} password - Password to check
 * @returns {string} Strength level: 'weak', 'medium', or 'strong'
 */
function calculatePasswordStrength(password) {
    if (password.length < 6) return 'weak';

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 1) return 'weak';
    if (strength <= 3) return 'medium';
    return 'strong';
}

/**
 * Dashboard
 * User dashboard with tabs
 */
function initDashboard() {
    const dashboardSection = document.querySelector('.dashboard-section');
    if (!dashboardSection) return;

    // Check if user is logged in (simulated)
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');

            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding tab content
            tabContents.forEach(content => {
                if (content.id === tabName + '-tab') {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });

    // Logout functionality
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            // Call backend logout API
            await API.logout();

            // Redirect to homepage
            window.location.href = 'index.html';
        });
    }
}