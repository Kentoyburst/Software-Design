/**
 * Reviewer Settings JavaScript
 * Manages tab navigation, form submissions, and interactive functionality
 * for the reviewer settings page.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    initTabNavigation();
    
    // Form Submissions
    initFormSubmissions();
    
    // Security Features
    initPasswordStrengthMeter();
    initTwoFactorAuthentication();
    
    // Expertise Tags Management
    initExpertiseTagsManagement();
    
    // Unavailable Period Modal
    initUnavailablePeriodModal();
    
    // Session Management
    initSessionManagement();
});

/**
 * Initialize tab navigation functionality
 */
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs and content
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to current tab and content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Initialize form submission handlers
 */
function initFormSubmissions() {
    // Profile Form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveFormData(this, 'Profile information updated successfully!');
        });
    }
    
    // Notification Form
    const notificationForm = document.getElementById('notification-form');
    if (notificationForm) {
        notificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveFormData(this, 'Notification preferences saved!');
        });
    }
    
    // Review Preferences Form
    const reviewPreferencesForm = document.getElementById('review-preferences-form');
    if (reviewPreferencesForm) {
        reviewPreferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveFormData(this, 'Review preferences updated!');
        });
    }
    
    // Change Password Button
    const changePasswordBtn = document.getElementById('change-password-btn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (!currentPassword || !newPassword || !confirmPassword) {
                showNotification('Please fill in all password fields', 'error');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showNotification('New passwords do not match', 'error');
                return;
            }
            
            // Here you would normally send a request to the server
            // For demo purposes, we'll just show a success message
            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-password').value = '';
            
            // Reset strength meter
            updatePasswordStrength('');
            
            showNotification('Password updated successfully!', 'success');
        });
    }
}

/**
 * Generic function to handle form data submission
 */
function saveFormData(form, successMessage) {
    // Here you would normally send the form data to the server
    // For demo purposes, we'll just show a success message
    showNotification(successMessage, 'success');
}

/**
 * Show notification to the user
 */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to the DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Set up close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-close after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Initialize password strength meter
 */
function initPasswordStrengthMeter() {
    const passwordInput = document.getElementById('new-password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }
}

/**
 * Update password strength meter
 */
function updatePasswordStrength(password) {
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthMeter || !strengthText) return;
    
    // Check password strength
    let strength = 0;
    if (password.length > 0) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 1;
    
    // Update strength meter
    strengthMeter.setAttribute('data-strength', strength);
    
    // Update strength text
    const strengthLabels = ['Empty', 'Weak', 'Fair', 'Good', 'Strong'];
    strengthText.textContent = `Password strength: ${strengthLabels[strength]}`;
}

/**
 * Initialize two-factor authentication
 */
function initTwoFactorAuthentication() {
    const enable2faToggle = document.getElementById('enable-2fa');
    const tfaSetup = document.getElementById('tfa-setup');
    
    if (enable2faToggle && tfaSetup) {
        enable2faToggle.addEventListener('change', function() {
            if (this.checked) {
                tfaSetup.classList.remove('hidden');
            } else {
                tfaSetup.classList.add('hidden');
            }
        });
    }
    
    const verify2faBtn = document.getElementById('verify-2fa-btn');
    if (verify2faBtn) {
        verify2faBtn.addEventListener('click', function() {
            const verificationCode = document.getElementById('verification-code').value;
            
            if (!verificationCode) {
                showNotification('Please enter the verification code', 'error');
                return;
            }
            
            // Here you would normally validate the code with the server
            // For demo purposes, we'll just show a success message
            showNotification('Two-factor authentication enabled successfully!', 'success');
            tfaSetup.classList.add('hidden');
        });
    }
}

/**
 * Initialize expertise tags management
 */
function initExpertiseTagsManagement() {
    // Remove tag
    document.querySelectorAll('.remove-tag').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.expertise-tag').remove();
        });
    });
    
    // Add tag
    const addTagBtn = document.querySelector('.add-tag-btn');
    const tagInput = document.querySelector('.add-expertise input');
    
    if (addTagBtn && tagInput) {
        addTagBtn.addEventListener('click', function() {
            addExpertiseTag();
        });
        
        tagInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addExpertiseTag();
            }
        });
    }
}

/**
 * Add a new expertise tag
 */
