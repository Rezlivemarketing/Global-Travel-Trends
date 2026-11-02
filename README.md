# Global Trendes

An interactive November–December **2026** travel intelligence atlas for travel professionals and agents.

Published research snapshot: **1,966 distinct source pages from 1,009 website hosts**, after deduplication and detected policy/error-page exclusion. This is an indexed corpus, not 1,966 independently verified seasonal claims.

## Experience

- 250 searchable country and territory records, clickable Natural Earth map polygons, small-island markers, zoom and continent views.
- November/December selectors, dated events and festivals, public-holiday/observance calendars, and seasonal country context.
- Separate inbound and outbound tabs with historical annual statistics, explicit periods, definitions and missing-evidence states.
- Responsive editorial design, local destination photography, keyboard-accessible controls, shareable selection URLs and JSON country briefs.
- Searchable research library and downloadable JSON source index with retrieval timestamps, HTTP status and content hashes.
- Agent-readable `dist/llms.txt` and `dist/data/atlas.json`.

## Publish on GitHub Pages

In **Settings → Pages**, choose **Deploy from a branch → main → /(root) → Save**. The root entry opens `dist/`, preserving the selected country/month query. The public page will be at https://rezlivemarketing.github.io/Global-Travel-Trends/ once GitHub's Pages build succeeds.

## Local development

Requires Node.js 24 or later.

```sh
npm ci
npm run build
npm run dev
```

Open the printed localhost URL. The `dist/` directory is self-contained and can be hosted by any static file server. All code, geography and images are bundled locally; web fonts have system fallbacks. The browser sends no user-supplied data to an application server.

## Research and definitions

Read `ROADMAP.md`, `dist/llms.txt`, and the methodology in the site. `research/events-curated.json` contains original primary-source event summaries and historical market records; `research/seasonal.json` contains original tourism-board seasonal notes. `research/build-data.mjs` combines them with country metadata and `date-holidays` rules. `research/crawl.mjs` and `research/expand.mjs` provide the reproducible retrieval/indexing workflow, with robots checks and per-host pacing in the expanded crawl. Failed/skipped requests are logged and excluded from source totals. The initial guide retrieval was capped after rate limiting; failed requests were not counted.

`research/market-seeds.mjs` uses a public Christmas-market directory to discover external organiser references. `research/extra-seeds.json` records the discovered URLs, and `research/seed-discovery.json` records the directory origin and retrieval summary. These directory dates are **not** adopted as verified event claims. Successfully retrieved organiser pages appear as labelled research leads in the country event view. `research/finalize.mjs` deduplicates final URLs and removes detected policy/error pages before publication. Source-host totals count distinct hostnames, which can include separate subdomains, rather than registrable domains.

**Important distinctions:** source *pages* are not distinct *websites*. The UI reports both exact totals. Automated indexing is not manual verification of every claim. Calendar entries are not demand forecasts. Travel rankings are historical **annual** evidence for the markets with verified records, not monthly 2026 data. Unknown rankings remain blank. Event dates can change; this is a dated snapshot rather than a live feed. Dependencies and disputed/reference areas are included without any position on sovereignty. Broader region photographs are clearly described as mood imagery.

## Attribution

Wikivoyage/Wikipedia excerpts: linked page contributors, CC BY-SA 4.0. Geography: Natural Earth, public domain. Country metadata: mledoze/countries, ODbL. Calendar data: date-holidays, ISC. Photography: Unsplash License; sources in `dist/assets/photo-credits.json`. Original application code: MIT (see LICENSE). Source data retain their respective licences and rights.
