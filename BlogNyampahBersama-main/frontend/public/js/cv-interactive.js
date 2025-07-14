// CV & Portfolio Interactive Features
class CVInteractive {
    constructor() {
        this.profileData = {
            isEditing: false,
            skillsExpanded: false,
            experienceExpanded: true,
            projectsView: 'grid' // grid or list
        };
        this.init();
    }

    init() {
        console.log('🎓 CV Interactive System Loaded!');
        this.setupCVEvents();
        this.setupProfileEditor();
        this.setupSkillsInteraction();
        this.setupProjectsFiltering();
        this.setupPrintFriendly();
    }

    setupCVEvents() {
        // CV Header Actions
        this.addClickEvent('download-cv-btn', () => this.downloadCV());
        this.addClickEvent('share-profile-btn', () => this.shareProfile());
        this.addClickEvent('edit-profile-btn', () => this.toggleEditMode());
        
        // Profile Photo Upload
        this.addClickEvent('profile-photo-btn', () => this.uploadProfilePhoto());
        
        // Social Links
        this.addClickEvent('github-link', () => this.trackSocialClick('github'));
        this.addClickEvent('linkedin-link', () => this.trackSocialClick('linkedin'));
        this.addClickEvent('portfolio-link', () => this.trackSocialClick('portfolio'));
    }

    setupProfileEditor() {
        // Real-time editing capabilities
        this.addInputEvent('profile-name', (value) => this.updateProfileField('name', value));
        this.addInputEvent('profile-title', (value) => this.updateProfileField('title', value));
        this.addInputEvent('profile-bio', (value) => this.updateProfileField('bio', value));
        this.addInputEvent('profile-email', (value) => this.updateProfileField('email', value));
        this.addInputEvent('profile-phone', (value) => this.updateProfileField('phone', value));
        
        // Add new experience/education entries
        this.addClickEvent('add-experience-btn', () => this.addExperienceEntry());
        this.addClickEvent('add-education-btn', () => this.addEducationEntry());
        this.addClickEvent('add-project-btn', () => this.addProjectEntry());
        this.addClickEvent('add-skill-btn', () => this.addSkillEntry());
    }

    setupSkillsInteraction() {
        // Skills rating and interaction
        const skillElements = document.querySelectorAll('[data-skill]');
        skillElements.forEach(skill => {
            skill.addEventListener('click', () => {
                const skillName = skill.getAttribute('data-skill');
                this.showSkillDetails(skillName);
            });
            
            skill.addEventListener('mouseover', () => {
                this.highlightSkillLevel(skill);
            });
        });
        
        // Skill categories toggle
        this.addClickEvent('toggle-technical-skills', () => this.toggleSkillCategory('technical'));
        this.addClickEvent('toggle-soft-skills', () => this.toggleSkillCategory('soft'));
    }

