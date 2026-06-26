# BazUp Media

> **We Grow Your Business** — 100% organic social media growth for local businesses.

A clean, fast, fully static agency landing site built with Vanilla HTML, CSS, and JavaScript. No frameworks. No build step. Deploys anywhere.

---

## Live Preview

<!-- Replace with your actual deployment URL -->
🌐 **[bazupmedia.com](https://bazupmedia.com)**

---

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Hero, stats, services overview, social proof |
| `services.html` | Full service breakdown and pricing |
| `portfolio.html` | Client results and case studies |
| `contact.html` | Contact form + WhatsApp CTA |

---

## Tech Stack

| Layer | Tech |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (custom properties, flexbox, grid) |
| Scripting | Vanilla JavaScript (ES6+, IIFE module pattern) |
| Fonts | Plus Jakarta Sans + Inter (Google Fonts) |
| Form backend | [Web3Forms](https://web3forms.com) (free tier) |
| Hosting | GitHub Pages / Netlify / any static host |

---

## Project Structure

```
BazUp-Media/
├── index.html          # Home page
├── services.html       # Services page
├── portfolio.html      # Portfolio page
├── contact.html        # Contact page
├── favicon.svg         # Favicon (SVG, all modern browsers)
├── favicon.ico         # Favicon fallback (legacy browsers)
├── og-image.png        # Social share preview image (1200×630)
├── robots.txt          # Crawl rules
├── sitemap.xml         # XML sitemap for search engines
├── css/
│   └── style.css       # Full design system — variables, layout, components
└── js/
    └── main.js         # Nav, mobile menu, logo uploader, contact form, animations
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

## Contact Form Setup

The contact form uses **Web3Forms** — free, no server required.

1. Sign up at [web3forms.com](https://web3forms.com) and create a new form.
2. Copy your **Access Key**.
3. Open `contact.html` and find:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
   ```
4. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your real key.
5. Done. Form submissions go directly to your email.

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

- [ ] Update all `canonical` URLs in the 4 HTML files
- [ ] Update `og:url` in the OG meta blocks
- [ ] Update `Sitemap:` URL in `robots.txt`
- [ ] Update all `<loc>` URLs in `sitemap.xml`
- [ ] Submit `sitemap.xml` to [Google Search Console](https://search.google.com/search-console)

---

## SEO

- Semantic HTML5 structure (`<main>`, `<section>`, `<nav>`, `<footer>`)
- Unique `<title>` and `<meta name="description">` on every page
- Absolute canonical URLs per page
- Open Graph + Twitter Card meta on all pages
- `robots.txt` with sitemap reference
- `sitemap.xml` with all 4 pages and priority weights
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

## WhatsApp CTA

The WhatsApp number is hardcoded in multiple places as `wa.me/923270880908`. To change it, search the project for `923270880908` and replace all instances.

---

## Logo Uploader

The nav includes a client-facing logo uploader (click the eagle icon). It:
- Accepts PNG, JPG, SVG, WEBP
- Persists the logo in `localStorage` across sessions
- Rejects files over ~150KB to avoid storage quota issues
- Reverts to the default eagle SVG if no logo is uploaded

This is a demo/handover feature. Remove it before going live if not needed.

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

## Contributing

This is a client project. PRs are not expected, but if you fork it:

1. Fork the repo
2. Create a feature branch: `git checkout -b fix/your-fix-name`
3. Commit with clear messages: `git commit -m "fix: contact form error state"`
4. Push and open a PR against `main`

---

## License

Private client project. All rights reserved.

---

## Author

**Mustafa Shah**
Freelance Web Developer — [Fiverr](https://fiverr.com) · [GitHub](https://github.com/mustafa-shah-tech)

Built with clean code and zero dependencies.
