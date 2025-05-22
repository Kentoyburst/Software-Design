// user-account.js

// User Management System for Thesis Repository
class UserAccountManager {
    constructor() {
        this.currentUser = null;
        this.loadCurrentUser();
    }

    // Load the current user from localStorage
    loadCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.updateUIWithUserInfo();
            return true;
        }
        return false;
    }

    // Save the current user to localStorage
    saveCurrentUser(user) {
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.updateUIWithUserInfo();
            return true;
        }
        return false;
    }

    // Log in a user
    login(username, password) {
        // Get all registered users
        const users = this.getAllUsers();
        
        // Find the user with matching credentials
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Set as current user
            this.saveCurrentUser(user);
            return true;
        }
        
        return false;
    }

    // Register a new user
    register(username, password, role = 'Student') {
        // Get all registered users
        const users = this.getAllUsers();
        
        // Check if username already exists
        if (users.some(u => u.username === username)) {
            return false; // Username already exists
        }
        
        // Create new user
        const newUser = {
            id: this.generateUserId(),
            username,
            password,
            role,
            savedPapers: [], // Initialize empty saved papers array for new user
            createdAt: new Date().toISOString()
        };
        
        // Add to users list
        users.push(newUser);
        
        // Save updated users list
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        
        // Set as current user
        this.saveCurrentUser(newUser);
        
        return true;
    }

    // Log out the current user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        
        // Redirect to login page
        window.location.href = 'continue.html'; // Assuming continue.html is the login page
    }

    // Get all registered users
    getAllUsers() {
        const users = localStorage.getItem('registeredUsers');
        return users ? JSON.parse(users) : [];
    }

    // Generate a unique user ID
    generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Update UI elements with user information
    updateUIWithUserInfo() {
        if (!this.currentUser) return;

        // Update username display in the UI
        const usernameElements = document.querySelectorAll('#username');
        usernameElements.forEach(el => {
            if (el) el.textContent = this.currentUser.username;
        });

        // Update role display in the UI
        const roleElements = document.querySelectorAll('.profile-details p');
        roleElements.forEach(el => {
            if (el) el.textContent = this.currentUser.role;
        });
    }

    // Save a paper for the current user
    savePaper(paper) {
        if (!this.currentUser) return false;

        // Get the user's current saved papers
        if (!this.currentUser.savedPapers) {
            this.currentUser.savedPapers = [];
        }

        // Check if paper is already saved
        if (!this.currentUser.savedPapers.some(savedPaper => savedPaper.title === paper.title)) {
            // Add paper to saved papers
            this.currentUser.savedPapers.push(paper);
            
            // Update current user in localStorage
            this.saveCurrentUser(this.currentUser);
            
            // Update user in the registered users list
            this.updateUserInRegisteredUsers(this.currentUser);
            
            return true;
        }
        
        return false; // Paper already saved
    }

    // Remove a paper from the current user's saved papers
    removePaper(title) {
        if (!this.currentUser || !this.currentUser.savedPapers) return false;

        // Remove paper from saved papers
        this.currentUser.savedPapers = this.currentUser.savedPapers.filter(paper => paper.title !== title);
        
        // Update current user in localStorage
        this.saveCurrentUser(this.currentUser);
        
        // Update user in the registered users list
        this.updateUserInRegisteredUsers(this.currentUser);
        
        return true;
    }

    // Get the current user's saved papers
    getSavedPapers() {
        if (!this.currentUser) return [];
        return this.currentUser.savedPapers || [];
    }

    // Update user in the registered users list
    updateUserInRegisteredUsers(updatedUser) {
        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === updatedUser.id);
        
        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            localStorage.setItem('registeredUsers', JSON.stringify(users));
        }
    }
}

// Initialize the user account manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global userAccountManager instance
    window.userAccountManager = new UserAccountManager();
    
    // Check if user is logged in, if not redirect to login page
    if (!window.userAccountManager.isLoggedIn()) {
        // Check if we're not already on the login/continue page
        if (!window.location.href.includes('continue.html')) {
            window.location.href = 'continue.html';
        }
    }
    
    // Add logout functionality to all logout links
    const logoutLinks = document.querySelectorAll('a[href="continue.html"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.userAccountManager.logout();
        });
    });
});