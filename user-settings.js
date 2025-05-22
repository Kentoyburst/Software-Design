document.addEventListener('DOMContentLoaded', () => {
    initSidebarToggle();
    setupProfileForm();
    setupSecurityForm();
    setupPreferences();
});

function setupProfileForm() {
    const profileForm = document.getElementById('profile-form');
    
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const department = document.getElementById('department').value;
        
        if (fullName && email && department) {
            showNotification('Profile updated successfully', 'success');
        } else {
            showNotification('Please fill in all required fields', 'error');
        }
    });
}

function setupSecurityForm() {
    const securityForm = document.getElementById('security-form');
    
    securityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (newPassword !== confirmPassword) {
            showNotification('New passwords do not match', 'error');
            return;
        }
        
        if (newPassword.length < 8) {
            showNotification('Password must be at least 8 characters long', 'error');
            return;
        }
        
        // In a real application, you would verify the current password here
        showNotification('Password changed successfully', 'success');
    });
}

function setupPreferences() {
    const darkModeToggle = document.getElementById('dark-mode');
    const emailNotificationsToggle = document.getElementById('email-notifications');
    const researchRecommendationsToggle = document.getElementById('research-recommendations');
    
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', darkModeToggle.checked);
        showNotification(`Dark mode ${darkModeToggle.checked ? 'enabled' : 'disabled'}`, 'info');
    });
    
    emailNotificationsToggle.addEventListener('change', () => {
        showNotification(`Email notifications ${emailNotificationsToggle.checked ? 'enabled' : 'disabled'}`, 'info');
    });
    
    researchRecommendationsToggle.addEventListener('change', () => {
        showNotification(`Research recommendations ${researchRecommendationsToggle.checked ? 'enabled' : 'disabled'}`, 'info');
    });
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px 20px';
    notification.style.backgroundColor = type === 'success' ? '#2ecc71' : 
                                         type === 'error' ? '#e74c3c' : 
                                         '#3498db';
    notification.style.color = 'white';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';
    notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}