/**
 * Indigenous Art Atlas - Browse Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initBrowsePage();
});

async function initBrowsePage() {
    populateFilters();
    initBrowseFilters();
}

function populateFilters() {
    const artTypeFilters = document.getElementById('art-type-filters');
    const artPeriodFilters = document.getElementById('art-period-filters');
    const locationFilters = document.getElementById('location-filters');

    if (artTypeFilters && typeof artTypes !== 'undefined') {
        artTypeFilters.innerHTML = artTypes.map(type => `
            <label class="checkbox-label">
                <input type="checkbox" name="artType" value="${type.name}"> ${type.name}
            </label>
        `).join('');
    }

    if (artPeriodFilters && typeof artPeriods !== 'undefined') {
        artPeriodFilters.innerHTML = artPeriods.map(period => `
            <label class="checkbox-label">
                <input type="checkbox" name="period" value="${period.name}"> ${period.name}
            </label>
        `).join('');
    }

    if (locationFilters && typeof mockArtEntries !== 'undefined') {
        const locations = [...new Set(mockArtEntries.map(art => art.locationDescription.split(',').pop().trim()))];
        locationFilters.innerHTML = locations.map(location => `
            <label class="checkbox-label">
                <input type="checkbox" name="location" value="${location}"> ${location}
            </label>
        `).join('');
    }
}

async function initBrowseFilters() {
    const artGrid = document.querySelector('.browse-section .art-grid');

    if (!artGrid) return;

    artGrid.innerHTML = createLoadingSkeletons(6);

    if (typeof getAllApprovedArt === 'function') {
        const allArt = await getAllApprovedArt();
        renderBrowseArt(allArt);
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 300));
    }

    const filterCheckboxes = document.querySelectorAll('.checkbox-label input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }

    const clearFiltersBtn = document.getElementById('clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            filterCheckboxes.forEach(checkbox => checkbox.checked = false);
            if (sortSelect) sortSelect.value = 'date-desc';
            applyFilters();
        });
    }
}

function applyFilters() {
    if (typeof mockArtEntries === 'undefined') return;

    let filteredArt = [...mockArtEntries].filter(art => art.status === 'approved');

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

    const typeCheckboxes = document.querySelectorAll('input[name="artType"]:checked');
    if (typeCheckboxes.length > 0) {
        const selectedTypes = Array.from(typeCheckboxes).map(cb => cb.value);
        filteredArt = filteredArt.filter(art => selectedTypes.includes(art.artType));
    }

    const periodCheckboxes = document.querySelectorAll('input[name="period"]:checked');
    if (periodCheckboxes.length > 0) {
        const selectedPeriods = Array.from(periodCheckboxes).map(cb => cb.value);
        filteredArt = filteredArt.filter(art => selectedPeriods.includes(art.period));
    }

    const locationCheckboxes = document.querySelectorAll('input[name="location"]:checked');
    if (locationCheckboxes.length > 0) {
        const selectedLocations = Array.from(locationCheckboxes).map(cb => cb.value);
        filteredArt = filteredArt.filter(art => selectedLocations.includes(art.locationDescription.split(',').pop().trim()));
    }

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        const sortValue = sortSelect.value;
        switch (sortValue) {
            case 'date-desc':
                filteredArt.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
                break;
            case 'date-asc':
                filteredArt.sort((a, b) => new Date(a.submissionDate) - new Date(b.submissionDate));
                break;
            case 'title-asc':
                filteredArt.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                filteredArt.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'views-desc':
                filteredArt.sort((a, b) => b.views - a.views);
                break;
        }
    }

    renderBrowseArt(filteredArt);
}

function renderBrowseArt(artEntries) {
    const artGrid = document.getElementById('art-results-grid');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');

    if (!artGrid || !resultsCount || !noResults) return;

    resultsCount.textContent = `${artEntries.length} results found`;

    if (artEntries.length === 0) {
        artGrid.innerHTML = '';
        noResults.style.display = 'block';
    } else {
        artGrid.innerHTML = artEntries.map(createArtCard).join('');
        noResults.style.display = 'none';
        addArtCardClickHandlers();
    }
}

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

function truncateText(text, length) {
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + '...';
}

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

function createLoadingSkeletons(count) {
    let skeletons = '';
    for (let i = 0; i < count; i++) {
        skeletons += `
            <div class="art-card-skeleton">
                <div class="skeleton-image"></div>
                <div class="skeleton-content">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-badges"></div>
                    <div class="skeleton-desc"></div>
                </div>
            </div>
        `;
    }
    return skeletons;
}
