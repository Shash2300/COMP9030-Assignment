/**
 * Indigenous Art Atlas - Image Gallery and Art Detail
 * Cycle 2: Frontend Prototype
 * COMP9030 Assignment
 *
 * This file handles:
 * - Loading art detail page content
 * - Image gallery navigation
 * - Lightbox functionality
 * - Related art display
 */

/**
 * Load and display art detail
 * @param {number} artId - ID of the art entry to display
 */
function loadArtDetail(artId) {
    if (typeof getArtEntryById !== 'function') {
        console.error('Mock data not loaded');
        return;
    }

    const art = getArtEntryById(artId);

    if (!art) {
        showArtNotFound();
        return;
    }

    // Update page title
    document.title = `${art.title} - Indigenous Art Atlas`;

    // Update main content
    updateArtTitle(art);
    updateArtBadges(art);
    updateArtDescription(art);
    updateArtCondition(art);
    updateArtistInfo(art);

    // Update sidebar
    updateLocationInfo(art);
    updateMetadata(art);

    // Initialize gallery
    if (art.images && art.images.length > 0) {
        initializeGallery(art.images, art.title);
    }

    // Load related art
    loadRelatedArt(art);

    // Increment view count (in real app, this would be server-side)
    art.views++;
}

/**
 * Show art not found message
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
 * Update art title
 * @param {Object} art - Art entry object
 */
function updateArtTitle(art) {
    const titleEl = document.getElementById('art-title');
    if (titleEl) {
        titleEl.textContent = art.title;
    }
}

/**
 * Update art badges (type and period)
 * @param {Object} art - Art entry object
 */
function updateArtBadges(art) {
    const badgesEl = document.getElementById('art-badges');
    if (badgesEl) {
        badgesEl.innerHTML = `
            <span class="badge badge-type">${art.artType}</span>
            <span class="badge badge-period">${art.period}</span>
            ${art.isSensitive ? '<span class="badge" style="background: var(--warning-color); color: white;">Protected Location</span>' : ''}
        `;
    }
}

/**
 * Update art description
 * @param {Object} art - Art entry object
 */
function updateArtDescription(art) {
    const descEl = document.getElementById('art-description');
    if (descEl) {
        descEl.textContent = art.description;
    }
}

/**
 * Update condition notes
 * @param {Object} art - Art entry object
 */
function updateArtCondition(art) {
    const conditionEl = document.getElementById('art-condition');
    const conditionSection = document.getElementById('condition-section');

    if (art.condition) {
        if (conditionEl) conditionEl.textContent = art.condition;
        if (conditionSection) conditionSection.style.display = 'block';
    } else {
        if (conditionSection) conditionSection.style.display = 'none';
    }
}

/**
 * Update artist information
 * @param {Object} art - Art entry object
 */
function updateArtistInfo(art) {
    const artistInfoEl = document.getElementById('artist-info');
    if (artistInfoEl) {
        artistInfoEl.textContent = art.artistName || 'Unknown';
    }
}

/**
 * Update location information and map
 * @param {Object} art - Art entry object
 */
function updateLocationInfo(art) {
    const locationDescEl = document.getElementById('location-description');
    const sensitivityNotice = document.getElementById('sensitivity-notice');

    if (locationDescEl) {
        const locationIcon = art.isSensitive ? '⚠️' : '📍';
        locationDescEl.innerHTML = `${locationIcon} <strong>${art.locationDescription}</strong>`;
    }

    if (sensitivityNotice) {
        sensitivityNotice.style.display = art.isSensitive ? 'block' : 'none';
    }

    // Initialize map (handled by map.js)
    if (typeof initializeDetailMap === 'function') {
        initializeDetailMap(art.latitude, art.longitude, art.isSensitive);
    }
}

/**
 * Update metadata sidebar
 * @param {Object} art - Art entry object
 */
