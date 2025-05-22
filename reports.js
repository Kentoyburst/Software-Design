// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize report data and UI
    initializeReports();
    
    // Add event listeners
    setupEventListeners();
    
    // Initialize chart
    createActivityChart();
});

// Initialize reports data and update UI
function initializeReports() {
    // Set current date for the date inputs
    const today = new Date();
    document.getElementById('end-date').valueAsDate = today;
    
    // Set default start date (30 days ago)
    const lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 30);
    document.getElementById('start-date').valueAsDate = lastMonth;
    
    // Initialize report summary data
    updateReportSummary();
}

// Setup all event listeners
function setupEventListeners() {
    // Date range selector
    document.getElementById('date-range').addEventListener('change', function() {
        handleDateRangeChange(this.value);
    });
    
    // Generate report button
    document.getElementById('generate-report').addEventListener('click', generateReport);
    
    // Export buttons
    document.getElementById('export-pdf').addEventListener('click', exportToPDF);
    document.getElementById('export-excel').addEventListener('click', exportToExcel);
    
    // Report type selector
    document.getElementById('report-type').addEventListener('change', function() {
        generateReport();
    });
}

// Handle date range selection changes
function handleDateRangeChange(rangeValue) {
    const customDateFields = document.getElementById('custom-date-fields');
    const today = new Date();
    let startDate = new Date();
    
    if (rangeValue === 'custom') {
        customDateFields.style.display = 'flex';
        return;
    } else {
        customDateFields.style.display = 'none';
    }
    
    // Set appropriate date range based on selection
    switch(rangeValue) {
        case 'last-week':
            startDate.setDate(today.getDate() - 7);
            break;
        case 'last-month':
            startDate.setDate(today.getDate() - 30);
            break;
        case 'last-quarter':
            startDate.setDate(today.getDate() - 90);
            break;
        case 'last-year':
            startDate.setFullYear(today.getFullYear() - 1);
            break;
    }
    
    // Update date inputs
    document.getElementById('start-date').valueAsDate = startDate;
    document.getElementById('end-date').valueAsDate = today;
    
    // Generate report with new date range
    generateReport();
}

// Generate report based on selected options
function generateReport() {
    const reportType = document.getElementById('report-type').value;
    const startDate = document.getElementById('start-date').valueAsDate;
    const endDate = document.getElementById('end-date').valueAsDate;
    
    // Validate date range
    if (startDate > endDate) {
        alert('Start date cannot be after end date.');
        return;
    }
    
    // Show loading state
    showLoadingState();
    
    // Simulate API call delay
    setTimeout(() => {
        // Update report data based on selections
        updateReportSummary(reportType, startDate, endDate);
        updateReportTable(reportType, startDate, endDate);
        updateChartData(reportType, startDate, endDate);
        
        // Hide loading state
        hideLoadingState();
    }, 800);
}

// Update summary cards with new data
function updateReportSummary(reportType = 'user-activity', startDate, endDate) {
    // Sample data based on report type
    // In a real application, this would fetch data from a server
    const reportData = {
        'user-activity': { users: 78, submissions: 24, downloads: 156, searches: 42 },
        'thesis-uploads': { users: 45, submissions: 36, downloads: 112, searches: 28 },
        'downloads': { users: 92, submissions: 18, downloads: 243, searches: 54 },
        'review-status': { users: 63, submissions: 29, downloads: 98, searches: 31 }
    };
    
    // Get data for the selected report type
    const data = reportData[reportType];
    
    // Update summary cards
    document.getElementById('active-users').textContent = data.users;
    document.getElementById('new-submissions').textContent = data.submissions;
    document.getElementById('period-downloads').textContent = data.downloads;
    document.getElementById('top-searches').textContent = data.searches;
}

