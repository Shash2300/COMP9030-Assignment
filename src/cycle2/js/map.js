/**
 * Indigenous Art Atlas - Map JavaScript
 * Cycle 2: Frontend Prototype
 * COMP9030 Assignment
 *
 * This file handles:
 * - Interactive Leaflet map initialization
 * - Art location markers
 * - Map popups with art information
 * - Marker clustering (if needed)
 * - Sensitive location handling
 */

/**
 * Initialize the main interactive map on the homepage
 */
async function initializeMap() {
    const mapContainer = document.getElementById('map');

    if (!mapContainer || typeof L === 'undefined') return;

    // Create map centered on Australia
    const map = L.map('map').setView([-25.2744, 133.7751], 4);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 3
    }).addTo(map);

    // Add art markers if mock data is available
    if (typeof getAllApprovedArt === 'function') {
        const artEntries = await getAllApprovedArt();
        if (Array.isArray(artEntries) && artEntries.length > 0) {
            addArtMarkers(map, artEntries);
        }
    }

    return map;
}

/**
 * Add art entry markers to the map
 * @param {Object} map - Leaflet map instance
 * @param {Array} artEntries - Array of art entries
 */
function addArtMarkers(map, artEntries) {
    artEntries.forEach(art => {
        // Determine marker color based on art type and sensitivity
        let markerColor = '#D2691E'; // Default: Contemporary (primary color)

        if (art.period === 'Ancient') {
            markerColor = '#8B4513'; // Saddle Brown for ancient
        } else if (art.isSensitive) {
            markerColor = '#FF9800'; // Warning color for sensitive
        }

        // Create custom icon
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${markerColor}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
            iconSize: [25, 25],
            iconAnchor: [12, 12]
        });

        // For sensitive locations, add some random offset to obscure exact location
        let lat = art.latitude;
        let lng = art.longitude;

        if (art.isSensitive && !art.showExactLocation) {
            // Add random offset of up to ~5km
            const offset = 0.05; // Approximately 5km
            lat += (Math.random() - 0.5) * offset;
            lng += (Math.random() - 0.5) * offset;
        }

        // Create marker
        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

        // Create popup content
        const popupContent = createMapPopup(art);
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'art-popup'
        });

        // Add click handler to popup link
        marker.on('popupopen', () => {
            const viewLink = document.querySelector('.popup-view-link');
            if (viewLink) {
                viewLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = `art-detail.html?id=${art.id}`;
                });
            }
        });
    });
}

/**
 * Create HTML content for map popup
 * @param {Object} art - Art entry object
 * @returns {string} HTML string for popup
 */
function createMapPopup(art) {
    const locationWarning = art.isSensitive ?
        '<p style="color: #FF9800; font-size: 0.875rem; margin-top: 0.5rem;"><strong>⚠️ Protected Location</strong><br>Approximate location shown for cultural sensitivity.</p>' :
        '';

    const primaryImage = art.images[art.primaryImageIndex] || art.images[0];

    return `
        <div class="map-popup-content">
            <img src="${primaryImage}" alt="${art.title}"
                 style="width: 100%; height: 150px; object-fit: cover; border-radius: 4px; margin-bottom: 0.5rem;"
                 onerror="this.style.display='none'">
            <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem;">${art.title}</h4>
            <p style="margin: 0 0 0.25rem 0; font-size: 0.875rem; color: #666;">
                <strong>Type:</strong> ${art.artType} (${art.period})
            </p>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #666;">
                <strong>Location:</strong> ${art.locationDescription}
            </p>
            ${locationWarning}
            <a href="art-detail.html?id=${art.id}" class="popup-view-link"
               style="display: inline-block; margin-top: 0.5rem; padding: 0.5rem 1rem; background: #D2691E; color: white; text-decoration: none; border-radius: 4px; font-size: 0.875rem;">
                View Details →
            </a>
        </div>
    `;
}

/**
 * Initialize map on art detail page
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @param {boolean} isSensitive - Whether location is sensitive
 */
function initializeDetailMap(latitude, longitude, isSensitive) {
    const mapContainer = document.getElementById('detail-map');

    if (!mapContainer || typeof L === 'undefined') return;

    // Add offset for sensitive locations
    let lat = latitude;
    let lng = longitude;

    if (isSensitive) {
        const offset = 0.05;
        lat += (Math.random() - 0.5) * offset;
        lng += (Math.random() - 0.5) * offset;
    }

    // Create map
    const map = L.map('detail-map').setView([lat, lng], isSensitive ? 8 : 12);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);

    // Add marker
    const markerColor = isSensitive ? '#FF9800' : '#D2691E';
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${markerColor}; width: 30px; height: 30px; border-radius: 50%; border: 4px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    L.marker([lat, lng], { icon: customIcon }).addTo(map);

    // Add circle for sensitive locations to show approximate area
    if (isSensitive) {
        L.circle([latitude, longitude], {
            color: '#FF9800',
            fillColor: '#FF9800',
            fillOpacity: 0.1,
            radius: 5000 // 5km radius
        }).addTo(map);
    }

    return map;
}

/**
 * Initialize map on submit art form page
 */
function initializeSubmitMap() {
    const mapContainer = document.getElementById('submit-map');

    if (!mapContainer || typeof L === 'undefined') return;

    // Create map centered on Australia
    const map = L.map('submit-map').setView([-25.2744, 133.7751], 4);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 3
    }).addTo(map);

    let marker = null;
    const latInput = document.getElementById('latitude');
    const lngInput = document.getElementById('longitude');

    // Add click handler to place marker
    map.on('click', function(e) {
        const { lat, lng } = e.latlng;

        // Remove existing marker if any
        if (marker) {
            map.removeLayer(marker);
        }

        // Add new marker
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: #D2691E; width: 30px; height: 30px; border-radius: 50%; border: 4px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

        // Update form fields
        if (latInput) latInput.value = lat.toFixed(6);
        if (lngInput) lngInput.value = lng.toFixed(6);

        // Add popup
        marker.bindPopup(`
            <strong>Selected Location</strong><br>
            Lat: ${lat.toFixed(6)}<br>
            Lng: ${lng.toFixed(6)}
        `).openPopup();
    });

    // Allow manual coordinate entry
    if (latInput && lngInput) {
        function updateMarkerFromInputs() {
            const lat = parseFloat(latInput.value);
            const lng = parseFloat(lngInput.value);

            if (!isNaN(lat) && !isNaN(lng)) {
                // Remove existing marker
                if (marker) {
                    map.removeLayer(marker);
                }

                // Add new marker
                const customIcon = L.divIcon({
                    className: 'custom-marker',
                    html: `<div style="background-color: #D2691E; width: 30px; height: 30px; border-radius: 50%; border: 4px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });

                marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
                map.setView([lat, lng], 10);
            }
        }

        latInput.addEventListener('change', updateMarkerFromInputs);
        lngInput.addEventListener('change', updateMarkerFromInputs);
    }

    return map;
}

// Initialize maps when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize homepage map
    if (document.getElementById('map')) {
        await initializeMap();
    }

    // Initialize detail page map
    if (document.getElementById('detail-map')) {
        const urlParams = new URLSearchParams(window.location.search);
        const artId = urlParams.get('id');

        if (artId && typeof getArtEntryById === 'function') {
            const art = await getArtEntryById(artId);
            if (art) {
                initializeDetailMap(art.latitude, art.longitude, art.isSensitive);
            }
        }
    }

    // Initialize submit form map
    if (document.getElementById('submit-map')) {
        initializeSubmitMap();
    }
});
