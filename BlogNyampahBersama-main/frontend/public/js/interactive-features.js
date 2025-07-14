// JavaScript Interaktif untuk Blog Nyampah Bersama
// Sistem lengkap dengan Event Listeners, Form Handlers, Validasi, dan Logic

class NyampahBersamaInteractive {
    constructor() {
        this.saldo = 100; // Variable untuk saldo NyampahCoin
        this.userData = {
            nama: '',
            email: '',
            level: 'Pemula',
            poin: 0
        };
        this.isLoggedIn = false;
        this.searchHistory = [];
        this.currentTheme = 'light';
        
        this.init();
    }

    // === INISIALISASI ===
    init() {
        console.log('🚀 Nyampah Bersama Interactive System Starting...');
        this.setupEventListeners();
        this.setupFormHandlers();
        this.loadUserData();
        this.startAnimations();
        console.log('✅ Interactive System Ready!');
    }

    // === EVENT LISTENERS ===
    setupEventListeners() {
        // Click Events untuk tombol-tombol utama
        this.addClickEvent('join-community-btn', () => this.handleJoinCommunity());
        this.addClickEvent('start-writing-btn', () => this.handleStartWriting());
        this.addClickEvent('mobile-menu-btn', () => this.toggleMobileMenu());
        this.addClickEvent('btn-all-posts', () => this.filterPosts('all'));
        this.addClickEvent('user-avatar', () => this.showUserProfile());

        // Search Events
        this.addInputEvent('search-input', (e) => this.handleSearch(e));
        this.addInputEvent('mobile-search-input', (e) => this.handleSearch(e));

        // Theme Toggle
        this.addClickEvent('theme-toggle', () => this.toggleTheme());

        // Category Filter Events
        const categoryBtns = document.querySelectorAll('[data-category]');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.filterPosts(category);
            });
        });

        // Post Like Events
        const likeBtns = document.querySelectorAll('[data-post-like]');
        likeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = e.target.getAttribute('data-post-like');
                this.handleLikePost(postId, e.target);
            });
        });

        // Scroll Events untuk lazy loading
        window.addEventListener('scroll', () => this.handleScroll());

        // Window resize untuk responsive
        window.addEventListener('resize', () => this.handleResize());
    }

    // === FORM HANDLERS ===
    setupFormHandlers() {
        // Handler untuk form pencarian
        const searchForms = document.querySelectorAll('#search-form, #mobile-search-form');
        searchForms.forEach(form => {
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const input = form.querySelector('input');
                    this.submitSearch(input.value);
                });
            }
        });

        // Handler untuk form login (jika ada)
        this.setupFormHandler('login-form', (data) => this.handleLogin(data));
        
        // Handler untuk form register (jika ada)
        this.setupFormHandler('register-form', (data) => this.handleRegister(data));
        
        // Handler untuk form komentar
        this.setupFormHandler('comment-form', (data) => this.handleComment(data));
        
        // Handler untuk form kontak
        this.setupFormHandler('contact-form', (data) => this.handleContact(data));
    }

    setupFormHandler(formId, callback) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = this.getFormData(form);
                if (this.validateForm(form, formData)) {
                    callback(formData);
                }
            });
        }
    }

    // === FORM VALIDATION ===
    validateForm(form, data) {
        let isValid = true;
        const errors = [];

        // Reset error states
        form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        form.querySelectorAll('.error-message').forEach(el => el.remove());

        // Validasi berdasarkan form type
        if (form.id === 'login-form') {
            if (!data.email || !this.isValidEmail(data.email)) {
                this.showFieldError(form, 'email', 'Email tidak valid');
                isValid = false;
            }
            if (!data.password || data.password.length < 6) {
                this.showFieldError(form, 'password', 'Password minimal 6 karakter');
                isValid = false;
            }
        }

        if (form.id === 'register-form') {
            if (!data.nama || data.nama.length < 2) {
                this.showFieldError(form, 'nama', 'Nama minimal 2 karakter');
                isValid = false;
            }
            if (!data.email || !this.isValidEmail(data.email)) {
                this.showFieldError(form, 'email', 'Email tidak valid');
                isValid = false;
            }
            if (!data.password || data.password.length < 8) {
                this.showFieldError(form, 'password', 'Password minimal 8 karakter');
                isValid = false;
            }
            if (data.password !== data.confirmPassword) {
                this.showFieldError(form, 'confirmPassword', 'Password tidak sama');
                isValid = false;
            }
        }

        if (form.id === 'comment-form') {
            if (!data.content || data.content.length < 10) {
                this.showFieldError(form, 'content', 'Komentar minimal 10 karakter');
                isValid = false;
            }
        }

        return isValid;
    }

    // === UTILITY FUNCTIONS ===
    addClickEvent(elementId, callback) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener('click', callback);
        }
    }

    addInputEvent(elementId, callback) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener('input', callback);
        }
    }

    getFormData(form) {
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        return data;
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showFieldError(form, fieldName, message) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-red-500 text-sm mt-1';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
        }
    }

    // === INTERACTIVE HANDLERS ===
    handleJoinCommunity() {
        if (this.isLoggedIn) {
            this.showNotification('Anda sudah menjadi anggota komunitas!', 'success');
        } else {
            this.showModal('login-modal');
        }
    }

    handleStartWriting() {
        if (this.isLoggedIn) {
            window.location.href = '/write';
        } else {
            this.showNotification('Silakan login terlebih dahulu untuk menulis artikel', 'warning');
            this.showModal('login-modal');
        }
    }

    handleSearch(e) {
        const query = e.target.value;
        if (query.length > 0) {
            this.searchHistory.push(query);
            this.showSearchSuggestions(query);
        } else {
            this.hideSearchSuggestions();
        }
    }

    submitSearch(query) {
        if (!query || query.trim() === '') {
            this.showNotification('Masukkan kata kunci pencarian', 'warning');
            return;
        }

        console.log(`🔍 Mencari: ${query}`);
        this.searchHistory.push(query);
        
        // Simulasi pencarian dengan loading
        this.showSearchLoading();
        
        setTimeout(() => {
            this.hideSearchLoading();
            this.displaySearchResults(query);
        }, 1000);
    }

    handleLikePost(postId, button) {
        if (!this.isLoggedIn) {
            this.showNotification('Login untuk menyukai artikel', 'warning');
            return;
        }

        const isLiked = button.classList.contains('liked');
        const likeCount = button.querySelector('.like-count');
        
        if (isLiked) {
            button.classList.remove('liked');
            this.decrementCount(likeCount);
            this.showNotification('Like dibatalkan', 'info');
        } else {
            button.classList.add('liked');
            this.incrementCount(likeCount);
            this.showNotification('Artikel disukai!', 'success');
            this.addPoin(5); // Tambah poin untuk like
        }
    }

    filterPosts(category) {
        console.log(`📂 Filter kategori: ${category}`);
        
        // Update active button
        document.querySelectorAll('[data-category]').forEach(btn => {
            btn.classList.remove('bg-green-600', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
        });
        
        const activeBtn = document.querySelector(`[data-category="${category}"]`);
        if (activeBtn) {
            activeBtn.classList.remove('bg-gray-200', 'text-gray-700');
            activeBtn.classList.add('bg-green-600', 'text-white');
        }

        // Filter posts (simulasi)
        this.showPostLoading();
        setTimeout(() => {
            this.hidePostLoading();
            this.displayFilteredPosts(category);
        }, 500);
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark');
        this.saveThemePreference();
        this.showNotification(`Tema ${this.currentTheme} diaktifkan`, 'success');
    }

    // === CONDITIONAL LOGIC ===
    handleLogin(data) {
        // Simulasi login
        if (data.email === 'admin@nyampah.com' && data.password === 'admin123') {
            this.isLoggedIn = true;
            this.userData = {
                nama: 'Admin Nyampah',
                email: data.email,
                level: 'Administrator',
                poin: 1000
            };
            this.showNotification('Login berhasil! Selamat datang kembali', 'success');
            this.hideModal('login-modal');
            this.updateUserInterface();
        } else {
            this.showNotification('Email atau password salah', 'error');
        }
    }

    handleRegister(data) {
        // Simulasi register
        this.isLoggedIn = true;
        this.userData = {
            nama: data.nama,
            email: data.email,
            level: 'Pemula',
            poin: 50 // Bonus poin untuk registrasi
        };
        this.saldo += 20; // Bonus NyampahCoin
        this.showNotification('Registrasi berhasil! Selamat datang di komunitas', 'success');
        this.hideModal('register-modal');
        this.updateUserInterface();
    }

    // === LOOPING & ANIMATIONS ===
    startAnimations() {
        // Animasi counter untuk statistik
        this.animateCounters();
        
        // Typing effect untuk hero title
        this.typewriterEffect('hero-title', 'Nyampah Bersama: Komunitas Peduli Lingkungan');
        
        // Progress bar animasi
        this.animateProgressBars();
    }

    animateCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter'));
            let current = 0;
            const increment = target / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 20);
        });
    }

    typewriterEffect(elementId, text) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        element.textContent = '';
        let i = 0;
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 100);
    }

    // === NYAMPAH COIN SYSTEM ===
    addPoin(jumlah) {
        this.userData.poin += jumlah;
        this.saldo += Math.floor(jumlah / 10); // 10 poin = 1 NyampahCoin
        this.updateUserInterface();
        this.showNotification(`+${jumlah} poin earned!`, 'success');
    }

    // === UI MANAGEMENT ===
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${this.getNotificationColor(type)}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    getNotificationColor(type) {
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };
        return colors[type] || colors.info;
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    updateUserInterface() {
        // Update user info di navbar
        const userInfo = document.getElementById('user-info');
        if (userInfo && this.isLoggedIn) {
            userInfo.innerHTML = `
                <span class="text-sm font-medium">${this.userData.nama}</span>
                <span class="text-xs text-gray-500">${this.userData.poin} poin | ${this.saldo} NC</span>
            `;
        }
    }

    // === STORAGE ===
    saveUserData() {
        localStorage.setItem('nyampah_user', JSON.stringify(this.userData));
        localStorage.setItem('nyampah_saldo', this.saldo);
        localStorage.setItem('nyampah_logged_in', this.isLoggedIn);
    }

    loadUserData() {
        const savedUser = localStorage.getItem('nyampah_user');
        const savedSaldo = localStorage.getItem('nyampah_saldo');
        const savedLogin = localStorage.getItem('nyampah_logged_in');
        
        if (savedUser) {
            this.userData = JSON.parse(savedUser);
        }
        if (savedSaldo) {
            this.saldo = parseInt(savedSaldo);
        }
        if (savedLogin) {
            this.isLoggedIn = savedLogin === 'true';
        }
        
        this.updateUserInterface();
    }

    saveThemePreference() {
        localStorage.setItem('nyampah_theme', this.currentTheme);
    }

    // === UTILITY METHODS ===
    incrementCount(element) {
        if (element) {
            const current = parseInt(element.textContent) || 0;
            element.textContent = current + 1;
        }
    }

    decrementCount(element) {
        if (element) {
            const current = parseInt(element.textContent) || 0;
            element.textContent = Math.max(0, current - 1);
        }
    }

    showSearchLoading() {
        const container = document.getElementById('posts-container');
        if (container) {
            container.innerHTML = '<div class="text-center py-8">🔍 Mencari artikel...</div>';
        }
    }

    hideSearchLoading() {
        // Implementation would reload the posts
    }

    showPostLoading() {
        const container = document.getElementById('posts-container');
        if (container) {
            container.innerHTML = '<div class="text-center py-8">📚 Memuat artikel...</div>';
        }
    }

    hidePostLoading() {
        // Implementation would reload the posts
    }

    handleScroll() {
        // Lazy loading implementation
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
            this.loadMorePosts();
        }
    }

    handleResize() {
        // Handle responsive changes
        if (window.innerWidth > 768) {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
    }

    loadMorePosts() {
        console.log('📖 Loading more posts...');
    }

    displaySearchResults(query) {
        console.log(`📋 Displaying results for: ${query}`);
    }

    displayFilteredPosts(category) {
        console.log(`📂 Displaying posts for category: ${category}`);
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('[data-progress]');
        progressBars.forEach(bar => {
            const target = parseInt(bar.getAttribute('data-progress'));
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = target + '%';
            }, 500);
        });
    }

    showSearchSuggestions(query) {
        // Implementation for search suggestions
    }

    hideSearchSuggestions() {
        // Implementation to hide suggestions
    }

    showUserProfile() {
        if (this.isLoggedIn) {
            this.showModal('profile-modal');
        } else {
            this.showModal('login-modal');
        }
    }

    handleComment(data) {
        if (!this.isLoggedIn) {
            this.showNotification('Login untuk berkomentar', 'warning');
            return;
        }
        
        console.log('💬 Mengirim komentar:', data);
        this.addPoin(10); // Bonus poin untuk komentar
        this.showNotification('Komentar berhasil dikirim!', 'success');
    }

    handleContact(data) {
        console.log('📧 Mengirim pesan kontak:', data);
        this.showNotification('Pesan Anda telah dikirim. Terima kasih!', 'success');
    }
}

// Inisialisasi sistem saat DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    window.nyampahInteractive = new NyampahBersamaInteractive();
    
    // Export ke global scope untuk akses dari console
    window.changeHeroTitle = (title) => {
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) heroTitle.textContent = title;
    };
    
    window.addPoin = (jumlah) => {
        window.nyampahInteractive.addPoin(jumlah);
    };
    
    window.showNotif = (message, type = 'info') => {
        window.nyampahInteractive.showNotification(message, type);
    };
    
    console.log('🌟 Nyampah Bersama Interactive System Loaded!');
    console.log('🎮 Available commands:');
    console.log('   changeHeroTitle("Judul Baru")');
    console.log('   addPoin(50)');
    console.log('   showNotif("Pesan", "success")');
    console.log('   nyampahInteractive.toggleTheme()');
});