# Global Trendes

Interactive November–December 2026 travel atlas. Live: https://rezlivemarketing.github.io/Global-Travel-Trends/

## Current experience

- 250 searchable country/territory records, map polygons, small-island markers and continent views.
- 268 researched major events, festivals, cultural celebrations and commemorations, plus 672 calculated holiday/observance entries. Calendar evidence covers 234 country/territory records; local programmes are not exhaustive.
- Date-by-date calendar with country, continent and worldwide scopes, event/holiday filters and source-linked day agendas. Published opening-day arrays take precedence over date ranges. Unconfirmed dates remain off the grid.
- Inbound travel and Outbound travel tabs: 69 historical source-market profiles (69 inbound, 40 outbound), with direction-specific periods, definitions, sources and reported counts where available.
- Travel evidence for 207 countries/territories, combining market profiles and archived annual indicators. World Bank/UN Tourism indicators cover 205 records and generally end in 2020. Their age, units and pandemic context are explicit. They do not measure 2026 monthly demand.
- Actual historical November/December 2024 observations for the United States and Mauritius; other profiles retain their own historical periods.
- 21 seasonal profiles, JSON country briefs, source library, local photography, responsive layouts and agent-readable data. The introductory hero requested for removal is absent.

The original automated source index contains 1,966 retrieved pages from 1,009 website hosts, after deduplication and detected policy/error exclusions. This background index is not 1,966 independently verified seasonal claims. Expanded primary research remains separately attributed per event and statistical record.

## Detailed country rankings and cities

India now uses the verified country annexes in **India Tourism Statistics 2026** for annual 2025: all 220 outbound and 215 inbound individually reported markets are retained. Default display shows 20 positions, with full-list search retaining Hong Kong at its actual #22 rank. US is #4 and Vietnam #13. Counts are departures across all recorded purposes, including repeat trips, rather than unique holidaymakers. Purpose shares and derived leisure estimates are labelled. Source pages, 2024 comparisons, historical seasonality and source consistency notes are in `research/india-top20.json`.

Greenland adds 33 named cruise residence markets, 12 named foreign accommodation-night markets, all 19 ranked ports, separate accommodation/cruise totals, city guides and seasonal context. Both observations tied at rank 20 are shown. Airport routes and passenger residence are not used to invent resident outbound destinations.

The global expansion includes numeric inbound records for69 countries/territories and numeric outbound records for38;65 inbound tables and20 outbound tables supply at least20 reported markets. The default shows20 positions with ties, while full-list search retains all available source rows. Eurostat36 profiles now retain full2025 country lists with2024 fallback independently per direction. UK, US, Canada, Australia and NewZealand use2025 primary tables. Asia includes national/ASEAN tables, alongside Africa, Americas and Pacific source records. City/town guides cover94 destinations and399 places with official tourism links. These are planning examples, not measured origin-specific city rankings; Greenland port statistics remain a separate measured table.

## Development

Requires Node.js 24 or later.

```sh
npm ci
npm run build
npm run verify
npm run dev
```

Build merges research bundles, calculates holiday rules and bundles the browser code into dist/. It does not refresh research automatically. GitHub Pages publishes main / root; the root entry redirects to dist/ while retaining selection parameters.

## Research files

- research/events-curated.json, events-asia-expansion.json, events-europe-expansion.json, events-world-expansion.json and events-additional.json retain primary sources, periods, date confidence and exclusions.
- research/merge-research.mjs preserves existing market evidence where appropriate and adds direction-specific definitions and monthly observations. expanded-research.json is generated.
- research/travel-global.mjs and travel-global.json provide reproducible World Bank annual-indicator retrieval and its dated result. Archived totals and recent bilateral profiles are separate measures.
- src/calendar.js implements calendar date expansion and scope filtering. Unknown dates never become invented day entries.
- dist/data/atlas.json is the complete dataset; coverage.json lists country-by-country evidence; travel-statistics.json contains archived indicators; curated-research.json contains expanded primary-source records.
- research/coverage-notes.md documents caveats and cancellation exclusions.
- The crawl/expand/market-seeds/finalize scripts retain the prior automated background-index workflow, failed requests and cleanup. Source hosts count hostnames, including subdomains, not registrable domains.

Historical market arrays are not forecasts. Country residence, nationality, accommodation arrivals, border crossings, trips, disembarkation countries and unique people differ. Eurostat lists separately reported countries and may omit countries inside regional aggregates. Mauritius disembarkation can include transit. Missing data remain unavailable. Cancelled/postponed events are excluded. Reference inclusion does not imply a sovereignty position.

## Attribution

Original code MIT. Wikivoyage/Wikipedia: linked contributors, CC BY-SA 4.0. Natural Earth public domain. Country metadata mledoze/countries ODbL. date-holidays ISC. World Bank/UN Tourism CC BY 4.0. Eurostat European Commission reuse policy. Photography Unsplash License; original-image links in dist/assets/photo-credits.json. Regional mood photos do not necessarily depict the selected country or event.

## Global coverage and measurement

Every travel tab shows its own inbound/outbound coverage and selected-country city guide. The directory filters by continent, numeric detail,20+ market tables, cities and gaps; direction buttons open the actual selected table. Map connections follow the displayed market set, including search and boundary ties.

US outbound SIAT2025 values are weighted destination percentages among overseas air travellers, not visitor counts or a complete US outbound ranking; Mexico/Canada and other modes fall outside that universe. UAE2024 has five rounded market shares, not20 headcounts. Great Britain ONS country tables exclude NorthernIreland. Brunei's breakdown is air-only. HongKong's cited report is January–February2026. Nepal's earlier2025 NTB publication has a different total from the later ministry revision; the editions are not combined. Source notes retain these limits.

New bundles: research/europe-full-v2.json; travel-anglo-v2.json; travel-asia-v2.json; travel-world-v2.json; travel-southasia-v2.json; travel-uae-v2.json; cities-*-v2.json. Full source extracts remain in bundles; runtime provenance avoids repeating the numeric tables already in directions. There is no claim of complete top20 rankings for all250 references.
