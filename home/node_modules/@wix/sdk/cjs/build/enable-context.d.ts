import { WixClient } from './wixClient.js';
export type ContextType = 'global' | 'module';
export declare function enableContext(wixClient: WixClient, contextType: ContextType): void;
