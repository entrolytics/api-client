import { describe, expect, it, vi } from "vite-plus/test";

import { ApiClient } from "./client";

describe("ApiClient", () => {
  it("uses bearer authentication, retries transient failures, and unwraps data", async () => {
    const fetchFn = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(Response.json({ error: "busy" }, { status: 503 }))
      .mockResolvedValueOnce(Response.json({ data: { id: "site_1" } }));
    const client = new ApiClient({
      bearerToken: "session-token",
      endpoint: "https://api.example.test/v1",
      fetch: fetchFn,
      retries: 1,
      retryDelay: 0,
    });

    const result = await client.get<{ id: string }>("websites", { active: true });

    expect(result).toEqual({ data: { id: "site_1" }, ok: true, status: 200 });
    expect(fetchFn).toHaveBeenCalledTimes(2);
    const [url, options] = fetchFn.mock.calls[1]!;
    expect(url).toBe("https://api.example.test/v1/websites?active=true");
    expect(options?.headers).toMatchObject({ Authorization: "Bearer session-token" });
  });
});
