/**
 * API Wrapper for Indigenous Art Atlas
 * Replaces mock data functions with real API calls
 */

const API_BASE = '../cycle3/api';

// Override mock functions with real API calls
async function getAllApprovedArt() {
    try {
        const response = await fetch(`${API_BASE}/get-entries.php?status=approved`);
        const result = await response.json();
        if (result.success && result.entries) {
            return result.entries.map(convertBackendToFrontend);
        }
        return [];
    } catch (error) {
        console.error('Error fetching art entries:', error);
        return [];
    }
}

async function getRecentArt(count = 6) {
    try {
        const response = await fetch(`${API_BASE}/get-entries.php?status=approved&limit=${count}`);
        const result = await response.json();
        if (result.success && result.entries) {
            return result.entries.map(convertBackendToFrontend);
        }
        return [];
    } catch (error) {
        console.error('Error fetching recent art:', error);
        return [];
    }
}

async function getArtEntryById(id) {
    try {
        const response = await fetch(`${API_BASE}/get-entry.php?id=${id}`);
        const result = await response.json();
        if (result.success && result.entry) {
            return convertBackendToFrontend(result.entry);
        }
        return null;
    } catch (error) {
        console.error('Error fetching art entry:', error);
        return null;
    }
}

// Convert backend database format to frontend format
function convertBackendToFrontend(backendEntry) {
    return {
        id: backendEntry.entry_id,
        title: backendEntry.title,
        description: backendEntry.description,
        artType: formatArtType(backendEntry.art_type),
        artTypeId: getArtTypeId(backendEntry.art_type),
        period: formatPeriod(backendEntry.time_period),
        periodId: getPeriodId(backendEntry.time_period),
        artistName: backendEntry.artist_name || 'Unknown',
        latitude: parseFloat(backendEntry.latitude),
        longitude: parseFloat(backendEntry.longitude),
        locationDescription: backendEntry.location_name,
        isSensitive: backendEntry.location_sensitivity !== 'exact',
        showExactLocation: backendEntry.location_sensitivity === 'exact',
        images: [
            generatePlaceholderImage(backendEntry.art_type)
        ],
        primaryImageIndex: 0,
        submittedBy: backendEntry.submitted_by_username || 'Unknown',
        submitterId: backendEntry.user_id,
        submissionDate: backendEntry.submitted_at ? backendEntry.submitted_at.split(' ')[0] : '',
        status: backendEntry.status,
        condition: 'Condition information not available',
        views: 0
    };
}

// Helper functions for data conversion
function formatArtType(dbType) {
    const mapping = {
        'rock_art': 'Rock Art',
        'bark_painting': 'Bark Painting',
        'contemporary': 'Contemporary',
        'sculpture': 'Sculpture',
        'ceremonial': 'Ceremonial',
        'other': 'Other'
    };
    return mapping[dbType] || dbType;
}

function getArtTypeId(dbType) {
    const mapping = {
        'rock_art': 2,
        'bark_painting': 6,
        'contemporary': 6,
        'sculpture': 4,
        'ceremonial': 6,
        'other': 6
    };
    return mapping[dbType] || 6;
}

function formatPeriod(dbPeriod) {
    const mapping = {
        'ancient': 'Ancient',
        'historical': 'Colonial Era',
        'contemporary': 'Contemporary'
    };
    return mapping[dbPeriod] || dbPeriod;
}

function getPeriodId(dbPeriod) {
    const mapping = {
        'ancient': 1,
        'historical': 2,
        'contemporary': 4
    };
    return mapping[dbPeriod] || 4;
}

function generatePlaceholderImage(artType) {
    // Generate SVG placeholder based on art type
    const colors = {
        'rock_art': '#8B4513',
        'bark_painting': '#D2691E',
        'contemporary': '#4A90E2',
        'sculpture': '#696969',
        'ceremonial': '#8B0000',
        'other': '#708090'
    };

    const color = colors[artType] || '#999999';
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='${encodeURIComponent(color)}' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='white'%3E${formatArtType(artType)}%3C/text%3E%3C/svg%3E`;
}

console.log('API Wrapper loaded - Using real backend data');
