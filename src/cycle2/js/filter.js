/**
 * Indigenous Art Atlas - Browse Page Filters
 * Cycle 2: Frontend Prototype
 * COMP9030 Assignment
 *
 * This file handles:
 * - Browse page specific filtering
 * - Additional filter UI interactions
 * - Filter state management
 *
 * Note: Main filtering logic is in main.js initBrowseFilters()
 * This file provides additional enhancements
 */

/**
 * Initialize browse page enhancements
 */
document.addEventListener('DOMContentLoaded', function() {
    enhanceFilterUI();
    initializeFilterToggle();
    restoreFilterState();
});

/**
 * Enhance filter UI with additional features
 */
function enhanceFilterUI() {
    const filterGroups = document.querySelectorAll('.filter-group');

    filterGroups.forEach(group => {
        // Add expand/collapse for mobile
        const heading = group.querySelector('h3');
        if (heading && window.innerWidth < 768) {
            heading.style.cursor = 'pointer';
            heading.addEventListener('click', () => {
                const content = group.querySelector('.checkbox-label, .radio-group, .search-input');
                if (content) {
                    const parent = content.parentElement;
                    parent.style.display = parent.style.display === 'none' ? 'block' : 'none';
                }
            });
        }
    });

    // Add count badges to filter options
    addFilterCounts();
}

/**
 * Add counts to filter options showing how many items match
 */
function addFilterCounts() {
    if (typeof mockArtEntries === 'undefined') return;

    const approvedArt = mockArtEntries.filter(art => art.status === 'approved');

    // Count by art type
    const typeCheckboxes = document.querySelectorAll('input[name="artType"]');
    typeCheckboxes.forEach(checkbox => {
        const type = checkbox.value;
        const count = approvedArt.filter(art => art.artType === type).length;
        const label = checkbox.parentElement;
        if (label && !label.querySelector('.filter-count')) {
            const countBadge = document.createElement('span');
            countBadge.className = 'filter-count';
            countBadge.textContent = `(${count})`;
            countBadge.style.color = 'var(--gray-500)';
            countBadge.style.fontSize = '0.875rem';
            countBadge.style.marginLeft = '0.25rem';
            label.appendChild(countBadge);
        }
    });

    // Count by period
    const periodCheckboxes = document.querySelectorAll('input[name="period"]');
    periodCheckboxes.forEach(checkbox => {
        const period = checkbox.value;
        const count = approvedArt.filter(art => art.period === period).length;
        const label = checkbox.parentElement;
        if (label && !label.querySelector('.filter-count')) {
            const countBadge = document.createElement('span');
            countBadge.className = 'filter-count';
            countBadge.textContent = `(${count})`;
            countBadge.style.color = 'var(--gray-500)';
            countBadge.style.fontSize = '0.875rem';
            countBadge.style.marginLeft = '0.25rem';
            label.appendChild(countBadge);
        }
    });

    // Count sensitive vs public
    const sensitivityCheckboxes = document.querySelectorAll('input[name="sensitivity"]');
    sensitivityCheckboxes.forEach(checkbox => {
        const value = checkbox.value;
        let count = 0;
        if (value === 'protected') {
            count = approvedArt.filter(art => art.isSensitive).length;
        } else if (value === 'public') {
            count = approvedArt.filter(art => !art.isSensitive).length;
        }
        const label = checkbox.parentElement;
        if (label && !label.querySelector('.filter-count')) {
            const countBadge = document.createElement('span');
            countBadge.className = 'filter-count';
            countBadge.textContent = `(${count})`;
            countBadge.style.color = 'var(--gray-500)';
            countBadge.style.fontSize = '0.875rem';
            countBadge.style.marginLeft = '0.25rem';
            label.appendChild(countBadge);
        }
    });
}

/**
 * Initialize mobile filter toggle
 */
