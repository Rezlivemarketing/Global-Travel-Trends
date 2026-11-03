# Marketing content guide

Edit JSON in `content/`, then run `npm run build` and `npm run verify`. No paid CMS is needed. Keep the JSON valid; do not change presentation code to update a campaign. Publish the copied `dist/data/` files together with source.

## Destination campaigns

`commerce.json` stores destinations, continent selling guidance, market order, editorial event opportunities and categories. Each destination has a stable `id`, country/continent, image, rationale, planning window, traveller segments, two to four hotel categories, selling advice, relevant products and source URLs. `image.kind: regional` visibly labels a broad image instead of claiming it depicts a destination or hotel. Event patterns or exact event map `destinationIds` connect existing factual events to campaigns. The priorities are editorial, not measured travel demand.

`marketPriorities.India`, `.UAE` and `.Global` contain destination IDs in preferred order. Unlisted destinations remain available after the listed ones. The six continent contexts update with the selected geography. Country travel tables remain in their original research datasets.

Event keys are exact `ISO2|Title` strings. Commercial category and selling copy live in `commerce.json.events`; actual dates and source records live in `research/events-*.json`. Never put an unconfirmed date on the grid. `research/events-commerce.json` contains the new priority programmes and their primary sources. `sourceUrl` documents the factual basis; hotel opportunities remain editorial suggestions. Review dates and local time zones before publication.

## Approving property cards

Copy `hotels.json.draftTemplate` into `hotels`, replace every placeholder, and keep `status: draft` until review. Do not promote the template itself. Required public fields: unique ID, name, country, destination IDs, location, benefit, traveller segments, image with alt/source/rights, primary source records with `url` and `verifiedOn`, property verification date and approver. Only `status: approved` with all mandatory fields renders. Public property cards are capped at four per selected destination.

Optional star category needs `starsSource: {url, verifiedOn}`. Facilities/inclusions are an array of `{label, sourceUrl, verifiedOn}`. Never infer inclusion merely from a facility’s existence. Event proximity is an array of `{eventKey, description, sourceUrl, verifiedOn}`; verify the route/distance claim instead of assuming the hotel is nearby. `eventKeys` associates a property with an exact event. Destination IDs can also connect an approved property to an event’s destination IDs. The same approval gate applies in the destination section and calendar shortlist.

Image URLs must be HTTPS or permitted `assets/` paths with no traversal. Local images must exist at build time. Confirm external photographs actually load and are licensed for use. Keep photo credits. No prices, stock quantities, inventory promises or fake urgency belong in these records. A login link is not a confirmed hotel-specific reservation link.

The `booking` template field is reserved for future IT verification; this release deliberately uses the official login page for every property. No supplied property deep link is executed. Marketing cannot enable private API access through these public files.

## Links and optional integrations

`integrations.json` defines official login/registration and product labels. Current product links lead to login, where the approved agent can search and check availability. Keep `lang=en_US` on registration. The app adds only allowed UTM fields; it does not forward arbitrary URL/query values.

GA4 stays off unless IT sets a valid approved measurement ID and grants consent through the documented interface. Do not place secrets or credentials in a measurement/config file. Enquiries stay hidden unless all approval, HTTPS, allowlist and privacy gates pass. Do not use a public spreadsheet or browser-accessible JSON file for lead storage.
