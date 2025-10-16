/**
 * Artist Profile Logic
 */

let currentUser = null;

document.addEventListener('DOMContentLoaded', async () => {
    currentUser = checkAuthentication();
    if (!currentUser) return;

    loadProfileData();
    loadPortfolio();

    // Show/hide contact fields
    document.getElementById('show-contact').addEventListener('change', (e) => {
        document.getElementById('contact-fields').style.display = e.target.checked ? 'block' : 'none';
    });

    // Form submission
    document.getElementById('profile-form').addEventListener('submit', handleProfileSubmit);

    // Logout
    document.getElementById('logout-link').addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
});

async function loadProfileData() {
    try {
        const response = await fetch(`../cycle3/api/get-user-profile.php?user_id=${currentUser.user_id}`);
        const result = await response.json();

        if (result.success && result.profile) {
            const profile = result.profile;

            document.getElementById('display-name').value = profile.display_name || currentUser.username || '';
            document.getElementById('bio').value = profile.bio || '';
            document.getElementById('location').value = profile.location || '';
            document.getElementById('show-contact').checked = profile.show_contact === '1';
            document.getElementById('email').value = profile.email || '';
            document.getElementById('website').value = profile.website || '';
            document.getElementById('social-media').value = profile.social_media || '';

            if (profile.show_contact === '1') {
                document.getElementById('contact-fields').style.display = 'block';
            }
        }

        // Load stats
        const submissions = await getUserSubmissions(currentUser.user_id);
        document.getElementById('total-submissions').textContent = submissions.length;
        document.getElementById('approved-entries').textContent = submissions.filter(s => s.status === 'approved').length;

        if (currentUser.created_at) {
            const date = new Date(currentUser.created_at);
            document.getElementById('member-since').textContent = date.toLocaleDateString('en-AU', {
                year: 'numeric',
                month: 'long'
            });
        }

    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

async function handleProfileSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.user_id = currentUser.user_id;

    // Convert checkbox
    data.show_contact = document.getElementById('show-contact').checked ? '1' : '0';

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving...';

    try {
        const response = await fetch('../cycle3/api/update-user-profile.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert('Profile updated successfully!');
        } else {
            alert(result.message || 'Failed to update profile');
        }

        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

    } catch (error) {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating your profile');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

async function loadPortfolio() {
    const grid = document.getElementById('portfolio-grid');

    try {
        const submissions = await getUserSubmissions(currentUser.user_id);
        const approved = submissions.filter(s => s.status === 'approved');

        if (approved.length === 0) {
            grid.innerHTML = '<p class="empty-message">No approved art entries yet. Submit your first piece!</p>';
            return;
        }

        // Convert to frontend format and display
        const artEntries = approved.map(entry => {
            return {
                id: entry.entry_id,
                title: entry.title,
                description: entry.description,
                artType: formatArtType(entry.art_type),
                images: [generatePlaceholder(entry.art_type)],
                primaryImageIndex: 0
            };
        });

        grid.innerHTML = artEntries.map(createArtCard).join('');
        addArtCardClickHandlers();

    } catch (error) {
        console.error('Error loading portfolio:', error);
        grid.innerHTML = '<p class="error-message">Error loading portfolio</p>';
    }
}

function createArtCard(art) {
    return `
        <div class="art-card" data-art-id="${art.id}">
            <img src="${art.images[0]}" alt="${art.title}" class="art-card-image">
            <div class="art-card-content">
                <h3>${art.title}</h3>
                <div class="art-card-badges">
                    <span class="badge badge-type">${art.artType}</span>
                </div>
                <p class="art-card-description">${truncateText(art.description, 100)}</p>
            </div>
        </div>
    `;
}

function addArtCardClickHandlers() {
    document.querySelectorAll('.art-card').forEach(card => {
        card.addEventListener('click', function() {
            const artId = this.getAttribute('data-art-id');
            window.location.href = `art-detail.html?id=${artId}`;
        });
    });
}

function formatArtType(type) {
    const mapping = {
        'rock_art': 'Rock Art',
        'bark_painting': 'Bark Painting',
        'contemporary': 'Contemporary',
        'sculpture': 'Sculpture',
        'ceremonial': 'Ceremonial',
        'other': 'Other'
    };
    return mapping[type] || type;
}

function generatePlaceholder(artType) {
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

function truncateText(text, length) {
    if (!text || text.length <= length) return text || '';
    return text.substring(0, length).trim() + '...';
}
