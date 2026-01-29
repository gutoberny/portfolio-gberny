
type RateLimitOptions = {
    interval: number;
    uniqueTokenPerInterval: number;
  };
  
  export default function rateLimit(options: RateLimitOptions) {
    const tokenCache = new Map();
    let lastReset = Date.now();
  
    return {
      check: (limit: number, token: string) =>
        new Promise<void>((resolve, reject) => {
          const now = Date.now();
          // Reset cache if interval passed
          if (now - lastReset > options.interval) {
             tokenCache.clear();
             lastReset = now;
          }
           
          const tokenCount = (tokenCache.get(token) || 0) + 1;
  
          if (tokenCount > limit) {
             reject();
          } else {
             tokenCache.set(token, tokenCount);
             resolve();
          }
        }),
      isRateLimited: (token: string, limit: number) => {
           const now = Date.now();
           if (now - lastReset > options.interval) {
              tokenCache.clear();
              lastReset = now;
           }
            
           const tokenCount = (tokenCache.get(token) || 0) + 1;
           tokenCache.set(token, tokenCount);
           
           return tokenCount > limit;
      }
    };
  }
