/**
 * Indigenous Art Atlas - Home Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initFeaturedArt();
});

async function initFeaturedArt() {
    const grid = document.getElementById('featured-art-grid');
    const totalEntriesEl = document.getElementById('total-entries');

    if (grid && typeof getRecentArt === 'function') {
        grid.innerHTML = '<p>Loading...</p>';
        const art = await getRecentArt(6);
        if (art.length > 0) {
            grid.innerHTML = art.map(createArtCard).join('');
            addArtCardClickHandlers();
        }
    }

    if (totalEntriesEl && typeof getAllApprovedArt === 'function') {
        const allArt = await getAllApprovedArt();
        animateCounter(totalEntriesEl, allArt.length);
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

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}