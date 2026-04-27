const fs = require('fs');
const path = require('path');
const { fetchEvents } = require('./fetch_notion.js');

const dir = path.join(__dirname);

const head = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Social Orbit | Your Third Space</title>
    <!-- SEO meta tags -->
    <meta name="description" content="Social Orbit — a Gen Z social society based in Lahore, Pakistan. Your third space to meet real people.">
    <!-- Preload Critical Assets -->
    <link rel="preload" href="Orbit Logo - Purple.png" as="image">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest" defer></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- ── Scroll-Driven Orbit Background ── -->
    <svg id="orbit-bg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer ring -->
      <ellipse id="orbit-ring-1" cx="720" cy="450" rx="650" ry="310"
               stroke="#f0a500" stroke-width="1.2" opacity="0.18" />
      <!-- Middle ring -->
      <ellipse id="orbit-ring-2" cx="720" cy="450" rx="460" ry="210"
               stroke="#c45c13" stroke-width="0.9" opacity="0.15" />
      <!-- Inner ring -->
      <ellipse id="orbit-ring-3" cx="720" cy="450" rx="270" ry="118"
               stroke="#f0a500" stroke-width="0.7" opacity="0.12" />
      <!-- Planet dot (travels outer ring) -->
      <circle id="orbit-planet" cx="0" cy="0" r="5"
              fill="#f0a500" opacity="0.55" filter="url(#planet-glow)" />
      <defs>
        <filter id="planet-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
    </svg>

    <div id="noise-overlay"></div>
`;

const nav = `
    <nav id="navbar">
        <div class="nav-container">
            <a href="index.html" class="logo">
                <img src="Orbit Logo - Purple.png" alt="Social Orbit Logo" class="nav-logo-img">
                Social Orbit
            </a>
            <div class="nav-links desktop-only">
                <a href="index.html">Home</a>
                <a href="about.html">About</a>
                <a href="events.html">Events</a>
                <a href="the-orbit-way.html">The Orbit Way</a>
                <a href="join.html">Join</a>
            </div>
            <div class="nav-right desktop-only">
                <a href="events.html" class="btn btn-pill">grab a spot</a>
            </div>
            <button class="hamburger mobile-only">
                <i data-lucide="menu"></i>
            </button>
        </div>
    </nav>

    <div class="mobile-menu">
        <button class="close-menu"><i data-lucide="x"></i></button>
        <div class="mobile-nav-links">
            <a href="index.html">Home</a>
            <a href="about.html">About</a>
            <a href="events.html">Events</a>
            <a href="the-orbit-way.html">The Orbit Way</a>
            <a href="join.html">Join</a>
        </div>
    </div>
    <main>
`;

const footer = `
    </main>
    <footer class="site-footer">
        <div class="container text-center">
            <a href="index.html" style="display:inline-block; margin-bottom: 16px;">
                <img src="Orbit Logo - Purple.png" alt="Social Orbit Logo" class="footer-logo-img">
            </a>
            <h2 class="footer-logo mb-4" style="font-family: var(--font-heading); color: var(--primary-start); font-size: 32px; letter-spacing: 2px;">SOCIAL ORBIT</h2>
            <div class="accent-text mb-6">// lahore, pk</div>
            <div class="footer-links mb-8">
                <a href="https://www.instagram.com/socialorbit.lhr/" target="_blank" rel="noopener noreferrer"><i data-lucide="instagram"></i></a>
                <a href="index.html">Home</a>
                <a href="about.html">About</a>
                <a href="events.html">Events</a>
                <a href="the-orbit-way.html">The Orbit Way</a>
            </div>
            <div class="accent-text" style="font-size: 11px;">© social orbit 2025. all rights reserved.</div>
        </div>
    </footer>
    <script src="scripts.js" defer></script>
