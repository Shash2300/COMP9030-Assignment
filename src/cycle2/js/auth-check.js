/**
 * Authentication & Session Management - UPDATED WITH BETTER STYLING
 * Include this file on EVERY page to maintain login state
 * 
 * Usage: Add to every HTML page BEFORE main.js:
 * <script src="js/auth-check.js"></script>
 */

const AuthManager = {
    currentUser: null,
    
    // Initialize auth check on page load
    async init() {
        await this.checkAuth();
        this.updateHeaderForAllPages();
    },
    
    // Check if user is logged in
    async checkAuth() {
        try {
            const response = await fetch('../cycle3/api/current-user.php', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const result = await response.json();
            
            if (result.success && result.user_id) {
                this.currentUser = result;
                return true;
            } else {
                this.currentUser = null;
                return false;
            }
        } catch (error) {
            console.error('Auth check error:', error);
            this.currentUser = null;
            return false;
        }
    },
    
    // Check if user is logged in (synchronous check)
    isLoggedIn() {
        return this.currentUser !== null;
    },
    
    // Check if user is admin
    isAdmin() {
        return this.currentUser && this.currentUser.user_role === 'admin';
    },
    
    // Update header navigation for all pages
    updateHeaderForAllPages() {
        const nav = document.querySelector('.main-nav ul');
        if (!nav) return;
        
        if (this.isLoggedIn()) {
            // User is logged in - show Dashboard and Logout
            nav.innerHTML = `
                <li><a href="index.html">Home</a></li>
                <li><a href="browse.html">Browse</a></li>
                ${this.isAdmin() ? '<li><a href="admin-dashboard.html">Admin Dashboard</a></li>' : ''}
                <li><a href="dashboard.html">Dashboard</a></li>
                <li><a href="#" id="logout-link">Logout</a></li>
            `;
            
            // Show user info - IMPROVED VERSION
            this.showUserInfo();
            
            // Add logout handler
            const logoutLink = document.getElementById('logout-link');
            if (logoutLink) {
                logoutLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.logout();
                });
            }
        } else {
            // User is NOT logged in - show Login and Register
            nav.innerHTML = `
                <li><a href="index.html">Home</a></li>
                <li><a href="browse.html">Browse</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="guidelines.html">Guidelines</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html" class="btn-primary">Register</a></li>
            `;
            
            // Remove user info if exists
            const existingUserInfo = document.querySelector('.user-info-badge');
            if (existingUserInfo) {
                existingUserInfo.remove();
            }
        }
    },
    
    // Show user info in header - IMPROVED STYLING
    showUserInfo() {
        if (!this.currentUser) return;
        
        // Remove existing user info if present
        const existingUserInfo = document.querySelector('.user-info-badge');
        if (existingUserInfo) {
            existingUserInfo.remove();
        }
        
        // Find the header container
        const headerContent = document.querySelector('.site-header .header-content');
        if (!headerContent) return;
        
        // Create user info badge
        const userInfoBadge = document.createElement('div');
        userInfoBadge.className = 'user-info-badge';
        
        // Add admin badge if admin
        const roleBadge = this.isAdmin() 
            ? '<span class="admin-badge">ADMIN</span>'
            : '';
        
        userInfoBadge.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span class="username">${this.escapeHtml(this.currentUser.username)}</span>
            ${roleBadge}
        `;
        
        // Append to header
        headerContent.appendChild(userInfoBadge);
        
        // Add styles if not already present
        this.addUserInfoStyles();
    },
    
    // Add CSS styles for user info badge
    addUserInfoStyles() {
        // Check if styles already exist
        if (document.getElementById('auth-manager-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'auth-manager-styles';
        style.textContent = `
            /* User Info Badge Styles - Matches Website Theme */
            .user-info-badge {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                font-size: 0.875rem;
                font-weight: 500;
                margin-left: auto;
                box-shadow: 0 2px 4px rgba(217, 119, 6, 0.3);
                transition: all 0.3s ease;
            }
            
            .user-info-badge:hover {
                box-shadow: 0 4px 8px rgba(217, 119, 6, 0.4);
                transform: translateY(-1px);
            }
            
            .user-info-badge svg {
                flex-shrink: 0;
            }
            
            .user-info-badge .username {
                font-weight: 600;
            }
            
            .user-info-badge .admin-badge {
                background: rgba(255, 255, 255, 0.25);
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.75rem;
                font-weight: 700;
                letter-spacing: 0.05em;
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            /* Make sure header can accommodate the badge */
            .site-header .header-content {
                display: flex;
                align-items: center;
                gap: 2rem;
            }
            
            .site-header .main-nav {
                margin-left: auto;
                margin-right: 1rem;
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
                .user-info-badge {
                    font-size: 0.75rem;
                    padding: 0.4rem 0.8rem;
                    gap: 0.4rem;
                }
                
                .user-info-badge svg {
                    width: 16px;
                    height: 16px;
                }
                
                .user-info-badge .username {
                    max-width: 100px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            
            @media (max-width: 480px) {
                .user-info-badge .admin-badge {
                    display: none;
                }
            }
        `;
        
        document.head.appendChild(style);
    },
    
    // Logout function
    async logout() {
        try {
            const response = await fetch('../cycle3/api/logout.php', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.currentUser = null;
                window.location.href = 'index.html';
            } else {
                alert('Logout failed. Please try again.');
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Force logout anyway
            this.currentUser = null;
            window.location.href = 'index.html';
        }
    },
    
    // Protect page - redirect to login if not authenticated
    requireAuth(redirectTo = 'login.html') {
        if (!this.isLoggedIn()) {
            window.location.href = redirectTo;
            return false;
        }
        return true;
    },
    
    // Protect admin pages
    requireAdmin(redirectTo = 'dashboard.html') {
        if (!this.isAdmin()) {
            alert('Admin access required.');
            window.location.href = redirectTo;
            return false;
        }
        return true;
    },
    
    // Helper: Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Initialize auth manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AuthManager.init());
} else {
    AuthManager.init();
}

// Make AuthManager available globally
window.AuthManager = AuthManager;