function addExpertiseTag() {
    const tagInput = document.querySelector('.add-expertise input');
    const expertiseTags = document.querySelector('.expertise-tags');
    
    if (!tagInput || !expertiseTags) return;
    
    const tagValue = tagInput.value.trim();
    if (!tagValue) return;
    
    // Create new tag
    const newTag = document.createElement('div');
    newTag.className = 'expertise-tag selected';
    newTag.innerHTML = `
        <span>${tagValue}</span>
        <button type="button" class="remove-tag"><i class="fas fa-times"></i></button>
    `;
    
    // Add event listener to remove button
    const removeBtn = newTag.querySelector('.remove-tag');
    removeBtn.addEventListener('click', function() {
        newTag.remove();
    });
    
    // Add to DOM before the add-expertise element
    expertiseTags.insertBefore(newTag, document.querySelector('.add-expertise'));
    
    // Clear input
    tagInput.value = '';
}

/**
 * Initialize unavailable period modal
 */
function initUnavailablePeriodModal() {
    // Modal elements
    const modal = document.getElementById('unavailable-period-modal');
    const addPeriodBtn = document.querySelector('.add-period-btn');
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancel-period-btn');
    const saveBtn = document.getElementById('save-period-btn');
    
    // Open modal
    if (addPeriodBtn) {
        addPeriodBtn.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }
    
    // Close modal functions
    const closeModal = () => {
        modal.style.display = 'none';
        document.getElementById('unavailable-period-form').reset();
    };
    
    // Close modal events
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Save period
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            const reason = document.getElementById('unavailable-reason').value;
            
            if (!startDate || !endDate) {
                showNotification('Please select both start and end dates', 'error');
                return;
            }
            
            // Format dates
            const start = new Date(startDate);
            const end = new Date(endDate);
            
            if (end < start) {
                showNotification('End date cannot be before start date', 'error');
                return;
            }
            
            // Format dates for display
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            const formattedStartDate = start.toLocaleDateString('en-US', options);
            const formattedEndDate = end.toLocaleDateString('en-US', options);
            
            // Create new period element
            const newPeriod = document.createElement('div');
            newPeriod.className = 'unavailable-period';
            newPeriod.innerHTML = `
                <div class="unavailable-details">
                    <p><strong>${formattedStartDate} - ${formattedEndDate}</strong>${reason ? ' - ' + reason : ''}</p>
                </div>
                <button type="button" class="remove-period"><i class="fas fa-trash"></i></button>
            `;
            
            // Add event listener to remove button
            const removeBtn = newPeriod.querySelector('.remove-period');
            removeBtn.addEventListener('click', function() {
                newPeriod.remove();
            });
            
            // Add to calendar
            const calendar = document.querySelector('.calendar-placeholder');
            calendar.insertBefore(newPeriod, addPeriodBtn);
            
            // Close modal
            closeModal();
        });
    }
    
    // Remove period buttons
    document.querySelectorAll('.remove-period').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.unavailable-period').remove();
        });
    });
}

/**
 * Initialize session management
 */
function initSessionManagement() {
    // Revoke session buttons
    document.querySelectorAll('.revoke-btn').forEach(button => {
        button.addEventListener('click', function() {
            const sessionItem = this.closest('.session-item');
            if (confirm('Are you sure you want to revoke this session?')) {
                sessionItem.style.opacity = '0.5';
                setTimeout(() => {
                    sessionItem.remove();
                    showNotification('Session revoked successfully', 'success');
                }, 500);
            }
        });
    });
    
    // Sign out all other devices
    const signOutAllBtn = document.querySelector('.danger-btn');
    if (signOutAllBtn) {
        signOutAllBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to sign out from all other devices?')) {
                // Remove all sessions except the current one
                const sessions = document.querySelectorAll('.session-item');
                sessions.forEach(session => {
                    if (!session.textContent.includes('Current device')) {
                        session.style.opacity = '0.5';
                        setTimeout(() => {
                            session.remove();
                        }, 500);
                    }
                });
                
                showNotification('Signed out from all other devices', 'success');
            }
        });
    }
}

/**
 * Logout confirmation
 */
function confirmLogout() {
    return confirm('Are you sure you want to logout?');
}

// Add this CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1100;
        max-width: 350px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-left: 4px solid #28a745;
    }
    
    .notification.error {
        border-left: 4px solid #dc3545;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 18px;
    }
    
    .notification.success i {
        color: #28a745;
    }
    
    .notification.error i {
        color: #dc3545;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 14px;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }
`;

document.head.appendChild(style);