function initializeFilterToggle() {
    if (window.innerWidth >= 768) return; // Desktop doesn't need toggle

    const sidebar = document.querySelector('.filters-sidebar');
    const browseSection = document.querySelector('.browse-section');

    if (!sidebar || !browseSection) return;

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'btn btn-secondary mobile-filter-toggle';
    toggleBtn.textContent = '🔍 Filters';
    toggleBtn.style.marginBottom = '1rem';
    toggleBtn.style.width = '100%';

    // Insert before results
    const resultsHeader = document.querySelector('.results-header');
    if (resultsHeader) {
        resultsHeader.parentElement.insertBefore(toggleBtn, resultsHeader);
    }

    // Toggle sidebar visibility on mobile
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-visible');
        toggleBtn.textContent = sidebar.classList.contains('mobile-visible') ? '✕ Close Filters' : '🔍 Filters';
    });

    // Add mobile-specific styles
    if (!document.getElementById('filter-mobile-styles')) {
        const style = document.createElement('style');
        style.id = 'filter-mobile-styles';
        style.textContent = `
            @media (max-width: 767px) {
                .filters-sidebar {
                    position: fixed;
                    top: 0;
                    left: -100%;
                    width: 80%;
                    height: 100vh;
                    background: white;
                    z-index: 1001;
                    overflow-y: auto;
                    transition: left 0.3s ease;
                    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
                }
                .filters-sidebar.mobile-visible {
                    left: 0;
                }
                .mobile-filter-toggle {
                    display: block;
                }
            }
            @media (min-width: 768px) {
                .mobile-filter-toggle {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Save filter state to localStorage
 */
function saveFilterState() {
    const filterState = {
        search: document.getElementById('search-input')?.value || '',
        artTypes: Array.from(document.querySelectorAll('input[name="artType"]:checked')).map(cb => cb.value),
        periods: Array.from(document.querySelectorAll('input[name="period"]:checked')).map(cb => cb.value),
        sensitivity: Array.from(document.querySelectorAll('input[name="sensitivity"]:checked')).map(cb => cb.value),
        sort: document.getElementById('sort-select')?.value || 'recent'
    };

    localStorage.setItem('browseFilters', JSON.stringify(filterState));
}

/**
 * Restore filter state from localStorage
 */
function restoreFilterState() {
    const savedState = localStorage.getItem('browseFilters');
    if (!savedState) return;

    try {
        const state = JSON.parse(savedState);

        // Restore search
        const searchInput = document.getElementById('search-input');
        if (searchInput && state.search) {
            searchInput.value = state.search;
        }

        // Restore art type checkboxes
        state.artTypes?.forEach(value => {
            const checkbox = document.querySelector(`input[name="artType"][value="${value}"]`);
            if (checkbox) checkbox.checked = true;
        });

        // Restore period checkboxes
        state.periods?.forEach(value => {
            const checkbox = document.querySelector(`input[name="period"][value="${value}"]`);
            if (checkbox) checkbox.checked = true;
        });

        // Restore sensitivity checkboxes
        state.sensitivity?.forEach(value => {
            const checkbox = document.querySelector(`input[name="sensitivity"][value="${value}"]`);
            if (checkbox) checkbox.checked = true;
        });

        // Restore sort
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect && state.sort) {
            sortSelect.value = state.sort;
        }

        // Apply filters if the applyFilters function exists (from main.js)
        if (typeof applyFilters === 'function') {
            applyFilters();
        }
    } catch (e) {
        console.error('Error restoring filter state:', e);
    }
}

/**
 * Clear filter state
 */
function clearFilterState() {
    localStorage.removeItem('browseFilters');
}

// Save filter state when filters change
document.addEventListener('DOMContentLoaded', function() {
    const filterInputs = document.querySelectorAll('.filters-sidebar input, .filters-sidebar select');
    filterInputs.forEach(input => {
        input.addEventListener('change', saveFilterState);
    });

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(saveFilterState, 500);
        });
    }

    // Clear filter state when clear button is clicked
    const clearBtn = document.querySelector('.btn-clear-filters');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFilterState);
    }
});

/**
 * Add quick filter buttons for common searches
 */
function addQuickFilters() {
    const browseSection = document.querySelector('.browse-section');
    if (!browseSection) return;

    const quickFiltersDiv = document.createElement('div');
    quickFiltersDiv.className = 'quick-filters';
    quickFiltersDiv.style.marginBottom = '2rem';
    quickFiltersDiv.style.display = 'flex';
    quickFiltersDiv.style.gap = '0.5rem';
    quickFiltersDiv.style.flexWrap = 'wrap';

    const quickFilters = [
        { label: 'Ancient Art', filter: () => setFilterByPeriod('Ancient') },
        { label: 'Contemporary', filter: () => setFilterByPeriod('Contemporary') },
        { label: 'Cave Art', filter: () => setFilterByType('Cave Art') },
        { label: 'Sacred Sites', filter: () => setFilterBySensitivity(true) }
    ];

    quickFiltersDiv.innerHTML = '<strong style="margin-right: 0.5rem;">Quick Filters:</strong>';

    quickFilters.forEach(qf => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-sm';
        btn.style.padding = '0.375rem 0.75rem';
        btn.style.fontSize = '0.875rem';
        btn.style.background = 'var(--gray-200)';
        btn.style.color = 'var(--dark-color)';
        btn.textContent = qf.label;
        btn.addEventListener('click', qf.filter);
        quickFiltersDiv.appendChild(btn);
    });

    const resultsHeader = document.querySelector('.results-header');
    if (resultsHeader) {
        resultsHeader.parentElement.insertBefore(quickFiltersDiv, resultsHeader);
    }
}

/**
 * Helper functions for quick filters
 */
function setFilterByPeriod(period) {
    // Clear all period checkboxes
    document.querySelectorAll('input[name="period"]').forEach(cb => cb.checked = false);
    // Check the selected period
    const checkbox = document.querySelector(`input[name="period"][value="${period}"]`);
    if (checkbox) {
        checkbox.checked = true;
        if (typeof applyFilters === 'function') applyFilters();
    }
}

function setFilterByType(type) {
    // Clear all type checkboxes
    document.querySelectorAll('input[name="artType"]').forEach(cb => cb.checked = false);
    // Check the selected type
    const checkbox = document.querySelector(`input[name="artType"][value="${type}"]`);
    if (checkbox) {
        checkbox.checked = true;
        if (typeof applyFilters === 'function') applyFilters();
    }
}

function setFilterBySensitivity(isSensitive) {
    // Clear all sensitivity checkboxes
    document.querySelectorAll('input[name="sensitivity"]').forEach(cb => cb.checked = false);
    // Check the appropriate checkbox
    const value = isSensitive ? 'protected' : 'public';
    const checkbox = document.querySelector(`input[name="sensitivity"][value="${value}"]`);
    if (checkbox) {
        checkbox.checked = true;
        if (typeof applyFilters === 'function') applyFilters();
    }
}

// Initialize quick filters if desired
// Uncomment the line below to enable quick filters
// document.addEventListener('DOMContentLoaded', addQuickFilters);