    setupProjectsFiltering() {
        // Projects view toggle
        this.addClickEvent('projects-grid-view', () => this.setProjectsView('grid'));
        this.addClickEvent('projects-list-view', () => this.setProjectsView('list'));
        
        // Project filtering
        this.addClickEvent('filter-all-projects', () => this.filterProjects('all'));
        this.addClickEvent('filter-web-projects', () => this.filterProjects('web'));
        this.addClickEvent('filter-mobile-projects', () => this.filterProjects('mobile'));
        this.addClickEvent('filter-research-projects', () => this.filterProjects('research'));
        
        // Project interaction
        const projectCards = document.querySelectorAll('[data-project-id]');
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project-id');
                this.openProjectDetails(projectId);
            });
        });
    }

    setupPrintFriendly() {
        // Print-friendly CV version
        this.addClickEvent('print-cv-btn', () => this.preparePrintVersion());
        
        // Before print event
        window.addEventListener('beforeprint', () => {
            this.optimizeForPrint();
        });
        
        window.addEventListener('afterprint', () => {
            this.restoreFromPrint();
        });
    }

    // CV Actions
    downloadCV() {
        console.log('📄 Downloading CV...');
        
        // Show loading state
        const btn = document.getElementById('download-cv-btn');
        if (btn) {
            const originalText = btn.textContent;
            btn.textContent = 'Generating PDF...';
            btn.disabled = true;
            
            // Simulate PDF generation
            setTimeout(() => {
                // In real implementation, this would generate actual PDF
                this.showNotification('CV berhasil didownload!', 'success');
                btn.textContent = originalText;
                btn.disabled = false;
                
                // Create download link (mock)
                const link = document.createElement('a');
                link.href = 'data:text/plain;charset=utf-8,CV Sarah Chen - Environmental Engineer';
                link.download = 'Sarah_Chen_CV.pdf';
                link.click();
            }, 2000);
        }
    }

    shareProfile() {
        console.log('🔗 Sharing profile...');
        
        if (navigator.share) {
            navigator.share({
                title: 'Sarah Chen - Environmental Engineer',
                text: 'Lihat profil profesional saya di Nyampah Bersama',
                url: window.location.href
            });
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showNotification('Link profil berhasil dicopy!', 'success');
            });
        }
    }

    toggleEditMode() {
        this.profileData.isEditing = !this.profileData.isEditing;
        
        const editableElements = document.querySelectorAll('[data-editable]');
        const editBtn = document.getElementById('edit-profile-btn');
        
        if (this.profileData.isEditing) {
            // Enable editing
            editableElements.forEach(el => {
                el.setAttribute('contenteditable', 'true');
                el.classList.add('bg-yellow-50', 'border', 'border-yellow-200', 'rounded', 'px-2', 'py-1');
            });
            
            if (editBtn) editBtn.textContent = 'Save';
            this.showNotification('Mode editing aktif. Klik teks untuk mengedit.', 'info');
        } else {
            // Save and disable editing
            editableElements.forEach(el => {
                el.setAttribute('contenteditable', 'false');
                el.classList.remove('bg-yellow-50', 'border', 'border-yellow-200', 'rounded', 'px-2', 'py-1');
            });
            
            if (editBtn) editBtn.textContent = 'Edit';
            this.saveProfileChanges();
            this.showNotification('Perubahan profil berhasil disimpan!', 'success');
        }
    }

    uploadProfilePhoto() {
        console.log('📸 Uploading profile photo...');
        
        // Create file input
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Update profile photo (in real app, upload to server)
                    this.showNotification('Foto profil berhasil diupdate!', 'success');
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    }

    // Skills Interaction
    showSkillDetails(skillName) {
        console.log(`🎯 Showing details for skill: ${skillName}`);
        
        // Create modal or tooltip with skill details
        const modal = this.createSkillModal(skillName);
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => modal.classList.add('opacity-100'), 10);
    }

    createSkillModal(skillName) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-md mx-4">
                <h3 class="text-lg font-semibold mb-3">${skillName}</h3>
                <div class="mb-4">
                    <p class="text-sm text-gray-600 mb-2">Level Keahlian:</p>
                    <div class="flex gap-1">
                        ${[1,2,3,4,5].map(i => `
                            <div class="w-6 h-6 rounded ${i <= 4 ? 'bg-green-500' : 'bg-gray-200'}"></div>
                        `).join('')}
                    </div>
                </div>
                <p class="text-sm text-gray-700 mb-4">
                    Pengalaman ${Math.floor(Math.random() * 5) + 1} tahun dalam ${skillName}. 
                    Telah menggunakan untuk berbagai proyek profesional.
                </p>
                <button onclick="this.parentElement.parentElement.remove()" 
                        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Tutup
                </button>
            </div>
        `;
        
        return modal;
    }

    highlightSkillLevel(skillElement) {
        // Add visual feedback for skill level
        const level = Math.floor(Math.random() * 5) + 1;
        skillElement.title = `Level: ${level}/5`;
    }

    toggleSkillCategory(category) {
        const categoryElement = document.getElementById(`${category}-skills-section`);
        if (categoryElement) {
            const isExpanded = categoryElement.classList.contains('expanded');
            
            if (isExpanded) {
                categoryElement.classList.remove('expanded');
                categoryElement.style.maxHeight = '60px';
            } else {
                categoryElement.classList.add('expanded');
                categoryElement.style.maxHeight = 'none';
            }
        }
    }

    // Projects Interaction
    setProjectsView(view) {
        this.profileData.projectsView = view;
        const projectsContainer = document.getElementById('projects-container');
        
        if (projectsContainer) {
            if (view === 'grid') {
                projectsContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';
            } else {
                projectsContainer.className = 'space-y-4';
            }
        }
        
        // Update view buttons
        document.getElementById('projects-grid-view')?.classList.toggle('active', view === 'grid');
        document.getElementById('projects-list-view')?.classList.toggle('active', view === 'list');
    }

    filterProjects(category) {
        console.log(`🔍 Filtering projects by: ${category}`);
        
        const projectCards = document.querySelectorAll('[data-project-category]');
        
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-project-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        });
        
        // Update active filter button
        document.querySelectorAll('[data-filter]').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${category}"]`)?.classList.add('active');
    }

    openProjectDetails(projectId) {
        console.log(`📂 Opening project details: ${projectId}`);
        
        // Create project details modal
        const modal = this.createProjectModal(projectId);
        document.body.appendChild(modal);
        
        setTimeout(() => modal.classList.add('opacity-100'), 10);
    }

    createProjectModal(projectId) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-semibold">Project Details</h3>
                    <button onclick="this.closest('.fixed').remove()" 
                            class="text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="space-y-4">
                    <div class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <span class="text-gray-500">Project Screenshot</span>
                    </div>
                    <div>
                        <h4 class="font-medium mb-2">Deskripsi Lengkap</h4>
                        <p class="text-gray-700 text-sm">
                            Proyek ini merupakan implementasi teknologi hijau yang fokus pada sustainability dan environmental impact. 
                            Menggunakan teknologi modern untuk memberikan solusi inovatif.
                        </p>
                    </div>
                    <div>
                        <h4 class="font-medium mb-2">Teknologi yang Digunakan</h4>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">React</span>
                            <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Node.js</span>
                            <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">PostgreSQL</span>
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                            View Live Demo
                        </button>
                        <button class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm">
                            View Source Code
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }

    // Print Functionality
    preparePrintVersion() {
        console.log('🖨️ Preparing print version...');
        
        // Add print-specific styles
        const printStyles = document.createElement('style');
        printStyles.innerHTML = `
            @media print {
                .no-print { display: none !important; }
                .print-only { display: block !important; }
                body { font-size: 12pt; }
                .page-break { page-break-before: always; }
            }
        `;
        document.head.appendChild(printStyles);
        
        // Trigger print dialog
        window.print();
    }

    optimizeForPrint() {
        // Hide interactive elements for print
        document.querySelectorAll('button, .interactive-element').forEach(el => {
            el.classList.add('no-print');
        });
        
        // Show print-only content
        document.querySelectorAll('.print-only').forEach(el => {
            el.style.display = 'block';
        });
    }

    restoreFromPrint() {
        // Restore interactive elements after print
        document.querySelectorAll('.no-print').forEach(el => {
            el.classList.remove('no-print');
        });
        
        document.querySelectorAll('.print-only').forEach(el => {
            el.style.display = 'none';
        });
    }

    // Data Management
    updateProfileField(field, value) {
        console.log(`📝 Updating ${field}: ${value}`);
        
        // In real app, this would update the database
        this.profileData[field] = value;
        
        // Auto-save after 2 seconds of inactivity
        clearTimeout(this.autoSaveTimer);
        this.autoSaveTimer = setTimeout(() => {
            this.saveProfileChanges();
        }, 2000);
    }

    saveProfileChanges() {
        console.log('💾 Saving profile changes...');
        
        // Simulate API call to save data
        const saveData = { ...this.profileData };
        localStorage.setItem('cv_profile_data', JSON.stringify(saveData));
        
        // Show save indicator
        this.showSaveIndicator();
    }

    loadProfileData() {
        const saved = localStorage.getItem('cv_profile_data');
        if (saved) {
            this.profileData = { ...this.profileData, ...JSON.parse(saved) };
            console.log('📂 Profile data loaded from storage');
        }
    }

    // UI Helpers
    addClickEvent(elementId, callback) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener('click', callback);
        }
    }

    addInputEvent(elementId, callback) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener('input', (e) => callback(e.target.value));
        }
    }

    showNotification(message, type = 'info') {
        // Use existing notification system
        if (window.showNotif) {
            window.showNotif(message, type);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }

    showSaveIndicator() {
        // Show temporary save indicator
        const indicator = document.createElement('div');
        indicator.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
        indicator.textContent = 'Tersimpan ✓';
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            indicator.remove();
        }, 2000);
    }

    trackSocialClick(platform) {
        console.log(`🔗 Social link clicked: ${platform}`);
        
        // Track analytics (in real app)
        if (window.gtag) {
            gtag('event', 'social_link_click', {
                platform: platform,
                page: 'profile'
            });
        }
    }

    // Add new entries
    addExperienceEntry() {
        console.log('➕ Adding new experience entry...');
        this.showNotification('Fitur menambah pengalaman dalam development', 'info');
    }

    addEducationEntry() {
        console.log('🎓 Adding new education entry...');
        this.showNotification('Fitur menambah pendidikan dalam development', 'info');
    }

    addProjectEntry() {
        console.log('🚀 Adding new project entry...');
        this.showNotification('Fitur menambah project dalam development', 'info');
    }

    addSkillEntry() {
        console.log('🎯 Adding new skill entry...');
        this.showNotification('Fitur menambah skill dalam development', 'info');
    }
}

// Initialize CV Interactive system
let cvInteractive;
document.addEventListener('DOMContentLoaded', () => {
    cvInteractive = new CVInteractive();
});

// Global functions for console testing
window.cvInteractive = cvInteractive;
window.downloadCV = () => cvInteractive?.downloadCV();
window.shareProfile = () => cvInteractive?.shareProfile();
window.toggleEditMode = () => cvInteractive?.toggleEditMode();
window.setProjectsView = (view) => cvInteractive?.setProjectsView(view);
window.filterProjects = (category) => cvInteractive?.filterProjects(category);