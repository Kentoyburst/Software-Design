// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const previewModal = document.getElementById('preview-modal');
    const closeButtons = document.querySelectorAll('.close-btn');
    
    // Buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    const beginReviewButtons = document.querySelectorAll('.begin-review-btn');
    
    // Current thesis being previewed
    let currentThesis = null;
    
    // Add sidebar toggle for mobile
    const header = document.querySelector('.header');
    if (header) {
        // Create toggle button for mobile
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'menu-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        header.prepend(toggleBtn);
        
        // Add toggle functionality
        toggleBtn.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('active');
        });
    }
    
    // Open preview modal
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Get thesis data from the parent review-item
            const thesisItem = e.target.closest('.review-item');
            if (thesisItem) {
                const title = thesisItem.querySelector('h3').textContent;
                const authorValue = thesisItem.querySelector('.detail-group:nth-child(1) .value').textContent;
                const departmentValue = thesisItem.querySelector('.detail-group:nth-child(2) .value').textContent;
                const dateValue = thesisItem.querySelector('.detail-group:nth-child(3) .value').textContent;
                
                // Update modal with thesis details
                document.getElementById('modal-thesis-title').textContent = title;
                document.getElementById('modal-thesis-authors').innerHTML = `<strong>Authors:</strong> ${authorValue}`;
                document.getElementById('modal-thesis-department').innerHTML = `<strong>Department:</strong> ${departmentValue}`;
                document.getElementById('modal-thesis-date').innerHTML = `<strong>Submitted:</strong> ${dateValue}`;
                
                // Store current thesis
                currentThesis = {
                    title: title,
                    author: authorValue,
                    department: departmentValue,
                    date: dateValue
                };
                
                // Show modal
                previewModal.style.display = 'block';
            }
        });
    });
    
    // Close modals when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            previewModal.style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === previewModal) {
            previewModal.style.display = 'none';
        }
    });
    
    // Begin Review button action
    beginReviewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Redirect to reviewer.html page with the thesis ID or details
            // For this example, we'll just redirect without parameters
            window.location.href = 'reviewer.html';
        });
    });
    
    // View full PDF button
    const viewFullPdfBtn = document.querySelector('.view-full-btn');
    if (viewFullPdfBtn) {
        viewFullPdfBtn.addEventListener('click', () => {
            // In a real app, this would open the PDF in a new tab or viewer
            alert('Opening full PDF document...');
        });
    }

    // Logout confirmation
    window.confirmLogout = function() {
        return confirm("Are you sure you want to logout?");
    };
    
    // Function to update dashboard statistics with real-time data
    // In a real application, this would fetch data from an API
    function updateDashboardStats() {
        // This is a placeholder function that would normally
        // make API calls to get the latest data
        console.log('Updating dashboard statistics...');
        
        // Example of how you might update the stats in a real app:
        // fetch('/api/reviewer/stats')
        //     .then(response => response.json())
        //     .then(data => {
        //         document.getElementById('pending-reviews').textContent = data.pendingCount;
        //         document.getElementById('approved-count').textContent = data.approvedCount;
        //         document.getElementById('rejected-count').textContent = data.rejectedCount;
        //         document.getElementById('avg-review-time').textContent = data.avgReviewTime + ' days';
        //     })
        //     .catch(error => console.error('Error fetching stats:', error));
    }
    
    // Call the update function when the page loads
    updateDashboardStats();
    
    // Set up periodic updates (every 5 minutes)
    // In a real app, you might want to use websockets for real-time updates
    setInterval(updateDashboardStats, 300000);
});