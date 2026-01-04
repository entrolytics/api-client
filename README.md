# @entrolytics/api-client

TypeScript API client for Entrolytics - First-party growth analytics for the edge.

## Installation

```bash
npm install @entrolytics/api-client
# or
pnpm add @entrolytics/api-client
# or
yarn add @entrolytics/api-client
```

## Usage

```typescript
import { EntrolyticsClient } from '@entrolytics/api-client';

const client = new EntrolyticsClient({
  apiKey: 'your-api-key',
  apiUrl: 'https://api.entrolytics.click', // optional
});

// Track an event
await client.track({
  websiteId: 'your-website-id',
  event: 'pageview',
  url: 'https://example.com/page',
  properties: {
    customProperty: 'value',
  },
});

// Get analytics data
const analytics = await client.analytics.getOverview({
  websiteId: 'your-website-id',
  startDate: '2025-01-01',
  endDate: '2025-01-31',
});
```

## Features

- 🔒 Type-safe API client
- 📊 Full analytics API coverage
- 🚀 Promise-based async/await
- ⚡ Automatic retry logic
- 🔄 Request/response interceptors
- 📝 TypeScript definitions included

## API Reference

### Constructor Options

- `apiKey` (string, required): Your Entrolytics API key
- `apiUrl` (string, optional): Custom API URL (defaults to production)
- `timeout` (number, optional): Request timeout in ms (default: 5000)
- `retries` (number, optional): Number of retries on failure (default: 3)

### Methods

#### `track(data: TrackEventData): Promise<void>`

Track a single event.

#### `trackBatch(events: TrackEventData[]): Promise<void>`

Track multiple events in a single request.

#### `analytics.getOverview(params): Promise<AnalyticsOverview>`

Get overview analytics for a website.

#### `analytics.getTopPages(params): Promise<TopPage[]>`

Get top pages by pageviews.

#### `analytics.getTopReferrers(params): Promise<TopReferrer[]>`

Get top referrers.

## License

MIT © Entrolytics
