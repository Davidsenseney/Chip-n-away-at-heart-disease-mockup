export type Address = {
    hint?: string;
    city?: string;
    subdivision?: string;
    country?: string;
    postalCode?: string;
    formatted?: string;
    location?: {
        latitude?: number;
        longitude?: number;
    };
    addressLine1?: string;
    addressLine2?: string;
    streetAddress?: {
        name?: string;
        number?: string;
        apt?: string;
        formattedAddressLine?: string;
    };
};
export type RESTAddress = {
    country?: string | null;
    subdivision?: string | null;
    city?: string | null;
    postalCode?: string | null;
    streetAddress?: {
        number?: string | null;
        name?: string | null;
        apt?: string | null;
        formattedAddressLine?: string | null;
    } | null;
    addressLine?: string | null;
    addressLine2?: string | null;
    formattedAddress?: string | null;
    hint?: string | null;
    geocode?: {
        latitude?: number | null;
        longitude?: number | null;
    } | null;
    countryFullname?: string | null;
    subdivisionFullname?: string | null;
    subdivisions?: {
        code?: string | null;
        name?: string | null;
        type?: 'UNKNOWN_SUBDIVISION_TYPE' | 'ADMINISTRATIVE_AREA_LEVEL_1' | 'ADMINISTRATIVE_AREA_LEVEL_2' | 'ADMINISTRATIVE_AREA_LEVEL_3' | 'ADMINISTRATIVE_AREA_LEVEL_4' | 'ADMINISTRATIVE_AREA_LEVEL_5' | 'COUNTRY' | null;
        typeInfo?: string | null;
    }[] | null;
};
export declare function transformSDKAddressToRESTAddress(payload: Address): RESTAddress;
export declare function transformRESTAddressToSDKAddress(payload: RESTAddress): Address;