function updateMetadata(art) {
    const metaType = document.getElementById('meta-type');
    const metaPeriod = document.getElementById('meta-period');
    const metaArtist = document.getElementById('meta-artist');
    const metaSubmitter = document.getElementById('meta-submitter');
    const metaDate = document.getElementById('meta-date');
    const metaViews = document.getElementById('meta-views');

    if (metaType) metaType.textContent = art.artType;
    if (metaPeriod) metaPeriod.textContent = art.period;
    if (metaArtist) metaArtist.textContent = art.artistName;
    if (metaSubmitter) metaSubmitter.textContent = art.submittedBy;
    if (metaDate) metaDate.textContent = formatDate(art.submissionDate);
    if (metaViews) metaViews.textContent = art.views;
}

/**
 * Format date for display
 * @param {string} dateString - Date string
 * @returns {string} Formatted date
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
 * Initialize image gallery
 * @param {Array} images - Array of image URLs
 * @param {string} title - Art title for alt text
 */
function initializeGallery(images, title) {
    let currentIndex = 0;

    const mainImage = document.getElementById('main-image');
    const prevBtn = document.getElementById('prev-image');
    const nextBtn = document.getElementById('next-image');
    const counter = document.getElementById('image-counter');
    const thumbnailsContainer = document.getElementById('gallery-thumbnails');

    if (!mainImage || images.length === 0) return;

    // Create thumbnails
    if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = images.map((img, index) =>
            `<img src="${img}" alt="${title} - Image ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">`
        ).join('');

        // Add thumbnail click handlers
        thumbnailsContainer.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                currentIndex = index;
                updateGallery();
            });
        });
    }

    // Update gallery display
    function updateGallery() {
        mainImage.src = images[currentIndex];
        mainImage.alt = `${title} - Image ${currentIndex + 1} of ${images.length}`;

        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${images.length}`;
        }

        // Update thumbnail active state
        if (thumbnailsContainer) {
            thumbnailsContainer.querySelectorAll('.thumbnail').forEach((thumb, index) => {
                thumb.classList.toggle('active', index === currentIndex);
            });
        }

        // Show/hide nav buttons based on image count
        if (prevBtn) prevBtn.style.display = images.length > 1 ? 'block' : 'none';
        if (nextBtn) nextBtn.style.display = images.length > 1 ? 'block' : 'none';
    }

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateGallery();
        });
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateGallery();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && prevBtn) {
            prevBtn.click();
        } else if (e.key === 'ArrowRight' && nextBtn) {
            nextBtn.click();
        }
    });

    // Lightbox functionality
    initializeLightbox(images, title);

    // Initial display
    updateGallery();
}

/**
 * Initialize lightbox for full-screen viewing
 * @param {Array} images - Array of image URLs
 * @param {string} title - Art title for alt text
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

    // Open lightbox on main image click
    mainImage.addEventListener('click', () => {
        openLightbox(0);
    });

    // Open lightbox
    function openLightbox(index) {
        currentLightboxIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Update lightbox
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

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close button
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Previous button
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentLightboxIndex = (currentLightboxIndex - 1 + images.length) % images.length;
            updateLightbox();
        });
    }

    // Next button
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentLightboxIndex = (currentLightboxIndex + 1) % images.length;
            updateLightbox();
        });
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
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
 * Load related art based on type or period
 * @param {Object} currentArt - Current art entry
 */
function loadRelatedArt(currentArt) {
    if (typeof mockArtEntries === 'undefined') return;

    const relatedGrid = document.getElementById('related-art-grid');
    if (!relatedGrid) return;

    // Find related art (same type or period, excluding current)
    const related = mockArtEntries
        .filter(art =>
            art.id !== currentArt.id &&
            art.status === 'approved' &&
            (art.artTypeId === currentArt.artTypeId || art.periodId === currentArt.periodId)
        )
        .slice(0, 3); // Show max 3

    if (related.length === 0) {
        relatedGrid.innerHTML = '<p style="text-align: center; color: var(--gray-600);">No related art found.</p>';
        return;
    }

    // Render related art cards (use createArtCard from main.js if available)
    if (typeof createArtCard === 'function') {
        relatedGrid.innerHTML = related.map(art => createArtCard(art)).join('');

        // Add click handlers
        if (typeof addArtCardClickHandlers === 'function') {
            addArtCardClickHandlers();
        }
    }
}
