"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDate = getCurrentDate;
exports.isTokenExpired = isTokenExpired;
exports.createAccessToken = createAccessToken;
function getCurrentDate() {
    return Math.floor(Date.now() / 1000);
}
function isTokenExpired(token) {
    const currentDate = getCurrentDate();
    return token.expiresAt < currentDate;
}
function createAccessToken(accessToken, expiresIn) {
    const now = getCurrentDate();
    return { value: accessToken, expiresAt: Number(expiresIn) + now };
}
