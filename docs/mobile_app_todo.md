# Merchant Commerce Hub - Mobile App TODO

This document reviews the current add-merchant feature and lists the work needed
to build a production mobile app for merchant operations.

## Add Merchant Feature Review

### Current backend state

- [x] `POST /merchants` creates another merchant for the authenticated user.
- [x] New merchant creation also creates default merchant roles.
- [x] The creator is added as the new merchant owner.
- [x] Merchant slug is generated from the merchant name and retried with a random suffix on conflict.
- [x] `POST /auth/switch-merchant` switches the active merchant context and returns a new access token.
- [x] `GET /merchant` returns the active merchant profile.
- [x] `PATCH /merchant` updates the active merchant profile, including slug.
- [x] `GET /merchant/dashboard` returns active merchant summary data.
- [x] E2E coverage verifies create, switch, update, dashboard summary, audit entries, and cross-merchant rejection.

### Current frontend state

- [x] Merchant dashboard has a merchant switcher.
- [x] Merchant switch invalidates queries and refreshes the dashboard.
- [ ] Merchant dashboard does not appear to expose a first-class "add merchant" form yet.
- [ ] Client API helpers/hooks for `POST /merchants` are not present in the merchant app.

### Product and UX notes

- [ ] After creating a merchant, mobile should immediately call `POST /auth/switch-merchant` so the new merchant becomes active.
- [ ] Add merchant should be a short flow: business name, email, phone, confirmation, then switch context.
- [ ] If custom slug selection is required during onboarding, add backend support to accept optional `slug` in `CreateMerchantDto`; otherwise keep slug editing in merchant settings after creation.
- [ ] Show clear duplicate/conflict copy for slug allocation failures.
- [ ] Confirm whether every authenticated user can create additional merchants or whether this should require a platform flag, plan entitlement, or permission.

## Mobile App Build TODO

## 1. Product Scope

- [ ] Define app audience: merchant owner/admin only, staff/POS users, or both.
- [ ] Define first mobile release scope: auth, merchant switch/add, dashboard, products, inventory, orders, payments, notifications.
- [ ] Decide whether storefront customer shopping belongs in the same app or remains web-only.
- [ ] Define supported platforms: iOS, Android, tablet breakpoints.
- [ ] Define offline requirements for POS and inventory flows.

## 2. Mobile Architecture

- [ ] Choose mobile stack, preferably React Native with Expo if the web TypeScript model should be reused.
- [ ] Create `client/apps/mobile`.
- [ ] Share API types from `client/packages/types`.
- [ ] Share API request helpers from `client/packages/api-client` where possible.
- [ ] Add mobile-specific secure token storage.
- [ ] Add environment config for API URL, storefront URL, auth providers, and push notification keys.
- [ ] Add app navigation structure with authenticated and unauthenticated stacks.

## 3. Authentication

- [ ] Build login screen.
- [ ] Build register merchant owner screen using `POST /auth/register-merchant`.
- [ ] Build refresh-token handling.
- [ ] Build logout and logout-all support.
- [ ] Store access token and refresh token securely.
- [ ] Restore session on app launch with `GET /auth/me`.
- [ ] Handle expired sessions with token refresh before forcing logout.
- [ ] Add biometric unlock only after secure token storage is stable.

## 4. Add Merchant Flow

- [ ] Add "Create merchant" entry point from the merchant switcher/account menu.
- [ ] Build create merchant form for name, email, and phone.
- [ ] Call `POST /merchants`.
- [ ] On success, call `POST /auth/switch-merchant` with the created merchant ID.
- [ ] Replace the stored access token with the switched merchant token.
- [ ] Refresh `GET /auth/me` and merchant dashboard queries.
- [ ] Route the user to the new merchant dashboard.
- [ ] Add validation copy for required name, invalid email, invalid phone, and slug conflict.
- [ ] Add success state that makes the active merchant switch visible.

## 5. Merchant Context

