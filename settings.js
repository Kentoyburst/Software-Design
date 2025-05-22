document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Save Settings Functions
    document.getElementById('save-general').addEventListener('click', function() {
        saveSettings('general');
    });
    
    document.getElementById('save-account').addEventListener('click', function() {
        saveSettings('account');
    });
    
    document.getElementById('save-security').addEventListener('click', function() {
        updatePassword();
    });
    
    document.getElementById('save-notifications').addEventListener('click', function() {
        saveSettings('notifications');
    });
    
    document.getElementById('save-backup').addEventListener('click', function() {
        saveSettings('backup');
    });
    
    // Toggle Email Notification Options
    const emailNotifications = document.getElementById('email-notifications');
    const notificationOptions = document.querySelector('.notification-options');
    
    emailNotifications.addEventListener('change', function() {
        if (this.checked) {
            notificationOptions.style.opacity = '1';
            notificationOptions.style.pointerEvents = 'auto';
        } else {
            notificationOptions.style.opacity = '0.5';
            notificationOptions.style.pointerEvents = 'none';
        }
    });

    // Backup Now Button
    document.getElementById('create-backup').addEventListener('click', function() {
        createBackup();
    });
    
    // Restore Backup Button
    document.getElementById('restore-backup').addEventListener('click', function() {
        restoreBackup();
    });
    
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('change', function() {
        toggleDarkMode(this.checked);
    });
    
    // Password Validation
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');
    
    confirmPassword.addEventListener('input', function() {
        if (newPassword.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Passwords don't match");
        } else {
            confirmPassword.setCustomValidity('');
        }
    });
    
    // Initialize the page
    initializeSettings();
});

