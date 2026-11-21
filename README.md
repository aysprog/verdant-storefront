# Verdant & Co. — Accessible E-Commerce Storefront
Arrowstack Frontend Development Internship · Project 1 · plain **HTML + CSS + JavaScript** (no build step, no npm).

## Files (only 4)
| File | Purpose |
|---|---|
| `index.html` | page structure, semantic landmarks, filters, footer |
| `style.css` | design system (tokens, layout, animations, responsive) |
| `script.js` | catalogue data, filtering, cart, product quick view, checkout + validation |
| `README.md` | requirements, decisions, QA evidence, limitations |

## Run
Double-click `index.html`. Preview the error state with `index.html?error`. Run the self-tests with `index.html?selftest` and open the browser console (F12).

## Publish on GitHub Pages
1. Create a repository and upload these 4 files. 2. **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**. 3. Open `https://<username>.github.io/<repo>/` after about a minute.

## Stakeholder, scope, success
- **Primary stakeholder:** online shopper; **secondary:** store owner (conversion, fewer abandoned carts).
- **Decision enabled:** shopper can find, compare and buy a product without friction or accessibility barriers.
- **In scope:** discovery, filters, quick view, cart, validated checkout. **Out of scope:** real payments, accounts, backend.
- **Success metrics:** checkout completable by keyboard only; zero keyboard traps; Lighthouse Accessibility ≥ 95; no horizontal scroll at 360 px.

## Requirements → evidence
| Requirement | Implementation |
|---|---|
| Responsive component system | CSS grid `auto-fill`, `clamp()` type, reusable card/modal/drawer templates in `script.js` |
| Loading / empty / error / success | skeleton grid · "No matches" · Retry on failure (`?error`) · order confirmation |
| Accessible keyboard navigation | skip link, visible focus, radio chips, focus trap + Esc in dialogs, focus returns to opener, arrow keys in gallery |
| Client-side validation | `validate()` with Luhn card check and expiry rule; inline errors linked by `aria-describedby`; focus moves to first error |
| Performance | no framework, lazy-loaded images with fixed sizes, CSS-only animation |
| Animation | hero zoom, staggered cards, scroll reveal, modal/drawer slide, toast; disabled under `prefers-reduced-motion` |

## Decision log
| Decision | Reason |
|---|---|
| Plain HTML/CSS/JS instead of React/Next.js (documented alternative) | no tooling needed to run or review; mentor opens one file; fits a 1-month scope |
| System of pure functions (`validate`, `pricing`) | testable without the UI (`?selftest`) |
| Palette paper / forest / clay, Fraunces + Inter | warm editorial brand, text contrast ≥ 4.5:1 |
| Photos from Unsplash (free licence) | real imagery without hosting; mister/soil/shears/candle use closest-match photos |

## QA checklist (tick and keep screenshots in your submission)
- [ ] Tab through the page, add an item, open the cart, Tab loops inside, Esc closes
- [ ] Submit an empty checkout → 8 errors, focus on Name
- [ ] Search "zzz" → empty state; Clear filters restores
- [ ] `?error` shows the error state
- [ ] 360 px width: no horizontal scroll
- [ ] Lighthouse report (Accessibility / Performance)

## Limitations and next steps
Mock data and simulated payment; cart in `localStorage`; "close-up" view is a zoomed crop of the main photo. Next: real API with pagination, product pages with URLs, automated tests (Playwright + axe), i18n. At 10× catalogue: server-side filtering, pagination, virtualised lists.
