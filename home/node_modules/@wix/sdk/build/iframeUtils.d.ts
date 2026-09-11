export declare function addListener(eventTarget: any, name: string, fn: Function): void;
export declare function removeListener(eventTarget: any, name: string, fn: Function): void;
export declare function loadFrame(src: string): HTMLIFrameElement;
export declare function addPostMessageListener(state: string): Promise<unknown>;
