"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphql = void 0;
const rest_modules_1 = require("@wix/sdk-runtime/rest-modules");
const fetch_error_js_1 = require("./fetch-error.js");
exports.graphql = (0, rest_modules_1.createRESTModule)(((restModuleOpts) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    return async function graphql(query, variables, opts = {
        apiVersion: 'alpha',
    }) {
        const res = await restModuleOpts.wixAPIFetch(`/graphql/${opts.apiVersion}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables }),
        });
        if (res.status !== 200) {
            throw new fetch_error_js_1.FetchErrorResponse(`GraphQL request failed with status ${res.status}`, res);
        }
        const { data, errors } = await res.json();
        return { data: data ?? {}, errors };
    };
}));
