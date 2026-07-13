# BazUp Media

> **We Grow Your Business** — Organic social media growth and paid ads for local businesses. Real followers, real engagement, real results.

A clean, fast, fully static agency landing site built with Vanilla HTML, CSS, and JavaScript. No frameworks. No build step. Deploys anywhere.

---

## Live Preview

🌐 **[bazupmedia.online](https://bazupmedia.online)**

---

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Hero, platform trust strip, services overview, social proof |
| `about.html` | About the agency and mission |
| `services.html` | Full service tier breakdown and pricing |
| `portfolio.html` | Client results and case studies |
| `contact.html` | Contact form + WhatsApp CTA |

---

## Tech Stack

| Layer | Tech |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (custom properties, flexbox, grid, CSS transitions) |
| Scripting | Vanilla JavaScript (ES6+, IIFE module pattern) |
| Fonts | Plus Jakarta Sans + Inter (Google Fonts) |
| Form backend | Custom WhatsApp Redirect (No API required) |
| Hosting | GitHub Pages / Netlify / any static host |

---

## Project Structure

```
BazUp-Media/
├── index.html          # Home page
├── about.html          # About page
├── services.html       # Services page
├── portfolio.html      # Portfolio page
├── contact.html        # Contact page
├── robots.txt          # Crawl rules
├── sitemap.xml         # XML sitemap for search engines
├── assets/             # Images and static assets
├── css/
│   └── style.css       # Full design system — variables, layout, components
└── js/
    └── main.js         # Nav scroll, mobile menu, contact form, scroll animations
```

---

## Design System

All visual tokens are defined as CSS custom properties in `css/style.css`:

```css
--bg:        #FAF7F0   /* Ivory background */
--navy:      #0a1628   /* Primary text / dark surfaces */
--gold:      #d4b100   /* Brand accent */
--font-head: 'Plus Jakarta Sans'
--font-body: 'Inter'
```

To retheme the site, update only the `:root` block — everything cascades automatically.

---

## Navigation Features

The navbar (`js/main.js → initNavScroll()`) includes three scroll-driven behaviors:

| Behaviour | Trigger |
|---|---|
| **Shadow** | Appears when `scrollY > 20px` |
| **Compact** (56px height) | Activates when `scrollY > 80px` |
| **Hide on scroll down** | Kicks in after `scrollY > 120px`, hides with `translateY(-100%)` |
| **Reappear on scroll up** | Smooth slide-down on any upward scroll |

Uses `requestAnimationFrame` throttling to prevent jitter. A `±4px` delta deadzone stops micro-scroll flickering. If the mobile menu is open, the nav **cannot** hide.

---

## Mobile Menu

Full-screen overlay — slides in from the right edge on hamburger tap.

- **Background:** Navy (`#0a1628`)
- **Animation:** `translateX(100%) → translateX(0)` in 0.38s with `cubic-bezier(0.4, 0, 0.2, 1)`
- **Links:** 2rem, ivory, gold + indent on hover/active
- **Hamburger icon:** Turns white when overlay is open (`z-index: 1001` above overlay)
- **CTA buttons:** Book Free Consultation + Chat on WhatsApp
- **Social strip:** Instagram, TikTok, Facebook, LinkedIn icons at the bottom, muted ivory → gold on hover

---

## Social Media Handles

| Platform | Handle / URL |
|---|---|
| Instagram | [@bazupmedia1](https://instagram.com/bazupmedia1) |
| TikTok | [@bazupmedia1](https://tiktok.com/@bazupmedia1) |
| Facebook | [bazupmedia](https://facebook.com/bazupmedia) |
| LinkedIn | [bazupmedia](https://linkedin.com/company/bazupmedia) |

---

## Contact

| Channel | Details |
|---|---|
| WhatsApp | [+92 327 088 0908](https://wa.me/923270880908) |
| Instagram DM | [@bazupmedia1](https://instagram.com/bazupmedia1) |
| Email | bazupmedia@gmail.com |

WhatsApp number is stored as `923270880908` across all five HTML files and `js/main.js`. To update it, search the project for `923270880908` and replace all instances.

---

## Contact Form Setup

The contact form is purely frontend. It collects all field values (Name, Email, Platforms, Message) and redirects the user directly to a pre-filled WhatsApp conversation using the `wa.me` API. No backend, keys, or third-party form services are required.

---

## Deployment

### GitHub Pages

1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Set source to `main` branch, root folder.
4. Your site is live at `https://<your-username>.github.io/BazUp-Media/`.

### Netlify (recommended for custom domain)

1. Drag and drop the repo folder into [netlify.com/drop](https://app.netlify.com/drop).
2. Or connect your GitHub repo for automatic deploys on push.
3. Add your custom domain in **Site Settings → Domain Management**.

### Custom Domain Checklist

After pointing your domain:

- [x] Update all `canonical` URLs in the 5 HTML files
- [x] Update `og:url` in the OG meta blocks
- [x] Update `Sitemap:` URL in `robots.txt`
- [x] Update all `<loc>` URLs in `sitemap.xml`
- [ ] Submit `sitemap.xml` to [Google Search Console](https://search.google.com/search-console)

---

## SEO

- Semantic HTML5 structure (`<main>`, `<section>`, `<nav>`, `<footer>`)
- Unique `<title>` and `<meta name="description">` on every page
- Absolute canonical URLs per page
- Open Graph + Twitter Card meta on all pages
- `robots.txt` with sitemap reference
- `sitemap.xml` with all 5 pages and priority weights
- No render-blocking scripts (`main.js` loads at end of body)

---

## Browser Support

Tested and functional in:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Chrome / Safari (iOS + Android)

IE is not supported (and it's dead — so that's fine).

---

## Local Development

No build step needed. Just open in browser:

```bash
# Option 1 — Python (built-in)
python -m http.server 8080

# Option 2 — Node
npx serve .

# Option 3 — VS Code
# Install "Live Server" extension, right-click index.html → Open with Live Server
```

---

## Pricing Policy

Pricing is displayed transparently on the `services.html` page. Tiers include Starter, Standard, and Premium, reflecting a mix of organic growth and paid ad services.

---

## License

Private client project. All rights reserved.

---

## Author

**Mustafa Shah**
Freelance Web Developer — [Fiverr](https://fiverr.com) · [GitHub](https://github.com/mustafa-shah-tech)

Built with clean code and zero dependencies.
