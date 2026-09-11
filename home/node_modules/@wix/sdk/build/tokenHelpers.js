export function getCurrentDate() {
    return Math.floor(Date.now() / 1000);
}
export function isTokenExpired(token) {
    const currentDate = getCurrentDate();
    return token.expiresAt < currentDate;
}
export function createAccessToken(accessToken, expiresIn) {
    const now = getCurrentDate();
    return { value: accessToken, expiresAt: Number(expiresIn) + now };
}
