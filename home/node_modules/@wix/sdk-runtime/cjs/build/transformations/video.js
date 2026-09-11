"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSDKVideoToRESTVideo = transformSDKVideoToRESTVideo;
exports.transformRESTVideoToSDKVideo = transformRESTVideoToSDKVideo;
const constants_js_1 = require("../constants.js");
const utils_js_1 = require("../utils.js");
function transformSDKVideoToRESTVideo(val) {
    if (!val) {
        return;
    }
    const alignedVideo = (0, utils_js_1.alignIfLegacy)(val, 'video');
    const { protocol, hash, pathname } = new URL(alignedVideo);
    const params = new URLSearchParams(hash.replace('#', ''));
    const height = params.get('posterHeight');
    const width = params.get('posterWidth');
    const posterUri = params.get('posterUri');
    const [id] = pathname.replace(`video://v1/`, '').split('/');
    if (protocol === constants_js_1.WIX_PROTOCOL) {
        if (!posterUri) {
            return { id };
        }
        return {
            id,
            thumbnail: {
                height: Number(height),
                width: Number(width),
                id: posterUri.toString(),
            },
        };
    }
    return { url: val };
}
function transformRESTVideoToSDKVideo(val) {
    if (!val) {
        return;
    }
    let posterData = '';
    if (val.thumbnail?.id) {
        posterData = `#posterUri=${val.thumbnail.id}&posterWidth=${val.thumbnail.width}&posterHeight=${val.thumbnail.height}`;
    }
    return val.id ? `wix:video://v1/${val.id}${posterData}` : val.url;
}
