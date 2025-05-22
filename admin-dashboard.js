
const mockData = {
    statistics: {
        totalUsers: 150,
        uploadedTheses: 75,
        pendingReviews: 12,
        totalDownloads: 230
    },
    recentActivities: [
        {
            icon: 'fas fa-upload',
            title: 'New Thesis Uploaded',
            description: '"Machine Learning Applications in Healthcare"',
            time: 'Today, 2:30 PM'
        },
        {
            icon: 'fas fa-user-plus',
            title: 'New User Registered',
            description: 'student@dhvsu.edu.ph',
            time: 'Today, 11:45 AM'
        },
        {
            icon: 'fas fa-check-circle',
            title: 'Thesis Approved',
            description: '"Analysis of Renewable Energy Sources"',
            time: 'Yesterday, 4:15 PM'
        },
        {
            icon: 'fas fa-download',
            title: 'Thesis Downloaded',
            description: '"Urban Planning Strategies for Sustainable Cities"',
            time: 'Yesterday, 10:20 AM'
        },
        {
            icon: 'fas fa-comment',
            title: 'New Comment',
            description: 'Comment added to "Smart Grid Implementation"',
            time: '2 days ago, 3:45 PM'
        }
    ]
};

const totalUsersEl = document.getElementById('total-users');
const uploadedThesesEl = document.getElementById('uploaded-theses');
const pendingReviewsEl = document.getElementById('pending-reviews');
const totalDownloadsEl = document.getElementById('total-downloads');
const activityListEl = document.querySelector('.activity-list');
const sidebarEl = document.querySelector('.sidebar');
const mainContentEl = document.querySelector('.main-content');

function initDashboard() {
    loadStatistics();
    loadRecentActivities();
    initCardAnimations();
    initSidebarToggle();
}


function loadStatistics() {
    animateCounter(totalUsersEl, 0, mockData.statistics.totalUsers, 1500);
    animateCounter(uploadedThesesEl, 0, mockData.statistics.uploadedTheses, 1500);
    animateCounter(pendingReviewsEl, 0, mockData.statistics.pendingReviews, 1500);
    animateCounter(totalDownloadsEl, 0, mockData.statistics.totalDownloads, 1500);
}


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


function loadRecentActivities() {

    activityListEl.innerHTML = '';

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

function initCardAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
   
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}


function initSidebarToggle() {
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

    if (window.innerWidth <= 992) {
        toggleBtn.style.display = 'block';
    }

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

function confirmLogout() {
    if (confirm("Are you sure you want to logout?")) {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        

        setTimeout(() => {
            window.location.href = "index.html";
        }, 500);
    }
}


function setupSearch() {
    const searchInput = document.createElement('div');
    searchInput.className = 'search-container';
    searchInput.innerHTML = `
        <input type="text" id="dashboard-search" placeholder="Search...">
        <button id="search-btn"><i class="fas fa-search"></i></button>
    `;
    
  
    searchInput.style.margin = '0 0 20px 0';
    searchInput.style.display = 'flex';
    
  
    const dashboardSection = document.querySelector('.dashboard');
    dashboardSection.parentNode.insertBefore(searchInput, dashboardSection);
    
 
    const input = document.getElementById('dashboard-search');
    const button = document.getElementById('search-btn');
    
    input.style.flex = '1';
    input.style.padding = '10px';
    input.style.border = '1px solid #ddd';
    input.style.borderRadius = '4px 0 0 4px';
    input.style.outline = 'none';
    
    button.style.padding = '10px 15px';
    button.style.background = '#bc4e17';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '0 4px 4px 0';
    button.style.cursor = 'pointer';
   
    button.addEventListener('click', performSearch);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchTerm = document.getElementById('dashboard-search').value.toLowerCase();
    const activityItems = document.querySelectorAll('.activity-item');
    
    activityItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = 'flex';
            item.style.animation = 'highlight 2s';
        } else {
            item.style.display = 'none';
        }
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes highlight {
            0% { background-color: #fffacd; }
            100% { background-color: transparent; }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    setupSearch();
});