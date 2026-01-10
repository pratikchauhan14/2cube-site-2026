// Theme Toggle & Scroll Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');
const mainHeader = document.getElementById('main-header');

// Dark Mode Check
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    lightIcon.classList.remove('hidden');
} else {
    document.documentElement.classList.remove('dark');
    darkIcon.classList.remove('hidden');
}

// Toggle Click
themeToggleBtn?.addEventListener('click', function() {
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
});

// Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        mainHeader?.classList.add('scrolled-header');
    } else {
        mainHeader?.classList.remove('scrolled-header');
    }
});



// =========================================
// TAB SWITCHING LOGIC (For Mega Menu)
// =========================================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => { // Hover pe change hoga
        const targetId = btn.getAttribute('data-target');

        // 1. Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active-tab'));
        // 2. Add active class to hovered button
        btn.classList.add('active-tab');

        // 3. Hide all contents
        tabContents.forEach(content => content.classList.remove('active-content'));
        // 4. Show target content
        document.getElementById(targetId).classList.add('active-content');
    });
});




/* */
const editorData = {
        'explorer': {
            tabs: [
                { id: 'about', label: 'about.md', icon: 'ri-markdown-line text-blue-400' },
                { id: 'state', label: 'state.ts', icon: 'ri-file-code-line text-blue-300' },
                { id: 'info', label: 'info.json', icon: 'ri-braces-line text-yellow-400' }
            ],
            content: {
                // 1. ABOUT: Ye aapko sahi laga tha, wahi rakha hai
                'about': `
<p><span class="syntax-orange"># 2Cube Studio</span></p>
<p>&nbsp;</p>
<p>We are a <span class="syntax-green">**Developer-First Agency**</span>.</p>
<p>We don't just drag-and-drop; we engineer systems.</p>
<p>&nbsp;</p>
<p><span class="syntax-blue">## Mission</span></p>
<p>To eliminate technical debt and deliver pixel-perfect code.</p>
<p>&nbsp;</p>
<p><span class="syntax-blue">## Core Values</span></p>
<p>- <span class="syntax-yellow">Speed</span>: Performance is a feature.</p>
<p>- <span class="syntax-yellow">Quality</span>: Clean architecture always.</p>
<p>- <span class="syntax-yellow">Transparency</span>: Direct dev-to-client comms.</p>`,
                
                // 2. STATE: Real TypeScript Logic (Updated)
                'state': `
<p><span class="syntax-purple">import</span> { <span class="syntax-yellow">Audit</span>, <span class="syntax-yellow">Performance</span> } <span class="syntax-purple">from</span> <span class="syntax-green">'@2cube/core'</span>;</p>
<p>&nbsp;</p>
<p><span class="syntax-gray">// Defining Agency Standards</span></p>
<p><span class="syntax-purple">interface</span> <span class="syntax-yellow">Deliverable</span> {</p>
<p class="pl-4">code_quality: <span class="syntax-green">'Clean'</span> | <span class="syntax-green">'Scalable'</span>;</p>
<p class="pl-4">lighthouse_score: <span class="syntax-blue">number</span>; <span class="syntax-gray">// Must be > 90</span></p>
<p class="pl-4">bugs_allowed: <span class="syntax-purple">null</span>;</p>
<p class="pl-4">security: <span class="syntax-yellow">SecurityLevel</span>[];</p>
<p>}</p>
<p>&nbsp;</p>
<p><span class="syntax-purple">export const</span> <span class="syntax-blue">currentStatus</span>: <span class="syntax-yellow">Deliverable</span> = {</p>
<p class="pl-4">code_quality: <span class="syntax-green">'Scalable'</span>,</p>
<p class="pl-4">lighthouse_score: <span class="syntax-orange">99</span>,</p>
<p class="pl-4">bugs_allowed: <span class="syntax-purple">null</span>,</p>
<p class="pl-4">security: [<span class="syntax-green">'SSL'</span>, <span class="syntax-green">'DDOS_PROTECT'</span>]</p>
<p>};</p>`,
                
                // 3. INFO: More Details Added (Updated)
                'info': `
<p>{</p>
<p class="pl-4"><span class="syntax-blue">"agency"</span>: <span class="syntax-green">"2Cube Studio"</span>,</p>
<p class="pl-4"><span class="syntax-blue">"location"</span>: <span class="syntax-green">"India (Global Remote)"</span>,</p>
<p class="pl-4"><span class="syntax-blue">"timezone"</span>: <span class="syntax-green">"IST (UTC+5:30)"</span>,</p>
<p class="pl-4"><span class="syntax-blue">"certifications"</span>: [</p>
<p class="pl-8"><span class="syntax-yellow">"HubSpot Solutions Partner"</span>,</p>
<p class="pl-8"><span class="syntax-yellow">"AWS Certified Architect"</span></p>
<p class="pl-4">],</p>
<p class="pl-4"><span class="syntax-blue">"tech_stack"</span>: [</p>
<p class="pl-8"><span class="syntax-yellow">"HubSpot CMS / HubL"</span>,</p>
<p class="pl-8"><span class="syntax-yellow">"Next.js (App Router)"</span>,</p>
<p class="pl-8"><span class="syntax-yellow">"React / TypeScript"</span>,</p>
<p class="pl-8"><span class="syntax-yellow">"Node.js / GraphQL"</span></p>
<p class="pl-4">],</p>
<p class="pl-4"><span class="syntax-blue">"contact"</span>: <span class="syntax-green">"hello@2cube.studio"</span></p>
<p>}</p>`
            }
        },
        'git': {
            tabs: [
                { id: 'repos', label: 'repositories.list', icon: 'ri-git-repository-line text-red-400' }
            ],
            content: {
                // 4. REPOS: Added 2 more advanced items
                'repos': `
<p><span class="syntax-gray"># Active Production Repositories</span></p>
<p>&nbsp;</p>
<p><span class="syntax-green">✔</span> <span class="syntax-blue">hubspot-theme-pro</span> <span class="syntax-gray">(v2.4.0)</span></p>
<p class="pl-4 text-slate-500">Custom boilerplate with 40+ custom modules.</p>
<p>&nbsp;</p>
<p><span class="syntax-green">✔</span> <span class="syntax-blue">nextjs-headless-starter</span> <span class="syntax-gray">(v1.2.0)</span></p>
<p class="pl-4 text-slate-500">SEO optimized ISR/SSR configuration.</p>
<p>&nbsp;</p>
<p><span class="syntax-green">✔</span> <span class="syntax-blue">react-interactive-calculators</span> <span class="syntax-gray">(v5.0.1)</span></p>
<p class="pl-4 text-slate-500">Financial logic engines for FinTech clients.</p>
<p>&nbsp;</p>
<p><span class="syntax-green">✔</span> <span class="syntax-blue">api-middleware-layer</span> <span class="syntax-gray">(v3.1.0)</span></p>
<p class="pl-4 text-slate-500">Secure Node.js bridge for CRM integrations.</p>
<p>&nbsp;</p>
<p><span class="syntax-yellow">➜ All systems synced with Production.</span></p>`
            }
        },
        'settings': {
            tabs: [
                { id: 'start', label: 'init_project.sh', icon: 'ri-terminal-line text-green-400' }
            ],
            content: {
                // 5. TERMINAL: Added Environment Checks
                'start': `
<p><span class="syntax-green">#!/bin/bash</span></p>
<p><span class="syntax-blue">echo</span> <span class="syntax-yellow">"Initializing 2Cube Workflow..."</span></p>
<p>&nbsp;</p>
<p><span class="syntax-gray"># Step 1: Partner Validation</span></p>
<p><span class="syntax-purple">if</span> [ <span class="syntax-orange">"$agency"</span> == <span class="syntax-green">"2Cube"</span> ]; <span class="syntax-purple">then</span></p>
<p class="pl-4"><span class="syntax-blue">echo</span> <span class="syntax-green">"✔ Allocating Senior Developers"</span></p>
<p class="pl-4"><span class="syntax-blue">echo</span> <span class="syntax-green">"✔ Running Security Protocol... [OK]"</span></p>
<p class="pl-4"><span class="syntax-blue">echo</span> <span class="syntax-green">"✔ Optimizing Assets... [Done]"</span></p>
<p class="pl-4"><span class="syntax-blue">echo</span> <span class="syntax-green">"✔ Timeline Accelerated by 40%"</span></p>
<p class="pl-4"><span class="syntax-gray"># Launch Sequence</span></p>
<p class="pl-4"><span class="syntax-blue">return</span> <span class="syntax-yellow">"PROJECT_SUCCESS"</span></p>
<p><span class="syntax-purple">else</span></p>
<p class="pl-4"><span class="syntax-blue">echo</span> <span class="syntax-red">"Error: Risk of spaghetti code detected."</span></p>
<p><span class="syntax-purple">fi</span></p>
<p>&nbsp;</p>
<p><span class="syntax-gray"># Ready to deploy? Contact us now.</span></p>`
            }
        }
    };
    
    // --- 2. LOGIC ---
    const topTabsContainer = document.getElementById('top-tabs-container');
    const container = document.getElementById('typewriter-container');
    const sidebarIcons = document.querySelectorAll('.sidebar-icon');
    let typingInterval;

    // Helper: Typewriter
    function typeCode(htmlContent) {
        clearInterval(typingInterval);
        container.innerHTML = '<span class="cursor-blink"></span>';
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        const lines = Array.from(tempDiv.children);
        
        container.innerHTML = '';
        let lineIndex = 0;

        function addLine() {
            if (lineIndex < lines.length) {
                const p = lines[lineIndex].cloneNode(true);
                const cursorSpan = document.createElement('span');
                cursorSpan.className = 'cursor-blink';
                p.appendChild(cursorSpan);
                
                const prevCursor = container.querySelector('.cursor-blink');
                if (prevCursor) prevCursor.remove();
                
                container.appendChild(p);
                
                const scrollParent = container.closest('.custom-scrollbar');
                if(scrollParent) scrollParent.scrollTop = scrollParent.scrollHeight;

                lineIndex++;
                setTimeout(addLine, Math.random() * 30 + 20);
            }
        }
        addLine();
    }

    // Helper: Render Top Tabs based on Mode
    // --- Updated renderTabs function ---
