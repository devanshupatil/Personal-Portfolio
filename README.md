# Devanshu Patil — Personal Portfolio

Modern, responsive, and animated **personal portfolio website** built with **HTML, CSS, and Vanilla JavaScript**.

<p align="center">
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img alt="HTML" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img alt="CSS" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000" /></a>
  <a href="https://www.emailjs.com/"><img alt="EmailJS" src="https://img.shields.io/badge/EmailJS-0A0E27?style=for-the-badge&logo=gmail&logoColor=white" /></a>
</p>

---

## Preview

> Tip: add a screenshot/gif of your deployed site here.

![Profile](./closeup.jpeg)

---

## Features

- **Hero section** with animated background and tech **typing effect**
- **Custom cursor** (auto-disabled on mobile)
- Sticky **navbar** with active-section highlighting
- Smooth **in-page scrolling**
- Mobile-friendly **hamburger menu**
- Scroll-based **section reveal animations**
- Projects grid with hover overlays + external links
- **Back-to-top** floating button
- **Contact form** with validation + **EmailJS** client-side email sending
- Fully **responsive** layout (desktop → tablet → mobile)

---

## Tech Stack

- **HTML5**
- **CSS3** (CSS variables, glassmorphism, responsive media queries)
- **JavaScript (ES6+)**
- **EmailJS** (contact form email delivery)
- **Google Fonts** (Outfit, Space Mono)

---

## Project Structure

```text
.
├── index.html
├── style.css
├── script.js
├── closeup.jpeg
├── full_pic.jpeg
├── icons/
└── projectThumbnail/
```

---

## Getting Started (Local)

Because this is a static site, you can run it with any simple local server.

### Option A — Open directly

Open `index.html` in your browser.

### Option B — Run a local server (recommended)

#### Using Python

```bash
python3 -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

#### Using Node

```bash
npx serve .
```

---

## Configuration

### 1) Update the portfolio content

Edit **`index.html`** to customize:

- Name, tagline, about text
- Skills/technologies
- Project cards (links, descriptions, thumbnails)
- Social/contact links (LinkedIn, GitHub, email, phone, Instagram)

### 2) Update theme / styling

Edit **`style.css`** and tweak the CSS variables under `:root`:

- `--bg-primary`, `--bg-secondary`
- `--accent-primary`, `--accent-secondary`
- Gradients, spacing, border radius, etc.

### 3) Typing effect words

Edit **`script.js`** → `initTypingEffect()`:

```js
const technologies = [
  'JavaScript',
  'React',
  'Node.js',
  'Spring Boot',
  'PostgreSQL',
  'Docker',
  'Cloud',
  'APIs',
  'AI Integration'
];
```

---

## Contact Form (EmailJS)

This project uses **EmailJS** to send contact messages from the browser.

### Where to change keys/IDs

**`index.html`** (public key):

```html
emailjs.init('YOUR_PUBLIC_KEY');
```

**`script.js`** (service + template IDs):

```js
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
```

### Expected template params

```js
const templateParams = {
  from_name: name,
  reply_to: email,
  message: message,
};
```

---

## Deployment

You can deploy this site on any static hosting provider:

- **GitHub Pages**
- **Netlify**
- **Vercel**

On Netlify/Vercel, the build settings are typically:

- **Build command:** *(none)*
- **Output directory:** *(root)*

---

## Credits

Designed & built by **Devanshu Patil**.

If you fork this repo, please consider giving credit by linking back to this repository.
