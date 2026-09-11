"use strict";
// Inlined from https://github.com/ai/nanoevents/blob/main/index.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNanoEvents = createNanoEvents;
/**
 * Create event emitter.
 *
 * ```js
 * import { createNanoEvents } from 'nanoevents'
 *
 * class Ticker {
 * constructor() {
 * this.emitter = createNanoEvents()
 * }
 * on(...args) {
 * return this.emitter.on(...args)
 * }
 * tick() {
 * this.emitter.emit('tick')
 * }
 * }
 * ```
 * @returns Event emitter.
 */
function createNanoEvents() {
    return {
        emit(event, ...args) {
            for (let i = 0, callbacks = this.events[event] || [], length = callbacks.length; i < length; i++) {
                callbacks[i](...args);
            }
        },
        events: {},
        on(event, cb) {
            (this.events[event] ||= []).push(cb);
            return () => {
                this.events[event] = this.events[event]?.filter((i) => cb !== i);
            };
        },
    };
}
