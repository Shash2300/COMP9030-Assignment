/**
 * Indigenous Art Atlas - Art Detail Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const artId = urlParams.get('id');

    if (artId) {
        loadArtDetail(artId);
    } else {
        showArtNotFound();
    }
});

/**
 * Loads and displays the details for a specific art entry.
 * @param {string} artId The ID of the art entry to load.
 */
async function loadArtDetail(artId) {
    const container = document.querySelector('.art-detail-layout');
    if (!container) return;

    // Show skeleton loader
    container.innerHTML = createArtDetailSkeleton();

    // Fetch art data
    if (typeof getArtEntryById !== 'function') {
        console.error('Mock data not loaded');
        showArtNotFound();
        return;
    }

    const art = await getArtEntryById(artId);

    if (!art) {
        showArtNotFound();
        return;
    }

    // Update page title
    document.title = `${art.title} - Indigenous Art Atlas`;

    // Populate the page with the art data
    container.innerHTML = createArtDetailHtml(art);

    // Initialize map and gallery
    if (typeof initializeDetailMap === 'function') {
        initializeDetailMap(art.latitude, art.longitude, art.isSensitive);
    }
    if (art.images && art.images.length > 0) {
        initializeGallery(art.images, art.title);
    }

    // Load related art
    loadRelatedArt(art);

    // Increment view count (simulation)
    art.views++;
}

/**
 * Generates the HTML for the art detail skeleton loader.
 * @returns {string} The HTML for the skeleton loader.
 */
function createArtDetailSkeleton() {
    return `
        <main class="art-detail-main art-detail-skeleton">
            <div class="skeleton-image" style="height: 400px;"></div>
            <div class="skeleton-content">
                <div class="skeleton-title"></div>
                <div class="skeleton-badges"></div>
                <div class="skeleton-desc"></div>
            </div>
        </main>
        <aside class="art-detail-sidebar">
            <div class="skeleton-sidebar"></div>
        </aside>
    `;
}

/**
 * Generates the HTML for the art detail page.
 * @param {object} art The art entry object.
 * @returns {string} The HTML for the art detail page.
 */
function createArtDetailHtml(art) {
    return `
        <main class="art-detail-main">
            <div class="image-gallery">
                <div class="gallery-main">
                    <img id="main-image" src="${art.images[0]}" alt="${art.title}" class="main-image">
                    <button class="gallery-nav prev" id="prev-image" aria-label="Previous image">‹</button>
                    <button class="gallery-nav next" id="next-image" aria-label="Next image">›</button>
                    <div class="image-counter" id="image-counter">1 / ${art.images.length}</div>
                </div>
                <div class="gallery-thumbnails" id="gallery-thumbnails"></div>
            </div>
            <div class="art-info">
                <h1 id="art-title">${art.title}</h1>
                <div class="art-badges" id="art-badges">
                    <span class="badge badge-type">${art.artType}</span>
                    <span class="badge badge-period">${art.period}</span>
                    ${art.isSensitive ? '<span class="badge" style="background: var(--warning-color); color: white;">Protected Location</span>' : ''}
                </div>
                <div class="info-section">
                    <h2>Description</h2>
                    <p id="art-description">${art.description}</p>
                </div>
                <div class="info-section" id="condition-section" style="display: ${art.condition ? 'block' : 'none'};">
                    <h2>Condition Notes</h2>
                    <p id="art-condition">${art.condition || ''}</p>
                </div>
                <div class="info-section" id="artist-section">
                    <h2>Artist Information</h2>
                    <p id="artist-info">${art.artistName || 'Unknown'}</p>
                </div>
            </div>
        </main>
        <aside class="art-detail-sidebar">
            <div class="sidebar-card">
                <h3>Location</h3>
                <div id="detail-map" class="detail-map"></div>
                <p id="location-description" class="location-description">${art.isSensitive ? '⚠️' : '📍'} <strong>${art.locationDescription}</strong></p>
                <div id="sensitivity-notice" class="sensitivity-notice" style="display: ${art.isSensitive ? 'block' : 'none'};">
                    <strong>⚠️ Protected Location</strong>
                    <p>This location is culturally sensitive. The map shows a general area only.</p>
                </div>
            </div>
            <div class="sidebar-card metadata-card">
                <h3>Details</h3>
                <dl class="metadata-list">
                    <dt>Art Type:</dt><dd id="meta-type">${art.artType}</dd>
                    <dt>Period:</dt><dd id="meta-period">${art.period}</dd>
                    <dt>Artist:</dt><dd id="meta-artist">${art.artistName}</dd>
                    <dt>Submitted By:</dt><dd id="meta-submitter">${art.submittedBy}</dd>
                    <dt>Date Added:</dt><dd id="meta-date">${formatDate(art.submissionDate)}</dd>
                    <dt>Views:</dt><dd id="meta-views">${art.views}</dd>
                </dl>
            </div>
            <div class="sidebar-card actions-card">
                <h3>Actions</h3>
                <button class="btn btn-secondary btn-block" id="report-content-btn" onclick="showReportModal()">Report Content</button>
                <a href="browse.html" class="btn btn-outline btn-block">Back to Browse</a>
            </div>
        </aside>
    `;
}

