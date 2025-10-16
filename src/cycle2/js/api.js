/**
 * API Client for Dashboard
 * Handles communication with the backend API
 */

const API_BASE = '../cycle3/api';

// Check if user is logged in
function checkAuthentication() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    const userData = localStorage.getItem('userData');

    if (!userLoggedIn || !userData) {
        window.location.href = 'login.html';
        return null;
    }

    return JSON.parse(userData);
}

// Get user's submissions
async function getUserSubmissions(userId) {
    try {
        const response = await fetch(`${API_BASE}/get-entries.php?user_id=${userId}`);
        const result = await response.json();

        if (result.success && result.entries) {
            return result.entries;
        }
        return [];
    } catch (error) {
        console.error('Error fetching user submissions:', error);
        return [];
    }
}

// Submit new art entry
async function submitArtEntry(formData) {
    try {
        const response = await fetch(`${API_BASE}/create-entry.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error submitting art entry:', error);
        return { success: false, message: 'An error occurred while submitting your entry.' };
    }
}

// Delete an entry
async function deleteEntry(entryId) {
    try {
        const response = await fetch(`${API_BASE}/delete-entry.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: entryId })
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error deleting entry:', error);
        return { success: false, message: 'An error occurred while deleting the entry.' };
    }
}

// Logout user
function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userData');
    window.location.href = 'login.html';
}
