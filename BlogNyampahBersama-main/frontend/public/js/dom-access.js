// JavaScript untuk mengakses elemen DOM blog modular Nyampah Bersama
// File ini menunjukkan cara mengakses semua elemen dengan ID yang telah disiapkan

// === NAVIGATION ELEMENTS ===
const mainLogo = document.getElementById("main-logo");
const logoImage = document.getElementById("logo-image");
const siteTitle = document.getElementById("site-title");
const siteSubtitle = document.getElementById("site-subtitle");

const searchContainer = document.getElementById("search-container");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

const desktopNav = document.getElementById("desktop-nav");
const navLinkHome = document.getElementById("nav-link-home");
const navLinkDashboard = document.getElementById("nav-link-dashboard");
const navLinkWrite = document.getElementById("nav-link-write");
const userAvatar = document.getElementById("user-avatar");

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileSearchForm = document.getElementById("mobile-search-form");
const mobileSearchInput = document.getElementById("mobile-search-input");
const mobileNavLinks = document.getElementById("mobile-nav-links");

// === HOMEPAGE ELEMENTS ===
const heroSection = document.getElementById("hero-section");
const heroContent = document.getElementById("hero-content");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");
const heroButtons = document.getElementById("hero-buttons");
const joinCommunityBtn = document.getElementById("join-community-btn");
const startWritingBtn = document.getElementById("start-writing-btn");
const heroImageContainer = document.getElementById("hero-image-container");
const heroImage = document.getElementById("hero-image");

const categoryFilterSection = document.getElementById("category-filter-section");
const categoryButtons = document.getElementById("category-buttons");
const btnAllPosts = document.getElementById("btn-all-posts");
const sortContainer = document.getElementById("sort-container");
const sortSelect = document.getElementById("sort-select");

const mainContent = document.getElementById("main-content");
const postsContainer = document.getElementById("posts-container");
const postsLoading = document.getElementById("posts-loading");
const featuredPost = document.getElementById("featured-post");
const regularPostsGrid = document.getElementById("regular-posts-grid");
const noPostsMessage = document.getElementById("no-posts-message");
const btnWriteFirstPost = document.getElementById("btn-write-first-post");
const loadMoreContainer = document.getElementById("load-more-container");
const btnLoadMore = document.getElementById("btn-load-more");

const sidebar = document.getElementById("sidebar");
const communityStatsWidget = document.getElementById("community-stats-widget");
const topContributorsWidget = document.getElementById("top-contributors-widget");
const recentActivityWidget = document.getElementById("recent-activity-widget");
const popularTagsWidget = document.getElementById("popular-tags-widget");
const popularTagsTitle = document.getElementById("popular-tags-title");
const tagsContainer = document.getElementById("tags-container");

// === FOOTER ELEMENTS ===
const footer = document.getElementById("footer");
const footerMain = document.getElementById("footer-main");
const footerLogo = document.getElementById("footer-logo");
const footerLogoImage = document.getElementById("footer-logo-image");
const footerTitle = document.getElementById("footer-title");
const footerSubtitle = document.getElementById("footer-subtitle");
const footerDescription = document.getElementById("footer-description");
const footerSocialLinks = document.getElementById("footer-social-links");
const socialTwitter = document.getElementById("social-twitter");
const socialLinkedin = document.getElementById("social-linkedin");
const socialGithub = document.getElementById("social-github");
const socialDiscord = document.getElementById("social-discord");

const footerCommunity = document.getElementById("footer-community");
const footerResources = document.getElementById("footer-resources");
const footerBottom = document.getElementById("footer-bottom");
const footerCopyright = document.getElementById("footer-copyright");
const footerLegalLinks = document.getElementById("footer-legal-links");

// === FUNGSI UTILITY ===
function changeHeroTitle(newTitle) {
    if (heroTitle) {
        heroTitle.textContent = newTitle;
    }
}

function updateSearchPlaceholder(newPlaceholder) {
    if (searchInput) {
        searchInput.placeholder = newPlaceholder;
    }
    if (mobileSearchInput) {
        mobileSearchInput.placeholder = newPlaceholder;
    }
}

function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = "none";
    }
}

function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = "block";
    }
}

function addClickListener(elementId, callback) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener("click", callback);
    }
}

// === CONTOH PENGGUNAAN ===
// Contoh mengganti judul hero
// changeHeroTitle("Selamat Datang di Nyampah Bersama!");

// Contoh menambahkan event listener ke tombol
// addClickListener("join-community-btn", function() {
//     alert("Terima kasih telah bergabung dengan komunitas!");
// });

// Contoh mengubah placeholder search
// updateSearchPlaceholder("Cari artikel, topik, atau anggota...");

// === EKSPOR UNTUK MODULE ===
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Navigation
        mainLogo, logoImage, siteTitle, siteSubtitle,
        searchContainer, searchForm, searchInput,
        desktopNav, userAvatar, mobileMenuBtn,
        
        // Homepage
        heroSection, heroTitle, heroDescription,
        categoryButtons, postsContainer, sidebar,
        
        // Footer
        footer, footerLogo, footerSocialLinks,
        
        // Utility functions
        changeHeroTitle,
        updateSearchPlaceholder,
        hideElement,
        showElement,
        addClickListener
    };
}

console.log("🌱 Nyampah Bersama DOM Access Script Loaded!");
console.log("📋 Available elements:", {
    navigation: "mainLogo, searchInput, desktopNav, mobileMenuBtn",
    homepage: "heroSection, postsContainer, sidebar, categoryButtons",
    footer: "footer, footerLogo, footerSocialLinks",
    utilities: "changeHeroTitle(), updateSearchPlaceholder(), hideElement(), showElement()"
});