// Initialize Settings from localStorage or default values
function initializeSettings() {
    // Check if dark mode is enabled
    const darkMode = localStorage.getItem('darkMode') === 'true';
    document.getElementById('dark-mode-toggle').checked = darkMode;
    if (darkMode) {
        toggleDarkMode(true);
    }
    
    // Email notification toggle state
    const emailNotifications = document.getElementById('email-notifications');
    const notificationOptions = document.querySelector('.notification-options');
    
    if (!emailNotifications.checked) {
        notificationOptions.style.opacity = '0.5';
        notificationOptions.style.pointerEvents = 'none';
    }
    
    // Load saved settings if they exist
    try {
        const savedGeneral = JSON.parse(localStorage.getItem('generalSettings'));
        if (savedGeneral) {
            document.getElementById('system-name').value = savedGeneral.systemName || 'Integrated Thesis Repository and Archive System';
            document.getElementById('default-language').value = savedGeneral.language || 'en';
            document.getElementById('date-format').value = savedGeneral.dateFormat || 'mdy';
        }
        
        const savedBackup = JSON.parse(localStorage.getItem('backupSettings'));
        if (savedBackup) {
            document.getElementById('backup-frequency').value = savedBackup.frequency || 'weekly';
            document.getElementById('backup-time').value = savedBackup.time || '02:00';
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Save Settings Function
function saveSettings(settingType) {
    try {
        let settings = {};
        let message = '';
        
        switch (settingType) {
            case 'general':
                settings = {
                    systemName: document.getElementById('system-name').value,
                    language: document.getElementById('default-language').value,
                    dateFormat: document.getElementById('date-format').value,
                    darkMode: document.getElementById('dark-mode-toggle').checked
                };
                localStorage.setItem('generalSettings', JSON.stringify(settings));
                localStorage.setItem('darkMode', settings.darkMode);
                message = 'General settings saved successfully!';
                break;
                
            case 'account':
                settings = {
                    name: document.getElementById('admin-name').value,
                    email: document.getElementById('admin-email').value,
                    contact: document.getElementById('admin-contact').value
                };
                localStorage.setItem('accountSettings', JSON.stringify(settings));
                message = 'Account settings updated successfully!';
                break;
                
            case 'notifications':
                settings = {
                    emailEnabled: document.getElementById('email-notifications').checked,
                    newUser: document.getElementById('notify-new-user').checked,
                    thesisUpload: document.getElementById('notify-thesis-upload').checked,
                    review: document.getElementById('notify-review').checked,
                    system: document.getElementById('notify-system').checked
                };
                localStorage.setItem('notificationSettings', JSON.stringify(settings));
                message = 'Notification preferences saved!';
                break;
                
            case 'backup':
                settings = {
                    frequency: document.getElementById('backup-frequency').value,
                    time: document.getElementById('backup-time').value
                };
                localStorage.setItem('backupSettings', JSON.stringify(settings));
                message = 'Backup settings updated!';
                break;
        }
        
        showNotification(message, 'success');
    } catch (error) {
        console.error('Error saving settings:', error);
        showNotification('Error saving settings. Please try again.', 'error');
    }
}

// Update Password Function
function updatePassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Simple validation
    if (!currentPassword) {
        showNotification('Please enter your current password.', 'error');
        return;
    }
    
    if (!newPassword) {
        showNotification('Please enter a new password.', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('New passwords do not match.', 'error');
        return;
    }
    
    // Simulating password verification against a stored password
    const storedPassword = 'admin123'; // This would be securely stored in a real system
    
    if (currentPassword !== storedPassword) {
        showNotification('Current password is incorrect.', 'error');
        return;
    }
    showNotification('Password updated successfully!', 'success');
    
    // Clear password fields
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
}

// Create Backup Function
function createBackup() {
    // This would connect to the backend in a real application
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replace(/-/g, '');
    const backupName = `backup_${date}.zip`;
    
    // Simulating a backup process
    showNotification('Creating backup... Please wait.', 'info');
    
    setTimeout(() => {
        // Add the new backup to the list
        const backupHistory = document.querySelector('.backup-history');
        const backupList = backupHistory.querySelectorAll('.backup-item');
        
        // Format the current date for display
        const formattedDate = now.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Create new backup item
        const newBackup = document.createElement('div');
        newBackup.className = 'backup-item';
        newBackup.innerHTML = `
            <span>${backupName}</span>
            <span>${formattedDate}</span>
            <div class="backup-actions">
                <button class="icon-btn" title="Download"><i class="fas fa-download"></i></button>
                <button class="icon-btn" title="Delete"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        // Insert the new backup at the top
        if (backupList.length > 0) {
            backupHistory.insertBefore(newBackup, backupList[0]);
        } else {
            backupHistory.appendChild(newBackup);
        }
        
        showNotification('Backup created successfully!', 'success');
    }, 2000);
}

// Restore Backup Function
function restoreBackup() {
    // Open a confirmation dialog
    if (confirm('Are you sure you want to restore from a backup? This will replace current data.')) {
        // This would open a file picker in a real application
        showNotification('Please select a backup file to restore.', 'info');
        
        // Simulate a file selection and restore process
        setTimeout(() => {
            showNotification('System restored from backup successfully!', 'success');
        }, 2000);
    }
}

// Toggle Dark Mode
function toggleDarkMode(enabled) {
    if (enabled) {
        document.body.classList.add('dark-mode');
        // In a real application, you would add dark mode CSS
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    localStorage.setItem('darkMode', enabled);
}

// Notification Function
function showNotification(message, type = 'info') {
    // Check if notification container exists, create if not
    let notificationContainer = document.getElementById('notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.top = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.zIndex = '1000';
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.padding = '12px 20px';
    notification.style.marginBottom = '10px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.justifyContent = 'space-between';
    notification.style.animation = 'fadeIn 0.3s ease-out';
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            notification.style.color = 'white';
            break;
        case 'error':
            notification.style.backgroundColor = '#F44336';
            notification.style.color = 'white';
            break;
        case 'warning':
            notification.style.backgroundColor = '#FF9800';
            notification.style.color = 'white';
            break;
        default:
            notification.style.backgroundColor = '#2196F3';
            notification.style.color = 'white';
    }
    
    // Add message and close button
    notification.innerHTML = `
        <span>${message}</span>
        <button style="background: transparent; border: none; color: white; cursor: pointer; margin-left: 10px;">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Add event listener to close button
    const closeButton = notification.querySelector('button');
    closeButton.addEventListener('click', () => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 300);
    });
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (notification.parentNode === notificationContainer) {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode === notificationContainer) {
                    notificationContainer.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}