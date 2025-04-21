// lib/db.ts
import { Redis } from '@upstash/redis'

// Initialize the Redis client with your Upstash credentials
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

// Helper functions for Redis operations
export async function put(key: string, value: string | object, options?: { ttl?: number }) {
  // If value is an object, stringify it
  const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value;
  
  if (options?.ttl) {
    return redis.setex(key, options.ttl, valueToStore);
  }
  return redis.set(key, valueToStore);
}

export async function get(key: string) {
  const data = await redis.get(key);
  return data;
}