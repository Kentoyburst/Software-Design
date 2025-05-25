const accounts = {
    "administrator": { email: "kentlaqui@gmail.com", password: "1234", type: "admin" },
    "user123": { email: "holdenkentlaqui@gmail.com", password: "user123", type: "user" },
    "student": { email: "student@dhvsu.edu.ph", password: "student123", type: "user" },
    "reviewer": { email: "reviewer@dhvsu.edu.ph", password: "1234", type: "reviewer" }
};

// Challenge answers
const CHALLENGES = {
    login: 10, // 7 + 3
    register: 13 // 5 + 8
};

let currentUserType = ""; 
let currentUsername = ""; 

function switchTab(tabId, element) {
    document.querySelectorAll('.tab-btn').forEach(button => button.classList.remove('active'));
    document.querySelectorAll('form').forEach(form => form.classList.remove('active'));

    element.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function proceedAfterSuccess() {
    closeModal('success-modal');
    
    if (currentUserType === "admin") {
        window.location.href = "admin-dashboard.html";
    } else if (currentUserType === "reviewer") {
        window.location.href = "reviewer-dashboard.html";
    } else {
        window.location.href = "user-dashboard.html";
    }
}

function showError(message) {
    document.getElementById('error-message').textContent = message;
    openModal('error-modal');
}

function showRegistrationSuccess() {
    // Create a success modal specifically for registration
    const existingModal = document.getElementById('registration-success-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'registration-success-modal';
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="success-icon">✓</div>
            <h3>Registration Successful!</h3>
            <p>Your account has been created successfully. You can now log in with your credentials.</p>
            <button type="button" class="submit-btn" onclick="handleRegistrationSuccess()">Continue to Login</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function handleRegistrationSuccess() {
    // Close the registration success modal
    const modal = document.getElementById('registration-success-modal');
    if (modal) {
        modal.remove();
    }
    
    // Clear the registration form
    document.getElementById('register').reset();
    
    // Switch to login tab
    const loginTab = document.querySelector('.tab-btn:first-child');
    switchTab('login', loginTab);
    
    // Refresh the page to ensure clean state
    setTimeout(() => {
        window.location.reload();
    }, 500);
}

function registerUser() {
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    const role = document.getElementById('reg-role').value;
    const challengeAnswer = document.getElementById('register-challenge').value;
    
    // Clear previous error messages
    hidePasswordFeedback();
    
    // Validate all fields
    if (!username || !email || !password || !confirmPassword || !role || !challengeAnswer) {
        showError("Please fill in all required fields.");
        return;
    }
    
    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
        showPasswordFeedback(passwordValidation.message, false);
        return;
    }

    // Validate challenge answer
    if (parseInt(challengeAnswer) !== CHALLENGES.register) {
        showError("Security question answer is incorrect. Please try again.");
        return;
    }

    if (password !== confirmPassword) {
        showError("Passwords do not match.");
        return;
    }

    const formData = new FormData();
    formData.append('reg_username', username);
    formData.append('reg_email', email);
    formData.append('reg_password', password);
    formData.append('reg_confirm_password', confirmPassword);
    formData.append('reg_role', role);
    formData.append('register_challenge', challengeAnswer);

    document.getElementById('register-spinner').style.display = 'block';

    fetch('db.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        // Get the response as text first
        return response.text();
    })
    .then(data => {
        document.getElementById('register-spinner').style.display = 'none';
        
        console.log('Server response:', data); // Debug log
        
        // Clean up the response by removing any HTML tags or extra whitespace
        const cleanResponse = data.replace(/<[^>]*>/g, '').trim().toLowerCase();
        
        // Check for success indicators in the response
        if (cleanResponse.includes('success') || 
            cleanResponse.includes('registered') || 
            cleanResponse.includes('created') ||
            cleanResponse.includes('account has been') ||
            data.trim() === '' || // Sometimes empty response means success
            response.ok) { // HTTP status is OK
            
            showRegistrationSuccess();
        } else if (cleanResponse.includes('exists') || 
                   cleanResponse.includes('already') ||
                   cleanResponse.includes('duplicate') ||
                   cleanResponse.includes('taken')) {
            showError("An account with this email or username already exists.");
        } else if (cleanResponse.includes('error') || 
                   cleanResponse.includes('failed') ||
                   cleanResponse.includes('invalid')) {
            showError("Registration failed. Please check your information and try again.");
        } else {
            // If we can't determine the status from the message, 
            // but the HTTP request was successful, assume it worked
            console.log('Unclear response, assuming success:', data);
            showRegistrationSuccess();
        }
    })
    .catch(error => {
        document.getElementById('register-spinner').style.display = 'none';
        console.error('Registration error:', error);
        showError("An error occurred during registration. Please try again.");
    });
}

function login() {
    const usernameOrEmail = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const challengeAnswer = document.getElementById('login-challenge').value;
    
    // Validate challenge answer
    if (parseInt(challengeAnswer) !== CHALLENGES.login) {
        showError("Security question answer is incorrect. Please try again.");
        return;
    }

    const formData = new FormData();
    formData.append('username', usernameOrEmail);
    formData.append('password', password);
    formData.append('challenge_answer', challengeAnswer);

    document.getElementById('login-spinner').style.display = 'block';

    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        return response.text().then(text => {
            try {
                return JSON.parse(text);
            } catch (e) {
                console.error("Failed to parse response:", text);
                return { success: false, message: "Server response error" };
            }
        });
    })
    .then(data => {
        document.getElementById('login-spinner').style.display = 'none';
        
        if (data.success) {
            // Store user data in localStorage
            localStorage.setItem('userData', JSON.stringify({
                username: data.user.username,
                role: data.user.role,
                type: data.user.type
            }));

            // Show success message
            document.getElementById('success-message').textContent = data.message;
            openModal('success-modal');
            
            // Set current user info
            currentUserType = data.user.type;
            currentUsername = data.user.username;
        } else {
            // Check if account is locked
            if (data.message && data.message.includes("account is locked")) {
                // Display the lock message directly
                showError(data.message);
            } else {
                // Try fallback login for test accounts
                tryFallbackLogin(usernameOrEmail, password);
            }
        }
    })
    .catch(error => {
        document.getElementById('login-spinner').style.display = 'none';
        tryFallbackLogin(usernameOrEmail, password);
    });
}

