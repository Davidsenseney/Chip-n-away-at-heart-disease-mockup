const parseMethod = (method) => {
    switch (method) {
        case 'get':
        case 'GET':
            return 'GET';
        case 'post':
        case 'POST':
            return 'POST';
        case 'put':
        case 'PUT':
            return 'PUT';
        case 'delete':
        case 'DELETE':
            return 'DELETE';
        case 'patch':
        case 'PATCH':
            return 'PATCH';
        case 'head':
        case 'HEAD':
            return 'HEAD';
        case 'options':
        case 'OPTIONS':
            return 'OPTIONS';
        default:
            throw new Error(`Unknown method: ${method}`);
    }
};
export const toHTTPModule = (factory) => (httpClient) => async (payload) => {
    let requestOptions;
    const HTTPFactory = (context) => {
        requestOptions = factory(payload)(context);
        if (requestOptions.url === undefined) {
            throw new Error('Url was not successfully created for this request, please reach out to support channels for assistance.');
        }
        const { method, url, params } = requestOptions;
        return {
            ...requestOptions,
            method: parseMethod(method),
            url,
            data: requestOptions.data,
            params,
        };
    };
    try {
        const response = await httpClient.request(HTTPFactory);
        if (requestOptions === undefined) {
            throw new Error('Request options were not created for this request, please reach out to support channels for assistance.');
        }
        const transformations = Array.isArray(requestOptions.transformResponse)
            ? requestOptions.transformResponse
            : [requestOptions.transformResponse];
        /**
         * Based on Axios implementation:
         * https://github.com/axios/axios/blob/3f53eb6960f05a1f88409c4b731a40de595cb825/lib/core/transformData.js#L22
         */
        let data = response.data;
        transformations.forEach((transform) => {
            if (transform) {
                data = transform(response.data, response.headers);
            }
        });
        return data;
    }
    catch (e) {
        if (typeof e === 'object' &&
            e !== null &&
            'response' in e &&
            typeof e.response === 'object' &&
            e.response !== null &&
            'data' in e.response) {
            throw e.response.data;
        }
        throw e;
    }
};
/*
 * Because of issues with tree-shaking, we cant really put static parameter on module.
 * We still have check for __isAmbassador for backward compatibility
 */
export const isAmbassadorModule = (module) => {
    if (module.__isAmbassador) {
        return true;
    }
    const fn = module();
    return Boolean(fn.__isAmbassador);
};
