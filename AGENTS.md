# Personal Website — Agent & Architecture Guidelines (`AGENTS.md`)

This repository contains the single-page personal portfolio for **Ahmed M. Hassan**, hosted statically on **GitHub Pages** (`ahmdmhasn.github.io`). Use the personal knowledge skill below for his preferred title and current biographical facts.

---

## 1. Project Overview & Tech Stack

- **Stack**: Pure Vanilla HTML5, CSS3, and JavaScript (ES6+). Zero external frameworks or build tool dependencies.
- **Hosting**: GitHub Pages static file serving from the root `/` directory.
- **Design Language**: Apple-inspired minimalist aesthetic (clean typography, subtle micro-interactions, dark/light theme tokens).

---

## 2. Paging & Navigation Architecture (Single-Page App)

The application operates as a single-page app (SPA) using HTML native attributes, JavaScript routing, and CSS View Transitions.

### Screen Layout (`index.html` & `_includes/`)
The application source is split into modular partials inside `_includes/` and stitched together using GitHub Pages native Jekyll Liquid includes (`{% include ... %}`):
- `_includes/header.html` — Site header and brand title
- `_includes/home.html` — Beyond The Prompt hero and personal introduction (`#home`)
- `_includes/about.html` — Background, experience, and key focus areas (`#about`)
- `_includes/work.html` — Open-source project carousel (`#work`)
- `_includes/blogs.html` — Blog & writing placeholder section (`#blogs`)
- `_includes/connect.html` — Social links & contact options (`#connect`)
- `_includes/navigation.html` — Bottom app navigation bar

All screens reside inside `<main id="main" class="screens">` as `<section>` elements in the generated static page.
Inactive screens are hidden using the standard HTML5 `hidden` attribute.

### Navigation Controller (`script.js`)
- **`showScreen(screenId)`**: Toggles the `hidden` attribute on `<section class="screen">` elements and sets `aria-current="page"` on the active navigation link.
- **View Transitions**: Screen changes use `document.startViewTransition()` for hardware-accelerated animations.
- **URL Hash Synchronization**: Listens to `click` events on `[data-screen]` elements and `hashchange` window events so direct deep links (`/#work`, `/#about`) and browser Back/Forward work properly.
- **Project Stage Carousel (`updateProject`)**: Manages project card pagination inside the `#work` section.

### App Shell & Styling (`styles.css`)
- **`app-shell`**: CSS Grid container managing the fixed header, screen viewport, and bottom navigation bar.
- **Show/Hide rule**: Standard `[hidden] { display: none !important; }` rule ensuring seamless state toggling.

---

## 3. Guidelines for AI Agents & Developers

When modifying or expanding this codebase, strictly follow these rules:

1. **Maintain Zero Dependencies**: Do not introduce NPM packages, bundlers, or third-party JS libraries unless explicitly requested.
2. **Preserve Single-Page Hash Routing**: Any new screens added must be added as `<section class="screen" id="...">` with a corresponding `data-screen="..."` navigation link.
3. **Accessibility (a11y)**:
   - Always update `aria-current="page"` when navigation state changes.
   - Maintain focus management (`tabindex="-1"` on headers when navigated to).
   - Ensure proper contrast and tap targets for mobile browsers.
4. **CSS Tokens & Layout**:
   - Use CSS variables defined in `:root` inside [`styles.css`](styles.css).
   - Test layout responsiveness across mobile (`min-width: 320px`) and desktop screens.
5. **Site Content**: For any request to write or revise website content, read [`.agents/personal-knowledge/SKILL.md`](.agents/personal-knowledge/SKILL.md) and the standalone [knowledge base](.agents/references/README.md). Add relevant, supported details when they help the requested copy; newer user corrections take precedence.
