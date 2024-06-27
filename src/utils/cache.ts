import NodeCache from "node-cache";

class Cache {
  private cache: NodeCache;

  constructor(ttlSeconds: number) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds });
  }

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: any) {
    this.cache.set(key, value);
  }

  del(key: string) {
    this.cache.del(key);
  }

  flush() {
    this.cache.flushAll();
  }
}

export default new Cache(120); // Cache TTL set to 2 minutes
