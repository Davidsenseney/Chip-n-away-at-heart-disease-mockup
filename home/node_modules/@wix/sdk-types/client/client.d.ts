import type { Host } from '../build/index.js';

declare global {
  interface ContextualClient {
    host: Host;
  }
}
