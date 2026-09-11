"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSDKVideoV2ToRESTVideoV2 = transformSDKVideoV2ToRESTVideoV2;
exports.transformRESTVideoV2ToSDKVideoV2 = transformRESTVideoV2ToSDKVideoV2;
const utils_js_1 = require("../utils.js");
const constants_js_1 = require("../constants.js");
function transformSDKVideoV2ToRESTVideoV2(val) {
    if (!val) {
        return;
    }
    const alignedVideo = (0, utils_js_1.alignIfLegacy)(val, 'video');
    const { protocol, hash, pathname } = new URL(alignedVideo);
    const params = new URLSearchParams(hash.replace('#', ''));
    const posterUri = params.get('posterUri');
    const height = params.get('posterHeight');
    const width = params.get('posterWidth');
    const [id, fileName] = pathname.replace(`video://v1/`, '').split('/');
    if (protocol === constants_js_1.WIX_PROTOCOL) {
        let res = { id };
        if (fileName) {
            res = { ...res, filename: decodeURIComponent(fileName) };
        }
        if (!posterUri) {
            return res;
        }
        return {
            ...res,
            posters: [
                {
                    id: posterUri.toString(),
                    height: Number(height),
                    width: Number(width),
                },
            ],
        };
    }
    return { url: val };
}
function transformRESTVideoV2ToSDKVideoV2(val) {
    if (!val) {
        return;
    }
    let fileName = '';
    if (val?.filename) {
        fileName = `/${encodeURIComponent(val.filename)}`;
    }
    let posterData = '';
    if (val.posters?.length) {
        const [poster1, poster2] = val.posters;
        const poster = poster2 || poster1;
        let posterId = poster.id || '';
        if (!posterId && poster.url) {
            const idx = poster.url.lastIndexOf('/');
            if (idx !== -1) {
                posterId = poster.url.substring(idx + 1);
            }
        }
        if (posterId) {
            posterData = `#posterUri=${posterId}&posterWidth=${poster.width}&posterHeight=${poster.height}`;
        }
    }
    return val.id ? `wix:video://v1/${val.id}${fileName}${posterData}` : val.url;
}
