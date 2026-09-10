export const isHostModule = (val) => val.__type === 'host';
export function buildHostModule(val, host) {
    return val.create(host);
}
