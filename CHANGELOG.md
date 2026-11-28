# Changelog

All notable changes to this project are documented in this file. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [4.0.0] - 2026-11-28

### Removed

- **Breaking.** `updateMyPassword` and `webhooks.clerk` (with `createWebhooksEndpoints` and
  `WebhookClerkParams`). The API no longer has `POST /me/password` or `POST /webhooks/clerk`: sign-in
  moved from Clerk to the dashboard itself, where a password is set and changed.

### Changed

- `User.clerkId` is documented as the ID of the sign-in identity. The field keeps its name.
- `apiKey` is documented as what it is: a website's API key, which only sends events and
  registers deployments for that website. The examples that read data now use `bearerToken`.

## [3.0.3] - 2026-11-26

### Changed

- Built and released with pnpm 12.24.0. No code changes.

## [3.0.2] - 2026-11-26

### Changed

- `sendTestEvent` reports its page URL under the production domain `entrolytics.dev`, and the
  README examples use `https://api.entrolytics.dev`. The client's default API URL is unchanged.
- Consumes `@entrolytics/shared` 3.2.1.
- Dependencies updated to their latest releases; the toolchain moved to tsdown, the oxc tools and
  pnpm 12.23.

[Unreleased]: https://github.com/entrolytics/api-client/compare/v4.0.0...HEAD
[4.0.0]: https://github.com/entrolytics/api-client/compare/v3.0.3...v4.0.0
[3.0.3]: https://github.com/entrolytics/api-client/compare/v3.0.2...v3.0.3
[3.0.2]: https://github.com/entrolytics/api-client/releases/tag/v3.0.2
