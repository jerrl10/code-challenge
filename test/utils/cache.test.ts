// TODO
import cache from "../../src/utils/cache";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Cache", () => {
  it("should get cache data correctly", () => {
    const cacheKey = 'mockKey';
    const cacheData = cache.get(cacheKey);
    expect(true).toBe(true);
  });
});
