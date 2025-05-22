// For demo purposes - simulating known emails
const knownEmails = [
    "kentlaqui@gmail.com", 
    "holdenkentlaqui@gmail.com", 
    "student@dhvsu.edu.ph"
];

let currentStep = 1;
let timerInterval;

// Function to navigate between steps
function goToStep(step) {
    // Hide all forms
    document.querySelectorAll('.form-step').forEach(form => {
        form.classList.remove('active');
    });
    
    // Hide all step indicators
    document.querySelectorAll('.step, .step-label').forEach(stepElem => {
        stepElem.classList.remove('active');
    });
    
    // Show the current form
    if (step === 1) {
        document.getElementById('email-form').classList.add('active');
    } else if (step === 2) {
        document.getElementById('code-form').classList.add('active');
    } else if (step === 3) {
        document.getElementById('password-form').classList.add('active');
    }
    
    // Update steps indicator
    for (let i = 1; i <= step; i++) {
        document.getElementById('step' + i).classList.add('active');
        document.querySelectorAll('.step-label')[i-1].classList.add('active');
    }
    
    currentStep = step;
}

// Send verification code
function sendVerificationCode() {
    const email = document.getElementById('email').value;
    
    // Verify CAPTCHA
    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
        showError("Please complete the CAPTCHA verification.");
        return;
    }
    
    // Check if email exists (for demo purposes)
    if (!knownEmails.includes(email)) {
        showError("Email not found in our records.");
        grecaptcha.reset();
        return;
    }
    
    // Simulate sending verification code
    setTimeout(() => {
        goToStep(2);
        startTimer(5 * 60); // 5 minutes
        // Focus on first input
        document.querySelector('.verification-input').focus();
    }, 1000);
}

// Start countdown timer
function startTimer(duration) {
    clearInterval(timerInterval);
    
    let timer = duration;
    const display = document.getElementById('timer');
    
    timerInterval = setInterval(function () {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        
        display.textContent = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
        
        if (--timer < 0) {
            clearInterval(timerInterval);
            display.textContent = "Expired";
            document.querySelector('.resend-btn').style.opacity = "1";
        }
    }, 1000);
}

// Move to next input in verification code
function moveToNext(field, position) {
    if (field.value.length === field.maxLength) {
        const nextField = field.nextElementSibling;
        if (nextField) {
            nextField.focus();
        }
    } else if (field.value.length === 0) {
        const prevField = field.previousElementSibling;
        if (prevField) {
            prevField.focus();
        }
    }
}

// Resend verification code
function resendCode() {
    // Reset all input fields
    document.querySelectorAll('.verification-input').forEach(input => {
        input.value = '';
    });
    
    // Focus on first input
    document.querySelector('.verification-input').focus();
    
    // Restart timer
    startTimer(5 * 60);
}

// Verify code
function verifyCode() {
    // Collect all verification digits
    const inputs = document.querySelectorAll('.verification-input');
    let code = '';
    let isComplete = true;
    
    inputs.forEach(input => {
        code += input.value;
        if (!input.value) {
            isComplete = false;
        }
    });
    
    if (!isComplete) {
        showError("Please enter the complete verification code.");
        return;
    }
    
    // For demo purposes, accept any 6-digit code
    if (code.length === 6) {
        goToStep(3);
        
        // Set up password strength meter
        document.getElementById('new-password').addEventListener('input', checkPasswordStrength);
    } else {
        showError("Invalid verification code. Please try again.");
    }
}

// Check password strength
function checkPasswordStrength() {
    const password = document.getElementById('new-password').value;
    const indicator = document.getElementById('strength-indicator');
    const strengthText = document.getElementById('strength-text');
    
    // Calculate strength
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    // Update UI
    indicator.style.width = strength + '%';
    
    if (strength <= 25) {
        indicator.style.backgroundColor = '#ff4d4d';
        strengthText.textContent = 'Weak';
    } else if (strength <= 50) {
        indicator.style.backgroundColor = '#ffa64d';
        strengthText.textContent = 'Moderate';
    } else if (strength <= 75) {
        indicator.style.backgroundColor = '#99cc00';
        strengthText.textContent = 'Good';
    } else {
        indicator.style.backgroundColor = '#33cc33';
        strengthText.textContent = 'Strong';
    }
}

// Reset password
function resetPassword() {
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (!newPassword) {
        showError("Please enter a new password.");
        return;
    }
    
    if (newPassword.length < 8) {
        showError("Password must be at least 8 characters long.");
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showError("Passwords do not match.");
        return;
    }
    
    // Simulate password reset
    setTimeout(() => {
        document.getElementById('success-message').textContent = "Your password has been reset successfully.";
        openModal('success-modal');
    }, 1000);
}

// Redirect to login
function redirectToLogin() {
    window.location.href = "continue.html";
}

// Toggle password visibility
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = passwordInput.nextElementSibling.querySelector('i');
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function showError(message) {
    document.getElementById('error-message').textContent = message;
    openModal('error-modal');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set up password strength meter event listener
    const newPasswordInput = document.getElementById('new-password');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', checkPasswordStrength);
    }
});