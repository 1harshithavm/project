// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const cartCount = document.querySelector('.cart-count');

// Temporary cart count (replace with real data later)
let cartItems = 0;

// Update cart count display
function updateCart() {
  cartCount.textContent = cartItems;
}

// Login Form Handler
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log('Login attempt with:', email, password);
    alert('Login functionality will be added soon!');
    
    // For now, just show login success
    document.querySelector('.navbar .btn-outline-danger').textContent = 'My Account';
  });
}

// Register Form Handler
if (registerForm) {
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    console.log('Registration attempt:', name, email, password);
    alert('Account created successfully! (Demo)');
  });
}

// Add to Cart Buttons
document.querySelectorAll('.btn-customize').forEach(button => {
  button.addEventListener('click', function() {
    cartItems++;
    updateCart();
    alert('Item added to cart!');
  });
});

// Initialize
updateCart();
console.log('CustomWear scripts loaded!');