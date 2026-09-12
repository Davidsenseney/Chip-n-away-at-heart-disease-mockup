(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`
   <nav class="fixed top-0 left-0 w-full z-[9999] bg-apple-dark/95 backdrop-blur-md border-b border-gray-800 shadow-lg" style="position: fixed !important; top: 0 !important; left: 0 !important; width: 100% !important; z-index: 9999 !important;">
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
                        <button type="button" data-donate-open class="chip-btn-primary px-3 py-1.5 text-xs lg:text-sm whitespace-nowrap">
                            Donate
                        </button>
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
                <button type="button" data-donate-open class="block w-full px-3 py-2 text-base font-medium text-white hover:text-apple-red bg-transparent border-0 cursor-pointer">Donate</button>
                <a href="community.html" class="block px-3 py-2 text-base font-medium text-white hover:text-apple-red">Community</a>
                <a href="blog.html" class="block px-3 py-2 text-base font-medium text-white hover:text-apple-red">Blog</a>
                <a href="contact.html" class="block px-3 py-2 text-base font-medium text-white hover:text-apple-red">Contact</a>
                <a href="wellness.html" class="block px-3 py-2 text-base font-medium text-white hover:text-apple-red">Wellness</a>
                <a href="volunteer.html" class="block px-3 py-2 text-base font-medium text-white hover:text-apple-red">Volunteer</a>
                <a href="coaches.html" class="block px-3 py-2 text-base font-medium text-white hover:text-apple-red">In Memory of Chip</a>
            </div>
        </div>
    </nav>
`,t=`
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
`,n=`
    <div class="chip-modal-overlay" id="donation-modal" hidden>
        <div class="chip-modal" role="dialog" aria-modal="true" aria-labelledby="donation-modal-title" aria-describedby="donation-modal-intro">

            <button type="button" class="chip-modal-close" id="donation-close" aria-label="Close donation form">&times;</button>

            <div class="chip-modal-avatar">
                <img src="images/cynthiamaloneheadshot(1).avif" alt="cynthia malone headshot">
            </div>

            <h2 class="chip-modal-title" id="donation-modal-title">Chip In Today</h2>
            <p class="chip-modal-intro" id="donation-modal-intro">
                Your gift funds free screenings, heart-healthy education, and community outreach.
            </p>

            <form class="chip-modal-form" id="donation-form" novalidate>

                <div class="chip-field">
                    <label for="donation-amount">Donation Amount (USD)</label>
                    <input type="text" id="donation-amount" name="donation-amount" inputmode="decimal"
                           placeholder="50.00" aria-describedby="donation-amount-error">
                    <p class="chip-field-error" id="donation-amount-error"></p>
                </div>

                <div class="chip-field">
                    <label for="cardholder-name">Cardholder Name</label>
                    <input type="text" id="cardholder-name" name="cardholder-name" autocomplete="cc-name"
                           placeholder="Jordan Malone" aria-describedby="cardholder-name-error">
                    <p class="chip-field-error" id="cardholder-name-error"></p>
                </div>

                <div class="chip-field">
                    <label for="card-number">Card Number</label>
                    <input type="text" id="card-number" name="card-number" inputmode="numeric" autocomplete="cc-number"
                           placeholder="4242 4242 4242 4242" maxlength="23" aria-describedby="card-number-error">
                    <p class="chip-field-error" id="card-number-error"></p>
                </div>

                <div class="chip-field-row">
                    <div class="chip-field">
                        <label for="card-expiry">Expiration Date (MM/YY)</label>
                        <input type="text" id="card-expiry" name="card-expiry" inputmode="numeric" autocomplete="cc-exp"
                               placeholder="12/30" maxlength="5" aria-describedby="card-expiry-error">
                        <p class="chip-field-error" id="card-expiry-error"></p>
                    </div>
                    <div class="chip-field">
                        <label for="card-cvv">CVV</label>
                        <input type="text" id="card-cvv" name="card-cvv" inputmode="numeric" autocomplete="cc-csc"
                               placeholder="123" maxlength="4" aria-describedby="card-cvv-error">
                        <p class="chip-field-error" id="card-cvv-error"></p>
                    </div>
                </div>

                <button type="submit" class="chip-btn-primary chip-modal-submit" id="donation-submit">
                    Confirm Donation
                </button>
            </form>

            <div class="chip-modal-divider"><span>or</span></div>

            <button type="button" class="chip-btn-paypal" id="donation-paypal">
                Donate with <strong>Pay</strong><em>Pal</em>
            </button>

            <p class="chip-modal-status" id="donation-status" role="status" aria-live="polite"></p>
        </div>
    </div>
`;window.carouselStates={"carousel-benefits":0,"carousel-impact":0},window.moveSlide=function(e,t){let n=document.getElementById(e);if(!n)return;let r=n.children.length;window.carouselStates[e]+=t,window.carouselStates[e]>=r?window.carouselStates[e]=0:window.carouselStates[e]<0&&(window.carouselStates[e]=r-1);let i=-(window.carouselStates[e]*100);n.style.transform=`translateX(${i}%)`},window.toggleAccordion=function(e){let t=e.closest(`.accordion-item`),n=t.querySelector(`.accordion-content`);document.querySelectorAll(`.accordion-item`).forEach(e=>{e!==t&&(e.classList.remove(`is-open`),e.querySelector(`.accordion-content`).classList.add(`hidden`))}),n.classList.contains(`hidden`)?(n.classList.remove(`hidden`),t.classList.add(`is-open`)):(n.classList.add(`hidden`),t.classList.remove(`is-open`))};var r={injectTemplates:function(){let r=document.getElementById(`shared-header`);r&&(r.innerHTML=e);let i=document.getElementById(`shared-footer`);if(i&&(i.innerHTML=t),!document.getElementById(`donation-modal`)){let e=document.createElement(`div`);e.id=`donation-modal-mount`,e.innerHTML=n,document.body.appendChild(e)}window.lucide&&lucide.createIcons()},initMobileMenu:function(){let e=document.getElementById(`mobile-menu-btn`),t=document.getElementById(`mobile-menu`);e&&t&&(e.addEventListener(`click`,()=>t.classList.toggle(`hidden`)),t.querySelectorAll(`a`).forEach(e=>{e.addEventListener(`click`,()=>t.classList.add(`hidden`))}))},launchConfetti:function(e=90){if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;document.getElementById(`chip-confetti-layer`)?.remove();let t=[`#dc2626`,`#b91c1c`,`#d9f99d`,`#a3e635`,`#ecfccb`,`#ffffff`,`#2a4a0b`],n=document.createElement(`div`);n.id=`chip-confetti-layer`,n.className=`chip-confetti-layer`,n.setAttribute(`aria-hidden`,`true`);let r=0;for(let i=0;i<e;i++){let e=document.createElement(`span`);e.className=`chip-confetti-piece`;let a=2+Math.random()*1.8,o=Math.random()*.9;r=Math.max(r,a+o),e.style.setProperty(`--chip-confetti-x`,`${Math.random()*100}%`),e.style.setProperty(`--chip-confetti-size`,`${6+Math.random()*8}px`),e.style.setProperty(`--chip-confetti-color`,t[i%t.length]),e.style.setProperty(`--chip-confetti-duration`,`${a}s`),e.style.setProperty(`--chip-confetti-delay`,`${o}s`),e.style.setProperty(`--chip-confetti-drift`,`${Math.round((Math.random()-.5)*320)}px`),e.style.setProperty(`--chip-confetti-spin`,`${Math.round(360+Math.random()*1080)}deg`),n.appendChild(e)}document.body.appendChild(n),window.setTimeout(()=>n.remove(),(r+.5)*1e3)},initDonationModal:function(){let e=document.getElementById(`donation-modal`);if(!e)return;let t=e.querySelector(`.chip-modal`),n=document.getElementById(`donation-form`),i=document.getElementById(`donation-close`),a=document.getElementById(`donation-paypal`),o=document.getElementById(`donation-status`),s=document.getElementById(`donation-amount`),c=document.getElementById(`cardholder-name`),l=document.getElementById(`card-number`),u=document.getElementById(`card-expiry`),d=document.getElementById(`card-cvv`),f=null,p=null,m=(e,t)=>{let n=document.getElementById(`${e.id}-error`);n&&(n.textContent=t||``),e.classList.toggle(`has-error`,!!t),e.setAttribute(`aria-invalid`,t?`true`:`false`)},h=()=>{[s,c,l,u,d].forEach(e=>m(e,``))},g=e=>e.replace(/\D/g,``),_=t=>{window.clearTimeout(p),f=t||null,o.textContent=``,e.hidden=!1,document.body.classList.add(`chip-modal-open`),document.getElementById(`mobile-menu`)?.classList.add(`hidden`),s.focus()},v=()=>{window.clearTimeout(p),e.hidden=!0,document.body.classList.remove(`chip-modal-open`),f?.focus()};document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-donate-open], a[href="donate.html"]`);t&&(e.preventDefault(),_(t))}),i.addEventListener(`click`,v),e.addEventListener(`click`,t=>{t.target===e&&v()}),document.addEventListener(`keydown`,n=>{if(e.hidden)return;if(n.key===`Escape`){v();return}if(n.key!==`Tab`)return;let r=Array.from(t.querySelectorAll(`button, input, [href], select, textarea, [tabindex]:not([tabindex="-1"])`)).filter(e=>!e.disabled&&e.offsetParent!==null);if(!r.length)return;let i=r[0],a=r[r.length-1];n.shiftKey&&document.activeElement===i?(n.preventDefault(),a.focus()):!n.shiftKey&&document.activeElement===a&&(n.preventDefault(),i.focus())}),l.addEventListener(`input`,()=>{let e=g(l.value).slice(0,19).match(/.{1,4}/g);l.value=e?e.join(` `):``}),u.addEventListener(`input`,()=>{let e=g(u.value).slice(0,4);u.value=e.length>2?`${e.slice(0,2)}/${e.slice(2)}`:e}),d.addEventListener(`input`,()=>{d.value=g(d.value).slice(0,4)}),s.addEventListener(`input`,()=>{s.value=s.value.replace(/[^\d.]/g,``)});let y=()=>{h();let e=null,t=(t,n)=>{m(t,n),e||=t},n=parseFloat(s.value);(!s.value.trim()||Number.isNaN(n)||n<=0)&&t(s,`Enter a donation amount greater than zero.`),c.value.trim().length<2&&t(c,`Enter the name printed on the card.`);let r=g(l.value);(r.length<13||r.length>19)&&t(l,`Card number must be 13 to 19 digits.`);let i=u.value.match(/^(\d{2})\/(\d{2})$/);if(!i)t(u,`Use the MM/YY format.`);else{let e=Number(i[1]),n=2e3+Number(i[2]),r=new Date,a=new Date(n,e,0);e<1||e>12?t(u,`Month must be between 01 and 12.`):a<r&&t(u,`That card has expired.`)}return d.value.length<3&&t(d,`CVV must be 3 or 4 digits.`),!e||(o.textContent=``,e.focus(),!1)};n.addEventListener(`submit`,e=>{if(e.preventDefault(),!y())return;let t=parseFloat(s.value).toFixed(2);o.textContent=`Thank you! Your demo donation of $${t} was recorded.`,r.launchConfetti(),n.reset(),h(),p=window.setTimeout(v,2800)}),a.addEventListener(`click`,e=>{e.preventDefault(),h(),o.textContent=`PayPal demo - the external redirect is disabled in this mockup.`,r.launchConfetti()})},initContactForm:function(){let e=document.getElementById(`contactForm`);e&&e.addEventListener(`submit`,function(t){t.preventDefault();let n=document.getElementById(`successMessage`);n&&(n.classList.remove(`hidden`),setTimeout(()=>n.classList.add(`hidden`),5e3)),e.reset()})},initMap:function(){if(!document.getElementById(`event-map`)||typeof L>`u`)return;let e=L.map(`event-map`).setView([32.6249,-83.6394],14);L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap contributors`}).addTo(e),L.marker([32.6249,-83.6394]).addTo(e).bindPopup(`North Houston Sports Complex, 900 North Houston Road, Warner Robins, GA 31093`).openPopup()},initSwiper:function(){typeof Swiper>`u`||document.querySelectorAll(`.sub-container.swiper`).forEach(function(e){for(var t=e.classList.contains(`swiper-feature`),n=e.nextElementSibling;n&&!n.classList.contains(`swiper-controls`);)n=n.nextElementSibling;var r=n||e;new Swiper(e,{loop:!0,spaceBetween:20,pagination:{el:r.querySelector(`.swiper-pagination`),clickable:!0,dynamicBullets:!1},navigation:{nextEl:r.querySelector(`.swiper-button-next`),prevEl:r.querySelector(`.swiper-button-prev`)},slidesPerView:1,breakpoints:t?{}:{0:{slidesPerView:1},768:{slidesPerView:2},1024:{slidesPerView:3}}})})},initImpactCounters:function(){let e=document.querySelectorAll(`[data-count]`);if(!e.length)return;let t=new IntersectionObserver((e,t)=>{e.forEach(e=>{if(e.isIntersecting){let n=e.target,r=parseInt(n.dataset.count,10),i=null,a=e=>e>=1e3?e.toLocaleString()+`+`:e.toString();function o(e){i||=e;let t=e-i,s=Math.min(t/2e3,1),c=1-(1-s)**4;n.textContent=a(Math.round(r*c)),s<1?window.requestAnimationFrame(o):n.textContent=a(r)}window.requestAnimationFrame(o),t.unobserve(n)}})},{threshold:.1});e.forEach(e=>t.observe(e))},initWellnessApp:function(){let e=`chipnaway_wellness_week`,t=`chipnaway_playbook_v1`,n=(e=new Date)=>{let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),n=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-n);let r=new Date(Date.UTC(t.getUTCFullYear(),0,1)),i=Math.ceil(((t-r)/864e5+1)/7);return`${t.getUTCFullYear()}-W${String(i).padStart(2,`0`)}`},r=()=>{try{let t=localStorage.getItem(e);if(!t)return{week:n(),count:0};let r=JSON.parse(t),i=n();return!r||r.week!==i?{week:i,count:0}:{week:r.week,count:Number(r.count)||0}}catch{return{week:n(),count:0}}},i=t=>{try{localStorage.setItem(e,JSON.stringify(t))}catch{}},a=()=>{let e=r();c&&(c.textContent=String(e.count)),l&&(l.textContent=String(e.count)),u&&(u.textContent=e.week)},o=e=>{let t=Math.max(0,Math.floor(e));return`${String(Math.floor(t/60)).padStart(2,`0`)}:${String(t%60).padStart(2,`0`)}`},s=document.getElementById(`nav-wellness-pill`),c=document.getElementById(`nav-wellness-count`),l=document.getElementById(`wellness-streak`),u=document.getElementById(`wellness-week`);a(),s&&s.addEventListener(`click`,()=>{let e=document.getElementById(`wellness`);e?(e.scrollIntoView({behavior:`smooth`,block:`start`}),typeof M==`function`&&!w&&M(`move`)):window.location.href=`wellness.html#wellness`});let d=Array.from(document.querySelectorAll(`[data-wellness]`)),f=document.getElementById(`wellness-title`);if(!d.length||!f)return;let p=document.getElementById(`wellness-steps`),m=document.getElementById(`wellness-why`),h=document.getElementById(`wellness-badge`),g=document.getElementById(`wellness-bank`),_=document.getElementById(`wellness-copy`),v=document.getElementById(`wellness-shuffle`),y=document.getElementById(`wellness-timer`),b=document.getElementById(`wellness-timer-bar`),x=document.getElementById(`wellness-timer-toggle`),S=document.getElementById(`wellness-timer-reset`),C={move:{title:`MOVE: 2‑Minute Walk + Breath`,why:`Short bouts of movement support circulation and can help reduce stress - small resets add up.`,steps:[`Stand up and walk in place (or around the room) for 90 seconds.`,`Slow your pace for 30 seconds and relax your shoulders.`,`Finish with 3 slow breaths: inhale through the nose, exhale longer than the inhale.`]},fuel:{title:`FUEL: Plate Check - Add 1 Color`,why:`Adding one heart‑supporting food is often easier than “cutting everything out.”`,steps:[`Look at your next meal or snack and pick ONE color to add (fruit/veg/beans).`,`Add a handful/side - no measuring required.`,`Bonus: drink a glass of water before you start eating.`]},calm:{title:`CALM: 60‑Second Box Breathing`,why:`A quick breathing pattern can help your body shift from “stress mode” toward steady calm.`,steps:[`Inhale for 4 counts.`,`Hold for 4 counts.`,`Exhale for 4 counts.`,`Hold for 4 counts. Repeat 3–4 rounds.`]}},w=null,T=120,E=!1,D=null,O=()=>{if(!y||!b)return;y.textContent=o(T);let e=(120-T)/120*100;b.style.width=`${Math.max(0,Math.min(100,e))}%`},k=()=>{E=!1,D&&window.clearInterval(D),D=null,x&&(x.textContent=`Start`)},A=()=>{k(),T=120,O()},j=()=>{if(E)return;E=!0,x&&(x.textContent=`Pause`);let e=Date.now()+T*1e3;D=window.setInterval(()=>{T=Math.max(0,(e-Date.now())/1e3),O(),T<=0&&(k(),h&&(h.textContent=`Done`,window.setTimeout(()=>{h.textContent=`Ready`},1600)))},200)},M=e=>{let t=C[e];t&&(w=e,d.forEach(t=>{let n=t.getAttribute(`data-wellness`)===e;t.setAttribute(`aria-pressed`,n?`true`:`false`),t.classList.toggle(`ring-4`,n),t.classList.toggle(`ring-apple-red/20`,n),t.classList.toggle(`border-apple-red/40`,n)}),f.textContent=t.title,m.textContent=t.why,p.innerHTML=``,t.steps.forEach(e=>{let t=document.createElement(`li`);t.className=`flex gap-3`,t.innerHTML=`<span class="mt-0.5 w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-apple-red">${p.children.length+1}</span><span>${e}</span>`,p.appendChild(t)}),h.classList.remove(`hidden`),g.disabled=!1,_.disabled=!1,x&&(x.disabled=!1),S&&(S.disabled=!1),A(),window.lucide&&lucide.createIcons())},N=()=>{if(!w)return;let e=r(),t={week:e.week,count:Math.min(99,e.count+1)};i(t),a(),window.dispatchEvent(new CustomEvent(`chipnaway:streak`,{detail:t})),h.textContent=`Banked`,window.setTimeout(()=>{h.textContent=`Ready`},1200)},P=async()=>{if(!w)return;let e=C[w],t=`${e.title}\n\n${e.steps.map((e,t)=>`${t+1}. ${e}`).join(`
`)}\n\nWhy it matters: ${e.why}\n\n- Chip'n Away Whistle-Stop Wellness`;try{await navigator.clipboard.writeText(t),h.textContent=`Copied`,window.setTimeout(()=>{h.textContent=`Ready`},1200)}catch{window.prompt(`Copy your steps:`,t)}},F=()=>{let e=Object.keys(C);if(!e.length)return;let t=e[Math.floor(Math.random()*e.length)];M(t),document.getElementById(`wellness-result`)?.scrollIntoView({behavior:`smooth`,block:`start`})},I=Array.from(document.querySelectorAll(`.playbook-focus`)),R=document.getElementById(`playbook-minutes`),z=document.getElementById(`playbook-slider`),B=document.getElementById(`playbook-lowimpact`),V=document.getElementById(`playbook-steps`),H=document.getElementById(`playbook-status`),U=document.getElementById(`playbook-savedat`),W=document.getElementById(`playbook-toast`),G=document.getElementById(`playbook-generate`),K=document.getElementById(`playbook-save`),q=document.getElementById(`playbook-builder`),ee=()=>{try{let e=localStorage.getItem(t);return e&&JSON.parse(e)||null}catch{return null}},te=e=>{try{localStorage.setItem(t,JSON.stringify(e))}catch{}},J=`move`,Y=e=>{J=e,I.forEach(t=>{let n=t.getAttribute(`data-focus`)===e;t.setAttribute(`aria-pressed`,n?`true`:`false`),t.classList.toggle(`bg-apple-panel`,n),t.classList.toggle(`border-apple-dark/10`,n),t.classList.toggle(`bg-gray-50`,!n),t.classList.toggle(`border-gray-200`,!n)}),window.lucide&&lucide.createIcons()},X=()=>{z&&R&&(R.textContent=String(z.value))},Z=e=>{V&&(V.innerHTML=``,e.forEach(e=>{let t=document.createElement(`li`);t.className=`flex gap-3`,t.innerHTML=`<span class="mt-0.5 w-6 h-6 rounded-full bg-white border border-apple-dark/10 flex items-center justify-center text-xs font-bold text-apple-red">${V.children.length+1}</span><span>${e}</span>`,V.appendChild(t)}))},Q=({focus:e,minutes:t,lowImpact:n})=>{let r=Number(t)||5,i=[];return e===`move`?(i.push(n?`Stand or sit tall. March in place gently for 60 seconds.`:`Walk in place (or around the room) for 90 seconds.`),i.push(`Roll shoulders back, then take 3 slow breaths (exhale longer than inhale).`),r>=6&&i.push(`Finish with 30 seconds of calf raises or seated leg extensions.`)):e===`fuel`?(i.push(`Add ONE color to your next bite (fruit/veg/beans).`),i.push(`Swap one drink for water (or unsweet tea).`),r>=6&&i.push(`Build a “plate check”: half produce, quarter protein, quarter whole grain.`)):(i.push(`Box breathing: inhale 4, hold 4, exhale 4, hold 4.`),i.push(`Repeat 3 rounds. Keep shoulders loose and jaw unclenched.`),r>=6&&i.push(`Add a 30-second body scan: notice forehead, shoulders, hands, stomach.`)),i.slice(0,r<=3?2:3)},$=()=>{if(!z)return;G&&(G.disabled=!0,G.classList.add(`chip-btn-busy`)),H&&(H.textContent=`Working…`,H.classList.add(`is-working`));let e=Number(z.value),t=!!B?.checked,n=Q({focus:J,minutes:e,lowImpact:t});window.setTimeout(()=>{H&&(H.textContent=`Ready`),Z(n),M(J),document.getElementById(`wellness-result`)?.scrollIntoView({behavior:`smooth`,block:`start`}),G&&(G.disabled=!1,G.classList.remove(`chip-btn-busy`),G.classList.add(`chip-btn-pop`),window.setTimeout(()=>G.classList.remove(`chip-btn-pop`),450)),H&&H.classList.remove(`is-working`),q&&(q.classList.remove(`playbook-flash`),q.offsetHeight,q.classList.add(`playbook-flash`),window.setTimeout(()=>q.classList.remove(`playbook-flash`),720))},220)},ne=()=>{if(!z)return;K&&(K.disabled=!0,K.classList.add(`chip-btn-busy`)),H&&(H.textContent=`Saving…`,H.classList.add(`is-working`));let e=Number(z.value),t=!!B?.checked,n=Q({focus:J,minutes:e,lowImpact:t}),r=Date.now();if(te({focus:J,minutes:e,lowImpact:t,lines:n,savedAt:r}),H&&(H.textContent=`Saved`),U){let e=new Date(r).toLocaleString(void 0,{weekday:`short`,hour:`numeric`,minute:`2-digit`});U.textContent=`Saved — ${e}`,U.classList.remove(`hidden`)}W&&(W.textContent=`Saved.`,W.classList.remove(`hidden`),window.setTimeout(()=>W.classList.add(`hidden`),1200)),K&&window.setTimeout(()=>{K.disabled=!1,K.classList.remove(`chip-btn-busy`),K.classList.add(`chip-btn-pop`),window.setTimeout(()=>K.classList.remove(`chip-btn-pop`),450)},120),H&&H.classList.remove(`is-working`),q&&(q.classList.remove(`playbook-flash`),q.offsetHeight,q.classList.add(`playbook-flash`),window.setTimeout(()=>q.classList.remove(`playbook-flash`),720))};if(I.length&&z&&V&&G&&K){let e=ee();e?.focus?Y(e.focus):Y(`move`),X(),e?.lines?.length&&(Z(e.lines),z&&e.minutes&&(z.value=String(e.minutes)),B&&(B.checked=!!e.lowImpact),X(),H&&(H.textContent=`Saved`),U&&e.savedAt&&(U.textContent=`Saved — ${new Date(e.savedAt).toLocaleString(void 0,{weekday:`short`,hour:`numeric`,minute:`2-digit`})}`,U.classList.remove(`hidden`))),I.forEach(e=>e.addEventListener(`click`,()=>Y(e.getAttribute(`data-focus`)))),z.addEventListener(`input`,X),G.addEventListener(`click`,$),K.addEventListener(`click`,ne),q?.addEventListener(`keydown`,e=>{if(e.key===`Enter`)$();else if(e.key===`ArrowLeft`||e.key===`ArrowRight`){let t=[`move`,`fuel`,`calm`],n=t.indexOf(J),r=e.key===`ArrowRight`?(n+1)%t.length:(n-1+t.length)%t.length;Y(t[r])}else(e.ctrlKey||e.metaKey)&&(e.key===`s`||e.key===`S`)&&(e.preventDefault(),ne())})}d.forEach(e=>e.addEventListener(`click`,()=>M(e.getAttribute(`data-wellness`)))),g.addEventListener(`click`,N),_.addEventListener(`click`,P),v.addEventListener(`click`,F),x?.addEventListener(`click`,()=>{w&&(E?k():j())}),S?.addEventListener(`click`,()=>{w&&A()}),O()},initChipboard:function(){let e=`chipnaway_wellness_week`,t=`chipnaway_chipboard_goal`,n=`chipnaway_chipboard_note`,r=`chipnaway_chipboard_checks`;if(!document.getElementById(`chipboard`))return;let i=document.getElementById(`chipboard-week`),a=document.getElementById(`chipboard-ring`),o=document.getElementById(`chipboard-confetti`),s=document.getElementById(`chipboard-count`),c=document.getElementById(`chipboard-goal`),l=document.getElementById(`chipboard-sub`),u=document.getElementById(`chipboard-level`),d=document.getElementById(`chipboard-goalhit`),f=Array.from(document.querySelectorAll(`.chipboard-goal-btn`)),p=document.getElementById(`chipboard-note`),m=document.getElementById(`chipboard-countdown`),h=document.getElementById(`chipboard-save`),g=document.getElementById(`chipboard-clear`),_=document.getElementById(`chipboard-toast`),v=document.getElementById(`chipboard-share`),y=document.getElementById(`chipboard-check-1`),b=document.getElementById(`chipboard-check-2`),x=(e=new Date)=>{let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),n=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-n);let r=new Date(Date.UTC(t.getUTCFullYear(),0,1)),i=Math.ceil(((t-r)/864e5+1)/7);return`${t.getUTCFullYear()}-W${String(i).padStart(2,`0`)}`},S=()=>{try{let t=localStorage.getItem(e),n=x();if(!t)return{week:n,count:0};let r=JSON.parse(t);return!r||r.week!==n?{week:n,count:0}:{week:r.week,count:Number(r.count)||0}}catch{return{week:x(),count:0}}},C=()=>{try{let e=localStorage.getItem(t),n=Number(e);return[3,5,7].includes(n)?n:5}catch{return 5}},w=e=>{try{localStorage.setItem(t,String(e))}catch{}},T=()=>{try{return localStorage.getItem(n)||``}catch{return``}},E=e=>{try{localStorage.setItem(n,e)}catch{}},D=()=>{try{let e=localStorage.getItem(r);if(!e)return{a:!1,b:!1};let t=JSON.parse(e);return{a:!!t?.a,b:!!t?.b}}catch{return{a:!1,b:!1}}},O=e=>{try{localStorage.setItem(r,JSON.stringify(e))}catch{}},k=(e,t,n)=>Math.max(t,Math.min(n,e)),A=(e,t)=>`chipnaway_chipboard_celebrated_${e}_${t}`,j=(e,t)=>{try{let n=A(e,t);if(localStorage.getItem(n))return;localStorage.setItem(n,`1`)}catch{}d&&(d.classList.remove(`hidden`),d.classList.add(`chipboard-goalhit`),window.setTimeout(()=>d.classList.remove(`chipboard-goalhit`),600)),a&&(a.classList.add(`is-celebrating`),window.setTimeout(()=>a.classList.remove(`is-celebrating`),950)),o&&(o.classList.remove(`hidden`),o.offsetHeight,window.setTimeout(()=>o.classList.add(`hidden`),1300))},M=(e,t)=>{let n=t?e/t:0;return n>=1?`All‑Star`:n>=.6?`Starter`:`Rookie`},N=()=>{let{week:e,count:t}=S(),n=C();i&&(i.textContent=e),s&&(s.textContent=String(t)),c&&(c.textContent=String(n)),u&&(u.textContent=M(t,n));let r=k(n?t/n:0,0,1);a&&(a.style.strokeDashoffset=String(301.6*(1-r))),l&&(t>=n?l.textContent=`Goal hit — keep rolling`:l.textContent=`${n-t} chip${n-t===1?``:`s`} to goal`),t>=n?j(e,n):d&&d.classList.add(`hidden`),f.forEach(e=>{let t=Number(e.getAttribute(`data-goal`))===n;e.classList.toggle(`bg-apple-panel`,t),e.classList.toggle(`border-apple-dark/10`,t)});let o=D();y&&(y.checked=o.a),b&&(b.checked=o.b),p&&(p.value=T()),m&&(m.textContent=`${(p?.value||``).length} / 180`)};window.addEventListener(`chipnaway:streak`,N),window.addEventListener(`storage`,t=>{t.key===e&&N()});let P=()=>{_&&(_.classList.remove(`hidden`),window.setTimeout(()=>_.classList.add(`hidden`),1800))},F=e=>{w(e),N()};f.forEach(e=>e.addEventListener(`click`,()=>F(Number(e.getAttribute(`data-goal`)))));let I=()=>{p&&(p.value.length>180&&(p.value=p.value.slice(0,180)),m&&(m.textContent=`${p.value.length} / 180`))};p?.addEventListener(`input`,I),h?.addEventListener(`click`,()=>{let e=(p?.value||``).trim();E(e),P()}),g?.addEventListener(`click`,()=>{p&&(p.value=``),E(``),I()});let R=()=>{O({a:!!y?.checked,b:!!b?.checked})};y?.addEventListener(`change`,R),b?.addEventListener(`change`,R),v?.addEventListener(`click`,async()=>{let{week:e,count:t}=S(),n=C(),r=M(t,n),i=T(),a=[`Chip’n Away — Weekly Chipboard (${e})`,``,`Chips banked: ${t}/${n}`,`Level: ${r}`,i?``:null,i?`Reflection: ${i}`:null,``,`Whistle‑Stop Wellness`].filter(Boolean).join(`
`);try{await navigator.clipboard.writeText(a),P()}catch{window.prompt(`Copy your weekly summary:`,a)}}),N(),window.lucide&&lucide.createIcons()}};document.addEventListener(`DOMContentLoaded`,()=>{let e=e=>{try{e()}catch{}};e(()=>r.injectTemplates()),e(()=>r.initMobileMenu()),e(()=>r.initDonationModal()),e(()=>r.initWellnessApp()),e(()=>r.initChipboard()),e(()=>r.initContactForm()),e(()=>r.initMap()),e(()=>r.initSwiper()),e(()=>r.initImpactCounters())});