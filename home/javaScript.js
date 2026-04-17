/**
 * Chip'n Away @ Heart Disease - Main Application Script
 * -----------------------------------------------------------
 * Architecture: Modular Object Literal Pattern
 * This file manages shared configurations, UI template injections, 
 * and page-specific feature modules safely with defensive checks.
 */

// ==========================================================================
// 1. CONFIGURATION
// ==========================================================================
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    theme: {
        extend: {
            colors: {
                apple: {
                    bg: '#d9f99d',      /* Crisp Green Apple background */
                    panel: '#ecfccb',   /* Slightly lighter green apple for panels */
                    dark: '#1a2e05',    /* Very dark green for text and nav */
                    nav: '#2a4a0b',     /* Secondary dark green */
                    red: '#dc2626',     /* Crisp Apple Red */
                    redHover: '#b91c1c' /* Darker red for hover states */
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Montserrat', 'system-ui', 'sans-serif'],
            }
        }
    }
};

// ==========================================================================
// 2. SHARED TEMPLATES
// ==========================================================================
const sharedHeaderTemplate = `
    <nav class="sticky top-0 z-50 bg-apple-dark/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-24 relative">
                <div class="flex-1 flex items-center justify-start">
                    <a href="index.html" class="group flex-shrink-0 flex items-center gap-2 lg:gap-3 transition-colors duration-200">
                        <div class="w-[80px] h-[80px] rounded-full bg-apple-panel flex items-center justify-center border-2 border-apple-red overflow-hidden">                        
                            <img src="images/chiplogo.png" alt="Chip'n Away Logo" class="w-full h-full object-contain p-1">
                        </div>
                        <span class="font-heading font-bold text-xl lg:text-2xl tracking-wider uppercase text-white group-hover:text-apple-red transition-colors duration-200 hidden sm:block">Chip'n Away</span>
                    </a>
                    <div class="hidden md:flex space-x-4 lg:space-x-8 ml-auto mr-[20px]">
                        <a href="index.html" class="text-white hover:text-apple-red transition-colors duration-200 font-medium uppercase tracking-wider text-xs lg:text-sm">Home</a>
                        <a href="community.html" class="text-white hover:text-apple-red transition-colors duration-200 font-medium uppercase tracking-wider text-xs lg:text-sm">Community</a>
                    </div>
                </div>

                <div class="flex-shrink-0 flex items-center justify-center z-50 px-2 lg:px-4">
                    <a href="coaches.html" class="group flex items-center justify-center w-[80px] lg:w-[100px] transform transition-transform duration-300 hover:scale-105 translate-y-[10px] lg:translate-y-[20px]">
                        <img src="images/whistle_graphic.png" alt="whistle_graphic" class="w-full h-auto object-contain drop-shadow-2xl">
                    </a>
                </div>

                <div class="flex-1 flex items-center justify-end">
                    <div class="hidden md:flex space-x-4 lg:space-x-8 mr-auto ml-[10px] lg:ml-[20px]">
                        <a href="blog.html" class="text-white hover:text-apple-red transition-colors duration-200 font-medium uppercase tracking-wider text-xs lg:text-sm">Blog</a>
                        <a href="wellness.html" class="text-white hover:text-apple-red transition-colors duration-200 font-medium uppercase tracking-wider text-xs lg:text-sm mr-4">Wellness</a>
                    </div>

                    <div class="flex items-center gap-3 lg:gap-4 ml-3 lg:ml-6">
                        <a href="#home" class="chip-btn-primary px-3 py-1.5 text-xs lg:text-sm whitespace-nowrap">
                            Donate
                        </a>
                        <a href="volunteer.html" class="chip-btn-primary px-3 py-1.5 text-xs lg:text-sm whitespace-nowrap">
                            Volunteer
                        </a>
                        <button id="nav-wellness-pill" type="button" class="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-apple-panel/90 border border-white/10 text-apple-dark hover:bg-apple-panel transition-colors shadow-sm">
                            <i data-lucide="timer" class="w-4 h-4 text-apple-red"></i>
                            <span class="text-xs font-semibold uppercase tracking-widest">Chips</span>
                            <span id="nav-wellness-count" class="min-w-[1.5rem] text-center text-xs font-bold px-2 py-0.5 rounded-full bg-white/80 border border-apple-dark/10">0</span>
                        </button>
                        <button id="mobile-menu-btn" class="md:hidden text-white hover:text-apple-red focus:outline-none">
                            <i data-lucide="menu" class="w-8 h-8"></i>
                        </button>
                    </div>
                </div>

            </div>
        </div>

        <div id="mobile-menu" class="hidden md:hidden bg-apple-nav border-b border-gray-700">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                <a href="index.html" class="block px-3 py-2 text-base font-medium text-white hover:text-apple-red">Home</a>
                <a href="community.html" class="block px-3 py-2 text-base font-medium text-white hover:text-apple-red">Community</a>
                <a href="blog.html" class="block px-3 py-2 text-base font-medium text-white hover:text-apple-red">Blog</a>
                <a href="contact.html" class="block px-3 py-2 text-base font-medium text-white hover:text-apple-red">Contact</a>
                <a href="wellness.html" class="block px-3 py-2 text-base font-medium text-white hover:text-apple-red">Wellness</a>
                <a href="volunteer.html" class="block px-3 py-2 text-base font-medium text-white hover:text-apple-red">Volunteer</a>
                <a href="coaches.html" class="block px-3 py-2 text-base font-medium text-white hover:text-apple-red">In Memory of Chip</a>
            </div>
        </div>
    </nav>
`;

