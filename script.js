// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.padding = '1rem';
            navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    }

    // Initialize session management
    initializeSession();
    
    // Initialize form validations
    initializeForms();
    
    // Initialize dashboard functionality
    initializeDashboard();
});

// Session Management
function initializeSession() {
    // Check if user is logged in
    const userType = localStorage.getItem('userType');
    const username = localStorage.getItem('username');
    
    if (userType && username) {
        updateNavigation(userType, username);
    }
}

function updateNavigation(userType, username) {
    const accountMenu = document.querySelector('.dropdown a');
    if (accountMenu) {
        accountMenu.innerHTML = `<i class="fas fa-user"></i> ${username} <i class="fas fa-chevron-down"></i>`;
        
        const dropdownContent = document.querySelector('.dropdown-content');
        if (dropdownContent) {
            dropdownContent.innerHTML = `
                <a href="${userType}_profile.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                <a href="my_bookings.html"><i class="fas fa-calendar-alt"></i> My Bookings</a>
                <a href="#" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</a>
            `;
        }
    }
}

function logout() {
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    window.location.href = 'index.html';
}

// Form Handling
function initializeForms() {
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Registration form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }
    
    // Booking form handling
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBooking);
        calculateTotalRent();
    }
    
    // Add vehicle form handling
    const addVehicleForm = document.getElementById('addVehicleForm');
    if (addVehicleForm) {
        addVehicleForm.addEventListener('submit', handleAddVehicle);
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('user_type').value;
    
    // Simulate API call - In real app, this would be a server request
    setTimeout(() => {
        if (email && password) {
            localStorage.setItem('userType', userType);
            localStorage.setItem('username', email.split('@')[0]);
            localStorage.setItem('userId', Date.now().toString());
            
            // Show success message
            showAlert('Login successful! Redirecting...', 'success');
            
            // Redirect based on user type
            setTimeout(() => {
                if (userType === 'admin') {
                    window.location.href = 'admin_panel.html';
                } else {
                    window.location.href = `${userType}_profile.html`;
                }
            }, 1500);
        } else {
            showAlert('Please fill all fields', 'error');
        }
    }, 500);
}

function handleRegistration(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const userType = formData.get('user_type');
    
    // Simulate registration
    setTimeout(() => {
        showAlert('Registration successful! Please login.', 'success');
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }, 500);
}

function handleBooking(e) {
    e.preventDefault();
    
    // Get booking data
    const fromDate = document.getElementById('from_date').value;
    const toDate = document.getElementById('to_date').value;
    
    if (!fromDate || !toDate) {
        showAlert('Please select both dates', 'error');
        return;
    }
    
    // Calculate days
    const days = calculateDays(fromDate, toDate);
    
    showAlert(`Booking created for ${days} days! Proceed to payment.`, 'success');
    
    // Redirect to payment after 2 seconds
    setTimeout(() => {
        window.location.href = `payment.html?days=${days}`;
    }, 2000);
}

function calculateDays(fromDate, toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const timeDiff = to.getTime() - from.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
}

function calculateTotalRent() {
    const fromDateInput = document.getElementById('from_date');
    const toDateInput = document.getElementById('to_date');
    const rentPerDay = parseFloat(document.getElementById('rent_per_day')?.value || 1000);
    const totalRentElement = document.getElementById('total_rent');
    
    if (fromDateInput && toDateInput && totalRentElement) {
        const calculate = () => {
            if (fromDateInput.value && toDateInput.value) {
                const days = calculateDays(fromDateInput.value, toDateInput.value);
                const total = days * rentPerDay;
                totalRentElement.textContent = `₹${total.toFixed(2)}`;
            }
        };
        
        fromDateInput.addEventListener('change', calculate);
        toDateInput.addEventListener('change', calculate);
    }
}

// Dashboard Functions
function initializeDashboard() {
    // Load dashboard data
    loadDashboardData();
    
    // Initialize date pickers
    initializeDatePickers();
    
    // Initialize file upload previews
    initializeFileUploads();
}

function loadDashboardData() {
    // This would normally load data from an API
    // For demo purposes, we'll simulate data loading
    const userType = localStorage.getItem('userType');
    
    if (userType === 'user') {
        loadUserDashboard();
    } else if (userType === 'host') {
        loadHostDashboard();
    } else if (userType === 'admin') {
        loadAdminDashboard();
    }
}

function loadUserDashboard() {
    // Simulate loading user data
    const vehicles = [
        { id: 1, name: 'Toyota Camry', brand: 'Toyota', price: 2500, location: 'Mumbai' },
        { id: 2, name: 'Honda City', brand: 'Honda', price: 2000, location: 'Delhi' },
        { id: 3, name: 'Maruti Swift', brand: 'Maruti', price: 1500, location: 'Bangalore' }
    ];
    
    // Update UI with vehicles
    const vehiclesGrid = document.getElementById('vehiclesGrid');
    if (vehiclesGrid) {
        vehiclesGrid.innerHTML = vehicles.map(vehicle => `
            <div class="vehicle-card">
                <img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop" class="vehicle-image">
                <div class="vehicle-info">
                    <h3>${vehicle.name}</h3>
                    <p>${vehicle.brand} • ${vehicle.location}</p>
                    <div class="vehicle-features">
                        <span><i class="fas fa-gas-pump"></i> Petrol</span>
                        <span><i class="fas fa-cog"></i> Automatic</span>
                        <span><i class="fas fa-users"></i> 5 Seats</span>
                    </div>
                    <div class="vehicle-price">₹${vehicle.price}/day</div>
                    <a href="book_vehicle.html?id=${vehicle.id}" class="btn primary" style="width: 100%; margin-top: 1rem;">
                        <i class="fas fa-calendar-alt"></i> Book Now
                    </a>
                </div>
            </div>
        `).join('');
    }
}

function initializeDatePickers() {
    // Set min date to today for all date inputs
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.min = today;
    });
}

function initializeFileUploads() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const fileName = e.target.files[0]?.name;
            if (fileName) {
                const label = this.nextElementSibling;
                if (label && label.classList.contains('file-label')) {
                    label.textContent = fileName;
                }
            }
        });
    });
}

// Alert System
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = 'float: right; border: none; background: none; font-size: 1.5rem; cursor: pointer;';
    closeBtn.onclick = () => alertDiv.remove();
    
    alertDiv.appendChild(closeBtn);
    
    // Insert at top of page
    const container = document.querySelector('main') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Payment Simulation
function simulatePayment(amount, callback) {
    showAlert('Processing payment...', 'info');
    
    // Simulate payment processing
    setTimeout(() => {
        callback(true, 'Payment completed successfully!');
    }, 2000);
}

// Search Functionality
function searchVehicles() {
    const searchInput = document.querySelector('.search-box input');
    const searchTerm = searchInput?.value.toLowerCase();
    
    if (searchTerm) {
        // Store search term in localStorage for results page
        localStorage.setItem('searchTerm', searchTerm);
        window.location.href = 'browse_vehicles.html';
    }
}

// Initialize search button if exists
const searchBtn = document.querySelector('.search-box button');
if (searchBtn) {
    searchBtn.addEventListener('click', searchVehicles);
}

// Make functions available globally
window.logout = logout;
window.showAlert = showAlert;
window.searchVehicles = searchVehicles;