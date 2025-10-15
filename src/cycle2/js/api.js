/**
 * API Helper - Connects Frontend (Cycle 2) to Backend (Cycle 3)
 * Handles all communication with PHP backend API
 */

const API_BASE_URL = '../cycle3/api';

// API Helper Functions
const API = {
    // Authentication endpoints
    async login(username, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/login.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (data.success) {
                // Store user info in localStorage
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userData', JSON.stringify(data.user));
            }

            return data;
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Connection error. Please try again.' };
        }
    },

    async register(userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/register.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();

            if (data.success) {
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userData', JSON.stringify(data.user));
            }

            return data;
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Connection error. Please try again.' };
        }
    },

    async logout() {
        try {
            const response = await fetch(`${API_BASE_URL}/logout.php`, {
                method: 'POST',
            });
            const data = await response.json();

            // Clear local storage
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userData');

            return data;
        } catch (error) {
            console.error('Logout error:', error);
            // Still clear local storage even if API fails
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userData');
            return { success: true };
        }
    },

    // Art entry endpoints
    async getEntries(filters = {}) {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const url = `${API_BASE_URL}/get-entries.php${queryParams ? '?' + queryParams : ''}`;

            const response = await fetch(url);
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Get entries error:', error);
            return { success: false, entries: [], message: 'Failed to load art entries' };
        }
    },

    async getEntry(entryId) {
        try {
            const response = await fetch(`${API_BASE_URL}/get-entry.php?id=${entryId}`);
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Get entry error:', error);
            return { success: false, message: 'Failed to load art entry' };
        }
    },

    async createEntry(entryData) {
        try {
            const response = await fetch(`${API_BASE_URL}/create-entry.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entryData)
            });
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Create entry error:', error);
            return { success: false, message: 'Failed to create art entry' };
        }
    },

    async updateEntry(entryId, entryData) {
        try {
            const response = await fetch(`${API_BASE_URL}/update-entry.php?id=${entryId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entryData)
            });
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Update entry error:', error);
            return { success: false, message: 'Failed to update art entry' };
        }
    },

    async deleteEntry(entryId) {
        try {
            const response = await fetch(`${API_BASE_URL}/delete-entry.php?id=${entryId}`, {
                method: 'POST',
            });
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Delete entry error:', error);
            return { success: false, message: 'Failed to delete art entry' };
        }
    },

    // Admin endpoints
    async approveEntry(entryId, notes = '') {
        try {
            const response = await fetch(`${API_BASE_URL}/approve-entry.php?id=${entryId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ notes })
            });
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Approve entry error:', error);
            return { success: false, message: 'Failed to approve entry' };
        }
    },

    async rejectEntry(entryId, reason) {
        try {
            const response = await fetch(`${API_BASE_URL}/reject-entry.php?id=${entryId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reason })
            });
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Reject entry error:', error);
            return { success: false, message: 'Failed to reject entry' };
        }
    },

    // Helper functions
    getCurrentUser() {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    },

    isLoggedIn() {
        return localStorage.getItem('userLoggedIn') === 'true';
    },

    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    }
};

// Convert backend art entry format to frontend format
function convertBackendToFrontend(backendEntry) {
    return {
        id: backendEntry.entry_id,
        title: backendEntry.title,
        description: backendEntry.description,
        artType: backendEntry.art_type,
        period: backendEntry.time_period,
        locationDescription: backendEntry.location_name,
        latitude: parseFloat(backendEntry.latitude),
        longitude: parseFloat(backendEntry.longitude),
        isSensitive: backendEntry.location_sensitivity !== 'exact',
        indigenousGroup: backendEntry.indigenous_group,
        culturalSignificance: backendEntry.cultural_significance,
        artistName: backendEntry.artist_name || 'Unknown',
        status: backendEntry.status,
        submissionDate: backendEntry.submitted_at,
        views: 0, // Backend doesn't track views yet
        images: [
            'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23f5f5dc%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2220%22 fill=%22%23666%22%3E' + encodeURIComponent(backendEntry.title) + '%3C/text%3E%3C/svg%3E'
        ],
        primaryImageIndex: 0
    };
}

// Convert frontend form data to backend format
function convertFrontendToBackend(frontendData) {
    return {
        title: frontendData.title,
        description: frontendData.description,
        art_type: frontendData.artType || frontendData.art_type,
        time_period: frontendData.period || frontendData.time_period,
        location_name: frontendData.locationDescription || frontendData.location_name,
        latitude: frontendData.latitude,
        longitude: frontendData.longitude,
        location_sensitivity: frontendData.locationSensitivity || 'exact',
        indigenous_group: frontendData.indigenousGroup || '',
        cultural_significance: frontendData.culturalSignificance || '',
        artist_name: frontendData.artistName || ''
    };
}

// Replace mock data functions with API calls
async function getRecentArt(limit = 6) {
    const result = await API.getEntries({ status: 'approved', limit });
    if (result.success && result.entries) {
        return result.entries.map(convertBackendToFrontend);
    }
    return [];
}

async function getAllApprovedArt() {
    const result = await API.getEntries({ status: 'approved' });
    if (result.success && result.entries) {
        return result.entries.map(convertBackendToFrontend);
    }
    return [];
}

async function getArtEntryById(id) {
    const result = await API.getEntry(id);
    if (result.success && result.entry) {
        return convertBackendToFrontend(result.entry);
    }
    return null;
}
