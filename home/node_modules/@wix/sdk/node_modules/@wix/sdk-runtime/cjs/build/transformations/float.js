"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSDKFloatToRESTFloat = transformSDKFloatToRESTFloat;
exports.transformRESTFloatToSDKFloat = transformRESTFloatToSDKFloat;
function transformSDKFloatToRESTFloat(val) {
    return isFinite(val) ? val : val.toString();
}
function transformRESTFloatToSDKFloat(val) {
    if (val === 'NaN') {
        return NaN;
    }
    if (val === 'Infinity') {
        return Infinity;
    }
    if (val === '-Infinity') {
        return -Infinity;
    }
    return val;
}