</body>
</html>
`;

function wrap(content) {
    return head + nav + content + footer;
}

const aboutHtml = `
        <section id="about" class="page-section active" style="display: block; opacity: 1; padding-top: 80px;">
            <div class="container small-container padding-y">
                <h1 class="animate-up">LAHORE'S SOCIAL SCENE NEEDED AN INTERVENTION.</h1>
                <p class="muted-text text-lg animate-up mt-8" style="text-transform:lowercase">
                    every place in the city is either a loud restaurant where you can't hear yourself think, a stiff networking event filled with linkedin humble-brags, or a wedding you didn't want to attend. we were tired of having nowhere to just exist and meet real people.
                </p>
                
                <div class="founder-note animate-up">
                    <span class="accent-text">// why we started</span>
                    <p class="pull-quote">
                        "i built social orbit because i realized my screen time was up 40% and i hadn't made a new friend in two years. we needed a space that asked nothing of us except to show up."
                    </p>
                </div>
                
                <div class="what-is block animate-up mb-12">
                    <span class="accent-text">// the third space</span>
                    <p style="text-transform:lowercase">it's not home, it's not work. it's the space in between. a curated room where the friction of meeting strangers is removed, leaving just good conversation.</p>
                </div>
                
                <div class="what-not block animate-up mb-12">
                    <span class="accent-text">// let's be clear</span>
                    <ul class="strike-list">
                        <li>a networking event</li>
                        <li>a therapy session</li>
                        <li>a brand activation</li>
                        <li>another lahore "social club"</li>
                    </ul>
                    <p class="mt-4" style="text-transform:lowercase">just people. coffee. and something to do with your hands.</p>
                </div>
                
                <div class="founders-block animate-up mt-16 flex items-center gap-4">
                    <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, var(--primary-start), var(--primary-end)); display:flex; justify-content:center; align-items:center;">
                        <i data-lucide="user" style="color:var(--bg)"></i>
                    </div>
                    <div class="founder-info">
                        <strong style="font-size: 20px;">[Founder Name]</strong>
                        <p class="muted-text" style="text-transform:lowercase; margin:0;">[professional overthinker and coffee enthusiast]</p>
                    </div>
                </div>
            </div>
        </section>
`;

const orbitWayHtml = `
        <section id="the-orbit-way" class="page-section full-height active" style="display: block; opacity: 1; padding-top: 80px;">
            <div class="container padding-y">
                <h1 class="animate-up" style="font-size: 64px;">THE ORBIT WAY</h1>
                <p class="italic muted-text animate-up mb-12 text-lg">a few things we believe in.</p>
                
                <div class="belief-list">
                    <div class="belief-item animate-left">
                        <span class="number">01</span>
                        <p>phones stay in pockets during the orbit.</p>
                    </div>
                    <div class="belief-item animate-left">
                        <span class="number">02</span>
                        <p>no one gets left standing alone.</p>
                    </div>
                    <div class="belief-item animate-left">
                        <span class="number">03</span>
                        <p>ugly art is better than no art.</p>
                    </div>
                    <div class="belief-item animate-left">
                        <span class="number">04</span>
                        <p>your social battery sticker is a contract. we respect it.</p>
                    </div>
                    <div class="belief-item animate-left">
                        <span class="number">05</span>
                        <p>this is not content. please don't make it content.</p>
                    </div>
                    <div class="belief-item animate-left">
                        <span class="number">06</span>
                        <p>you don't have to be "on." just be here.</p>
                    </div>
                    <div class="belief-item animate-left">
                        <span class="number">07</span>
                        <p>the wind-down is part of the event. don't rush out.</p>
                    </div>
                    <div class="belief-item animate-left">
                        <span class="number">08</span>
                        <p>if you come once, you're already one of us.</p>
                    </div>
                </div>
                
                <div class="mt-16 animate-up">
                    <span class="accent-text">// orbit.lahore</span>
                </div>
            </div>
        </section>
`;

const joinHtml = `
        <section id="join" class="page-section active" style="display: block; opacity: 1; padding-top: 80px;">
            <div class="container padding-y small-container">
                <h1 class="animate-up">STAY IN ORBIT</h1>
                <p class="muted-text mb-8 animate-up" style="text-transform:lowercase">drop your details. you'll hear about events before anyone else. no spam. ever.</p>
                
                <div id="join-form-container" class="animate-up">
                    <script>var joinSubmitted=false;</script>
                    <iframe name="hidden_iframe" id="hidden_iframe" style="display:none;" onload="if(joinSubmitted) { document.getElementById('join-form-container').innerHTML = '<div class=\\'success-message animate-up\\'><h2>you\\'re in orbit now.</h2><p style=\\'text-transform:lowercase\\'>we\\'ll be in touch.</p></div>'; }"></iframe>
                    
                    <form action="YOUR_GOOGLE_FORM_ACTION_URL" method="POST" target="hidden_iframe" class="join-form" onsubmit="joinSubmitted=true;">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" name="entry.NAME_ID" placeholder="your name" required>
                        </div>
                        <div class="form-group">
                            <label>Age</label>
                            <input type="number" name="entry.AGE_ID" placeholder="22" required>
                        </div>
                        <div class="form-group">
                            <label>Instagram Handle</label>
                            <div class="input-with-prefix">
                                <span>@</span>
                                <input type="text" name="entry.INSTA_ID" placeholder="username" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" name="entry.EMAIL_ID" placeholder="you@example.com" required>
                        </div>
                        <div class="form-group">
                            <label>what are you looking for?</label>
                            <select name="entry.LOOKING_FOR_ID" required>
                                <option value="" disabled selected>select an option</option>
                                <option value="friends">make new friends</option>
                                <option value="escape">escape the routine</option>
                                <option value="curious">just curious</option>
                                <option value="all">all of the above</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary w-full mt-4">i'm in →</button>
                    </form>
                </div>
                
                <div class="mt-12 text-center animate-up">
                    <a href="https://www.instagram.com/socialorbit.lhr/" target="_blank" rel="noopener noreferrer" class="btn btn-pill inline-flex items-center gap-2">
                        <i data-lucide="instagram" style="width:16px; height:16px;"></i> @socialorbit.lhr
                    </a>
                </div>
            </div>
        </section>
