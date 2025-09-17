document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const college = formData.get('college');
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');
            
            // Validation
            if (!firstName || !lastName || !email || !college || !password || !confirmPassword) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            if (password.length < 6) {
                showToast('Password must be at least 6 characters long', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Creating Account...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // For demo purposes, show success message
                // In a real app, you would make an actual API call here
                showToast('Account created successfully! Please check your email to verify your account.', 'success');
                
                // Simulate redirect after successful signup
                setTimeout(() => {
                    // window.location.href = 'login.html'; // Uncomment for real redirect
                    console.log('Would redirect to login page');
                }, 2000);
                
            }, 2500);
        });
    }
    
    // Add real-time validation
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const collegeInput = document.getElementById('college');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // First Name validation
    if (firstNameInput) {
        firstNameInput.addEventListener('blur', function() {
            if (this.value && this.value.length < 2) {
                this.style.borderColor = 'hsl(0, 84%, 60%)';
                showFieldError(this, 'First name must be at least 2 characters');
            } else {
                this.style.borderColor = 'hsl(213, 27%, 84%)';
                clearFieldError(this);
            }
        });
        
        firstNameInput.addEventListener('input', function() {
            if (this.style.borderColor === 'hsl(0, 84%, 60%)') {
                this.style.borderColor = 'hsl(213, 27%, 84%)';
                clearFieldError(this);
            }
        });
    }
    
    // Last Name validation
    if (lastNameInput) {
        lastNameInput.addEventListener('blur', function() {
            if (this.value && this.value.length < 2) {
                this.style.borderColor = 'hsl(0, 84%, 60%)';
                showFieldError(this, 'Last name must be at least 2 characters');
            } else {
                this.style.borderColor = 'hsl(213, 27%, 84%)';
                clearFieldError(this);
            }
        });
        
        lastNameInput.addEventListener('input', function() {
            if (this.style.borderColor === 'hsl(0, 84%, 60%)') {
                this.style.borderColor = 'hsl(213, 27%, 84%)';
                clearFieldError(this);
            }
        });
    }
    
    // Email validation
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = 'hsl(0, 84%, 60%)';
                showFieldError(this, 'Please enter a valid email address');
            } else {
                this.style.borderColor = 'hsl(213, 27%, 84%)';
                clearFieldError(this);
            }
        });
        
        emailInput.addEventListener('input', function() {
            if (this.style.borderColor === 'hsl(0, 84%, 60%)') {
                this.style.borderColor = 'hsl(213, 27%, 84%)';
                clearFieldError(this);
            }
        });
    }
    
    // College validation
    if (collegeInput) {
        collegeInput.addEventListener('blur', function() {
            if (this.value && this.value.length < 3) {
                this.style.borderColor = 'hsl(0, 84%, 60%)';
                showFieldError(this, 'College name must be at least 3 characters');
            } else {
                this.style.borderColor = 'hsl(213, 27%, 84%)';
                clearFieldError(this);
            }
        });
        
        collegeInput.addEventListener('input', function() {
            if (this.style.borderColor === 'hsl(0, 84%, 60%)') {
                this.style.borderColor = 'hsl(213, 27%, 84%)';
                clearFieldError(this);
            }
        });
    }
    
    // Password validation
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            if (this.value && this.value.length < 6) {
                this.style.borderColor = 'hsl(0, 84%, 60%)';
                showFieldError(this, 'Password must be at least 6 characters');
            } else {
                this.style.borderColor = 'hsl(213, 27%, 84%)';
                clearFieldError(this);
            }
        });
        
        passwordInput.addEventListener('input', function() {
            if (this.style.borderColor === 'hsl(0, 84%, 60%)') {
                this.style.borderColor = 'hsl(213, 27%, 84%)';
                clearFieldError(this);
            }
            
            // Also validate confirm password if it has a value
            if (confirmPasswordInput && confirmPasswordInput.value) {
                validatePasswordConfirmation();
            }
        });
    }
    
    // Confirm Password validation
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', validatePasswordConfirmation);
        confirmPasswordInput.addEventListener('input', function() {
            if (this.style.borderColor === 'hsl(0, 84%, 60%)') {
                this.style.borderColor = 'hsl(213, 27%, 84%)';
                clearFieldError(this);
            }
        });
    }
    
    function validatePasswordConfirmation() {
        const password = passwordInput ? passwordInput.value : '';
        const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';
        
        if (confirmPassword && password !== confirmPassword) {
            confirmPasswordInput.style.borderColor = 'hsl(0, 84%, 60%)';
            showFieldError(confirmPasswordInput, 'Passwords do not match');
        } else {
            confirmPasswordInput.style.borderColor = 'hsl(213, 27%, 84%)';
            clearFieldError(confirmPasswordInput);
        }
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = 'hsl(0, 84%, 60%)';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}