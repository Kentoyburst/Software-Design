// Mock data for demonstration
const mockData = {
    statistics: {
        savedPapers: 3,
        totalDownloads: 12,
        paperViews: 27,
        uploadedPapers: 0
    },
    recentActivities: [
        {
            icon: 'fas fa-book-open',
            title: 'Impact of Deepfake Technology',
            description: 'Read on March 27',
            time: 'Today, 2:30 PM'
        },
        {
            icon: 'fas fa-download',
            title: 'AI in Higher Education',
            description: 'Downloaded',
            time: 'Today, 11:45 AM'
        }
    ]
};

// DOM Elements
const savedPapersEl = document.getElementById('saved-papers');
const totalDownloadsEl = document.getElementById('total-downloads');
const paperViewsEl = document.getElementById('paper-views');
const uploadedPapersEl = document.getElementById('uploaded-papers');
const activityListEl = document.querySelector('.activity-list');
const sidebarEl = document.querySelector('.sidebar');
const mainContentEl = document.querySelector('.main-content');

// Function to initialize the dashboard
function initDashboard() {
    loadStatistics();
    loadRecentActivities();
    initCardAnimations();
    initSidebarToggle();
    setupSearch();
}

// Load statistics with counter animation
function loadStatistics() {
    animateCounter(savedPapersEl, 0, mockData.statistics.savedPapers, 1500);
    animateCounter(totalDownloadsEl, 0, mockData.statistics.totalDownloads, 1500);
    animateCounter(paperViewsEl, 0, mockData.statistics.paperViews, 1500);
    animateCounter(uploadedPapersEl, 0, mockData.statistics.uploadedPapers, 1500);
}

// Animate counter from start to end value
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Load recent activities
function loadRecentActivities() {
    // Clear existing activities
    activityListEl.innerHTML = '';
    
    // Add activities from mock data
    mockData.recentActivities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <i class="${activity.icon}"></i>
            <div class="activity-details">
                <p><strong>${activity.title}</strong> - ${activity.description}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        activityListEl.appendChild(activityItem);
    });
}

// Initialize card animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        // Add staggered fade-in animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Initialize sidebar toggle for mobile devices
function initSidebarToggle() {
    // Create toggle button for mobile
    const header = document.querySelector('.header');
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'sidebar-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    toggleBtn.style.display = 'none';
    toggleBtn.style.position = 'absolute';
    toggleBtn.style.left = '15px';
    toggleBtn.style.top = '15px';
    toggleBtn.style.background = 'transparent';
    toggleBtn.style.border = 'none';
    toggleBtn.style.color = '#333';
    toggleBtn.style.fontSize = '20px';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.zIndex = '1001';
    header.appendChild(toggleBtn);

    // Show toggle button on mobile
    if (window.innerWidth <= 992) {
        toggleBtn.style.display = 'block';
    }

    // Toggle sidebar on button click
    toggleBtn.addEventListener('click', () => {
        const isSidebarVisible = sidebarEl.style.left !== '-250px';
        
        if (isSidebarVisible) {
            sidebarEl.style.left = '-250px';
            mainContentEl.style.marginLeft = '0';
            mainContentEl.style.width = '100%';
        } else {
            sidebarEl.style.left = '0';
            if (window.innerWidth > 992) {
                mainContentEl.style.marginLeft = '250px';
                mainContentEl.style.width = 'calc(100% - 250px)';
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 992) {
            toggleBtn.style.display = 'block';
        } else {
            toggleBtn.style.display = 'none';
            sidebarEl.style.left = '0';
            mainContentEl.style.marginLeft = '250px';
            mainContentEl.style.width = 'calc(100% - 250px)';
        }
    });
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('dashboard-search');
    const searchButton = document.getElementById('search-btn');
    
    // Add search functionality
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchTerm = document.getElementById('dashboard-search').value.toLowerCase();
    const researchPapers = document.querySelectorAll('.research-paper');
    
    researchPapers.forEach(paper => {
        const text = paper.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            paper.style.display = 'flex';
            paper.style.animation = 'highlight 2s';
        } else {
            paper.style.display = 'none';
        }
    });
    
    // Add highlighting animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes highlight {
            0% { background-color: #fffacd; }
            100% { background-color: transparent; }
        }
    `;
    document.head.appendChild(style);
}

// Handle logout
function confirmLogout() {
    if (confirm("Are you sure you want to logout?")) {
        // Clear user data from local storage
        localStorage.removeItem('userData');

        // Add logout animation
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';

        // Redirect after animation
        setTimeout(() => {
            window.location.href = "continue.html";
        }, 500);
    }
}


// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Fetch user data from local storage
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
        // Update the username and role in the navigation bar
        const usernameElement = document.getElementById('username');
        const roleElement = document.getElementById('user-role');

        usernameElement.textContent = userData.username;
        roleElement.textContent = userData.role;
    }
});