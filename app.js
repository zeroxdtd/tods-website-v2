// SPA Router and App Logic

const root = document.getElementById('root');

function render() {
    const db = window.TODS_DB.get();
    const hash = window.location.hash || '#/';

    const isAdmin = false; // Admin disabled temporarily

    // Route: HOME
    if (hash === '#/') {
        // Build Home with inline editing if admin
        let homeHtml = `
            <section class="hero">
                <div class="container hero-container">
                    <div class="hero-content">
                        <h1 class="hero-title" style="text-align: center; line-height: 1.1;">
                            <span style="display:inline-block; min-width: 6em; font-size: 5rem; text-align: center;">
                                <span id="language-switcher" style="display:inline-block; transition: all 0.4s ease-out; color: var(--clr-foreground);">TELUGU</span>
                            </span><br>
                            <div style="font-size: 3rem; margin: 1.5rem 0; display:flex; justify-content:center; align-items:center; gap: 1rem; font-family: var(--font-heading); font-weight: 900;">
                                <span style="color: var(--clr-red);">OFFENSIVE</span>
                                <span style="font-size: 2rem;">⚔️</span>
                                <span style="color: var(--clr-blue);">DEFENSIVE</span>
                            </div>
                            <span style="color: var(--clr-purple); font-size: 4rem; letter-spacing: 4px;">SECURITY</span>
                        </h1>
                        <p class="hero-subtitle ${isAdmin ? 'inline-edit' : ''}" 
                           ${isAdmin ? 'contenteditable="true" onblur="updateDBContent(\'intro\', this.innerText)"' : ''}>
                            ${db.content.intro}
                        </p>
                        <div style="margin-top:2rem;">
                            <a href="#/events" class="btn btn-pill">Get Tickets!</a>
                        </div>
                    </div>
                    <div class="hero-visual">
                        <img src="./assets/hero_graphic.png" class="neo-graphic" alt="Tech">
                    </div>
                </div>
            </section>
            
            <section class="features-section" style="padding-top:4rem;">
                <div class="container">
                    <!-- IMPACT HEADER -->
                    <div class="impact-header">
                        <h2>Our Impact</h2>
                        <a href="#/what-we-do">Learn More &rarr;</a>
                    </div>
                    
                    <!-- IMPACT NUMBERS -->
                    <div class="impact-numbers">
                        <div>
                            <h3>2</h3>
                            <p>Chapters</p>
                        </div>
                        <div>
                            <h3>300+</h3>
                            <p>Members</p>
                        </div>
                        <div>
                            <h3>5+</h3>
                            <p>Annual Meetups</p>
                        </div>
                        <div>
                            <h3>1K</h3>
                            <p>Hours Volunteered</p>
                        </div>
                    </div>

                    <!-- IMPACT SPLIT BOX -->
                    <div class="impact-split">
                        <div class="impact-split-img">
                            <img src="./assets/hero_graphic.png" style="width:100%; height:100%; object-fit:cover;" alt="TODS Community Members">
                        </div>
                        <div class="impact-split-text">
                            <h2>TODS Academy</h2>
                            <p>Inspiring the next generation of Telugu cybersecurity leaders. Mentorships, rigorous bootcamps, and direct career placements for offensive and defensive talent.</p>
                            <a href="#/about/mission" class="btn btn-ghost" style="text-transform: uppercase;">Learn More</a>
                        </div>
                    </div>
                </div>
            </section>
        `;
        root.innerHTML = homeHtml;

        // Animated Language Switcher Logic
        if (window.langInterval) clearInterval(window.langInterval);
        const switcher = document.getElementById('language-switcher');
        if (switcher) {
            // Telugu, Hindi, Tamil, Marathi, Kannada, Malayalam
            const langs = ['TELUGU', 'తెలుగు', 'तेलुगु', 'தெலுங்கு', 'ತೆಲುಗು', 'തെലുങ്ക്'];
            let currentLang = 0;

            window.langInterval = setInterval(() => {
                switcher.style.opacity = 0;
                switcher.style.transform = 'translateX(-30px)'; // Slide out horizontally

                setTimeout(() => {
                    currentLang = (currentLang + 1) % langs.length;
                    switcher.innerText = langs[currentLang];

                    // Turn off transition to instantly warp to the right side
                    switcher.style.transition = 'none';
                    switcher.style.transform = 'translateX(30px)';

                    // Force DOM reflow
                    void switcher.offsetWidth;

                    // Turn transition back on and slide in
                    switcher.style.transition = 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
                    switcher.style.opacity = 1;
                    switcher.style.transform = 'translateX(0)';
                }, 400); // wait for fade out
            }, 3000);
        }

        // Route: HALL OF FAME
    } else if (hash === '#/hof') {
        // Filter approved hackers
        const approvedHackers = db.hackers.filter(h => h.status === 'approved');
        const purple = approvedHackers.filter(h => h.category === 'purple');
        const red = approvedHackers.filter(h => h.category === 'red');
        const blue = approvedHackers.filter(h => h.category === 'blue');

        root.innerHTML = `
            <section class="features-section" style="min-height:80vh;">
                <div class="container">
                    <h1 class="section-title">HALL OF FAME</h1>
                    <p style="margin-bottom: 2rem; font-size:1.2rem;">Recognizing the best verified hackers in the Telugu community.</p>

                    <div class="grid-3">
                        <div class="feature-card badge-purple">
                            <h3>Purple Badges</h3>
                            <p>Masters of both Offense and Defense.</p>
                            <hr style="border: 1px solid black; width:100%; margin: 1rem 0;">
                            ${purple.map(h => `<strong>${h.name}</strong><br>`).join('') || 'No members yet'}
                        </div>
                        <div class="feature-card badge-red">
                            <h3>Red Badges</h3>
                            <p>Aggressive Offensive Security specialists.</p>
                            <hr style="border: 1px solid black; width:100%; margin: 1rem 0;">
                            ${red.map(h => `<strong>${h.name}</strong><br>`).join('') || 'No members yet'}
                        </div>
                        <div class="feature-card badge-blue">
                            <h3>Blue Badges</h3>
                            <p>Impenetrable Defensive Security architects.</p>
                            <hr style="border: 1px solid black; width:100%; margin: 1rem 0;">
                            ${blue.map(h => `<strong>${h.name}</strong><br>`).join('') || 'No members yet'}
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Route: TEAM
    } else if (hash === '#/about/team') {
        root.innerHTML = `
            <section class="features-section" style="min-height:80vh;">
                <div class="container">
                    <h1 class="section-title" style="margin-bottom:4rem;">Our Staff</h1>
                    <div class="team-grid">
                        ${db.coreTeam.map(t => `
                            <div class="team-card">
                                <div class="team-photo-container">
                                    <img src="${t.image}" alt="${t.name}" class="team-photo">
                                    <a href="${t.linkedin}" target="_blank" class="team-linkedin">
                                        <!-- Pure CSS LinkedIn icon mimicking outintech -->
                                        <div class="in-box"><span>in</span></div>
                                    </a>
                                </div>
                                <h3 class="team-name">${t.name} <span style="font-weight:normal; font-size:1rem;">${t.pronouns}</span></h3>
                                <p class="team-role">${t.role}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;

        // Route: EVENTS
    } else if (hash === '#/events') {
        const upcoming = db.events.filter(e => e.status === 'upcoming');
        const completed = db.events.filter(e => e.status === 'completed');

        root.innerHTML = `
            <section class="features-section" style="min-height:80vh;">
                <div class="container">
                    <h1 class="section-title">EVENTS</h1>
                    <div class="grid-2">
                        <div>
                            <h2 style="margin-bottom:1rem;">UPCOMING EVENTS</h2>
                            ${upcoming.map(e => `
                                <div class="feature-card" style="margin-bottom:1rem; background-color: var(--clr-accent-1);">
                                    <h3>${e.title}</h3>
                                    <p>Date: ${e.date}</p>
                                    <span class="status-pill">${e.status.toUpperCase()}</span>
                                </div>
                            `).join('') || '<p>No upcoming events.</p>'}
                        </div>
                        <div>
                            <h2 style="margin-bottom:1rem;">COMPLETED EVENTS</h2>
                            ${completed.map(e => `
                                <div class="feature-card" style="margin-bottom:1rem; opacity:0.8;">
                                    <h3>${e.title}</h3>
                                    <p>Date: ${e.date}</p>
                                    <span class="status-pill">${e.status.toUpperCase()}</span>
                                </div>
                            `).join('') || '<p>No completed events.</p>'}
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Route: BLOGS
    } else if (hash === '#/blogs') {
        const approvedBlogs = db.blogs.filter(b => b.status === 'approved');

        let hybridLayout = '';
        if (approvedBlogs.length > 0) {
            const featured = approvedBlogs[0];
            hybridLayout += `
                <div class="feature-card bg-highlight" style="margin-bottom: 2rem; width: 100%;">
                    <h3>FEATURED: ${featured.title}</h3>
                    <p>By ${featured.author}</p>
                    <hr style="border-top:1px solid white; margin:1rem 0;">
                    <p>${featured.content}</p>
                </div>
                <div class="grid-3">
                    ${approvedBlogs.slice(1).map(b => `
                        <div class="feature-card">
                            <h4>${b.title}</h4>
                            <p><smallBy ${b.author}</small></p>
                            <p>${b.content}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        root.innerHTML = `
            <section class="features-section" style="min-height:80vh;">
                <div class="container">
                    <h1 class="section-title">COMMUNITY BLOGS</h1>
                    ${hybridLayout || '<p>No blogs published yet.</p>'}
                    ${db.currentUser === 'user' ? `
                        <div style="margin-top:2rem; padding:2rem; border:2px solid black;">
                            <h3>Submit a Blog</h3>
                            <p>Drafts are sent to Admin for approval.</p>
                            <button class="btn btn-primary" onclick="alert('Blog submission modal placeholder!')">Write Post</button>
                        </div>
                    ` : ''}
                </div>
            </section>
        `;

        // Route: ADMIN
    } else if (hash === '#/admin') {
        if (!isAdmin) {
            window.location.hash = '#/';
            return;
        }

        const pendingHackers = db.hackers.filter(h => h.status === 'pending');
        const pendingBlogs = db.blogs.filter(b => b.status === 'pending');

        root.innerHTML = `
            <section class="features-section" style="min-height:80vh;">
                <div class="container">
                    <h1 class="section-title">ADMIN CONTROL CENTER</h1>
                    
                    <div class="grid-2">
                        <div class="feature-card" style="grid-column: span 2;">
                            <h3>Core Team Management</h3>
                            <div style="display:flex; gap:1rem; margin-bottom:1rem; width: 100%;">
                                <input type="text" id="ct-name" class="form-input" placeholder="Member Name">
                                <input type="text" id="ct-role" class="form-input" placeholder="Role / Description">
                                <button class="btn btn-primary" onclick="addCT()">ADD MEMBER</button>
                            </div>
                            <ul style="list-style:none; width: 100%;">
                                ${db.coreTeam.map(ct => `
                                    <li style="display:flex; justify-content:space-between; align-items: center; border-bottom:1px solid var(--clr-border); padding:0.5rem 0;">
                                        <span><strong>${ct.name}</strong> - ${ct.role}</span>
                                        <button class="btn btn-ghost" style="padding:0.25rem 0.5rem; font-size:0.8rem;" onclick="removeCT(${ct.id})">REMOVE</button>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>

                        <div class="feature-card">
                            <h3>Badge Approvals</h3>
                            <p>Pending HOF Applications:</p>
                            ${pendingHackers.map(h => `
                                <div style="border:1px solid black; padding:1rem; margin-top:1rem;">
                                    <strong>${h.name}</strong> requesting ${h.category} badge.
                                    <br><button class="btn btn-primary mt-2" onclick="approve('hackers', ${h.id})" style="margin-top:0.5rem; padding: 0.5rem 1rem;">APPROVE</button>
                                </div>
                            `).join('') || '<p>No pending applications.</p>'}
                        </div>

                        <div class="feature-card">
                            <h3>Blog Approvals</h3>
                            <p>Pending Posts:</p>
                            ${pendingBlogs.map(b => `
                                <div style="border:1px solid black; padding:1rem; margin-top:1rem;">
                                    <strong>${b.title}</strong> by ${b.author}
                                    <br><button class="btn btn-primary mt-2" onclick="approve('blogs', ${b.id})" style="margin-top:0.5rem; padding: 0.5rem 1rem;">APPROVE/PUBLISH</button>
                                </div>
                            `).join('') || '<p>No pending blogs.</p>'}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

// Removed toggleLogin and admin handlers temporarily

window.approve = function (type, id) {
    window.TODS_DB.approveItem(type, id);
}

window.addCT = function () {
    const name = document.getElementById('ct-name').value;
    const role = document.getElementById('ct-role').value;
    if (name && role) {
        window.TODS_DB.addCoreTeam(name, role);
    }
}

window.removeCT = function (id) {
    window.TODS_DB.removeCoreTeam(id);
}

// Listen for Route changes or DB updates
window.addEventListener('hashchange', render);
window.addEventListener('db_updated', render);

// Initial Load
document.addEventListener('DOMContentLoaded', render);
