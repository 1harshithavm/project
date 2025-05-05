// Initialize Facebook SDK
window.fbAsyncInit = function() {
    FB.init({
        appId: 'YOUR_FACEBOOK_APP_ID',
        cookie: true,
        xfbml: true,
        version: 'v12.0'
    });
};

// JWT Token Management
function setAuthToken(token) {
    localStorage.setItem('token', token);
}

function getAuthToken() {
    return localStorage.getItem('token');
}

function removeAuthToken() {
    localStorage.removeItem('token');
}

// User Management
function setUserData(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function getUserData() {
    return JSON.parse(localStorage.getItem('user'));
}

function removeUserData() {
    localStorage.removeItem('user');
}

// Google Sign-In Handler
function handleGoogleSignIn(response) {
    const { credential } = response;
    
    // Verify the token with your backend
    fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: credential })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            setAuthToken(data.token);
            setUserData(data.user);
            checkAuth();
            authModal.hide();
            showToast('Logged in successfully!', 'success');
        }
    })
    .catch(error => {
        console.error('Google login error:', error);
        showToast('Login failed. Please try again.', 'error');
    });
}

// Facebook Login Handler
document.getElementById('fb-login-button').addEventListener('click', function() {
    FB.login(function(response) {
        if (response.authResponse) {
            const accessToken = response.authResponse.accessToken;
            
            // Verify the token with your backend
            fetch(`${API_BASE_URL}/auth/facebook`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: accessToken })
            })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    setAuthToken(data.token);
                    setUserData(data.user);
                    checkAuth();
                    authModal.hide();
                    showToast('Logged in successfully!', 'success');
                }
            })
            .catch(error => {
                console.error('Facebook login error:', error);
                showToast('Login failed. Please try again.', 'error');
            });
        }
    }, {scope: 'public_profile,email'});
});

// Regular Login Form
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            setAuthToken(data.token);
            setUserData(data.user);
            checkAuth();
            authModal.hide();
            showToast('Logged in successfully!', 'success');
            
            if (document.getElementById('rememberMe').checked) {
                localStorage.setItem('rememberMe', 'true');
            }
        } else {
            showToast(data.message || 'Login failed', 'error');
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        showToast('Login failed. Please try again.', 'error');
    });
});

// Registration Form
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            setAuthToken(data.token);
            setUserData(data.user);
            checkAuth();
            authModal.hide();
            showToast('Account created successfully!', 'success');
        } else {
            showToast(data.message || 'Registration failed', 'error');
        }
    })
    .catch(error => {
        console.error('Registration error:', error);
        showToast('Registration failed. Please try again.', 'error');
    });
});

// Logout Function
document.getElementById('logoutBtn').addEventListener('click', function() {
    removeAuthToken();
    removeUserData();
    checkAuth();
    showToast('Logged out successfully', 'success');
    
    // Also log out from social providers
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            FB.logout();
        }
    });
    
    // Google logout would need to be handled differently as they don't provide a direct logout API
});

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // If remember me was checked, try to auto-login
    if (localStorage.getItem('rememberMe') === 'true' && getAuthToken()) {
        fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                setUserData(data.user);
                checkAuth();
            }
        })
        .catch(error => {
            console.error('Auto-login error:', error);
            removeAuthToken();
            removeUserData();
        });
    }
});

// Toast notification function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0 position-fixed bottom-0 end-0 m-3`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.style.zIndex = '1100';
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove toast after it's hidden
    toast.addEventListener('hidden.bs.toast', function() {
        document.body.removeChild(toast);
    });
}