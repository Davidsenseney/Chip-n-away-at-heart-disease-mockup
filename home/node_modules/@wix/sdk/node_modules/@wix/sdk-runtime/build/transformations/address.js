import { removeUndefinedKeys } from '../utils.js';
export function transformSDKAddressToRESTAddress(payload) {
    return (payload &&
        removeUndefinedKeys({
            city: payload.city,
            hint: payload.hint,
            subdivision: payload.subdivision,
            country: payload.country,
            postalCode: payload.postalCode,
            formattedAddress: payload.formatted,
            geocode: payload.location,
            addressLine: payload.addressLine1,
            addressLine2: payload.addressLine2,
            streetAddress: payload.streetAddress && {
                name: payload.streetAddress.name,
                number: payload.streetAddress.number,
                apt: payload.streetAddress.apt,
                formattedAddressLine: payload.streetAddress.formattedAddressLine,
            },
        }));
}
export function transformRESTAddressToSDKAddress(payload) {
    return (payload &&
        removeUndefinedKeys({
            formatted: payload.formattedAddress,
            location: payload.geocode,
            addressLine1: payload.addressLine,
            addressLine2: payload.addressLine2,
            streetAddress: payload.streetAddress && {
                name: payload.streetAddress.name,
                number: payload.streetAddress.number,
                apt: payload.streetAddress.apt,
                formattedAddressLine: payload.streetAddress.formattedAddressLine,
            },
            hint: payload.hint,
            city: payload.city,
            subdivision: payload.subdivision,
            country: payload.country,
            postalCode: payload.postalCode,
            countryFullname: payload.countryFullname,
            subdivisionFullname: payload.subdivisionFullname,
        }));
}
