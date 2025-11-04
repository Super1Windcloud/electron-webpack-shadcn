import { describe, expect, it, vi } from "vitest";

import { fetchShowcaseStats } from "./demoData";

describe("fetchShowcaseStats", () => {
	it("resolves mocked data after timer completes", async () => {
		vi.useFakeTimers();
		const statsPromise = fetchShowcaseStats();
		await vi.runAllTimersAsync();
		const stats = await statsPromise;
		expect(stats).toHaveLength(3);
		expect(stats[0]).toMatchObject({
			label: "Query 缓存命中率",
		});
	});
});
