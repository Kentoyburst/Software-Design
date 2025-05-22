// Mock Notifications Data
const mockNotifications = [
    {
        id: 1,
        type: 'system',
        icon: 'fas fa-bell',
        title: 'System Update',
        message: 'The thesis repository system will undergo maintenance on April 5th.',
        time: '2 hours ago',
        isRead: false
    },
    {
        id: 2,
        type: 'research',
        icon: 'fas fa-book-open',
        title: 'New Research Paper',
        message: 'A new paper matching your research interests has been uploaded.',
        time: 'Yesterday',
        isRead: false
    },
    {
        id: 3,
        type: 'system',
        icon: 'fas fa-user-plus',
        title: 'Profile Update',
        message: 'Your profile information has been successfully updated.',
        time: '3 days ago',
        isRead: true
    },
    {
        id: 4,
        type: 'research',
        icon: 'fas fa-comment',
        title: 'Thesis Feedback',
        message: 'You have received new feedback on your uploaded thesis.',
        time: '1 week ago',
        isRead: true
    },
    {
        id: 5,
        type: 'research',
        icon: 'fas fa-file-download',
        title: 'Download Limit',
        message: 'You have reached 80% of your monthly download limit.',
        time: '10 days ago',
        isRead: false
    }
];

// Pagination and Filtering
let currentPage = 1;
const itemsPerPage = 5;
let currentFilter = 'all';

// DOM Elements
const notificationsList = document.getElementById('notifications-list');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const currentPageSpan = document.getElementById('current-page');
const filterButtons = document.querySelectorAll('.filter-btn');
const markAllReadBtn = document.getElementById('mark-all-read');
const clearNotificationsBtn = document.getElementById('clear-notifications');

// Render Notifications
function renderNotifications() {
    // Filter notifications
    let filteredNotifications = mockNotifications.filter(notification => 
        currentFilter === 'all' || notification.type === currentFilter
    );

    // Pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);

    // Clear existing notifications
    notificationsList.innerHTML = '';

    // Render notifications
    paginatedNotifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.classList.add('notification-item');
        notificationItem.dataset.id = notification.id;
        notificationItem.dataset.type = notification.type;

        notificationItem.innerHTML = `
            <div class="notification-status ${notification.isRead ? 'read' : ''}"></div>
            <i class="notification-icon ${notification.icon}"></i>
            <div class="notification-content">
                <h4>${notification.title}</h4>
                <p>${notification.message}</p>
                <span class="notification-time">${notification.time}</span>
            </div>
            <div class="notification-actions">
                <button class="mark-read-btn">Mark as Read</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        notificationsList.appendChild(notificationItem);
    });

    // Update pagination
    updatePaginationControls(filteredNotifications.length);
    updatePageDisplay();
}

// Update Pagination Controls
function updatePaginationControls(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

// Update Page Display
function updatePageDisplay() {
    currentPageSpan.textContent = currentPage;
}

// Event Listeners
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderNotifications();
    }
});

nextPageBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(mockNotifications.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderNotifications();
    }
});

// Filter Notifications
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Set current filter
        currentFilter = button.dataset.filter;
        currentPage = 1;
        renderNotifications();
    });
});

// Mark Notification as Read
notificationsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('mark-read-btn')) {
        const notificationItem = e.target.closest('.notification-item');
        const notificationId = parseInt(notificationItem.dataset.id);
        
        // Update read status in mock data
        const notification = mockNotifications.find(n => n.id === notificationId);
        if (notification) {
            notification.isRead = true;
            renderNotifications();
        }
    }
});

// Delete Notification
notificationsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const notificationItem = e.target.closest('.notification-item');
        const notificationId = parseInt(notificationItem.dataset.id);
        
        // Remove notification from mock data
        const index = mockNotifications.findIndex(n => n.id === notificationId);
        if (index !== -1) {
            mockNotifications.splice(index, 1);
            renderNotifications();
        }
    }
});

// Mark All as Read
markAllReadBtn.addEventListener('click', () => {
    mockNotifications.forEach(notification => {
        notification.isRead = true;
    });
    renderNotifications();
});

// Clear All Notifications
clearNotificationsBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
        mockNotifications.length = 0;
        renderNotifications();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderNotifications();
});