/**
 * Displays a "not found" message on the page.
 */
function showArtNotFound() {
    const container = document.querySelector('.art-detail-layout');
    if (container) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem;">
                <h2>Art Entry Not Found</h2>
                <p>The requested art entry could not be found.</p>
                <a href="browse.html" class="btn btn-primary">Browse All Art</a>
            </div>
        `;
    }
}

/**
 * Formats a date string for display.
 * @param {string} dateString The date string to format.
 * @returns {string} The formatted date string.
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Initializes the image gallery.
 * @param {string[]} images An array of image URLs.
 * @param {string} title The title of the art entry.
 */
function initializeGallery(images, title) {
    let currentIndex = 0;

    const mainImage = document.getElementById('main-image');
    const prevBtn = document.getElementById('prev-image');
    const nextBtn = document.getElementById('next-image');
    const counter = document.getElementById('image-counter');
    const thumbnailsContainer = document.getElementById('gallery-thumbnails');

    if (!mainImage || images.length === 0) return;

    if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = images.map((img, index) =>
            `<img src="${img}" alt="${title} - Image ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">`
        ).join('');

        thumbnailsContainer.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                currentIndex = index;
                updateGallery();
            });
        });
    }

    function updateGallery() {
        mainImage.src = images[currentIndex];
        mainImage.alt = `${title} - Image ${currentIndex + 1} of ${images.length}`;

        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${images.length}`;
        }

        if (thumbnailsContainer) {
            thumbnailsContainer.querySelectorAll('.thumbnail').forEach((thumb, index) => {
                thumb.classList.toggle('active', index === currentIndex);
            });
        }

        if (prevBtn) prevBtn.style.display = images.length > 1 ? 'block' : 'none';
        if (nextBtn) nextBtn.style.display = images.length > 1 ? 'block' : 'none';
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateGallery();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateGallery();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && prevBtn) {
            prevBtn.click();
        } else if (e.key === 'ArrowRight' && nextBtn) {
            nextBtn.click();
        }
    });

    initializeLightbox(images, title);

    updateGallery();
}

/**
 * Initializes the lightbox for full-screen image viewing.
 * @param {string[]} images An array of image URLs.
 * @param {string} title The title of the art entry.
 */
