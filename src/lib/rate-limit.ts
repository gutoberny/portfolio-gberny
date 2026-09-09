import { LRUCache } from "lru-cache";

type RateLimitOptions = {
  /** Janela em milissegundos. */
  interval: number;
  /** Teto de tokens (IPs) distintos mantidos em memória na janela. */
  uniqueTokenPerInterval: number;
};

export default function rateLimit(options: RateLimitOptions) {
  // LRU com TTL: cada IP expira sozinho e o cache nunca passa de
  // uniqueTokenPerInterval entradas. O Map anterior crescia sem limite.
  const tokenCache = new LRUCache<string, number>({
    max: options.uniqueTokenPerInterval,
    ttl: options.interval,
  });

  return {
    /** true quando o token JÁ estourou o limite. Conta esta chamada. */
    isRateLimited: (token: string, limit: number) => {
      const count = (tokenCache.get(token) || 0) + 1;
      tokenCache.set(token, count);
      return count > limit;
    },
  };
}
