# Documentation — Devanshu Patil Personal Portfolio

This document briefly explains **what this portfolio website includes**, **which technologies are used**, and **notable challenges/decisions** made during development.

> Repo: `Personal-Portfolio` (static site)

---

## Features

### UI / UX
- **Hero section** with animated background layers (gradient / particles / grid overlay)
- **Typing effect** that rotates through technologies in the hero area
- **Custom cursor + follower** with hover states on interactive elements (auto-hidden on small screens)
- Sticky **navbar** that changes style on scroll + **active section highlighting**
- **Smooth in-page scrolling** with navbar height offset
- Mobile-friendly **hamburger navigation** (closes on link click/outside click)
- **Section reveal animations** using `IntersectionObserver`
- **Skill cards** with animated progress bars on viewport entry
- **Projects grid** with hover overlay + external links
- **Back-to-top** button (appears after scrolling)
- **Contact form** with client-side validation + success state

### Contact / Messaging
- Contact form sends email via **EmailJS** directly from the browser (no backend)
  - Includes input validation, disabled state while sending, and error handling

---

## Technologies Used

### Core
- **HTML5** — semantic layout for sections: Home, About, Skills, Projects, Achievements, Contact
- **CSS3** — responsive styling, animations, effects (including glassmorphism-like UI)
- **Vanilla JavaScript (ES6+)** — UI interactions, animations, form validation

### Third-party
- **EmailJS Browser SDK** (loaded via CDN) — client-side email delivery
- **Google Fonts** — Outfit + Space Mono

---

## Implementation Notes (Where things live)

- **Layout / content**: `index.html`
- **Styling**: `style.css`
- **Interactions & animation logic**: `script.js`
- **Assets**:
  - profile images: `closeup.jpeg`, `full_pic.jpeg`
  - skill icons: `icons/`
  - project thumbnails: `projectThumbnail/`

---

## Challenges Faced (and how they were handled)

### 1) Cursor effects vs. mobile usability
Custom cursors feel great on desktop, but can be distracting or buggy on touch devices.

- **Decision**: hide the custom cursor on small screens (`<= 768px`) and restore default cursor behavior.
- **Where**: `script.js` (mobile detection block near the bottom)

### 2) Scroll-driven UI without hurting performance
Scroll listeners can cause jank if too much work runs every frame.

- **Decision**: use `IntersectionObserver` for reveal/progress animations (efficient, event-driven)
- **Decision**: include `throttle()` / `debounce()` helpers for any future scroll work
- **Where**: `initSectionReveal()`, `initSkillProgress()`, and throttle helper in `script.js`

### 3) Smooth scrolling with a sticky navbar
When using anchor links, sections can end up hidden under a fixed/sticky navbar.

- **Decision**: compute `navbarHeight` and offset the scroll target.
- **Where**: `initSmoothScrolling()` in `script.js`

### 4) EmailJS reliability and user feedback
EmailJS depends on:
- correct public key, service id, template id
- CDN script load order

- **Decision**: guard against missing EmailJS SDK (`typeof emailjs === 'undefined'`)
- **Decision**: show a “Sending…” state and disable the submit button while sending
- **Where**: `initContactForm()` in `script.js` and EmailJS init block in `index.html`

---

## Local Run

Because this is a static site, you can open `index.html` directly or run a simple server:

```bash
python3 -m http.server 5500
```

Then open: `http://localhost:5500`

---

## Deployment

Deploy to any static host (GitHub Pages / Netlify / Vercel). No build step required.
