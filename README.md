# AMI Smart Homes & Properties

React and Vite website for AMI's property developments, listings, and inquiries.

## Local development

```sh
cd mm
npm ci
cp .env.example .env.local
npm run dev
```

Fill in the Firebase values from your project settings. Without them, public pages remain usable and account actions explain that services are unavailable. Never commit `.env.local`.

```sh
npm run build
node --test src/utils/propertyFilters.test.js
npm run lint
```

Vercel builds `mm/dist`; the root configuration rewrites application routes to `index.html`.

## Review and operational requirements

- Footer policy links, route fallback, scroll restoration, navigation contrast, mobile menu controls, and consistent typography have been corrected.
- Property filtering supports URL changes, budgets, location, type, and status; pagination scans additional batches without requiring composite indexes. Query failures expose retry controls.
- Contact prepares an email draft; the visitor must send it in their email application. Property inquiries use Firestore and report write failures.
- Saved property selections are stored in the current browser. There is no saved-property dashboard or comparison feature.
- Administrator access now requires the Firebase Auth custom claim `admin: true`, assigned by a trusted server or Admin SDK. An email address alone cannot grant administrator access. Configure this for existing administrators before rollout.
- The checked-in Firestore rules still describe the previous fashion-management application. Review and deploy rules for `ami_users`, `properties`, and `inquiries` that enforce ownership and verified administrator claims before relying on live account, listing, or inquiry workflows. This review did not deploy Firebase rules or exercise live writes.
- Placeholder phone, address, social profiles, and fictional agent contacts have been removed. Confirm the existing email address, testimonials, statistics, project imagery, and business claims before publication.
- Policy pages now use AMI branding and its logo; inherited policy language, especially subscription and refund sections, still needs the business owner's review against actual operations.
- Two oversized leadership portraits use WebP assets, and secondary pages load on demand.
- Compatible dependency security updates are included. Four high-severity audit findings remain in Firebase's gRPC dependency chain with no automatic compatible fix reported.
- Repository-wide lint has existing errors in legacy dashboard and panel files. The changed application files are checked separately; the legacy errors are not suppressed globally.
