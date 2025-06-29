// Modal dan Form Interaktif untuk Nyampah Bersama
// Menambahkan modal login, register, komentar, dan form lainnya

class InteractiveModals {
    constructor() {
        this.createModalHTML();
        this.setupModalEvents();
    }

    createModalHTML() {
        // Modal overlay container
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = `
            <!-- Modal Overlay -->
            <div id="modal-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
                <!-- Login Modal -->
                <div id="login-modal" class="modal-content hidden">
                    <div class="fixed inset-0 flex items-center justify-center p-4">
                        <div class="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Masuk ke Akun</h2>
                                <button class="modal-close text-gray-500 hover:text-gray-700" data-modal="login-modal">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            
                            <form id="login-form" class="space-y-4">
                                <div>
                                    <label for="login-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <input type="email" id="login-email" name="email" required 
                                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                                </div>
                                
                                <div>
                                    <label for="login-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                    <input type="password" id="login-password" name="password" required 
                                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                                </div>
                                
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <input id="remember-me" name="remember" type="checkbox" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
                                        <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">Ingat saya</label>
                                    </div>
                                    <a href="#" class="text-sm text-green-600 hover:text-green-500">Lupa password?</a>
                                </div>
                                
                                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    Masuk
                                </button>
                                
                                <p class="text-center text-sm text-gray-600 dark:text-gray-400">
                                    Belum punya akun? 
                                    <button type="button" class="text-green-600 hover:text-green-500 switch-modal" data-target="register-modal">Daftar sekarang</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Register Modal -->
                <div id="register-modal" class="modal-content hidden">
                    <div class="fixed inset-0 flex items-center justify-center p-4">
                        <div class="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Daftar Akun Baru</h2>
                                <button class="modal-close text-gray-500 hover:text-gray-700" data-modal="register-modal">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            
                            <form id="register-form" class="space-y-4">
                                <div>
                                    <label for="register-nama" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                                    <input type="text" id="register-nama" name="nama" required 
                                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                                </div>
                                
                                <div>
                                    <label for="register-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <input type="email" id="register-email" name="email" required 
                                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                                </div>
                                
                                <div>
                                    <label for="register-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                    <input type="password" id="register-password" name="password" required 
                                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                                </div>
                                
                                <div>
                                    <label for="register-confirm-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Konfirmasi Password</label>
                                    <input type="password" id="register-confirm-password" name="confirmPassword" required 
                                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                                </div>
                                
                                <div class="flex items-center">
                                    <input id="terms-agreement" name="terms" type="checkbox" required class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
                                    <label for="terms-agreement" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                        Saya setuju dengan <a href="#" class="text-green-600 hover:text-green-500">syarat dan ketentuan</a>
                                    </label>
                                </div>
                                
                                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    Daftar
                                </button>
                                
                                <p class="text-center text-sm text-gray-600 dark:text-gray-400">
                                    Sudah punya akun? 
                                    <button type="button" class="text-green-600 hover:text-green-500 switch-modal" data-target="login-modal">Masuk sekarang</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Comment Modal -->
                <div id="comment-modal" class="modal-content hidden">
                    <div class="fixed inset-0 flex items-center justify-center p-4">
                        <div class="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Tulis Komentar</h2>
                                <button class="modal-close text-gray-500 hover:text-gray-700" data-modal="comment-modal">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            
                            <form id="comment-form" class="space-y-4">
                                <div>
                                    <label for="comment-content" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Komentar Anda</label>
                                    <textarea id="comment-content" name="content" rows="4" required 
                                              placeholder="Bagikan pendapat atau pertanyaan Anda..."
                                              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea>
                                    <p class="mt-1 text-sm text-gray-500">Minimal 10 karakter</p>
                                </div>
                                
                                <div class="flex items-center">
                                    <input id="anonymous-comment" name="anonymous" type="checkbox" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
                                    <label for="anonymous-comment" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">Kirim sebagai anonim</label>
                                </div>
                                
                                <div class="flex justify-end space-x-3">
                                    <button type="button" class="modal-close px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300" data-modal="comment-modal">
                                        Batal
                                    </button>
                                    <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                                        Kirim Komentar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Profile Modal -->
                <div id="profile-modal" class="modal-content hidden">
                    <div class="fixed inset-0 flex items-center justify-center p-4">
                        <div class="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Profil Pengguna</h2>
                                <button class="modal-close text-gray-500 hover:text-gray-700" data-modal="profile-modal">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            
                            <div id="user-info" class="space-y-4">
                                <div class="text-center">
                                    <div class="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                                        U
                                    </div>
                                    <h3 id="profile-name" class="text-lg font-medium text-gray-900 dark:text-white">Nama Pengguna</h3>
                                    <p id="profile-email" class="text-sm text-gray-500">email@contoh.com</p>
                                </div>
                                
                                <div class="grid grid-cols-2 gap-4 text-center">
                                    <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                        <p class="text-2xl font-bold text-green-600" id="profile-points">0</p>
                                        <p class="text-sm text-gray-600 dark:text-gray-400">Poin</p>
                                    </div>
                                    <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                        <p class="text-2xl font-bold text-yellow-600" id="profile-coins">0</p>
                                        <p class="text-sm text-gray-600 dark:text-gray-400">NyampahCoin</p>
                                    </div>
                                </div>
                                
                                <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Level:</p>
                                    <p id="profile-level" class="text-lg font-bold text-green-600">Pemula</p>
                                    <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div id="profile-progress" class="bg-green-600 h-2 rounded-full" style="width: 0%" data-progress="30"></div>
                                    </div>
                                </div>
                                
                                <button id="logout-btn" class="w-full py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                                    Keluar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Modal -->
                <div id="contact-modal" class="modal-content hidden">
                    <div class="fixed inset-0 flex items-center justify-center p-4">
                        <div class="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Hubungi Kami</h2>
                                <button class="modal-close text-gray-500 hover:text-gray-700" data-modal="contact-modal">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            
                            <form id="contact-form" class="space-y-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label for="contact-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama</label>
                                        <input type="text" id="contact-name" name="name" required 
                                               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                                    </div>
                                    <div>
                                        <label for="contact-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                        <input type="email" id="contact-email" name="email" required 
                                               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                                    </div>
                                </div>
                                
                                <div>
                                    <label for="contact-subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Subjek</label>
                                    <select id="contact-subject" name="subject" required 
                                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                                        <option value="">Pilih subjek</option>
                                        <option value="general">Pertanyaan Umum</option>
                                        <option value="technical">Bantuan Teknis</option>
                                        <option value="partnership">Kerjasama</option>
                                        <option value="feedback">Saran & Kritik</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label for="contact-message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Pesan</label>
                                    <textarea id="contact-message" name="message" rows="4" required 
                                              placeholder="Tulis pesan Anda di sini..."
                                              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea>
                                </div>
                                
                                <div class="flex justify-end space-x-3">
                                    <button type="button" class="modal-close px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300" data-modal="contact-modal">
                                        Batal
                                    </button>
                                    <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                                        Kirim Pesan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Theme Toggle Button -->
            <button id="theme-toggle" class="fixed bottom-4 right-4 p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 z-40">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"></path>
                </svg>
            </button>

            <!-- User Info Display -->
            <div id="user-info-display" class="fixed top-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 z-40 hidden">
                <div class="text-sm">
                    <p class="font-medium text-gray-900 dark:text-white" id="display-name">Tamu</p>
                    <p class="text-gray-500" id="display-stats">0 poin | 0 NC</p>
                </div>
            </div>
        `;
        
        // Append to body
        document.body.appendChild(modalContainer);
    }

