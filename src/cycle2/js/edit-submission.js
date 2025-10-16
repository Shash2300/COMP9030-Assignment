/**
 * Edit Submission Logic
 * Handles loading and updating existing art submissions
 */

let currentUser = null;
let entryId = null;

document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication
    currentUser = checkAuthentication();
    if (!currentUser) return;

    // Get entry ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    entryId = urlParams.get('id');

    if (!entryId) {
        alert('No entry specified');
        window.location.href = 'dashboard.html';
        return;
    }

    // Load the entry data
    await loadEntryData(entryId);

    // Set up form submission
    document.getElementById('edit-art-form').addEventListener('submit', handleSubmit);
});

async function loadEntryData(id) {
    try {
        const response = await fetch(`../cycle3/api/get-entry.php?id=${id}`);
        const result = await response.json();

        if (result.success && result.entry) {
            const entry = result.entry;

            // Verify user owns this entry
            if (entry.user_id != currentUser.user_id) {
                alert('You do not have permission to edit this entry');
                window.location.href = 'dashboard.html';
                return;
            }

            // Populate form fields
            document.getElementById('entry-id').value = entry.entry_id;
            document.getElementById('art-title').value = entry.title || '';
            document.getElementById('art-description').value = entry.description || '';
            document.getElementById('art-type').value = entry.art_type || '';
            document.getElementById('art-period').value = entry.time_period || '';
            document.getElementById('location-name').value = entry.location_name || '';
            document.getElementById('latitude').value = entry.latitude || '';
            document.getElementById('longitude').value = entry.longitude || '';
            document.getElementById('location-sensitivity').value = entry.location_sensitivity || 'exact';
            document.getElementById('artist-name').value = entry.artist_name || '';

        } else {
            alert('Entry not found');
            window.location.href = 'dashboard.html';
        }
    } catch (error) {
        console.error('Error loading entry:', error);
        alert('Error loading entry data');
        window.location.href = 'dashboard.html';
    }
}

async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Add entry ID
    data.entry_id = entryId;

    // Disable submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving...';

    try {
        const response = await fetch('../cycle3/api/update-entry.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert('Entry updated successfully!');
            window.location.href = 'dashboard.html';
        } else {
            alert(result.message || 'Failed to update entry');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    } catch (error) {
        console.error('Error updating entry:', error);
        alert('An error occurred while updating the entry');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}
