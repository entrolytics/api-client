# ⚠️ DEPRECATED

**This package is deprecated in favor of [`@entrolytics/trpc-client`](../trpc/).**

The new tRPC client provides:

- ✅ Full end-to-end type safety
- ✅ Auto-completion for all API methods
- ✅ Automatic request batching
- ✅ Better error handling
- ✅ Same functionality, better DX

## Migration Guide

### Installation

```bash

# Remove old client

npm uninstall @entrolytics/api-client

# Install new client

npm install @entrolytics/trpc-client
```

### Usage Changes

**Before (REST Client)**:

```typescript
import { EntrolyticsClient } from "@entrolytics/api-client";

const client = new EntrolyticsClient({
  apiUrl: "https://api.entrolytics.dev",
  apiKey: "your-key",
});

const websites = await client.websites.list();
```

**After (tRPC Client)**:

```typescript
import { createClient } from "@entrolytics/trpc-client";

const client = createClient({
  apiUrl: "https://api.entrolytics.dev",
  apiKey: "your-key",
});

const websites = await client.websites.list.query();
```

### Key Differences

1. **Query/Mutation Pattern**: tRPC uses `.query()` for reads and `.mutate()` for writes
2. **Type Safety**: All types are automatically inferred from the backend
3. **Error Handling**: Errors are typed and more predictable

### API Mapping

| Old Method                          | New Method                                |
| ----------------------------------- | ----------------------------------------- |
| `client.websites.list()`            | `client.websites.list.query()`            |
| `client.websites.create(data)`      | `client.websites.create.mutate(data)`     |
| `client.analytics.overview(params)` | `client.analytics.overview.query(params)` |
| `client.events.list(params)`        | `client.events.list.query(params)`        |

See the [full tRPC client documentation](../trpc/README.md) for complete migration details.

---

# @entrolytics/api-client (Legacy)

REST API client for Entrolytics (no longer maintained).

For new projects, use [`@entrolytics/trpc-client`](../trpc/) instead.
