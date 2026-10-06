# AMI Smart Homes & Properties

React and Vite website for AMI's property developments, listings, and inquiries.

## Local development

```sh
cd mm
npm ci
cp .env.example .env.local
npm run dev
```

The website needs no login or Firebase configuration to browse its published developments. Firebase settings are optional for reading live listings. Never commit `.env.local`.

```sh
npm run build
node --test src/utils/propertyFilters.test.js
npm run lint
```

Vercel builds `mm/dist`; the root configuration rewrites application routes to `index.html`.

## Review and operational requirements

- Footer policy links, route fallback, scroll restoration, navigation contrast, mobile menu controls, and consistent typography have been corrected.
- Property filtering supports URL changes, budgets, location, type, and status; pagination scans additional batches without requiring composite indexes. Query failures expose retry controls.
- Contact and property inquiry forms prepare email drafts; visitors send them using their email application.
- All navigation is public: Home, Buy, Rent, Properties, About, Agents, and Contact. Account and admin routes are removed from the website. Legacy source files are retained but are not mounted.
- Published developments provide a public catalogue when Firebase is unconfigured or live listings cannot be read. Prices and current availability must be confirmed with the team. Optional live Firestore listings require public read rules for the properties collection; this change does not deploy database rules or grant public writes.
- Saved property selections are stored in the current browser. There is no saved-property dashboard or comparison feature.
- The hero slider fills at least the full viewport, so the next section begins below the initial screen.
- Placeholder phone, address, social profiles, and fictional agent contacts have been removed. Confirm the existing email address, testimonials, statistics, project imagery, and business claims before publication.
- Policy pages now use AMI branding and its logo; inherited policy language, especially subscription and refund sections, still needs the business owner's review against actual operations.
- Two oversized leadership portraits use WebP assets, and secondary pages load on demand.
- Compatible dependency security updates are included. Four high-severity audit findings remain in Firebase's gRPC dependency chain with no automatic compatible fix reported.
- Repository-wide lint has existing errors in legacy dashboard and panel files. The changed application files are checked separately; the legacy errors are not suppressed globally.
