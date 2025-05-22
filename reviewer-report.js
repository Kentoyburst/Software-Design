// Reviewer Reports JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initializeCharts();
    initializeTable();
    initializeModal();
    initializeFilters();
    initializeExportPrint();
});

// Initialize Charts
function initializeCharts() {
    // This is a placeholder for actual chart implementations
    // In a real application, you would use a library like Chart.js or D3.js
    
    console.log("Charts initialized");
    
    // Example implementation with Chart.js would look like:
    /*
    const reviewActivityCtx = document.getElementById('review-activity-chart').getContext('2d');
    const reviewActivityChart = new Chart(reviewActivityCtx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [{
                label: 'Approved Reviews',
                data: [3, 5, 4, 6, 5],
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                tension: 0.4
            }, {
                label: 'Rejected Reviews',
                data: [1, 0, 2, 0, 0],
                borderColor: '#dc3545',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                tension: 0.4
            }, {
                label: 'Pending Reviews',
                data: [2, 1, 3, 2, 3],
                borderColor: '#ffc107',
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
    */
    
    // Period selector for trend chart
    const trendPeriodSelect = document.getElementById('trend-period');
    if (trendPeriodSelect) {
        trendPeriodSelect.addEventListener('change', function() {
            updateChartPeriod(this.value);
        });
    }
}

// Function to update chart period
function updateChartPeriod(period) {
    console.log(`Chart period updated to: ${period}`);
    // In a real implementation, this would update the chart data based on the selected period
}

// Initialize Table Functionality
function initializeTable() {
    // Add sorting functionality to table headers
    const tableHeaders = document.querySelectorAll('.reports-table th');
    tableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            sortTable(this);
        });
    });
    
    // Add row click functionality to open modal
    const tableRows = document.querySelectorAll('.reports-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            if (!e.target.closest('.action-btn')) {
                openDetailsModal(this);
            }
        });
    });
    
    // Add functionality to view buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent row click event
            const row = this.closest('tr');
            openDetailsModal(row);
        });
    });
    
    // Add search functionality
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-btn');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            searchTable(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchTable(this.value);
            }
        });
    }
    
    // Add pagination functionality
    const paginationButtons = document.querySelectorAll('.page-btn');
    paginationButtons.forEach(button => {
        if (!button.classList.contains('active')) {
            button.addEventListener('click', function() {
                changePage(this);
            });
        }
    });
}

// Function to sort table
function sortTable(header) {
    const table = header.closest('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const headerIndex = Array.from(header.parentElement.children).indexOf(header);
    const isAscending = header.getAttribute('data-sort') === 'asc';
    
    // Update header sort direction
    document.querySelectorAll('th').forEach(th => {
        th.removeAttribute('data-sort');
        th.querySelector('i').className = 'fas fa-sort';
    });
    
    header.setAttribute('data-sort', isAscending ? 'desc' : 'asc');
    header.querySelector('i').className = isAscending ? 'fas fa-sort-down' : 'fas fa-sort-up';
    
    // Sort rows
    rows.sort((a, b) => {
        const aValue = a.children[headerIndex].textContent.trim();
        const bValue = b.children[headerIndex].textContent.trim();
        
        // Special case for dates
        if (isDate(aValue) && isDate(bValue)) {
            const aDate = new Date(aValue);
            const bDate = new Date(bValue);
            return isAscending ? bDate - aDate : aDate - bDate;
        }
        
        // Special case for status
        if (a.children[headerIndex].querySelector('.status-badge')) {
            return isAscending ? 
                bValue.localeCompare(aValue) : 
                aValue.localeCompare(bValue);
        }
        
        // Default sorting for text
        return isAscending ? 
            bValue.localeCompare(aValue) : 
            aValue.localeCompare(bValue);
    });
    
    // Reattach sorted rows to tbody
    rows.forEach(row => tbody.appendChild(row));
}

// Function to check if a string is a date
function isDate(dateStr) {
    const dateRegex = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{1,2},\s\d{4}$/;
    return dateRegex.test(dateStr);
}

// Function to search table
function searchTable(query) {
    query = query.toLowerCase();
    const rows = document.querySelectorAll('.reports-table tbody tr');
    
    rows.forEach(row => {
        const title = row.querySelector('td:first-child').textContent.toLowerCase();
        const author = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const department = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        
        if (title.includes(query) || author.includes(query) || department.includes(query)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Function to change page
function changePage(button) {
    // Remove active class from current active button
    document.querySelector('.page-btn.active').classList.remove('active');
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // In a real application, this would update the table data
    console.log(`Changed to page ${button.textContent.trim()}`);
}

// Initialize Modal Functionality
function initializeModal() {
    const modal = document.getElementById('details-modal');
    const closeButton = modal.querySelector('.close-btn');
    
    // Close modal when clicking close button
    closeButton.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Function to open details modal
function openDetailsModal(row) {
    const modal = document.getElementById('details-modal');
    
    // Get data from table row
    const title = row.querySelector('td:first-child').textContent;
    const author = row.querySelector('td:nth-child(2)').textContent;
    const department = row.querySelector('td:nth-child(3)').textContent;
    const status = row.querySelector('.status-badge').textContent;
    
    // Update modal content
    document.getElementById('modal-thesis-title').textContent = title;
    document.getElementById('modal-thesis-authors').innerHTML = `<strong>Authors:</strong> ${author}`;
    document.getElementById('modal-thesis-department').innerHTML = `<strong>Department:</strong> ${department}`;
    
    // Display modal
    modal.style.display = 'block';
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('details-modal');
    modal.style.display = 'none';
}

// Initialize Filters
function initializeFilters() {
    const filterButton = document.querySelector('.filter-btn');
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            applyDateFilter();
        });
    }
}

// Function to apply date filter
function applyDateFilter() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    
    console.log(`Filtering data between ${startDate} and ${endDate}`);
    
    // In a real application, this would update the table and charts based on the date range
    // For now, we'll just log the filter dates
    
    // Simulate filtering with a notification
    showNotification('Filters applied successfully');
}

// Initialize Export and Print Functionality
function initializeExportPrint() {
    const exportButton = document.querySelector('.export-btn');
    const printButton = document.querySelector('.print-btn');
    
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            exportReport();
        });
    }
    
    if (printButton) {
        printButton.addEventListener('click', function() {
            printReport();
        });
    }
    
    // Modal export button
    const modalExportButton = document.querySelector('.modal-footer .export-btn');
    if (modalExportButton) {
        modalExportButton.addEventListener('click', function() {
            exportReviewDetails();
        });
    }
}

// Function to export report
function exportReport() {
    console.log('Exporting report');
    
    // In a real application, this would generate a CSV or PDF file
    // For now, we'll just show a notification
    showNotification('Report exported successfully');
}

// Function to print report
function printReport() {
    console.log('Printing report');
    
    // In a real application, this would open the print dialog
    // For demonstration, we'll just call window.print()
    window.print();
}

// Function to export review details
function exportReviewDetails() {
    const title = document.getElementById('modal-thesis-title').textContent;
    console.log(`Exporting details for: ${title}`);
    
    // In a real application, this would generate a PDF of the review details
    // For now, we'll just show a notification
    showNotification('Review details exported successfully');
}

// Function to show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add notification styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#28a745';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    notification.style.zIndex = '9999';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease-in-out';
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Hide and remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Toggle sidebar on small screens
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
});

// Logout confirmation
function confirmLogout() {
    return confirm('Are you sure you want to logout?');
}