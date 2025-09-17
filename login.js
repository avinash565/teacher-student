document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const email = formData.get('email');
            const password = formData.get('password');
            
            // Basic validation
            if (!email || !password) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Signing In...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // For demo purposes, show success message
                // In a real app, you would make an actual API call here
                showToast('Login successful! Redirecting...', 'success');
                
                // Simulate redirect after successful login
                setTimeout(() => {
                    // window.location.href = 'dashboard.html'; // Uncomment for real redirect
                    console.log('Would redirect to dashboard');
                }, 1500);
                
            }, 2000);
        });
    }
    
    // Add real-time validation
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
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
        });
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