function initializeLightbox(images, title) {
    let currentLightboxIndex = 0;

    const mainImage = document.getElementById('main-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCounter = document.getElementById('lightbox-counter');

    if (!lightbox || !mainImage) return;

    mainImage.addEventListener('click', () => {
        openLightbox(0);
    });

    function openLightbox(index) {
        currentLightboxIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateLightbox() {
        if (lightboxImage) {
            lightboxImage.src = images[currentLightboxIndex];
            lightboxImage.alt = `${title} - Image ${currentLightboxIndex + 1} of ${images.length}`;
        }
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${images.length}`;
        }
        if (lightboxPrev) lightboxPrev.style.display = images.length > 1 ? 'block' : 'none';
        if (lightboxNext) lightboxNext.style.display = images.length > 1 ? 'block' : 'none';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentLightboxIndex = (currentLightboxIndex - 1 + images.length) % images.length;
            updateLightbox();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentLightboxIndex = (currentLightboxIndex + 1) % images.length;
            updateLightbox();
        });
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft' && lightboxPrev) {
            lightboxPrev.click();
        } else if (e.key === 'ArrowRight' && lightboxNext) {
            lightboxNext.click();
        }
    });
}

/**
 * Loads and displays related art entries.
 * @param {object} currentArt The current art entry object.
 */
function loadRelatedArt(currentArt) {
    if (typeof mockArtEntries === 'undefined') return;

    const relatedGrid = document.getElementById('related-art-grid');
    if (!relatedGrid) return;

    const related = mockArtEntries
        .filter(art =>
            art.id !== currentArt.id &&
            art.status === 'approved' &&
            (art.artTypeId === currentArt.artTypeId || art.periodId === currentArt.periodId)
        )
        .slice(0, 3);

    if (related.length === 0) {
        relatedGrid.innerHTML = '<p>No related art found.</p>';
        return;
    }

    if (typeof createArtCard === 'function') {
        relatedGrid.innerHTML = related.map(art => createArtCard(art)).join('');
        addArtCardClickHandlers();
    }
}

/**
 * Creates the HTML for an art card.
 * @param {object} art The art entry object.
 * @returns {string} The HTML for the art card.
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
 * Adds click handlers to art cards.
 */
function addArtCardClickHandlers() {
    const artCards = document.querySelectorAll('.art-card');
    artCards.forEach(card => {
        card.addEventListener('click', function() {
            const artId = this.getAttribute('data-art-id');
            window.location.href = `art-detail.html?id=${artId}`;
        });

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
 * Truncates text to a specified length.
 * @param {string} text The text to truncate.
 * @param {number} length The maximum length of the text.
 * @returns {string} The truncated text.
 */
function truncateText(text, length) {
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + '...';
}

/**
 * Show report content modal
 */
function showReportModal() {
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem('userLoggedIn');

    if (!userLoggedIn) {
        alert('Please login to report content');
        window.location.href = 'login.html';
        return;
    }

    // Create modal HTML
    const modalHtml = `
        <div id="report-modal" class="modal active" style="display: flex;">
            <div class="modal-content">
                <button class="modal-close" onclick="closeReportModal()">&times;</button>
                <h2>Report Content</h2>
                <p>Help us maintain a respectful and accurate platform by reporting inappropriate or inaccurate content.</p>

                <form id="report-form">
                    <div class="form-group">
                        <label for="report-reason">Reason for Report <span class="required">*</span></label>
                        <select id="report-reason" name="reason" required class="form-control">
                            <option value="">-- Select a reason --</option>
                            <option value="inappropriate">Inappropriate Content</option>
                            <option value="inaccurate">Inaccurate Information</option>
                            <option value="cultural">Cultural Sensitivity Concerns</option>
                            <option value="duplicate">Duplicate Entry</option>
                            <option value="copyright">Copyright Violation</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="report-details">Additional Details <span class="required">*</span></label>
                        <textarea id="report-details" name="details" required rows="4" class="form-control" placeholder="Please provide specific details about your concern..."></textarea>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeReportModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Submit Report</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Handle form submission
    document.getElementById('report-form').addEventListener('submit', handleReportSubmit);
}

/**
 * Close report modal
 */
function closeReportModal() {
    const modal = document.getElementById('report-modal');
    if (modal) {
        modal.remove();
    }
}

/**
 * Handle report form submission
 */
async function handleReportSubmit(e) {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const entryId = urlParams.get('id');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    const formData = new FormData(e.target);
    const data = {
        entry_id: entryId,
        user_id: userData.user_id,
        reason: formData.get('reason'),
        details: formData.get('details')
    };

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
        const response = await fetch('../cycle3/api/report-content.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert('Thank you for your report. Our moderators will review it shortly.');
            closeReportModal();
        } else {
            alert(result.message || 'Failed to submit report');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    } catch (error) {
        console.error('Error submitting report:', error);
        alert('An error occurred while submitting your report');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}
