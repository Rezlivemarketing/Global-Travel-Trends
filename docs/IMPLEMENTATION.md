# RezLive agent conversion enhancement

## Repository audit and preservation

Baseline: `44226156c51ee846f29953e8ea4caa0e09e4cc79`. The existing app is a static ES-module application bundled with esbuild. D3 and TopoJSON power the country atlas; custom modules render travel tables and the calendar. `research/merge-research.mjs` and `research/build-data.mjs` produce the public datasets. Root `index.html` redirects to `dist/` and preserves query parameters and anchors. GitHub Pages publishes the main branch root. No server, authentication session, CMS or private inventory feed exists in this repository.

The audit covered the tracked file inventory, source modules, HTML/CSS, build/data pipeline, research bundles, package scripts, attribution, export manifest and publishing structure. There were no approved property records, GA4 measurement IDs, consent integrations or company enquiry endpoints. Aggregate accommodation statistics and public hotel-chain logos are not approved property inventory.

The preservation baseline hashes all 268 original event records, all 250 country records, travel tables, references, annual archives, destination guides, seasonal notes and jurisdiction notes. Checks require these values to remain unchanged. Six verified 2026 priority events and one explicitly undated Rio public-programme watchlist were added. Original dates remain intact. The campaign navigation offers six populated continents; Antarctic reference places remain in the atlas and country search rather than campaign navigation.

## Implemented experience

1. The existing map, four country tabs, sources, exports and November/December calendar remain available.
2. India/UAE/Global market controls reorder the editorial destination shortlist. They do not filter away underlying countries or facts. Selection and UTM campaign parameters remain in the page URL.
3. A continent context panel connects country evidence to traveller segments and suggested products for each of the six campaign continents.
4. Twelve editable destination guides cover Thailand, Vietnam, Dubai, Abu Dhabi, Doha, Vienna/Strasbourg/Prague Christmas markets, Goa, Rajasthan, Maldives and Sri Lanka. Each contains a travel window, rationale, selling plan, hotel categories, source references, events and complementary products.
5. Event cards and the calendar provide hotel opportunities and agent login actions. Calendar controls include month, continent, category, original scope, and events/observances. Unknown dates remain off the grid.
6. Both official journeys are available: existing-agent login and new-agent registration. Product CTAs use the verified login page because no public destination/property deep-link contract was verified. They do not promise product availability.
7. `HotelCard` supports approved images, name/location, sourced optional stars, segments, selling benefit, sourced facilities, sourced proximity, source links and a login CTA. Draft/review/retired/incomplete properties never render. With no approved inventory, the public app shows useful hotel categories and no fictitious properties.
8. Analytics hooks record intent events. No GA4 or other third-party analytics is enabled by default. No public event claims a completed booking.
9. Enquiry UI is hidden by default. It becomes available only with an approved HTTPS endpoint, matching origin allowlist and approved privacy URL. It never saves form data locally and requires a positive server acknowledgement before showing receipt.

## Changed and added files

| Area | Files | Purpose |
|---|---|---|
| Content | `content/commerce.json`, `content/hotels.json`, `content/integrations.json` | Editable campaigns, hotel approval records, links and integration gates |
| Components | `src/commerce.js` | HotelCard, agent actions, destination and continent panels, event opportunities, optional enquiry |
| Analytics | `src/analytics.js`, `docs/ANALYTICS.md`, `docs/booking-attribution.schema.json` | Intent events, UTM attribution and future server-confirmed conversion contract |
| Existing app | `src-app.js`, `src/calendar.js`, `dist/index.html` | Integration, market controls, commercial calendar filters and official CTAs |
| Styling | `dist/commerce.css` | Navy/blue/teal commerce panels alongside the retained RezLive identity |
| Build | `research/build-commerce.mjs`, `research/build-data.mjs`, `research/merge-research.mjs`, `package.json` | Validate and publish editable content and new verified events |
| Validation | `research/verify-commerce.mjs`, `research/verify.mjs`, `research/preservation-baseline.json` | Preservation, gates, attribution, categories, date and security regressions |
| Evidence | `research/events-commerce.json`, `research/rezlive-conversion-sources.json` | Primary event/official URL verification |
| Generated | `dist/app.js`, `dist/data/*.json`, coverage files | Browser-ready assets |
| Packaging | `research/export-manifest.mjs` | Include content and documentation in source exports |

## Build, preview and GitHub Pages

Requires Node.js 22 or newer. No new runtime dependencies were added. No environment variables are required for the default public site.

```sh
npm ci
npm run build
npm run verify
npm run dev
```

Open `http://127.0.0.1:4173`. Use an HTTP server rather than opening HTML as a file because the app fetches JSON. `npm run build` validates/copies the editable content into `dist/data/` and bundles the app. Commit both source and generated `dist/` assets after successful checks. Publish GitHub Pages from `main` → `/(root)`; retain `.nojekyll`. The root redirect handles the `dist/` path. No SPA rewrite or server routes are needed. Confirm the Pages deployment succeeds and use a new `?v=` query after release to bypass a previously cached HTML document.

The data files, approved property content and integration configuration are public. Never put rates, API keys, tokens, private feeds or server credentials in them. Any private RezLive API integration must run on an approved company backend, outside GitHub Pages.

## Validation and limits

Automated checks cover all original country/event preservation hashes, dated and undated event behaviour, original India/Greenland/global travel-table controls, market-list preservation, commercial calendar filtering, official CTA destinations, UTM allowlisting, hotel approval/source gating, HTML escaping, and secure enquiry gating. Browser QA covers desktop/mobile layout, atlas selection, four tabs, commercial selectors, calendar controls, no-property states and local intent events. Live verification checks published asset hashes and the deployed interface. These checks do not authenticate into RezLive, create an agent account, book a room or verify authenticated stock.

Current content contains zero approved properties. Hotel categories are editorial planning suggestions. Public travel tables remain dated evidence and are not current booking demand. Event tickets, transfers, meal plans, festive supplements and any available inventory must be checked with the relevant supplier/RezLive after login. No completed booking or profit attribution is available without the IT integration.

## Required from IT and marketing

- Approved property shortlist with official property sources, permitted images, verification dates, selling benefits, segments, optional sourced stars/facilities/proximity and a named approver.
- Written confirmation of any supported destination/property deep-link contract; otherwise retain official login links.
- Approved analytics policy, GA4 measurement ID if desired, and a consent-management hook before enabling third-party analytics.
- Secure company enquiry endpoint, allowed origin, privacy notice, CORS/abuse controls and server acknowledgement contract.
- Server-side booking/contribution-profit attribution integration and reconciliation ownership, described in `ANALYTICS.md`.
- Campaign owner to review event programmes, destination priorities and hotel terms before each marketing send.

Contextual fallback: selecting a country outside the 12 priority campaigns keeps that selected destination in the commercial section with clearly generic planning categories. Restricted/no-permanent-population areas do not receive invented hotel campaigns. Verified destination photos were added for Vietnam, Dubai and Maldives with credits.
