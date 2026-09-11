"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSDKDocumentToRESTDocument = transformSDKDocumentToRESTDocument;
exports.transformRESTDocumentToSDKDocument = transformRESTDocumentToSDKDocument;
const utils_js_1 = require("../utils.js");
const constants_js_1 = require("../constants.js");
function transformSDKDocumentToRESTDocument(val) {
    const alignedUrl = (0, utils_js_1.alignIfLegacy)(val, 'document');
    const { protocol, pathname } = new URL(alignedUrl);
    const [id, filename] = pathname.replace(`document://v1/`, '').split('/');
    if (protocol === constants_js_1.WIX_PROTOCOL) {
        if (!filename) {
            return { id };
        }
        return {
            id,
            filename: decodeURIComponent(filename),
        };
    }
    return { url: val };
}
function transformRESTDocumentToSDKDocument(payload) {
    if (!payload) {
        return;
    }
    let fileName = '';
    if (payload?.filename) {
        fileName = `/${encodeURIComponent(payload.filename)}`;
    }
    return payload.id
        ? `wix:document://v1/${payload.id}${fileName}`
        : payload.url;
}