const sharedFooterTemplate = `
    <footer id="contact" class="bg-apple-dark py-12 border-t border-apple-nav mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                
                <div>
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <div class="w-8 h-8 rounded-full bg-apple-red flex items-center justify-center text-white font-bold text-sm">
                              <i data-lucide="heart" class="w-4 h-4"></i>
                        </div>
                        <span class="font-heading font-bold text-xl tracking-wider uppercase text-white">Chip'n Away</span>
                    </div>
                    <p class="text-gray-400 text-sm">
                        Cultivating clarity and belief for the leaders of tomorrow.
                    </p>
                </div>

                <div>
                    <h4 class="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
                    <ul class="space-y-2 text-gray-400 text-sm">
                        <li><a href="index.html" class="hover:text-apple-red transition-colors">Home</a></li>
                        <li><a href="community.html" class="hover:text-apple-red transition-colors">Community</a></li>
                        <li><a href="blog.html" class="hover:text-apple-red transition-colors">Blog</a></li>
                        <li><a href="wellness.html" class="hover:text-apple-red transition-colors">Wellness</a></li>
                        <li><a href="volunteer.html" class="hover:text-apple-red transition-colors">Volunteer</a></li>
                        <li><a href="contact.html" class="hover:text-apple-red transition-colors">Contact</a></li>
                        <li><a href="coaches.html" class="hover:text-apple-red transition-colors">In Memory of Chip</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
                    <ul class="space-y-3 text-gray-400 text-sm">
                        <li class="flex items-center justify-center md:justify-start gap-3">
                            <i data-lucide="mail" class="w-4 h-4 text-apple-red"></i>
                            chipnaway113@gmail.com
                        </li>
                        <li class="flex items-center justify-center md:justify-start gap-3">
                            <i data-lucide="map-pin" class="w-4 h-4 text-apple-red"></i>
                            Innovation Hub, Suite 100
                        </li>
                    </ul>

                    <div class="flex items-center justify-center md:justify-start gap-4 mt-6">
                        <a href="https://www.facebook.com/ChipNAwayatHeartDisease/" target="_blank" rel="noopener noreferrer"  class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-apple-red transition-colors">
                            <svg class="w-4 h-4 text-white fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                            </svg>
                        </a>
                        <a href="https://x.com/ChipnAwayHD?fbclid=IwY2xjawRO2ztleHRuA2FlbQIxMABicmlkETFobFJXanlCc0VpdTQxbmd5c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHhJleTmxkDrkXhQofHWa45A8pzhLHqfu34eEdkj6Pkwk1JxCeKAvLW0glmyr_aem_xmCT4UZjCR5OaUjMZY9uZA" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-apple-red transition-colors">
                            <svg class="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>                       
                        </a>
                        <a href="https://www.instagram.com/chipawayheartdisease"  target="_blank" rel="noopener noreferrer"  class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-apple-red transition-colors">
                            <svg class="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
            
            <div class="border-t border-white-800 mt-12 pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
                <p>&copy; 2024 Chip'n Away. All rights reserved.</p>
            </div>
        </div>
    </footer>
`;

// ==========================================================================
// 3. GLOBAL UTILITIES (Exposed for HTML inline onclick handlers)
// ==========================================================================
window.carouselStates = {
    'carousel-benefits': 0,
    'carousel-impact': 0
};

window.moveSlide = function(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const totalSlides = carousel.children.length;
    window.carouselStates[carouselId] += direction;
    
    if (window.carouselStates[carouselId] >= totalSlides) {
        window.carouselStates[carouselId] = 0;
    } else if (window.carouselStates[carouselId] < 0) {
        window.carouselStates[carouselId] = totalSlides - 1;
    }
    
    const slideOffset = -(window.carouselStates[carouselId] * 100);
    carousel.style.transform = `translateX(${slideOffset}%)`;
};

