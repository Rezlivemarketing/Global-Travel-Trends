# RezLive Global Trends

Interactive November–December2026 travel atlas. Live: https://rezlivemarketing.github.io/Global-Travel-Trends/

## Country coverage

All250 country/territory records have reviewed destination guidance or a sourced local-scope explanation. There are246 place guides (94 official-source guides and152 attributed community guides), containing1,433 described cities, towns, islands, districts, regions and other places. Bouvet, Heard/McDonald, BIOT and US Minor Outlying Islands have explicit scope exceptions rather than invented city lists. A place list is not a measured city-popularity ranking.

The current primary-source collection contains82 market profiles:81 numeric inbound tables and43 numeric outbound tables; two older outbound named-market summaries are also retained. New2024/2025 tables include Central Asia, Bhutan, CostaRica, Colombia, DominicanRepublic, Uganda and Namibia, plus locally defined Falklands/Aruba/Faroes records. Their measurement periods and definitions remain explicit.

A separate2019 historical reference contains181 inbound tables and236 outbound reference lists. The outbound reference transposes ONLY62 destination reporters' border-tourist arrivals by usual residence. It is a partial reporting sample, not a complete worldwide resident-departure ranking. Inbound references preserve whether each country reports nationality, residence, border visitors/tourists or accommodation arrivals. Recent numeric national tables take priority; historical sources have a prominent banner and an explicit source selector. The atlas retains leading20 positions plus ties for these references; omitted source observations are not zero.

Preferred published/reference records provide185 inbound and236 outbound numeric country views. There are147 inbound and100 outbound views with20+ retained records; some sources legitimately report fewer. Additional published evidence indexes link221 places to origin-reported outbound records and245 places to destination-reported inbound records. These are alphabetic, unranked source indexes: different years, units and populations are never combined into a numerical ranking. Not every place has a current or complete Top20; no figures are fabricated to fill a missing table.

## Other features

- 250 searchable map records, small-island markers, continent views and country/detail filters. Map connections follow the selected retained ranking, search and boundary ties.
- 268 researched major events/celebrations and672 calculated holiday/observance entries. Calendar evidence covers234 places; local programmes are not exhaustive.
- Date-by-date country, continent and worldwide calendars. Unknown dates remain off the grid; published opening-day arrays take precedence over ranges.
- Country briefs export current tables, historical references, related evidence, source definitions, place guides and local applicability.
- 21 seasonal profiles; WorldBank/UN Tourism annual archive for205 places, generally ending in2020, remains separate.
- Source library:1,966 automatically indexed pages from1,009 hosts. This is background indexing, not1,966 independently verified forecasts.

## Measurement and provenance

India uses the verified2025 annexes in IndiaTourismStatistics2026, with220 outbound and215 inbound markets. US#4, Vietnam#13 and HongKong#22 preserve actual ranks. Counts include all recorded purposes and repeated departures, not unique holidaymakers.

Greenland retains33 cruise residence markets,12 foreign accommodation-night markets,19 ranked ports and separate totals. Local air routes or passenger residence are not treated as resident outbound destinations.

US SIAT2025 outbound values are weighted overseas-air destination percentages, excluding Canada/Mexico and other modes. UAE2024 has five rounded visitor-market shares. GreatBritain ONS country tables exclude NorthernIreland. Brunei's country breakdown is air-only. HongKong's cited report is Jan–Feb2026. Nepal's earlier2025 release is not mixed with the later revised national total. DominicanRepublic allocated figures retain precision and approximation labels. CostaRica outbound air-recorded countries do not establish every final destination.

The historical references are newly calculated leading-country lists of basic statistical observations, with exact PDF pages and definitions. Source prose/layout/complete tables are not republished. Coordinate controls verify India←US2019=1,512,032 and US←Canada2019=20,723,322. Missing cells and aggregates stay excluded. Raw coordinate extraction remains work-only.

## Development

Requires Node.js24+. Run npm ci, npm run build, npm run verify and npm run dev. GitHubPages publishes main/root; root redirects to dist/ preserving query/hash. Builds merge research snapshots; they do not automatically refresh research. Asset/data versioning prevents the previous release being reused after navigation.

Research bundles preserve exact values, source URLs, periods, populations and exclusions. historical-travel-reference.json is generated by research/build-historical-reference.mjs from a work-only coordinate validation extract. Community guides preserve source revision/hash, attribution and CC BY-SA4.0 licensing. place-applicability.json preserves jurisdiction-specific primary sources.

## Attribution

Original application code MIT. Wikivoyage/Wikipedia contributors: linked attribution; adapted community place descriptions CC BY-SA4.0. Country metadata mledoze/countries ODbL; NaturalEarth geography public domain; date-holidays ISC; WorldBank annual archive CC BY4.0; Eurostat EuropeanCommission reuse policy. Other statistical facts retain individual publication references and definitions. Photography: UnsplashLicense, dist/assets/photo-credits.json. Regional mood imagery need not depict the selected place/event. Reference boundaries and inclusion do not imply a sovereignty position.


## RezLive interface

The interface uses the official RezLive.com logo, observed purple/orange public-site colours and Poppins typography. Booking CTAs open https://www.rezlive.com/. Four destination tabs cover inbound trends, outbound trends, events and country knowledge; the calendar follows the destination workspace. Source definitions and historical labels remain available in disclosures. Brand provenance is in `research/rezlive-brand-sources.json`; photography credits are in `dist/assets/photo-credits.json`.


## Agent conversion layer

Twelve editable destination campaigns, official B2B login/registration paths, commercial event filters and consent-gated analytics hooks enhance the existing atlas. No approved hotel inventory or enquiry backend was supplied; public hotel cards and enquiry submissions remain gated. Start with `docs/IMPLEMENTATION.md`, `docs/CONTENT-EDITING.md` and `docs/ANALYTICS.md`. No default environment variables or new dependencies are required.
