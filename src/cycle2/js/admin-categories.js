/**
 * Admin Category Management
 */

let adminUser = null;
let artTypes = [];
let artPeriods = [];
let editingCategory = null;

document.addEventListener('DOMContentLoaded', async () => {
    adminUser = checkAdminAuth();
    if (!adminUser) return;

    await loadCategories();
    setupEventListeners();
});

async function loadCategories() {
    try {
        const response = await fetch('../cycle3/api/get-categories.php');
        const result = await response.json();

        if (result.success) {
            artTypes = result.art_types || [];
            artPeriods = result.art_periods || [];
            renderCategories();
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

function setupEventListeners() {
    document.getElementById('category-form').addEventListener('submit', handleCategorySubmit);
}

function renderCategories() {
    // Render Art Types
    const typesBody = document.getElementById('art-types-tbody');
    if (artTypes.length === 0) {
        typesBody.innerHTML = '<tr><td colspan="3" class="text-center">No art types found</td></tr>';
    } else {
        typesBody.innerHTML = artTypes.map(type => `
            <tr>
                <td>${escapeHtml(type.name)}</td>
                <td>${type.usage_count || 0}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick='editCategory("type", ${JSON.stringify(type)})'>Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCategory('type', '${type.id}', '${escapeHtml(type.name)}')">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    // Render Art Periods
    const periodsBody = document.getElementById('art-periods-tbody');
    if (artPeriods.length === 0) {
        periodsBody.innerHTML = '<tr><td colspan="3" class="text-center">No time periods found</td></tr>';
    } else {
        periodsBody.innerHTML = artPeriods.map(period => `
            <tr>
                <td>${escapeHtml(period.name)}</td>
                <td>${period.usage_count || 0}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick='editCategory("period", ${JSON.stringify(period)})'>Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCategory('period', '${period.id}', '${escapeHtml(period.name)}')">Delete</button>
                </td>
            </tr>
        `).join('');
    }
}

function showAddCategoryModal(type) {
    editingCategory = null;
    document.getElementById('modal-title').textContent = type === 'type' ? 'Add Art Type' : 'Add Time Period';
    document.getElementById('category-id').value = '';
    document.getElementById('category-type').value = type;
    document.getElementById('category-name').value = '';
    document.getElementById('category-description').value = '';

    document.getElementById('category-modal').classList.add('active');
    document.getElementById('category-modal').style.display = 'flex';
}

function editCategory(type, category) {
    editingCategory = category;
    document.getElementById('modal-title').textContent = type === 'type' ? 'Edit Art Type' : 'Edit Time Period';
    document.getElementById('category-id').value = category.id;
    document.getElementById('category-type').value = type;
    document.getElementById('category-name').value = category.name;
    document.getElementById('category-description').value = category.description || '';

    document.getElementById('category-modal').classList.add('active');
    document.getElementById('category-modal').style.display = 'flex';
}

function closeCategoryModal() {
    document.getElementById('category-modal').classList.remove('active');
    document.getElementById('category-modal').style.display = 'none';
    editingCategory = null;
}

async function handleCategorySubmit(e) {
    e.preventDefault();

    const categoryId = document.getElementById('category-id').value;
    const categoryType = document.getElementById('category-type').value;
    const categoryName = document.getElementById('category-name').value;
    const categoryDescription = document.getElementById('category-description').value;

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving...';

    try {
        const endpoint = categoryId ? '../cycle3/api/update-category.php' : '../cycle3/api/add-category.php';
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: categoryId || undefined,
                type: categoryType,
                name: categoryName,
                description: categoryDescription
            })
        });

        const result = await response.json();

        if (result.success) {
            alert(categoryId ? 'Category updated successfully' : 'Category added successfully');
            closeCategoryModal();
            await loadCategories();
        } else {
            alert(result.message || 'Failed to save category');
        }

        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    } catch (error) {
        console.error('Error saving category:', error);
        alert('An error occurred');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

async function deleteCategory(type, id, name) {
    if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) return;

    try {
        const response = await fetch('../cycle3/api/delete-category.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: type,
                id: id
            })
        });

        const result = await response.json();

        if (result.success) {
            alert('Category deleted successfully');
            await loadCategories();
        } else {
            alert(result.message || 'Failed to delete category');
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        alert('An error occurred');
    }
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