    setupModalEvents() {
        // Close modal events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close')) {
                const modalId = e.target.getAttribute('data-modal');
                this.hideModal(modalId);
            }
            
            if (e.target.id === 'modal-overlay') {
                this.hideAllModals();
            }
        });

        // Switch between modals
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('switch-modal')) {
                e.preventDefault();
                const targetModal = e.target.getAttribute('data-target');
                this.hideAllModals();
                this.showModal(targetModal);
            }
        });

        // ESC key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideAllModals();
            }
        });
    }

    showModal(modalId) {
        const overlay = document.getElementById('modal-overlay');
        const modal = document.getElementById(modalId);
        
        if (overlay && modal) {
            overlay.classList.remove('hidden');
            modal.classList.remove('hidden');
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
        
        // Hide overlay if no modals are visible
        const visibleModals = document.querySelectorAll('.modal-content:not(.hidden)');
        if (visibleModals.length === 0) {
            const overlay = document.getElementById('modal-overlay');
            if (overlay) {
                overlay.classList.add('hidden');
            }
        }
    }

    hideAllModals() {
        const overlay = document.getElementById('modal-overlay');
        const modals = document.querySelectorAll('.modal-content');
        
        if (overlay) {
            overlay.classList.add('hidden');
        }
        
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });
    }
}

// Initialize modals when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.interactiveModals = new InteractiveModals();
    console.log('🎭 Interactive Modals Ready!');
});