`;

function generateEventCardHtml(event) {
    const isSoldOut = event.status && event.status.toUpperCase() === 'SOLD OUT';
    const statusClass = isSoldOut ? 'status-sold' : 'status-open';
    const badgeStyle = isSoldOut ? 'style="background: rgba(231, 76, 60, 0.15); color: #e74c3c; border-color: #e74c3c;"' : '';
    
    return `
                    <div class="event-card" onclick="window.location.href='${event.id}.html'">
                        <div class="event-badges">
                            <span class="badge price" ${badgeStyle}>${event.price}</span>
                            <span class="badge ${statusClass}">${event.status}</span>
                        </div>
                        <h2>${event.name}</h2>
                        <p class="event-meta"><i data-lucide="calendar"></i> ${event.date}</p>
                        <p class="event-meta"><i data-lucide="map-pin"></i> ${event.location}</p>
                        <button class="btn btn-primary mt-4">see details →</button>
                    </div>`;
}

function generateHomeHtml(events) {
    // Take only first event for home preview
    const previewEvent = events.length > 0 ? events[0] : null;
    const previewHtml = previewEvent ? generateEventCardHtml(previewEvent) : '<p class="muted-text">No upcoming events.</p>';

    return `
        <section id="home" class="page-section active" style="display: block; opacity: 1; padding-top: 80px;">
            <div class="hero container full-height">
                <div class="hero-glow-blob"></div>
                <div class="parallax-layer" data-speed="-0.1">
                    <div class="interactive-logo-container animate-up" style="transition-delay: 0.1s">
                        <h1 class="interactive-logo">SOCIAL ORBIT</h1>
                    </div>
                </div>
                <div class="parallax-layer" data-speed="-0.25">
                    <span class="tagline accent-text animate-up" style="transition-delay: 0.2s">your third space</span>
                </div>
                <div class="parallax-layer" data-speed="-0.4">
                    <h1 class="hero-title animate-up" style="transition-delay: 0.3s">
                        <span class="blur-word">LAHORE</span>
                        <span class="blur-word">HAS</span>
                        <span class="blur-word">ENOUGH</span>
                        <span class="blur-word">GROUP</span>
                        <span class="blur-word">CHATS.</span>
                    </h1>
                </div>
                <div class="parallax-layer" data-speed="-0.4">
                    <p class="hero-subline animate-up" style="transition-delay: 0.4s">come outside.</p>
                </div>
                <div class="parallax-layer" data-speed="-0.3">
                    <div class="animate-up" style="transition-delay: 0.5s">
                        <a href="join.html" class="btn btn-primary">grab your spot →</a>
                    </div>
                </div>
                <div class="parallax-layer" data-speed="-0.2">
                    <div class="scroll-indicator-wrap animate-up" style="transition-delay: 0.6s">
                        <div class="scroll-ripple"></div>
                        <div class="scroll-ripple"></div>
                        <div class="scroll-ripple"></div>
                        <div class="scroll-indicator">
                            <i data-lucide="chevron-down"></i>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="teaser-cards container stagger-children">
                <div class="card">
                    <span class="accent-text">// who we are</span>
                    <p>a social society for the chronically online who secretly want to touch grass</p>
                </div>
                <div class="card">
                    <span class="accent-text">// what we do</span>
                    <p>structured chaos. icebreakers that don't feel like icebreakers. real conversations.</p>
                </div>
                <div class="card">
                    <span class="accent-text">// where</span>
                    <p>gulberg, lahore. small rooms. good coffee. no agenda.</p>
                </div>
            </div>
            
            <div class="events-preview container mt-16">
                <h2 class="animate-up mb-8">NEXT ORBIT</h2>
                <div class="animate-scale">
                    ${previewHtml}
                </div>
            </div>
            
            <div class="vibe-reel animate-up">
                <div class="vibe-block" style="background: linear-gradient(135deg, #7B2FBE, #1a0a2e);"><h2>REAL.</h2></div>
                <div class="vibe-block" style="background: linear-gradient(135deg, #c45c13, #f0a500);"><h2>LOUD.</h2></div>
                <div class="vibe-block" style="background: linear-gradient(135deg, #2a1245, #7B2FBE);"><h2>MESSY.</h2></div>
                <div class="vibe-block" style="background: linear-gradient(135deg, #f0a500, #c45c13);"><h2>WARM.</h2></div>
                <div class="vibe-block" style="background: linear-gradient(135deg, #1a0a2e, #2a1245);"><h2>OFFLINE.</h2></div>
                <div class="vibe-block" style="background: linear-gradient(135deg, #7B2FBE, #c45c13);"><h2>YOURS.</h2></div>
            </div>
            
            <div class="container pb-16">
                <div class="final-cta animate-up">
                    <h2>stay in orbit.</h2>
                    <a href="join.html" class="btn btn-dark">join the list</a>
                </div>
            </div>
        </section>
