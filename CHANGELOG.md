# Changelog

All notable changes to this project are documented in this file. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- Built and released with pnpm 12.24.0. No code changes.

## [3.0.2] - 2026-11-26

### Changed

- `sendTestEvent` reports its page URL under the production domain `entrolytics.dev`, and the
  README examples use `https://api.entrolytics.dev`. The client's default API URL is unchanged.
- Consumes `@entrolytics/shared` 3.2.1.
- Dependencies updated to their latest releases; the toolchain moved to tsdown, the oxc tools and
  pnpm 12.23.

[Unreleased]: https://github.com/entrolytics/api-client/compare/v3.0.2...HEAD
[3.0.2]: https://github.com/entrolytics/api-client/releases/tag/v3.0.2