window.toggleAccordion = function(btn) {
    const item = btn.closest('.accordion-item');
    const content = item.querySelector('.accordion-content');
    
    document.querySelectorAll('.accordion-item').forEach((otherItem) => {
        if (otherItem !== item) {
            otherItem.classList.remove('is-open');
            otherItem.querySelector('.accordion-content').classList.add('hidden');
        }
    });

    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        item.classList.add('is-open');
    } else {
        content.classList.add('hidden');
        item.classList.remove('is-open');
    }
};

// ==========================================================================
// 4. COMPONENT CONTROLLERS (Isolated Modules)
// ==========================================================================
const App = {
    
    /** Injects the shared header and footer into the DOM */
    injectTemplates: function() {
        const headerMount = document.getElementById("shared-header");
        if (headerMount) headerMount.innerHTML = sharedHeaderTemplate;
      
        const footerMount = document.getElementById("shared-footer");
        if (footerMount) footerMount.innerHTML = sharedFooterTemplate;

        
        if (window.lucide) {
            lucide.createIcons();
        }
    },

    /** Initializes Mobile Navigation logic */
    initMobileMenu: function() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');

        if (btn && menu) {
            btn.addEventListener('click', () => menu.classList.toggle('hidden'));
            
            const mobileLinks = menu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => menu.classList.add('hidden'));
            });
        }
    },

    /** Initializes the Contact Form logic */
    initContactForm: function() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Optional: Grab values for processing
            // const formData = new FormData(contactForm);
            
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.classList.remove('hidden');
                setTimeout(() => successMessage.classList.add('hidden'), 5000);
            }
            contactForm.reset();
        });
    },

    /** Initializes the Leaflet Live Map */
    initMap: function() {
        const eventMapEl = document.getElementById('event-map');
        if (!eventMapEl || typeof L === 'undefined') return;

        const eventMap = L.map('event-map').setView([32.6249, -83.6394], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(eventMap);

        L.marker([32.6249, -83.6394])
            .addTo(eventMap)
            .bindPopup('North Houston Sports Complex, 900 North Houston Road, Warner Robins, GA 31093')
            .openPopup();
    },

    /** Initializes the Swiper Slider */
    initSwiper: function() {
        if (typeof Swiper === 'undefined' || !document.querySelector('.sub-container.swiper')) return;
        
        new Swiper('.sub-container.swiper', {
            loop: true,
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }
        });
    },

    /** Initializes the Intersection Observer for animated dashboard numbers */
    initImpactCounters: function() {
        const counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return; 

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count, 10);
                    const duration = 2000;
                    let startTime = null;
                    
                    const format = (n) => n >= 1000 ? n.toLocaleString() + '+' : n.toString();
                    
                    function tick(now) {
                        if (!startTime) startTime = now;
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 4);
                        
                        el.textContent = format(Math.round(target * eased));
                        
                        if (progress < 1) {
                            window.requestAnimationFrame(tick);
                        } else {
                            el.textContent = format(target); 
                        }
                    }
                    
                    window.requestAnimationFrame(tick);
                    observer.unobserve(el); 
                }
            });
        }, { threshold: 0.1 }); 

        counters.forEach(el => counterObserver.observe(el));
    },

    /** Initializes the Whistle-Stop Wellness application and Nav Chip Counter */
    initWellnessApp: function() {
        const STORAGE_KEY = 'chipnaway_wellness_week';

        // --- Helper Functions ---
        const getWeekKey = (d = new Date()) => {
            const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            const dayNum = date.getUTCDay() || 7;
            date.setUTCDate(date.getUTCDate() + 4 - dayNum);
            const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
            const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
            return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
        };

        const readStreak = () => {
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (!raw) return { week: getWeekKey(), count: 0 };
                const parsed = JSON.parse(raw);
                const currentWeek = getWeekKey();
                if (!parsed || parsed.week !== currentWeek) return { week: currentWeek, count: 0 };
                return { week: parsed.week, count: Number(parsed.count) || 0 };
            } catch {
                return { week: getWeekKey(), count: 0 };
            }
        };

        const writeStreak = (data) => {
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
        };

        const renderStreak = () => {
            const s = readStreak();
            if (navCount) navCount.textContent = String(s.count);
            if (streakEl) streakEl.textContent = String(s.count);
        };

        // --- 1. Global Navigation Logic (Runs everywhere) ---
        const navPill = document.getElementById('nav-wellness-pill');
        const navCount = document.getElementById('nav-wellness-count');
        const streakEl = document.getElementById('wellness-streak');

        renderStreak();

        if (navPill) {
            navPill.addEventListener('click', () => {
                const wellnessSection = document.getElementById('wellness');
                if (wellnessSection) {
                    wellnessSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    if (typeof setSelected === 'function' && !selectedKey) setSelected('move');
                } else {
                    window.location.href = "wellness.html#wellness";
                }
            });
        }

        // --- 2. Local Page Logic (Exits if not on wellness page) ---
        const cards = Array.from(document.querySelectorAll('[data-wellness]'));
        const resultTitle = document.getElementById('wellness-title');
        
        // Defensive check: stop running the rest if we aren't on wellness.html
        if (!cards.length || !resultTitle) return;

        const resultSteps = document.getElementById('wellness-steps');
        const resultWhy = document.getElementById('wellness-why');
        const resultBadge = document.getElementById('wellness-badge');
        const btnBank = document.getElementById('wellness-bank');
        const btnCopy = document.getElementById('wellness-copy');
        const btnShuffle = document.getElementById('wellness-shuffle');

        const plays = {
            move: {
                title: 'MOVE: 2‑Minute Walk + Breath',
                why: 'Short bouts of movement support circulation and can help reduce stress - small resets add up.',
                steps: [
                    'Stand up and walk in place (or around the room) for 90 seconds.',
                    'Slow your pace for 30 seconds and relax your shoulders.',
                    'Finish with 3 slow breaths: inhale through the nose, exhale longer than the inhale.'
                ]
            },
            fuel: {
                title: 'FUEL: Plate Check - Add 1 Color',
                why: 'Adding one heart‑supporting food is often easier than “cutting everything out.”',
                steps: [
                    'Look at your next meal or snack and pick ONE color to add (fruit/veg/beans).',
                    'Add a handful/side - no measuring required.',
                    'Bonus: drink a glass of water before you start eating.'
                ]
            },
            calm: {
                title: 'CALM: 60‑Second Box Breathing',
                why: 'A quick breathing pattern can help your body shift from “stress mode” toward steady calm.',
                steps: [
                    'Inhale for 4 counts.',
                    'Hold for 4 counts.',
                    'Exhale for 4 counts.',
                    'Hold for 4 counts. Repeat 3–4 rounds.'
                ]
            }
        };

        let selectedKey = null;

        const setSelected = (key) => {
            const play = plays[key];
            if (!play) return;
            selectedKey = key;

            cards.forEach((c) => {
                const isSelected = c.getAttribute('data-wellness') === key;
                c.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
                c.classList.toggle('ring-4', isSelected);
                c.classList.toggle('ring-apple-red/20', isSelected);
                c.classList.toggle('border-apple-red/40', isSelected);
            });

            resultTitle.textContent = play.title;
            resultWhy.textContent = play.why;
            resultSteps.innerHTML = '';
            
            play.steps.forEach((s) => {
                const li = document.createElement('li');
                li.className = 'flex gap-3';
                li.innerHTML = `<span class="mt-0.5 w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-apple-red">${resultSteps.children.length + 1}</span><span>${s}</span>`;
                resultSteps.appendChild(li);
            });

            resultBadge.classList.remove('hidden');
            btnBank.disabled = false;
            btnCopy.disabled = false;

            if (window.lucide) lucide.createIcons();
        };

        const bankChip = () => {
            if (!selectedKey) return;
            const s = readStreak();
            const next = { week: s.week, count: Math.min(99, s.count + 1) };
            writeStreak(next);
            renderStreak(); 
            resultBadge.textContent = 'Banked';
            window.setTimeout(() => { resultBadge.textContent = 'Ready'; }, 1200);
        };

        const copySteps = async () => {
            if (!selectedKey) return;
            const p = plays[selectedKey];
            const text = `${p.title}\n\n${p.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nWhy it matters: ${p.why}\n\n- Chip'n Away Whistle-Stop Wellness`;

            try {
                await navigator.clipboard.writeText(text);
                resultBadge.textContent = 'Copied';
                window.setTimeout(() => { resultBadge.textContent = 'Ready'; }, 1200);
            } catch {
                window.prompt('Copy your steps:', text);
            }
        };

        const shuffle = () => {
            const keys = Object.keys(plays);
            if (!keys.length) return;
            const next = keys[Math.floor(Math.random() * keys.length)];
            setSelected(next);
            document.getElementById('wellness-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        cards.forEach((c) => c.addEventListener('click', () => setSelected(c.getAttribute('data-wellness'))));
        btnBank.addEventListener('click', bankChip);
        btnCopy.addEventListener('click', copySteps);
        btnShuffle.addEventListener('click', shuffle);
    }
};

// ==========================================================================
// 5. APPLICATION INITIALIZATION (The Orchestrator)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    
    // Step 1: Inject foundational HTML components first
    App.injectTemplates();

    // Step 2: Initialize features that rely on the injected templates
    App.initMobileMenu();
    App.initWellnessApp();

    // Step 3: Initialize modular page features (they will self-exit if not needed)
    App.initContactForm();
    App.initMap();
    App.initSwiper();
    App.initImpactCounters();

});