document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const searchInput = document.getElementById('search-requests');
    const searchBtn = document.querySelector('.search-btn');
    const statusFilter = document.getElementById('status-filter');
    const dateFilter = document.getElementById('date-filter');
    const departmentFilter = document.getElementById('department-filter');
    const requestRows = document.querySelectorAll('.request-row');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pageIndicator = document.querySelector('.page-indicator');
    const modal = document.getElementById('request-modal');
    const closeModalBtn = modal.querySelector('.close-btn');
    const modalApproveBtn = document.getElementById('modal-approve-btn');
    const modalRejectBtn = document.getElementById('modal-reject-btn');
    
    // Modal elements
    const modalRequestId = document.getElementById('modal-request-id');
    const modalRequestDate = document.getElementById('modal-request-date');
    const modalRequestStatus = document.getElementById('modal-request-status');
    const modalRequestorName = document.getElementById('modal-requestor-name');
    const modalRequestorEmail = document.getElementById('modal-requestor-email');
    const modalRequestorAffiliation = document.getElementById('modal-requestor-affiliation');
    const modalRequestorDepartment = document.getElementById('modal-requestor-department');
    const modalThesisTitle = document.getElementById('modal-thesis-title');
    const modalThesisAuthors = document.getElementById('modal-thesis-authors');
    const modalThesisDepartment = document.getElementById('modal-thesis-department');
    const modalThesisYear = document.getElementById('modal-thesis-year');
    const modalRequestPurpose = document.getElementById('modal-request-purpose');
    const modalRequestReason = document.getElementById('modal-request-reason');
    const reviewerComments = document.getElementById('reviewer-comments');
    
    // Pagination settings
    let currentPage = 1;
    const rowsPerPage = 7;
    const totalPages = Math.ceil(requestRows.length / rowsPerPage);
    
    // Sample request data (in a real application, this would come from a database)
    const requestsData = {
        'REQ-2025-042': {
            id: 'REQ-2025-042',
            date: 'May 15, 2025',
            status: 'pending',
            requestor: {
                name: 'Sarah Johnson',
                email: 'sjohnson@email.com',
                affiliation: 'Graduate Student',
                department: 'Engineering'
            },
            thesis: {
                title: 'Urban Planning Solutions for Traffic Congestion',
                authors: 'James Wilson, Maria Garcia',
                department: 'Engineering',
                year: '2023'
            },
            purpose: 'Research',
            reason: 'I am conducting research on urban planning strategies for my graduate thesis. This thesis contains important case studies and methodologies that would be valuable for my research on traffic congestion solutions in developing urban centers.'
        },
        'REQ-2025-041': {
            id: 'REQ-2025-041',
            date: 'May 14, 2025',
            status: 'pending',
            requestor: {
                name: 'Michael Lee',
                email: 'mlee@email.com',
                affiliation: 'Faculty',
                department: 'Engineering'
            },
            thesis: {
                title: 'Analysis of Sustainable Building Materials for Tropical Climates',
                authors: 'Ana Rodriguez, John Smith',
                department: 'Engineering',
                year: '2022'
            },
            purpose: 'Academic Project',
            reason: 'I am leading a research project on sustainable building materials and need this thesis as a reference for my students working on the project.'
        },
        'REQ-2025-040': {
            id: 'REQ-2025-040',
            date: 'May 13, 2025',
            status: 'approved',
            requestor: {
                name: 'Lisa Wong',
                email: 'lwong@email.com',
                affiliation: 'Graduate Student',
                department: 'Business'
            },
            thesis: {
                title: 'Financial Analysis of Renewable Energy Investments',
                authors: 'Daniel Park, Elizabeth Chen',
                department: 'Business',
                year: '2024'
            },
            purpose: 'Research',
            reason: 'This thesis is directly related to my dissertation research on financial models for renewable energy adoption in developing markets.'
        },
        'REQ-2025-039': {
            id: 'REQ-2025-039',
            date: 'May 12, 2025',
            status: 'approved',
            requestor: {
                name: 'Robert Garcia',
                email: 'rgarcia@email.com',
                affiliation: 'Undergrad Student',
                department: 'Arts'
            },
            thesis: {
                title: 'Biodiversity Assessment of Campus Flora',
                authors: 'Maria Santos, Paul Johnson',
                department: 'Arts',
                year: '2021'
            },
            purpose: 'Research',
            reason: 'I am working on a similar biodiversity assessment for my senior thesis and would like to reference the methodology used in this work.'
        },
        'REQ-2025-038': {
            id: 'REQ-2025-038',
            date: 'May 11, 2025',
            status: 'rejected',
            requestor: {
                name: 'Thomas Brown',
                email: 'tbrown@email.com',
                affiliation: 'External Researcher',
                department: 'Computer Science'
            },
            thesis: {
                title: 'Development of Machine Learning Algorithm for Predicting Student Performance',
                authors: 'Jennifer Kim, David Wilson',
                department: 'Computer Science',
                year: '2023'
            },
            purpose: 'Academic Project',
            reason: 'I am developing a similar algorithm and would like to compare methodologies with this thesis.'
        },
        'REQ-2025-037': {
            id: 'REQ-2025-037',
            date: 'May 10, 2025',
            status: 'pending',
            requestor: {
                name: 'Emma Davis',
                email: 'edavis@email.com',
                affiliation: 'Faculty',
                department: 'Engineering'
            },
            thesis: {
                title: 'Study of Traditional Architecture Influences on Modern Building Design',
                authors: 'Carlos Mendez, Sofia Lee',
                department: 'Engineering',
                year: '2022'
            },
            purpose: 'Research',
            reason: 'I am writing a book on architectural influences and would like to cite this thesis as a reference.'
        },
        'REQ-2025-036': {
            id: 'REQ-2025-036',
            date: 'May 9, 2025',
            status: 'approved',
            requestor: {
                name: 'David Wilson',
                email: 'dwilson@email.com',
                affiliation: 'Graduate Student',
                department: 'Psychology'
            },
            thesis: {
                title: 'Impact of Social Media on Student Mental Health',
                authors: 'Rachel Adams, Michael Chen',
                department: 'Psychology',
                year: '2024'
            },
            purpose: 'Academic Project',
            reason: 'I am conducting follow-up research on this topic and would like to build upon the findings of this thesis.'
        }
    };
    
    // Initialize counters
    updateRequestCounters();
    
    // Initialize pagination
    updatePagination();
    
    // Search functionality
    searchBtn.addEventListener('click', function() {
        filterAndDisplayRequests();
    });
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterAndDisplayRequests();
        }
    });
    
    // Filter change events
    statusFilter.addEventListener('change', filterAndDisplayRequests);
    dateFilter.addEventListener('change', filterAndDisplayRequests);
    departmentFilter.addEventListener('change', filterAndDisplayRequests);
    
    // Pagination controls
    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });
    
    // View request buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const requestId = this.getAttribute('data-id');
            showRequestDetails(requestId);
        });
    });
    
    // Approve/Reject buttons in table
    document.querySelectorAll('.approve-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const requestId = this.getAttribute('data-id');
            approveRequest(requestId);
        });
    });
    
    document.querySelectorAll('.reject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const requestId = this.getAttribute('data-id');
            rejectRequest(requestId);
        });
    });
    
    // Modal close button
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Modal approve/reject buttons
    modalApproveBtn.addEventListener('click', function() {
        const requestId = modalRequestId.textContent;
        const comments = reviewerComments.value;
        approveRequest(requestId, comments);
        modal.style.display = 'none';
    });
    
    modalRejectBtn.addEventListener('click', function() {
        const requestId = modalRequestId.textContent;
        const comments = reviewerComments.value;
        rejectRequest(requestId, comments);
        modal.style.display = 'none';
    });
    
    // Click outside to close modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Show request details in modal
    function showRequestDetails(requestId) {
        const requestData = requestsData[requestId];
        
        if (requestData) {
            // Populate modal with request data
            modalRequestId.textContent = requestData.id;
            modalRequestDate.textContent = requestData.date;
            
            // Update status with correct class
            modalRequestStatus.textContent = capitalizeFirstLetter(requestData.status);
            modalRequestStatus.className = `value status ${requestData.status}`;
            
            // Requestor information
            modalRequestorName.textContent = requestData.requestor.name;
            modalRequestorEmail.textContent = requestData.requestor.email;
            modalRequestorAffiliation.textContent = requestData.requestor.affiliation;
            modalRequestorDepartment.textContent = requestData.requestor.department;
            
            // Thesis information
            modalThesisTitle.textContent = requestData.thesis.title;
            modalThesisAuthors.textContent = requestData.thesis.authors;
            modalThesisDepartment.textContent = requestData.thesis.department;
            modalThesisYear.textContent = requestData.thesis.year;
            
            // Request details
            modalRequestPurpose.textContent = requestData.purpose;
            modalRequestReason.textContent = requestData.reason;
            
            // Clear previous comments
            reviewerComments.value = '';
            
            // Show/hide approve/reject buttons based on status
            if (requestData.status === 'pending') {
                modalApproveBtn.style.display = 'block';
                modalRejectBtn.style.display = 'block';
            } else {
                modalApproveBtn.style.display = 'none';
                modalRejectBtn.style.display = 'none';
            }
            
            // Display the modal
            modal.style.display = 'block';
        }
    }
    
    // Approve request function
    function approveRequest(requestId, comments = '') {
        // In a real application, this would make an API call
        console.log(`Request ${requestId} approved with comments: ${comments}`);
        
        // Update request data
        if (requestsData[requestId]) {
            requestsData[requestId].status = 'approved';
        }
        
        // Update UI
        const row = document.querySelector(`.request-row[data-id="${requestId}"]`);
        if (row) {
            const statusCell = row.querySelector('.status');
            statusCell.textContent = 'Approved';
            statusCell.className = 'status approved';
            
            // Remove approve/reject buttons
            const actionCell = row.querySelector('.action-buttons');
            actionCell.innerHTML = '<button class="btn view-btn" data-id="' + requestId + '"><i class="fas fa-eye"></i></button>';
            
            // Re-attach event listener to the new view button
            actionCell.querySelector('.view-btn').addEventListener('click', function() {
                showRequestDetails(requestId);
            });
        }
        
        // Update counters
        updateRequestCounters();
        
        // Show success message
        showNotification(`Request ${requestId} has been approved successfully.`, 'success');
    }
    
    // Reject request function
    function rejectRequest(requestId, comments = '') {
        // Validate that comments are provided for rejections
        if (comments.trim() === '' && modal.style.display === 'block') {
            alert('Please provide comments explaining the reason for rejection.');
            return;
        }
        
        // In a real application, this would make an API call
        console.log(`Request ${requestId} rejected with comments: ${comments}`);
        
        // Update request data
        if (requestsData[requestId]) {
            requestsData[requestId].status = 'rejected';
        }
        
        // Update UI
        const row = document.querySelector(`.request-row[data-id="${requestId}"]`);
        if (row) {
            const statusCell = row.querySelector('.status');
            statusCell.textContent = 'Rejected';
            statusCell.className = 'status rejected';
            
            // Remove approve/reject buttons
            const actionCell = row.querySelector('.action-buttons');
            actionCell.innerHTML = '<button class="btn view-btn" data-id="' + requestId + '"><i class="fas fa-eye"></i></button>';
            
            // Re-attach event listener to the new view button
            actionCell.querySelector('.view-btn').addEventListener('click', function() {
                showRequestDetails(requestId);
            });
        }
        
        // Update counters
        updateRequestCounters();
        
        // Show success message
        showNotification(`Request ${requestId} has been rejected.`, 'error');
    }
    
    // Filter and display requests
    function filterAndDisplayRequests() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusValue = statusFilter.value;
        const dateValue = dateFilter.value;
        const departmentValue = departmentFilter.value;
        
        requestRows.forEach(row => {
            const requestId = row.getAttribute('data-id');
            const requestorName = row.children[1].textContent.toLowerCase();
            const thesisTitle = row.children[2].textContent.toLowerCase();
            const department = row.children[3].textContent.toLowerCase();
            const dateRequested = row.children[4].textContent;
            const status = row.querySelector('.status').textContent.toLowerCase();
            
            // Search filter
            const matchesSearch = searchTerm === '' || 
                requestorName.includes(searchTerm) || 
                thesisTitle.includes(searchTerm) || 
                department.includes(searchTerm);
            
            // Status filter
            const matchesStatus = statusValue === 'all' || status === statusValue.toLowerCase();
            
            // Department filter
            const matchesDepartment = departmentValue === 'all' || 
                department.toLowerCase() === departmentValue.replace('-', ' ');
            
            // Date filter
            let matchesDate = true;
            if (dateValue !== 'all') {
                const requestDate = new Date(dateRequested);
                const today = new Date();
                
                if (dateValue === 'today') {
                    matchesDate = requestDate.toDateString() === today.toDateString();
                } else if (dateValue === 'week') {
                    const weekAgo = new Date();
                    weekAgo.setDate(today.getDate() - 7);
                    matchesDate = requestDate >= weekAgo;
                } else if (dateValue === 'month') {
                    const monthAgo = new Date();
                    monthAgo.setMonth(today.getMonth() - 1);
                    matchesDate = requestDate >= monthAgo;
                }
            }
            
            // Display row if it matches all filters
            if (matchesSearch && matchesStatus && matchesDepartment && matchesDate) {
                row.classList.remove('hidden');
            } else {
                row.classList.add('hidden');
            }
        });
        
        // Reset pagination to page 1
        currentPage = 1;
        updatePagination();
    }
    
    // Update pagination
    function updatePagination() {
        const visibleRows = Array.from(requestRows).filter(row => !row.classList.contains('hidden'));
        const totalVisiblePages = Math.ceil(visibleRows.length / rowsPerPage);
        
        // Update page indicator
        pageIndicator.textContent = `Page ${currentPage} of ${totalVisiblePages || 1}`;
        
        // Enable/disable pagination buttons
        prevBtn.disabled = currentPage <= 1;
        nextBtn.disabled = currentPage >= totalVisiblePages || totalVisiblePages === 0;
        
        // Show/hide rows based on current page
        visibleRows.forEach((row, index) => {
            const startIndex = (currentPage - 1) * rowsPerPage;
            const endIndex = startIndex + rowsPerPage - 1;
            
            if (index >= startIndex && index <= endIndex) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    // Update request counters
    function updateRequestCounters() {
        const pendingCount = document.querySelectorAll('.status.pending').length;
        const approvedCount = document.querySelectorAll('.status.approved').length;
        const rejectedCount = document.querySelectorAll('.status.rejected').length;
        
        document.getElementById('pending-requests').textContent = pendingCount;
        document.getElementById('approved-requests').textContent = approvedCount;
        document.getElementById('rejected-requests').textContent = rejectedCount;
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Show with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Add close button functionality
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Add this extra CSS for notifications
    addNotificationStyles();
    
    function addNotificationStyles() {
        const style = document.createElement('style');
        style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            min-width: 300px;
            background: white;
            border-radius: 5px;
            padding: 15px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            justify-content: space-between;
            align-items: center;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification.success {
            border-left: 4px solid #28a745;
        }
        
        .notification.error {
            border-left: 4px solid #dc3545;
        }
        
        .notification.info {
            border-left: 4px solid #17a2b8;
        }
        
        .notification i {
            font-size: 20px;
        }
        
        .notification.success i {
            color: #28a745;
        }
        
        .notification.error i {
            color: #dc3545;
        }
        
        .notification.info i {
            color: #17a2b8;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #888;
            cursor: pointer;
            font-size: 16px;
            padding: 0;
        }
        
        .notification-close:hover {
            color: #333;
        }
        
        .hidden {
            display: none;
        }
        `;
        document.head.appendChild(style);
    }
    
    // Extra function to simulate confirmation dialog for logout
    window.confirmLogout = function() {
        return confirm('Are you sure you want to logout?');
    };
});