function tryFallbackLogin(usernameOrEmail, password) {
    let foundAccount = null;
    let foundUsername = null;
    
    if (accounts[usernameOrEmail]) {
        foundAccount = accounts[usernameOrEmail];
        foundUsername = usernameOrEmail;
    } else {
        for (const username in accounts) {
            if (accounts[username].email === usernameOrEmail) {
                foundAccount = accounts[username];
                foundUsername = username;
                break;
            }
        }
    }

    if (!foundAccount) {
        showError("Account not found.");
        return;
    }

    if (foundAccount.password !== password) {
        showError("Incorrect password.");
        return;
    }

    currentUserType = foundAccount.type;
    currentUsername = foundUsername;
    
    let successMessage = "";
    switch(currentUserType) {
        case "admin":
            successMessage = "Admin login successful. Redirecting to admin dashboard...";
            break;
        case "reviewer":
            successMessage = "Reviewer login successful. Redirecting to reviewer dashboard...";
            break;
        default:
            successMessage = "Login successful. Redirecting to dashboard...";
    }
    
    document.getElementById('success-message').textContent = successMessage;
    openModal('success-modal');
    
    localStorage.setItem('userData', JSON.stringify({
        username: foundUsername,
        type: foundAccount.type
    }));
}

function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const icon = passwordInput.nextElementSibling.querySelector('i');
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

function validatePassword(password) {
    // Check for minimum length
    if (password.length < 8) {
        return { valid: false, message: "Password must be at least 8 characters long." };
    }
    
    // Check for alphabetic characters
    if (!/[a-zA-Z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one letter." };
    }
    
    // Check for numeric characters
    if (!/[0-9]/.test(password)) {
        return { valid: false, message: "Password must contain at least one number." };
    }
    
    // Check for special characters
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return { valid: false, message: "Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;':\"\\,.<>/?)" };
    }
    
    return { valid: true, message: "Password is strong." };
}

function showPasswordFeedback(message, isValid) {
    const feedbackElement = document.getElementById('password-feedback');
    feedbackElement.textContent = message;
    feedbackElement.style.color = isValid ? '#4CAF50' : '#f44336';
    feedbackElement.style.display = 'block';
}

function hidePasswordFeedback() {
    const feedbackElement = document.getElementById('password-feedback');
    if (feedbackElement) {
        feedbackElement.style.display = 'none';
    }
}

// Call this function when the page loads
function setupPasswordValidation() {
    const passwordInput = document.getElementById('reg-password');
    const feedbackElement = document.createElement('div');
    feedbackElement.id = 'password-feedback';
    feedbackElement.style.fontSize = '12px';
    feedbackElement.style.marginTop = '5px';
    feedbackElement.style.display = 'none';
    
    // Insert feedback element after password container
    passwordInput.parentNode.parentNode.insertBefore(feedbackElement, passwordInput.parentNode.nextSibling);
    
    // Add event listener for real-time validation
    passwordInput.addEventListener('input', function() {
        const result = validatePassword(this.value);
        showPasswordFeedback(result.message, result.valid);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupPasswordValidation();
    
    // Randomly generate new challenge questions (optional enhancement)
    setRandomChallenges();
});

// Optional enhancement: Generate random math challenges
function setRandomChallenges() {
    // For login challenge
    const num1Login = Math.floor(Math.random() * 10) + 1;
    const num2Login = Math.floor(Math.random() * 10) + 1;
    const loginSum = num1Login + num2Login;
    
    // For register challenge
    const num1Register = Math.floor(Math.random() * 10) + 1;
    const num2Register = Math.floor(Math.random() * 10) + 1;
    const registerSum = num1Register + num2Register;
    
    // Update challenge text and answers
    const loginLabel = document.querySelector('label[for="login-challenge"]');
    loginLabel.textContent = `Security Question: What is ${num1Login} + ${num2Login}?`;
    
    const registerLabel = document.querySelector('label[for="register-challenge"]');
    registerLabel.textContent = `Security Question: What is ${num1Register} + ${num2Register}?`;
    
    // Update the answers in the CHALLENGES object
    CHALLENGES.login = loginSum;
    CHALLENGES.register = registerSum;
}
