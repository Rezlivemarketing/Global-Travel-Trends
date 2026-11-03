# Analytics and integration contract

## Default behaviour

`src/analytics.js` emits lightweight intent events into an in-memory queue capped at 200 and a `rezlive:analytics` CustomEvent. No data is transmitted to an analytics service by default. Refresh clears the queue. Four campaign labels (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) are kept in sessionStorage where available; blocked storage falls back to memory. A new tagged arrival replaces the prior campaign labels; otherwise the current tab’s attribution is reused. No enquiry content, account credentials, email, agent name, rates or booking details enter this queue.

Official outbound links preserve those four labels and existing URL parameters, including registration language. A contextual `utm_content` is added only when the arrival did not supply one. Cross-domain attribution requires RezLive IT to accept/store these labels on the booking platform; preserving a URL is not evidence of a completed booking.

| Event | Trigger | Allowed contextual fields |
|---|---|---|
| website_visit | App data and integration configuration ready | market, continent, country, tab |
| market_selection | India/UAE/Global selection | market |
| continent_click | Atlas continent filter or continent evidence action | continent, placement |
| destination_click | Atlas/country selection or campaign selector | country or destination_id, placement |
| hotel_card_view | Approved card enters viewport at 35%, once per property/page | hotel_id |
| hotel_cta_click | Approved property’s rate CTA | hotel_id, placement, country, destination_id |
| agent_login_click | Any tracked login/product/property/event action | placement, country, destination_id |
| agent_registration_click | Registration action | placement, country, destination_id |
| event_cta_click | Event rate action | event_key, placement |
| cross_sell_click | Product category action | product, placement |
| lead_enquiry_submission | Approved endpoint returns successful HTTP and `{received:true}` | status: received |

A property/event/product click also emits the underlying agent login event. These are overlapping funnel events, not distinct bookings. Reports must avoid double-counting them as conversions. Event payloads include ISO timestamp and the allowlisted campaign labels. Unknown event names and metadata keys are dropped. There is intentionally no public `booking_confirmed` event.

Read local QA events with `window.rezliveAnalytics.events()`. Integration hooks:

```js
const unsubscribe = window.rezliveAnalytics.subscribe(event => {
  // Forward only after company approval and applicable consent.
  // The default app provides no collector and sends nothing here.
});
window.addEventListener('rezlive:analytics', e => console.debug(e.detail));
window.rezliveAnalytics.attribution();
unsubscribe();
```

## Optional GA4

There is no approved ID in this release. IT may set `analytics.approved: true` and `ga4MeasurementId: "G-…"` in `content/integrations.json` only after policy approval. An approved consent manager must call `window.rezliveAnalytics.setConsent(true)` after consent. Until then, no Google script or GA event is sent. `setConsent(false)` stops forwarding and updates Google consent if it was loaded. Events generated before consent are not replayed. No automatic page-view event is sent; use `website_visit` as the defined local visit event. Local hooks are not a GA dashboard, and this release does not display click totals as bookings.

## Confirmed bookings and contribution profit (server side only)

`booking-attribution.schema.json` defines a future server-to-server payload. IT must capture campaign labels on the authenticated RezLive session, reconcile against a confirmed booking record and send only confirmed outcomes from a trusted backend. A backend event ID/booking reference is an opaque internal reconciliation key; it must never be embedded in public campaign URLs or client JSON. Use idempotency, authenticated transport, currency definitions, agreed contribution-profit calculations, cancellation/refund adjustments and access controls. The public site contains no booking webhook or secret.

Recommended flow: public intent → approved agent login carrying UTM labels → authenticated platform retains campaign labels → booking system confirms/cancels → trusted analytics service receives a deduplicated, versioned booking/profit record. Define the attribution window and first/last-touch rule with marketing before reporting. No customer/passport/payment data is needed for campaign reporting.

## Optional enquiry API

Required configuration: `enquiry.enabled: true`, `approved: true`, HTTPS endpoint, exact endpoint origin in `allowedEndpointOrigins`, and an approved HTTPS `privacyUrl`. Without all fields, no form is rendered. The endpoint must enforce CORS for the published site, validate lengths/email/dates/room counts, apply rate/abuse controls and store records privately on company infrastructure. Add CSRF protection or an approved anonymous submission scheme appropriate to the deployment. Do not put API secrets in the app.

The UI sends JSON via POST with credentials omitted: agency, agent, business email, destination, arrival/departure ISO dates, approximate rooms, details, checkbox consent and allowlisted attribution. It requires a valid browser form and date order. A 2xx JSON response with `{ "received": true }` acknowledges receipt; otherwise the UI shows an error. Receipt is not a booking or a promised response time. Timeouts are 15 seconds. Nothing is written to localStorage/sessionStorage/files for the enquiry; analytics receives only a received status after real acknowledgement.

For local browser QA only, add `analytics_debug=1` on localhost/127.0.0.1 to show the latest intent events in a read-only disclosure. This debug UI is never enabled on the published GitHub Pages hostname.
