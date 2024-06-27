import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({
  minTime: 12000, // 5 requests per minute (60000 ms / 5)
  maxConcurrent: 1
});

export const rateLimitedFetch = limiter.wrap(async (fetchFn: () => Promise<any>) => {
  return await fetchFn();
});
