import type Redis from 'ioredis'

declare module 'nitropack' {
  interface NitroApp {
    redis?: Redis | null
  }
}
