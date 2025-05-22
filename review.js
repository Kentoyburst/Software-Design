document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const submissionsList = document.querySelector('.submissions-list');
    const reviewModal = document.getElementById('review-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const closeReviewBtn = document.getElementById('close-review');
    const submitReviewBtn = document.getElementById('submit-review');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const filterStatus = document.getElementById('filter-status');
    const notification = document.getElementById('notification');

    // Mock data for submissions
    const submissionsData = [
        {
            id: 1,
            title: "Machine Learning Applications in Healthcare",
            authors: "Maria Rodriguez, John Smith",
            department: "Computer Science",
            advisor: "Dr. Sarah Johnson",
            submissionDate: "March 28, 2025",
            status: "pending",
            year: "2025",
            abstract: "This thesis explores the application of machine learning algorithms in healthcare, specifically focusing on early disease detection and personalized treatment plans. The research demonstrates how various ML techniques can be utilized to analyze medical data, improving diagnostic accuracy and patient outcomes while reducing healthcare costs.",
            keywords: ["Machine Learning", "Healthcare", "AI", "Disease Detection", "Data Analysis"],
            documentUrl: "#"
        },
        {
            id: 2,
            title: "Sustainable Urban Development: A Case Study of Eco-Cities",
            authors: "Emily Chen",
            department: "Engineering",
            advisor: "Prof. James Wilson",
            submissionDate: "March 25, 2025",
            status: "pending",
            year: "2025",
            abstract: "This research examines the principles and practices of sustainable urban development through a detailed analysis of eco-cities around the world. The thesis identifies key success factors and challenges in implementing sustainability measures in urban planning, providing a framework for future development projects.",
            keywords: ["Urban Planning", "Sustainability", "Eco-Cities", "Environmental Engineering", "Green Infrastructure"],
            documentUrl: "#"
        },
        {
            id: 3,
            title: "Blockchain Technology in Supply Chain Management",
            authors: "Michael Thompson, Lisa Garcia",
            department: "Business",
            advisor: "Dr. Robert Brown",
            submissionDate: "March 22, 2025",
            status: "approved",
            year: "2025",
            abstract: "This thesis investigates the application of blockchain technology in supply chain management, analyzing its potential to enhance transparency, traceability, and efficiency. The research includes case studies of companies that have implemented blockchain solutions and evaluates the impact on their operations and stakeholder trust.",
            keywords: ["Blockchain", "Supply Chain", "Logistics", "Transparency", "Business Technology"],
            documentUrl: "#"
        },
        {
            id: 4,
            title: "The Impact of Social Media on Political Discourse",
            authors: "David Wilson",
            department: "Arts and Sciences",
            advisor: "Prof. Amanda Lee",
            submissionDate: "March 20, 2025",
            status: "rejected",
            year: "2025",
            abstract: "This thesis examines how social media platforms have transformed political discourse in the digital age. Through content analysis and survey research, the study explores changes in communication patterns, polarization effects, and the democratization of political participation in online spaces.",
            keywords: ["Social Media", "Political Discourse", "Digital Communication", "Democracy", "Public Opinion"],
            documentUrl: "#"
        },
        {
            id: 5,
            title: "Renewable Energy Integration in Smart Grids",
            authors: "Jennifer Park, Thomas Moore",
            department: "Engineering",
            advisor: "Dr. Richard Taylor",
            submissionDate: "March 18, 2025",
            status: "revisions",
            year: "2025",
            abstract: "This research explores strategies for efficiently integrating renewable energy sources into smart grid systems. The thesis proposes a novel optimization algorithm that addresses the intermittency challenges of renewable generation while maintaining grid stability and minimizing energy costs.",
            keywords: ["Renewable Energy", "Smart Grid", "Energy Efficiency", "Optimization", "Sustainable Power"],
            documentUrl: "#"
        }
    ];

    // Initialize the page
    function init() {
        loadSubmissions();
        setupEventListeners();
    }

    // Load submissions based on current filter
    function loadSubmissions() {
        // Clear current list
        submissionsList.innerHTML = '';
        
        // Get filtered data
        const currentFilter = filterStatus.value;
        const searchTerm = searchInput.value.toLowerCase();
        
        const filteredSubmissions = submissionsData.filter(submission => {
            const matchesStatus = currentFilter === 'all' || submission.status === currentFilter;
            const matchesSearch = 
                submission.title.toLowerCase().includes(searchTerm) ||
                submission.authors.toLowerCase().includes(searchTerm) ||
                submission.department.toLowerCase().includes(searchTerm);
            
            return matchesStatus && matchesSearch;
        });
        
        // Display submissions or empty state
        if (filteredSubmissions.length === 0) {
            submissionsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-file-alt"></i>
                    <h4>No submissions found</h4>
                    <p>Try changing your filter or search criteria</p>
                </div>
            `;
        } else {
            filteredSubmissions.forEach(submission => {
                submissionsList.appendChild(createSubmissionItem(submission));
            });
        }
    }

    // Create a submission list item
    function createSubmissionItem(submission) {
        const submissionItem = document.createElement('div');
        submissionItem.className = 'submission-item';
        submissionItem.dataset.id = submission.id;
        
        // Status label and icon
        let statusIcon, statusClass, statusText;
        
        switch(submission.status) {
            case 'pending':
                statusIcon = 'fa-clock';
                statusClass = 'status-pending';
                statusText = 'Pending Review';
                break;
            case 'approved':
                statusIcon = 'fa-check-circle';
                statusClass = 'status-approved';
                statusText = 'Approved';
                break;
            case 'rejected':
                statusIcon = 'fa-times-circle';
                statusClass = 'status-rejected';
                statusText = 'Rejected';
                break;
            case 'revisions':
                statusIcon = 'fa-edit';
                statusClass = 'status-revisions';
                statusText = 'Needs Revisions';
                break;
            case 'reviewer_pending':
                statusIcon = 'fa-user-check';
                statusClass = 'status-reviewer-pending';
                statusText = 'Waiting Final Review';
                break;
        }
        
        submissionItem.innerHTML = `
            <div class="submission-icon">
                <i class="fas fa-file-pdf"></i>
            </div>
            <div class="submission-details">
                <div class="submission-title">${submission.title}</div>
                <div class="submission-meta">
                    <span><i class="fas fa-user"></i> ${submission.authors}</span>
                    <span><i class="fas fa-building"></i> ${submission.department}</span>
                    <span><i class="fas fa-calendar"></i> ${submission.submissionDate}</span>
                </div>
                <div>
                    <span class="submission-status ${statusClass}">
                        <i class="fas ${statusIcon}"></i> ${statusText}
                    </span>
                </div>
            </div>
            <div class="submission-actions">
                <button class="action-btn review" title="Review Submission">
                    <i class="fas fa-tasks"></i>
                </button>
                <button class="action-btn delete" title="Delete Submission">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        // Add event listeners to buttons
        const reviewBtn = submissionItem.querySelector('.action-btn.review');
        reviewBtn.addEventListener('click', () => {
            openReviewModal(submission);
        });
        
        const deleteBtn = submissionItem.querySelector('.action-btn.delete');
        deleteBtn.addEventListener('click', () => {
            confirmDelete(submission);
        });
        
        return submissionItem;
    }

    // Open the review modal with submission details
    function openReviewModal(submission) {
        // Populate modal with submission details
        document.getElementById('modal-thesis-title').textContent = submission.title;
        document.getElementById('modal-submission-date').textContent = `Submitted: ${submission.submissionDate}`;
        document.getElementById('modal-authors').textContent = submission.authors;
        document.getElementById('modal-department').textContent = submission.department;
        document.getElementById('modal-advisor').textContent = submission.advisor;
        document.getElementById('modal-year').textContent = submission.year;
        document.getElementById('modal-abstract').textContent = submission.abstract;
        
        // Set review status based on current status
        const reviewStatus = document.getElementById('review-status');
        reviewStatus.innerHTML = '';
        
        // Add "Send to Reviewer" option
        const sendToReviewerOption = document.createElement('option');
        sendToReviewerOption.value = 'reviewer_pending';
        sendToReviewerOption.textContent = 'Send to Reviewer';
        reviewStatus.appendChild(sendToReviewerOption);
        
        // Add other status options
        const approveOption = document.createElement('option');
        approveOption.value = 'approved';
        approveOption.textContent = 'Approve';
        reviewStatus.appendChild(approveOption);
        
        const revisionsOption = document.createElement('option');
        revisionsOption.value = 'revisions';
        revisionsOption.textContent = 'Request Revisions';
        reviewStatus.appendChild(revisionsOption);
        
        const rejectOption = document.createElement('option');
        rejectOption.value = 'rejected';
        rejectOption.textContent = 'Reject';
        reviewStatus.appendChild(rejectOption);
        
        // Set default value based on current status
        if (submission.status === 'pending') {
            reviewStatus.value = 'reviewer_pending'; // Default to sending to reviewer for pending
        } else {
            reviewStatus.value = submission.status;
        }
        
        // Clear previous comments
        document.getElementById('review-comments').value = '';
        
        // Set document links
        const viewDocumentLink = document.getElementById('view-document');
        const downloadDocumentLink = document.getElementById('download-document');
        viewDocumentLink.href = submission.documentUrl;
        downloadDocumentLink.href = submission.documentUrl;
        
        // Populate keywords
        const keywordsContainer = document.getElementById('modal-keywords');
        keywordsContainer.innerHTML = '';
        submission.keywords.forEach(keyword => {
            const keywordTag = document.createElement('span');
            keywordTag.className = 'keyword-tag';
            keywordTag.textContent = keyword;
            keywordsContainer.appendChild(keywordTag);
        });
        
        // Store current submission ID for submission
        submitReviewBtn.dataset.submissionId = submission.id;
        
        // Show modal with animation
        reviewModal.style.display = 'block';
        setTimeout(() => {
            reviewModal.style.opacity = '1';
        }, 10);
    }

    // Close the review modal
    function closeReviewModal() {
        reviewModal.style.opacity = '0';
        setTimeout(() => {
            reviewModal.style.display = 'none';
        }, 300);
    }

    // Handle review submission
    function submitReview() {
        const submissionId = submitReviewBtn.dataset.submissionId;
        const status = document.getElementById('review-status').value;
        const comments = document.getElementById('review-comments').value;
        
        // Validate input
        if (!comments.trim()) {
            alert('Please provide comments for your review.');
            return;
        }
        
        // Update submission status in mock data
        const submissionIndex = submissionsData.findIndex(s => s.id == submissionId);
        if (submissionIndex !== -1) {
            submissionsData[submissionIndex].status = status;
            submissionsData[submissionIndex].adminComments = comments;
            
            // If status is "Send to Reviewer", send to reviewer system
            if (status === 'reviewer_pending') {
                sendToReviewer(submissionsData[submissionIndex]);
            }
            
            // Close modal
            closeReviewModal();
            
            // Show notification
            showNotification();
            
            // Reload submissions list
            loadSubmissions();
        }
    }

    // Send to reviewer system
    function sendToReviewer(submission) {
        // In a real application, this would make an API call to add the submission
        // to the reviewer's queue. For this demo, we'll simulate it by storing in localStorage.
        
        // Get existing reviewer queue from localStorage or initialize empty array
        let reviewerQueue = JSON.parse(localStorage.getItem('reviewerQueue')) || [];
        
        // Add submission to queue if not already present
        const existingIndex = reviewerQueue.findIndex(item => item.id === submission.id);
        if (existingIndex === -1) {
            reviewerQueue.push({
                ...submission,
                adminApprovalDate: new Date().toISOString()
            });
        } else {
            // Update existing entry
            reviewerQueue[existingIndex] = {
                ...submission,
                adminApprovalDate: new Date().toISOString()
            };
        }
        
        // Save updated queue back to localStorage
        localStorage.setItem('reviewerQueue', JSON.stringify(reviewerQueue));
        
        console.log(`Thesis "${submission.title}" sent to reviewer for final review.`);
    }

    // Confirm delete action
    function confirmDelete(submission) {
        if (confirm(`Are you sure you want to delete "${submission.title}"? This action cannot be undone.`)) {
            // Remove submission from mock data
            const index = submissionsData.findIndex(s => s.id === submission.id);
            if (index !== -1) {
                submissionsData.splice(index, 1);
                loadSubmissions();
            }
        }
    }

    // Show success notification
    function showNotification() {
        // Customize notification message based on action
        const status = document.getElementById('review-status').value;
        let notificationText = 'Review submitted successfully!';
        
        if (status === 'reviewer_pending') {
            notificationText = 'Thesis sent to reviewer for final review!';
        }
        
        // Update notification content
        document.querySelector('.notification-content p').textContent = notificationText;
        
        // Show notification
        notification.style.display = 'block';
        notification.style.opacity = '1';
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300);
        }, 3000);
    }

    // Setup event listeners
    function setupEventListeners() {
        // Modal close buttons
        closeModalBtn.addEventListener('click', closeReviewModal);
        closeReviewBtn.addEventListener('click', closeReviewModal);
        
        // Submit review
        submitReviewBtn.addEventListener('click', submitReview);
        
        // Search and filter
        searchButton.addEventListener('click', loadSubmissions);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                loadSubmissions();
            }
        });
        
        filterStatus.addEventListener('change', loadSubmissions);
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === reviewModal) {
                closeReviewModal();
            }
        });
    }

    // Logout confirmation
    window.confirmLogout = function() {
        if (confirm("Are you sure you want to logout?")) {
            window.location.href = "index.html";
        }
    };
    
    // Initialize the page
    init();
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .notification {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .submission-item {
            animation: fadeIn 0.5s ease forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .status-reviewer-pending {
            background-color: #6c5ce7;
            color: white;
        }
    `;
    document.head.appendChild(style);
});