- [ ] Build merchant switcher optimized for mobile.
- [ ] Keep active merchant ID in session state.
- [ ] Attach merchant context to API requests through the access token and `X-Merchant-ID` only when needed.
- [ ] Clear cached merchant data after switching.
- [ ] Prevent cross-merchant stale data from flashing during switch.
- [ ] Show empty state when the user has no active merchant.

## 6. Dashboard

- [ ] Build mobile dashboard from `GET /merchant/dashboard`.
- [ ] Show merchant status, membership counts, pending invitations, and recent activity.
- [ ] Add quick actions for add product, adjust stock, orders, payments, and storefront.
- [ ] Add loading, error, empty, and permission-limited states.
- [ ] Add pull-to-refresh.

## 7. Catalog

- [ ] Build product list with search, status filter, and category filter.
- [ ] Build product detail screen.
- [ ] Build create/edit product form.
- [ ] Support media upload through existing file APIs.
- [ ] Support variants and channel visibility.
- [ ] Add client-side validation matching backend DTOs.

## 8. Inventory

- [ ] Build stock overview.
- [ ] Build stock adjustment flow.
- [ ] Show low-stock alerts.
- [ ] Show movement history.
- [ ] Confirm whether inventory changes need offline queueing.

## 9. Orders and Checkout Operations

- [ ] Build order list with status filters.
- [ ] Build order detail screen.
- [ ] Add fulfillment actions.
- [ ] Add refund flow when payment permissions allow it.
- [ ] Add customer/contact information display.
- [ ] Add safe retry behavior for slow network actions.

## 10. Payments

- [ ] Build payment provider status screen.
- [ ] Build provider settings screen if mobile management is in scope.
- [ ] Show payment intent and refund status on orders.
- [ ] Gate payment settings by permission.

## 11. Storefront Management

- [ ] Build storefront profile/settings screen.
- [ ] Build theme preview link to public storefront.
- [ ] Build basic theme controls only if mobile editing is required.
- [ ] Keep advanced theme builder on web unless explicitly needed on mobile.

## 12. Notifications

- [ ] Add push notification registration.
- [ ] Add notification inbox.
- [ ] Handle order-created, low-stock, payment-failed, refund-created, and invitation events.
- [ ] Add read/unread state.
- [ ] Add deep links into the correct merchant context.

## 13. Permissions

- [ ] Port permission helpers to mobile.
- [ ] Hide restricted actions.
- [ ] Disable sensitive actions with clear permission copy.
- [ ] Recompute permissions after merchant switch.
- [ ] Add tests for permission-gated mobile screens.

## 14. API and Backend Gaps

- [ ] Add optional `slug` to `CreateMerchantDto` only if create-time slug control is a product requirement.
- [ ] Add endpoint documentation examples for mobile auth, add merchant, and merchant switching.
- [ ] Confirm CORS and mobile app origin requirements.
- [ ] Confirm rate limits for auth and merchant creation.
- [ ] Add audit metadata support that works well for mobile devices.
- [ ] Add push notification device-token endpoints.

## 15. Quality and Release

- [ ] Add unit tests for mobile auth state and merchant switching.
- [ ] Add integration tests for add merchant then switch merchant.
- [ ] Add smoke tests for login, dashboard, product list, order list, and logout.
- [ ] Add crash reporting.
- [ ] Add analytics events for onboarding, merchant creation, switch merchant, and core actions.
- [ ] Add app icons, splash screen, and store metadata.
- [ ] Configure iOS and Android builds.
- [ ] Create internal test builds before app store submission.

## Suggested First Milestone

- [ ] Create `client/apps/mobile`.
- [ ] Implement login and register merchant owner.
- [ ] Implement secure session storage and refresh.
- [ ] Implement merchant switcher.
- [ ] Implement add merchant flow with immediate switch.
- [ ] Implement dashboard summary.
- [ ] Ship an internal test build for owner/admin users.