function renderTabs(mode) {
    const modeData = editorData[mode];
    topTabsContainer.innerHTML = ''; 

    modeData.tabs.forEach((tab, index) => {
        // FIXED: Changed 'div' to 'button'
        const btn = document.createElement('button');
        const isActive = index === 0;
        
        btn.className = `tab-item ${isActive ? 'active' : ''} flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#1e293b] rounded-t transition-colors focus:outline-none`;
        
        // Improved Contrast for tab text
        const textClass = isActive ? 'text-slate-100' : 'text-slate-100';
        btn.innerHTML = `<i class="${tab.icon}" aria-hidden="true"></i> <span class="${textClass}">${tab.label}</span>`;
        
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-item').forEach(t => {
                t.classList.remove('active');
                const span = t.querySelector('span');
                span.classList.replace('text-slate-200', 'text-slate-400');
            });
            btn.classList.add('active');
            btn.querySelector('span').classList.replace('text-slate-400', 'text-slate-200');
            typeCode(modeData.content[tab.id]);
        });

        topTabsContainer.appendChild(btn);
    });

    typeCode(modeData.content[modeData.tabs[0].id]);
}

    // Helper: Handle Sidebar Switching
    sidebarIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Remove active from all sidebar icons
            sidebarIcons.forEach(i => i.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');

            // Get Mode
            const mode = this.getAttribute('data-mode');
            
            // Render Tabs & Content for this mode
            renderTabs(mode);
        });
    });

    // --- 3. INITIALIZE ---
    // Start with Explorer Mode
    renderTabs('explorer');