// Update the report table with new data
function updateReportTable(reportType, startDate, endDate) {
    // Clear existing table data
    const tableBody = document.getElementById('report-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    
    // Sample data based on report type
    // In a real application, this would fetch data from a server
    let tableData = [];
    
    switch(reportType) {
        case 'user-activity':
            tableData = getUserActivityData();
            break;
        case 'thesis-uploads':
            tableData = getThesisUploadsData();
            break;
        case 'downloads':
            tableData = getDownloadsData();
            break;
        case 'review-status':
            tableData = getReviewStatusData();
            break;
    }
    
    // Populate table with new data
    tableData.forEach(row => {
        const newRow = tableBody.insertRow();
        
        Object.values(row).forEach(cellData => {
            const cell = newRow.insertCell();
            
            // Check if this is the status column
            if (typeof cellData === 'object' && cellData.type === 'status') {
                const statusSpan = document.createElement('span');
                statusSpan.className = `status ${cellData.value.toLowerCase()}`;
                statusSpan.textContent = cellData.value;
                cell.appendChild(statusSpan);
            } else {
                cell.textContent = cellData;
            }
        });
    });
}

// Create activity chart
function createActivityChart() {
    const ctx = document.getElementById('activity-chart').getContext('2d');
    window.activityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Thesis Uploads',
                data: [12, 19, 15, 25, 22, 30],
                borderColor: '#bc4e17',
                backgroundColor: 'rgba(188, 78, 23, 0.1)',
                tension: 0.4
            }, {
                label: 'Downloads',
                data: [30, 45, 58, 75, 85, 92],
                borderColor: '#2980b9',
                backgroundColor: 'rgba(41, 128, 185, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Activity Trends (Last 6 Months)'
                }
            }
        }
    });
}

// Update chart data based on selections
function updateChartData(reportType, startDate, endDate) {
    // Sample chart data based on report type
    // In a real application, this would fetch data from a server
    let chartData = {};
    
    switch(reportType) {
        case 'user-activity':
            chartData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                uploads: [12, 19, 15, 25, 22, 30],
                downloads: [30, 45, 58, 75, 85, 92]
            };
            break;
        case 'thesis-uploads':
            chartData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                uploads: [18, 22, 25, 30, 35, 42],
                downloads: [25, 40, 52, 63, 75, 85]
            };
            break;
        case 'downloads':
            chartData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                uploads: [10, 15, 18, 20, 24, 28],
                downloads: [45, 65, 85, 105, 125, 150]
            };
            break;
        case 'review-status':
            chartData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                uploads: [15, 18, 20, 22, 25, 32],
                downloads: [35, 48, 55, 62, 70, 80]
            };
            break;
    }
    
    // Update chart data
    window.activityChart.data.labels = chartData.labels;
    window.activityChart.data.datasets[0].data = chartData.uploads;
    window.activityChart.data.datasets[1].data = chartData.downloads;
    
    // Update chart title
    window.activityChart.options.plugins.title.text = 
        `Activity Trends (${formatDate(startDate)} - ${formatDate(endDate)})`;
    
    // Update chart
    window.activityChart.update();
}

// Export to PDF function
function exportToPDF() {
    alert('Exporting report to PDF...');
    // In a real application, this would generate and download a PDF
}

// Export to Excel function
function exportToExcel() {
    alert('Exporting report to Excel...');
    // In a real application, this would generate and download an Excel file
}

// Show loading state
function showLoadingState() {
    // Add loading class to main content
    document.querySelector('.main-content').classList.add('loading');
    
    // Disable buttons
    document.getElementById('generate-report').disabled = true;
    document.getElementById('export-pdf').disabled = true;
    document.getElementById('export-excel').disabled = true;
    
    // Add loading message
    const loadingMsg = document.createElement('div');
    loadingMsg.id = 'loading-message';
    loadingMsg.textContent = 'Generating report...';
    loadingMsg.style.position = 'fixed';
    loadingMsg.style.top = '50%';
    loadingMsg.style.left = '50%';
    loadingMsg.style.transform = 'translate(-50%, -50%)';
    loadingMsg.style.padding = '20px';
    loadingMsg.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    loadingMsg.style.borderRadius = '5px';
    loadingMsg.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    loadingMsg.style.zIndex = '1000';
    document.body.appendChild(loadingMsg);
}

