// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Modals
    const previewModal = document.getElementById('preview-modal');
    const rejectionModal = document.getElementById('rejection-modal');
    const closeButtons = document.querySelectorAll('.close-btn');
    
    // Buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    const approveButtons = document.querySelectorAll('.approve-btn');
    const rejectButtons = document.querySelectorAll('.reject-btn');
    const cancelButton = document.querySelector('.cancel-btn');
    const confirmRejectButton = document.querySelector('.confirm-reject-btn');
    
    // Search and filter elements
    const pendingSearch = document.getElementById('pending-search');
    const accessSearch = document.getElementById('access-search');
    const historySearch = document.getElementById('history-search');
    const departmentFilter = document.getElementById('department-filter');
    const accessStatusFilter = document.getElementById('access-status-filter');
    const historyStatusFilter = document.getElementById('history-status-filter');
    const historyDateFilter = document.getElementById('history-date-filter');

    // Current thesis being reviewed
    let currentThesis = null;
    
    // Tab Navigation functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Open preview modal
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Get thesis data from the parent review-item/history-item
            const thesisItem = e.target.closest('.review-item') || e.target.closest('.history-item');
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
    
    // Open rejection modal when reject button is clicked
    rejectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Check if clicked from modal or from list
            if (e.target.closest('.modal')) {
                // User is in preview modal and wants to reject
                previewModal.style.display = 'none';
            }
            
            // Show rejection modal
            rejectionModal.style.display = 'block';
        });
    });
    
    // Close modals when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            previewModal.style.display = 'none';
            rejectionModal.style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === previewModal) {
            previewModal.style.display = 'none';
        }
        if (e.target === rejectionModal) {
            rejectionModal.style.display = 'none';
        }
    });
    
    // Cancel rejection
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            rejectionModal.style.display = 'none';
            document.getElementById('rejection-reason').value = '';
        });
    }
    
    // Confirm rejection
    if (confirmRejectButton) {
        confirmRejectButton.addEventListener('click', () => {
            const rejectionReason = document.getElementById('rejection-reason').value;
            if (rejectionReason.trim() === '') {
                alert('Please provide a reason for rejection.');
                return;
            }
            
            // Process rejection logic here
            processRejection(currentThesis, rejectionReason);
            
            // Close modal and reset form
            rejectionModal.style.display = 'none';
            document.getElementById('rejection-reason').value = '';
            
            // Update UI to reflect changes
            updateReviewCounts();
        });
    }
    
    // Approve thesis
    approveButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Check if clicked from modal or from list
            let thesisToApprove = null;
            
            if (e.target.closest('.modal')) {
                // Approving from the preview modal
                thesisToApprove = currentThesis;
                const reviewComments = document.getElementById('review-comments').value;
                
                // Process approval logic
                processApproval(thesisToApprove, reviewComments);
                
                // Close modal
                previewModal.style.display = 'none';
            } else {
                // Approving directly from the list
                const thesisItem = e.target.closest('.review-item') || e.target.closest('.access-request-item');
                if (thesisItem) {
                    const title = thesisItem.querySelector('h3').textContent;
                    const authorValue = thesisItem.querySelector('.detail-group:nth-child(1) .value').textContent;
                    
                    thesisToApprove = {
                        title: title,
                        author: authorValue
                    };
                    
                    // Process approval logic
                    processApproval(thesisToApprove, '');
                }
            }
            
            // Update UI to reflect changes
            updateReviewCounts();
        });
    });
    
    // Search functionality
    function setupSearch(searchInput, itemSelector) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const items = document.querySelectorAll(itemSelector);
            
            items.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const author = item.querySelector('.detail-group:nth-child(1) .value').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || author.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Setup search for each tab
    if (pendingSearch) setupSearch(pendingSearch, '.review-item');
    if (accessSearch) setupSearch(accessSearch, '.access-request-item');
    if (historySearch) setupSearch(historySearch, '.history-item');

    // Department filter
    if (departmentFilter) {
        departmentFilter.addEventListener('change', () => {
            const selectedDepartment = departmentFilter.value;
            const reviewItems = document.querySelectorAll('.review-item');
            
            reviewItems.forEach(item => {
                const department = item.querySelector('.detail-group:nth-child(2) .value').textContent;
                
                if (selectedDepartment === 'all' || department.toLowerCase().includes(selectedDepartment.toLowerCase())) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Access status filter
    if (accessStatusFilter) {
        accessStatusFilter.addEventListener('change', () => {
            const selectedStatus = accessStatusFilter.value;
            const accessItems = document.querySelectorAll('.access-request-item');
            
            accessItems.forEach(item => {
                const status = item.querySelector('.status').textContent.toLowerCase();
                
                if (selectedStatus === 'all' || status.includes(selectedStatus)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // History status filter
    if (historyStatusFilter) {
        historyStatusFilter.addEventListener('change', () => {
            const selectedStatus = historyStatusFilter.value;
            const historyItems = document.querySelectorAll('.history-item');
            
            historyItems.forEach(item => {
                const status = item.querySelector('.status').textContent.toLowerCase();
                
                if (selectedStatus === 'all' || status.includes(selectedStatus)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // History date filter
    if (historyDateFilter) {
        historyDateFilter.addEventListener('change', () => {
            const selectedDateRange = historyDateFilter.value;
            const historyItems = document.querySelectorAll('.history-item');
            const currentDate = new Date();
            
            historyItems.forEach(item => {
                const dateText = item.querySelector('.detail-group:nth-child(3) .value').textContent;
                const reviewDate = new Date(dateText);
                let showItem = true;
                
                if (selectedDateRange !== 'all') {
                    const diffTime = Math.abs(currentDate - reviewDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    if (selectedDateRange === 'week' && diffDays > 7) {
                        showItem = false;
                    } else if (selectedDateRange === 'month' && diffDays > 30) {
                        showItem = false;
                    } else if (selectedDateRange === 'year' && diffDays > 365) {
                        showItem = false;
                    }
                }
                
                item.style.display = showItem ? 'block' : 'none';
            });
        });
    }
    
    // Process approval function
    function processApproval(thesis, comments) {
        console.log(`Approved: ${thesis.title}`);
        console.log(`Comments: ${comments}`);
        
        // In a real application, this would send data to the server
        // For this example, we'll just simulate the change in the UI
        
        // Find the thesis item in the list and remove it
        const thesisItems = document.querySelectorAll('.review-item, .access-request-item');
        thesisItems.forEach(item => {
            const title = item.querySelector('h3').textContent;
            if (title === thesis.title) {
                // Clone the item for history before removing it
                const historyItem = createHistoryItem(thesis, 'approved');
                document.querySelector('.history-list').prepend(historyItem);
                
                // Remove from pending list
                item.remove();
            }
        });
        
        // Show a confirmation message
        alert(`Thesis "${thesis.title}" has been approved.`);
    }
    
    // Process rejection function
    function processRejection(thesis, reason) {
        console.log(`Rejected: ${thesis.title}`);
        console.log(`Reason: ${reason}`);
        
        // In a real application, this would send data to the server
        // For this example, we'll just simulate the change in the UI
        
        // Find the thesis item in the list and remove it
        const thesisItems = document.querySelectorAll('.review-item, .access-request-item');
        thesisItems.forEach(item => {
            const title = item.querySelector('h3').textContent;
            if (title === thesis.title) {
                // Clone the item for history before removing it
                const historyItem = createHistoryItem(thesis, 'rejected');
                document.querySelector('.history-list').prepend(historyItem);
                
                // Remove from pending list
                item.remove();
            }
        });
        
        // Show a confirmation message
        alert(`Thesis "${thesis.title}" has been rejected. Reason: ${reason}`);
    }
    
    // Create history item
    function createHistoryItem(thesis, status) {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const currentUser = 'Dr. Samantha Lee'; // This would come from the logged-in user in a real app
        const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        historyItem.innerHTML = `
            <div class="history-header">
                <h3>${thesis.title}</h3>
                <span class="status ${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
            </div>
            <div class="history-details">
                <div class="detail-group">
                    <span class="label">Submitted by:</span>
                    <span class="value">${thesis.author}</span>
                </div>
                <div class="detail-group">
                    <span class="label">Reviewed by:</span>
                    <span class="value">${currentUser}</span>
                </div>
                <div class="detail-group">
                    <span class="label">Review Date:</span>
                    <span class="value">${currentDate}</span>
                </div>
            </div>
            <div class="history-actions">
                <button class="btn view-btn"><i class="fas fa-eye"></i> View Details</button>
            </div>
        `;
        
        // Add event listener to the new view button
        const newViewBtn = historyItem.querySelector('.view-btn');
        newViewBtn.addEventListener('click', () => {
            document.getElementById('modal-thesis-title').textContent = thesis.title;
            document.getElementById('modal-thesis-authors').innerHTML = `<strong>Authors:</strong> ${thesis.author}`;
            if (thesis.department) {
                document.getElementById('modal-thesis-department').innerHTML = `<strong>Department:</strong> ${thesis.department}`;
            }
            document.getElementById('modal-thesis-date').innerHTML = `<strong>Submitted:</strong> ${thesis.date || currentDate}`;
            
            currentThesis = thesis;
            previewModal.style.display = 'block';
        });
        
        return historyItem;
    }
    
    // Update review counts on the dashboard
    function updateReviewCounts() {
        const pendingCount = document.querySelectorAll('.review-item').length;
        const approvedCount = parseInt(document.getElementById('approved-count').textContent) + 1;
        const rejectedCount = parseInt(document.getElementById('rejected-count').textContent);
        
        document.getElementById('pending-reviews').textContent = pendingCount;
        document.getElementById('approved-count').textContent = approvedCount;
        
        // Calculate and update average review time (this would be more sophisticated in a real app)
        const avgReviewTime = (approvedCount > 0) ? ((approvedCount * 2.3) / (approvedCount + 1)).toFixed(1) : '0';
        document.getElementById('avg-review-time').textContent = `${avgReviewTime} days`;
    }

    // Logout confirmation
    window.confirmLogout = function() {
        return confirm("Are you sure you want to logout?");
    };
});