`;
}

function generateEventsPageHtml(events) {
    let gridHtml = '';
    events.forEach(event => {
        gridHtml += generateEventCardHtml(event);
    });

    return `
        <section id="events" class="page-section active" style="display: block; opacity: 1; padding-top: 80px;">
            <div class="container padding-y">
                <h1 class="animate-up">ORBITS</h1>
                <span class="accent-text animate-up">// what's happening</span>
                
                <div class="events-grid mt-8 stagger-scale-children">
${gridHtml}
                </div>
            </div>
        </section>
`;
}

function generateSingleEventHtml(event) {
    const isSoldOut = event.status && event.status.toUpperCase() === 'SOLD OUT';
    const badgeStyle = isSoldOut ? 'style="background: rgba(231, 76, 60, 0.15); color: #e74c3c; border-color: #e74c3c;"' : '';
    
    let timelineHtml = '';
    if (event.timeline && event.timeline.length > 0) {
        timelineHtml = `<h3 class="mb-4">the flow</h3>
                    <ul class="timeline mb-12">`;
        event.timeline.forEach(item => {
            timelineHtml += `\n                        <li class="animate-up"><span class="accent-text">${item.time}</span><p style="text-transform:lowercase">${item.desc}</p></li>`;
        });
        timelineHtml += `\n                    </ul>`;
    }

    return `
        <section id="event-details" class="page-section active" style="display: block; opacity: 1; padding-top: 80px;">
            <div class="container padding-y small-container">
                <a href="events.html" class="btn-text mb-8 inline-flex items-center gap-2">
                    <i data-lucide="arrow-left" style="width:16px; height:16px;"></i> back to orbits
                </a>
                <div id="event-content" class="animate-up">
                    <h1 class="mb-4">${event.name}</h1>
                    <div class="flex gap-4 mb-8">
                        <span class="badge price" ${badgeStyle}>${event.price}</span>
                        <span class="muted-text inline-flex items-center gap-2"><i data-lucide="calendar"></i> ${event.date}</span>
                        <span class="muted-text inline-flex items-center gap-2"><i data-lucide="map-pin"></i> ${event.location}</span>
                    </div>
                    <p class="text-lg mb-8" style="text-transform:lowercase">${event.description}</p>
                    
                    ${timelineHtml}
                    
                    <h3 class="mb-4">secure your spot</h3>
                    <div class="animate-up">
                        <iframe src="${event.link}" class="form-iframe" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                    </div>
                </div>
            </div>
        </section>
`;
}

async function buildPages() {
    console.log("Starting build process...");
    
    // Fetch data
    const events = await fetchEvents();
    
    // Generate static pages
    fs.writeFileSync(path.join(dir, 'index.html'), wrap(generateHomeHtml(events)));
    fs.writeFileSync(path.join(dir, 'about.html'), wrap(aboutHtml));
    fs.writeFileSync(path.join(dir, 'events.html'), wrap(generateEventsPageHtml(events)));
    fs.writeFileSync(path.join(dir, 'the-orbit-way.html'), wrap(orbitWayHtml));
    fs.writeFileSync(path.join(dir, 'join.html'), wrap(joinHtml));
    
    // Generate individual event pages
    events.forEach(event => {
        fs.writeFileSync(path.join(dir, `${event.id}.html`), wrap(generateSingleEventHtml(event)));
    });

    console.log("Pages generated successfully.");
}

buildPages();
