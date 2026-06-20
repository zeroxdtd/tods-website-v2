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
        const todayIST = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        const yyyy = todayIST.getFullYear();
        const mm = String(todayIST.getMonth() + 1).padStart(2, '0');
        const dd = String(todayIST.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}-${mm}-${dd}`;
        
        // Add dynamic status to events
        const processedEvents = db.events.map(e => {
            let status = 'upcoming';
            if (e.date < todayStr) status = 'completed';
            else if (e.date === todayStr) status = 'ongoing';
            return { ...e, status };
        }).sort((a, b) => new Date(b.date) - new Date(a.date));

        const upcoming = processedEvents.filter(e => e.status === 'upcoming');
        const ongoing = processedEvents.filter(e => e.status === 'ongoing');
        const completed = processedEvents.filter(e => e.status === 'completed');

        const renderSpeakers = (speakers) => {
            if (!speakers || speakers.length === 0) return '';
            return `
                <div class="speakers-container" style="margin-top: 1.5rem;">
                    <h4 style="margin-bottom: 1rem; color: var(--clr-foreground); font-size: 1.2rem;">Featured Speakers</h4>
                    <div class="grid-2">
                        ${speakers.map(s => {
                            let badgeBg = '#f5f5ff'; let badgeBorder = 'var(--clr-blue)'; let badgeColor = 'var(--clr-blue)';
                            if (s.category === 'offensive' || s.category === 'red') {
                                badgeBg = '#fff5f5'; badgeBorder = 'var(--clr-red)'; badgeColor = 'var(--clr-red)';
                            } else if (s.category === 'purple' || s.category === 'both') {
                                badgeBg = '#fdf5ff'; badgeBorder = 'var(--clr-purple)'; badgeColor = 'var(--clr-purple)';
                            } else if (s.category.toLowerCase() === 'founder') {
                                badgeBg = '#FFFBF0'; badgeBorder = '#D4AF37'; badgeColor = '#B8860B';
                            }
                            return `
                            <div class="speaker-card" style="display:flex; align-items:center; gap:1rem; padding: 1rem; background: rgba(0,0,0,0.02); border: 2px solid var(--clr-border); border-radius: 8px;">
                                <div style="width: 50px; height: 50px; border-radius: 50%; overflow: hidden; background: #333; flex-shrink: 0; border: 2px solid var(--clr-border);">
                                    <img src="${s.avatarUrl || `https://placehold.co/100x100/333/fff?text=${s.name.charAt(0)}`}" alt="${s.name}" style="width:100%; height:100%; object-fit:cover;">
                                </div>
                                <div style="flex-grow: 1;">
                                    <div style="font-weight: 800; font-size: 1.1rem; color: var(--clr-foreground);">${s.name}</div>
                                    <div style="font-size: 0.9rem; color: #555; margin-bottom: 0.25rem;">${s.role}</div>
                                    <div style="display:flex; gap: 0.5rem; align-items:center;">
                                        <span style="background: ${badgeBg}; border: 2px solid ${badgeBorder}; color: ${badgeColor}; padding: 0.1rem 0.4rem; font-size: 0.7rem; text-transform: uppercase; font-weight: bold; border-radius: 4px;">${s.category}</span>
                                        ${s.linkedin ? `<a href="${s.linkedin}" target="_blank" style="color: var(--clr-blue); text-decoration: underline; font-size: 0.9rem; font-weight: bold;">LinkedIn ↗</a>` : ''}
                                    </div>
                                </div>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        };

        const renderEventCard = (e, isCompleted = false) => {
            let eventShadow = '#000000'; // Default black shadow
            let pillColor = '#000000';
            
            if (e.speakers && e.speakers.length > 0) {
                const hasRed = e.speakers.some(s => s.category === 'offensive' || s.category === 'red');
                const hasBlue = e.speakers.some(s => s.category === 'defensive' || s.category === 'blue');
                const hasPurple = e.speakers.some(s => s.category === 'purple' || s.category === 'both');
                const hasFounder = e.speakers.some(s => s.category.toLowerCase() === 'founder');
                
                if (hasFounder) {
                    eventShadow = '#D4AF37';
                    pillColor = '#D4AF37';
                } else if (hasPurple || (hasRed && hasBlue)) {
                    eventShadow = 'var(--clr-purple)';
                    pillColor = 'var(--clr-purple)';
                } else if (hasRed) {
                    eventShadow = 'var(--clr-red)';
                    pillColor = 'var(--clr-red)';
                } else if (hasBlue) {
                    eventShadow = 'var(--clr-blue)';
                    pillColor = 'var(--clr-blue)';
                }
            }
            
            // For hover effect, we use CSS variables or inline styles. 
            // We can just use an inner div or inline style block for the shadow.
            return `
            <div class="feature-card event-card" onclick="openEventModal(${e.id})" 
                 onmouseover="this.style.transform='translate(-4px, -4px)'; this.style.boxShadow='8px 8px 0px ${eventShadow}'" 
                 onmouseout="this.style.transform='none'; this.style.boxShadow='4px 4px 0px ${eventShadow}'"
                 style="margin-bottom:1.5rem; cursor: pointer; transition: all 0.2s ease; ${isCompleted ? 'opacity:0.8;' : ''} background-color: #ffffff; border: 3px solid #000; box-shadow: 4px 4px 0px ${eventShadow}; border-radius: 4px;">
                <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${e.title}</h3>
                <p style="margin-bottom: 1rem; font-weight: 600; font-size: 1.1rem; color: #333;">Date: ${e.date}</p>
                <span class="status-pill" style="background-color: ${pillColor}; color: white; border: 2px solid #000; padding: 0.3rem 0.6rem;">${e.status.toUpperCase()}</span>
                <p style="margin-top: 1.5rem; font-size: 0.95rem; font-weight: bold; text-decoration: none; color: ${pillColor}; display: flex; align-items: center; gap: 0.5rem;">
                    VIEW EVENT DETAILS <span style="font-size: 1.2rem;">&rarr;</span>
                </p>
            </div>
            `;
        };

        root.innerHTML = `
            <section class="features-section" style="min-height:80vh;">
                <div class="container">
                    <h1 class="section-title">EVENTS</h1>
                    
                    ${ongoing.length > 0 ? `
                        <div style="margin-bottom: 2rem; border: 4px solid var(--clr-red); padding: 1.5rem; background: #fff5f5; position: relative;">
                            <div style="position: absolute; top:-4px; right:-4px; background: var(--clr-red); color: white; padding: 0.25rem 1rem; font-weight: 800;">HAPPENING NOW</div>
                            <h2 style="margin-bottom:1rem; color: var(--clr-red);">ONGOING EVENT</h2>
                            <div class="grid-2">
                                ${ongoing.map(e => renderEventCard(e, false)).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <div class="grid-2">
                        <div>
                            <h2 style="margin-bottom:1rem;">UPCOMING EVENTS</h2>
                            ${upcoming.map(e => renderEventCard(e, false)).join('') || '<p>No upcoming events.</p>'}
                        </div>
                        <div>
                            <h2 style="margin-bottom:1rem;">COMPLETED EVENTS</h2>
                            ${completed.map(e => renderEventCard(e, true)).join('') || '<p>No completed events.</p>'}
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Fullscreen Glassmorphism Modal -->
            <div id="event-modal" class="event-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; z-index: 1000; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); align-items:center; justify-content:center; padding: 1rem;">
                <div class="modal-content" style="background: var(--clr-bg); border: 4px solid #000; border-radius: 0px; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative; box-shadow: 12px 12px 0px rgba(0,0,0,1);">
                    <button onclick="closeEventModal()" style="position:absolute; top: 1rem; right: 1rem; background: #000; border: none; font-size: 1.5rem; width: 40px; height: 40px; display:flex; align-items:center; justify-content:center; cursor: pointer; color: #fff;">&times;</button>
                    <div id="modal-body" style="padding: 2rem;"></div>
                </div>
            </div>
        `;

        window.openEventModal = (id) => {
            const event = processedEvents.find(e => e.id === id);
            if (!event) return;
            
            // Prevent trivial path traversal / LFI (e.g. going up directories)
            const safePdfLink = event.pdfLink ? event.pdfLink.replace(/(\.\.\/|\.\.\\)/g, '') : null;
            const pdfUrl = safePdfLink ? `./resources/${safePdfLink}` : null;

            document.getElementById('modal-body').innerHTML = `
                <div style="margin-bottom: 1.5rem; padding-right: 3rem;">
                    <span class="status-pill" style="margin-bottom: 1rem; display:inline-block;">${event.status.toUpperCase()}</span>
                    <h2 style="font-size: 2.5rem; line-height: 1.2; margin-bottom: 0.5rem; font-family: var(--font-heading); font-weight: 900;">${event.title}</h2>
                    <p style="font-weight: 800; color: var(--clr-purple); font-size: 1.2rem;">Date: ${event.date}</p>
                </div>
                
                <div style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; border-top: 2px solid #000; padding-top: 1.5rem;">
                    ${event.description || 'No description provided.'}
                </div>
                
                ${pdfUrl ? `<div id="pdf-resource-section" style="margin-bottom: 2rem;"></div>` : ''}

                ${renderSpeakers(event.speakers)}
            `;

            // Check if PDF exists before rendering the embed
            if (pdfUrl) {
                const pdfContainer = document.getElementById('pdf-resource-section');
                fetch(pdfUrl, { method: 'HEAD' })
                    .then(response => {
                        if (response.ok) {
                            pdfContainer.innerHTML = `
                                <div style="background: var(--clr-accent-2); padding: 1rem; border: 2px solid #000;">
                                    <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                        <h4 style="margin: 0; font-weight: 800;">Event Resource (PDF)</h4>
                                        <div style="display: flex; gap: 0.5rem;">
                                            <a href="${pdfUrl}" target="_blank" class="btn btn-ghost" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Open in New Tab ↗</a>
                                            <a href="${pdfUrl}" download class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Download PDF ⬇</a>
                                        </div>
                                    </div>
                                    <iframe src="${pdfUrl}" width="100%" height="400px" style="border: 2px solid #000; background: white;"></iframe>
                                </div>
                            `;
                        } else {
                            pdfContainer.innerHTML = `
                                <div style="background: #f9f9f9; padding: 1.5rem; border: 2px dashed #ccc; text-align: center;">
                                    <span style="font-size: 2rem;">📄</span>
                                    <p style="font-weight: 800; margin: 0.5rem 0; color: #666;">Resource Coming Soon</p>
                                    <p style="font-size: 0.9rem; color: #999;">The PDF for this event will be uploaded shortly.</p>
                                </div>
                            `;
                        }
                    })
                    .catch(() => {
                        pdfContainer.innerHTML = `
                            <div style="background: #f9f9f9; padding: 1.5rem; border: 2px dashed #ccc; text-align: center;">
                                <span style="font-size: 2rem;">📄</span>
                                <p style="font-weight: 800; margin: 0.5rem 0; color: #666;">Resource Coming Soon</p>
                                <p style="font-size: 0.9rem; color: #999;">The PDF for this event will be uploaded shortly.</p>
                            </div>
                        `;
                    });
            }
            
            document.getElementById('event-modal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };

        window.closeEventModal = () => {
            document.getElementById('event-modal').style.display = 'none';
            document.body.style.overflow = '';
        };

        window.onclick = function(event) {
            const modal = document.getElementById('event-modal');
            if (event.target === modal) {
                closeEventModal();
            }
        };

        // Route: SPONSORS
    } else if (hash === '#/sponsor') {
        root.innerHTML = `
            <section class="features-section" style="min-height:80vh;">
                <div class="container">
                    <h1 class="section-title">OUR SPONSORS</h1>
                    <p style="margin-bottom: 2rem; font-size:1.2rem;">Partnering with industry leaders to secure the future.</p>
                    <div class="grid-3">
                        <div class="feature-card" style="text-align:center; background-color: var(--clr-accent-2);">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">🏢</div>
                            <h3>TechCorp Sec</h3>
                            <p>Platinum Sponsor</p>
                        </div>
                        <div class="feature-card" style="text-align:center; background-color: var(--clr-accent-1);">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">🛡️</div>
                            <h3>Defenders Inc</h3>
                            <p>Gold Sponsor</p>
                        </div>
                        <div class="feature-card" style="text-align:center; background-color: white;">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">🌐</div>
                            <h3>Global Cyber</h3>
                            <p>Silver Sponsor</p>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Route: DONATE
    } else if (hash === '#/donate') {
        root.innerHTML = `
            <section class="features-section" style="min-height:80vh;">
                <div class="container">
                    <h1 class="section-title">DONATE</h1>
                    <div class="feature-card" style="max-width: 600px; margin: 0 auto; text-align: center; background-color: var(--clr-accent-1);">
                        <h3>Support TODS Community</h3>
                        <p style="margin: 1.5rem 0; font-size: 1.2rem;">
                            To make a donation, please drop an email to:
                        </p>
                        <a href="mailto:moderators@tods.community?subject=Donation to TODS Community" class="btn btn-primary" style="font-size: 1.2rem; margin-bottom: 1.5rem; text-transform:lowercase;">
                            moderators@tods.community
                        </a>
                        <p>Please use a relevant subject line when reaching out.</p>
                    </div>
                </div>
            </section>
        `;

        // Route: WHAT WE DO
    } else if (hash === '#/what-we-do') {
        root.innerHTML = `
            <section class="features-section" style="min-height:80vh;">
                <div class="container">
                    <h1 class="section-title">WHAT WE DO</h1>
                    <div class="feature-card bg-highlight" style="margin-bottom: 2rem;">
                        <h2>R&D in Cybersecurity</h2>
                        <p style="font-size: 1.3rem; line-height: 1.6; margin-top: 1rem;">
                            We are intensely focusing on Research & Development in the cybersecurity space. 
                            Our goal is to gather the spark in techies and students, encouraging individuals 
                            to work together as a unified team to bring about tangible, innovative outcomes.
                        </p>
                    </div>
                    <div class="grid-2">
                        <div class="feature-card" style="background-color: #fff5f5;">
                            <h3>Collaboration</h3>
                            <p>Bringing together diverse minds to tackle complex security challenges.</p>
                        </div>
                        <div class="feature-card" style="background-color: #f5f5ff;">
                            <h3>Innovation</h3>
                            <p>Transforming ideas into actionable tools, research papers, and defenses.</p>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Route: SUPPORTERS
    } else if (hash === '#/about/supporters') {
        root.innerHTML = `
            <section class="features-section" style="min-height:80vh;">
                <div class="container">
                    <h1 class="section-title" style="margin-bottom: 2rem;">OUR SUPPORTERS</h1>
                    <div class="feature-card" style="text-align: center; max-width: 800px; margin: 0 auto; background-color: var(--clr-accent-2);">
                        <h2 style="margin-bottom: 1rem;">You would be the first kind to support us!</h2>
                        <p style="font-size: 1.2rem; margin-bottom: 2rem;">
                            We deeply appreciate your interest in supporting our community.
                        </p>
                        <a href="#/donate" class="btn btn-primary">Navigate to Donate Section</a>
                        <p style="margin-top: 1.5rem;">
                            Or email us directly at <a href="mailto:moderators@tods.community?subject=Support TODS Community" style="font-weight:bold; color:black; text-decoration: underline;">moderators@tods.community</a>
                        </p>
                    </div>
                </div>
            </section>
        `;

        // Route: MISSION
    } else if (hash === '#/about/mission') {
        root.innerHTML = `
            <section class="features-section" style="min-height:80vh;">
                <div class="container">
                    <h1 class="section-title" style="margin-bottom: 2rem;">OUR MISSION</h1>
                    
                    <div class="feature-card bg-highlight" style="margin-bottom: 2rem;">
                        <h2 style="font-size: 2rem; margin-bottom: 1rem;">Empowering Telugu Cybersecurity Talent</h2>
                        <p style="font-size: 1.3rem; line-height: 1.6; margin-top: 1rem;">
                            TODS Community exists to unite, uplift, and empower Telugu-speaking cybersecurity professionals 
                            around the world. We believe that security is not just a profession — it is a responsibility. 
                            Our mission is to build a culture of knowledge sharing, mentorship, and hands-on innovation 
                            that produces world-class security practitioners from the Telugu community.
                        </p>
                    </div>
                    
                    <div class="grid-3" style="margin-bottom: 2rem;">
                        <div class="feature-card" style="background-color: #fff5f5; border-left: 6px solid var(--clr-red);">
                            <h3 style="color: var(--clr-red);">🔴 OFFENSIVE</h3>
                            <p>Penetration testing, red teaming, vulnerability research, and exploit development. We train the next generation of ethical hackers.</p>
                        </div>
                        <div class="feature-card" style="background-color: #f5f5ff; border-left: 6px solid var(--clr-blue);">
                            <h3 style="color: var(--clr-blue);">🔵 DEFENSIVE</h3>
                            <p>SOC operations, incident response, threat hunting, and security architecture. Building resilient systems and defenders.</p>
                        </div>
                        <div class="feature-card" style="background-color: #fdf5ff; border-left: 6px solid var(--clr-purple);">
                            <h3 style="color: var(--clr-purple);">🟣 PURPLE TEAM</h3>
                            <p>Bridging offense and defense. Collaborative security testing, adversary simulation, and continuous improvement.</p>
                        </div>
                    </div>
                    
                    <div class="feature-card" style="background-color: #FFFBF0; border: 3px solid #D4AF37; box-shadow: 4px 4px 0px #D4AF37;">
                        <h3 style="color: #B8860B; font-size: 1.5rem; margin-bottom: 1rem;">🎯 Our Vision</h3>
                        <p style="font-size: 1.1rem; line-height: 1.7;">
                            To establish the strongest Telugu cybersecurity network globally — connecting professionals, 
                            students, and enthusiasts through regular meetups, workshops, capture-the-flag competitions, 
                            and mentorship programs. We aim to be the launchpad that transforms passionate learners 
                            into industry-leading security experts.
                        </p>
                    </div>
                </div>
            </section>
        `;

        // Route: ABOUT (Landing Page)
    } else if (hash === '#/about') {
        root.innerHTML = `
            <section class="features-section" style="min-height:80vh;">
                <div class="container">
                    <h1 class="section-title" style="margin-bottom: 2rem;">ABOUT TODS</h1>
                    <p style="font-size: 1.2rem; margin-bottom: 3rem; max-width: 700px;">
                        The Telugu Offensive & Defensive Security community — uniting cybersecurity professionals, 
                        researchers, and enthusiasts from the Telugu-speaking world.
                    </p>
                    
                    <div class="grid-3">
                        <a href="#/about/team" class="feature-card" style="text-decoration: none; cursor: pointer; background-color: #ffffff; border: 3px solid #000; box-shadow: 4px 4px 0px var(--clr-purple);">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">👥</div>
                            <h3>OUR TEAM</h3>
                            <p>Meet the core team driving the TODS community forward.</p>
                            <span style="font-weight: 800; color: var(--clr-purple); margin-top: auto;">VIEW TEAM →</span>
                        </a>
                        <a href="#/about/mission" class="feature-card" style="text-decoration: none; cursor: pointer; background-color: #ffffff; border: 3px solid #000; box-shadow: 4px 4px 0px var(--clr-red);">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">🎯</div>
                            <h3>OUR MISSION</h3>
                            <p>Our purpose, values, and what drives us in cybersecurity.</p>
                            <span style="font-weight: 800; color: var(--clr-red); margin-top: auto;">VIEW MISSION →</span>
                        </a>
                        <a href="#/about/supporters" class="feature-card" style="text-decoration: none; cursor: pointer; background-color: #ffffff; border: 3px solid #000; box-shadow: 4px 4px 0px var(--clr-blue);">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">🤝</div>
                            <h3>SUPPORTERS</h3>
                            <p>Those who believe in and support our community mission.</p>
                            <span style="font-weight: 800; color: var(--clr-blue); margin-top: auto;">VIEW SUPPORTERS →</span>
                        </a>
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