// Hide loading state
function hideLoadingState() {
    // Remove loading class
    document.querySelector('.main-content').classList.remove('loading');
    
    // Enable buttons
    document.getElementById('generate-report').disabled = false;
    document.getElementById('export-pdf').disabled = false;
    document.getElementById('export-excel').disabled = false;
    
    // Remove loading message
    const loadingMsg = document.getElementById('loading-message');
    if (loadingMsg) {
        loadingMsg.remove();
    }
}

// Format date for display
function formatDate(date) {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Sample data functions for different report types
function getUserActivityData() {
    return [
        {
            title: 'Machine Learning Applications in Civil Engineering',
            authors: 'Santos, Maria; Cruz, Juan',
            department: 'Civil Engineering',
            date: 'Mar 15, 2025',
            status: { type: 'status', value: 'Approved' },
            downloads: 42
        },
        {
            title: 'Sustainable Building Materials Analysis',
            authors: 'Reyes, Ana; Tan, Miguel',
            department: 'Architecture',
            date: 'Mar 12, 2025',
            status: { type: 'status', value: 'Approved' },
            downloads: 37
        },
        {
            title: 'Urban Planning Strategies for Pampanga',
            authors: 'Dizon, Carlos',
            department: 'Urban Planning',
            date: 'Mar 10, 2025',
            status: { type: 'status', value: 'Pending' },
            downloads: 0
        }
    ];
}

function getThesisUploadsData() {
    return [
        {
            title: 'Earthquake Resistant Design Methodologies',
            authors: 'Lopez, Rafael; Santos, Maria',
            department: 'Civil Engineering',
            date: 'Mar 18, 2025',
            status: { type: 'status', value: 'Approved' },
            downloads: 28
        },
        {
            title: 'Smart Building Technologies Implementation',
            authors: 'Garcia, Elena; Mendoza, Raphael',
            department: 'Electrical Engineering',
            date: 'Mar 16, 2025',
            status: { type: 'status', value: 'Pending' },
            downloads: 0
        },
        {
            title: 'Construction Management Optimization',
            authors: 'Reyes, Jose',
            department: 'Civil Engineering',
            date: 'Mar 14, 2025',
            status: { type: 'status', value: 'Approved' },
            downloads: 32
        }
    ];
}

function getDownloadsData() {
    return [
        {
            title: 'Structural Analysis of Historical Buildings',
            authors: 'Garcia, Elena; Santos, Marco',
            department: 'Civil Engineering',
            date: 'Mar 08, 2025',
            status: { type: 'status', value: 'Approved' },
            downloads: 89
        },
        {
            title: 'Machine Learning Applications in Civil Engineering',
            authors: 'Santos, Maria; Cruz, Juan',
            department: 'Civil Engineering',
            date: 'Mar 15, 2025',
            status: { type: 'status', value: 'Approved' },
            downloads: 72
        },
        {
            title: 'Sustainable Building Materials Analysis',
            authors: 'Reyes, Ana; Tan, Miguel',
            department: 'Architecture',
            date: 'Mar 12, 2025',
            status: { type: 'status', value: 'Approved' },
            downloads: 68
        }
    ];
}

function getReviewStatusData() {
    return [
        {
            title: 'Urban Planning Strategies for Pampanga',
            authors: 'Dizon, Carlos',
            department: 'Urban Planning',
            date: 'Mar 10, 2025',
            status: { type: 'status', value: 'Pending' },
            downloads: 0
        },
        {
            title: 'Renewable Energy Integration in Buildings',
            authors: 'Mendoza, Paolo',
            department: 'Electrical Engineering',
            date: 'Mar 05, 2025',
            status: { type: 'status', value: 'Rejected' },
            downloads: 0
        },
        {
            title: 'Water Resource Management Technologies',
            authors: 'Cruz, Ana; Garcia, John',
            department: 'Environmental Engineering',
            date: 'Mar 03, 2025',
            status: { type: 'status', value: 'Pending' },
            downloads: 0
        }
    ];
}