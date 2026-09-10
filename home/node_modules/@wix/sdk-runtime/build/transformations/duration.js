export function transformSDKDurationToRESTDuration(duration) {
    if (!duration) {
        return '0s';
    }
    const { seconds = '0', nanos = 0 } = duration;
    let nanosPortion = '';
    if (nanos !== 0) {
        nanosPortion = `.${nanos.toString().padStart(9, '0')}`;
    }
    return `${seconds}${nanosPortion}s`;
}
export function transformRESTDurationToSDKDuration(val) {
    const [seconds, nanos] = val.substring(0, val.length - 1).split('.');
    return {
        seconds: seconds.length ? seconds : '0',
        nanos: nanosForString(nanos),
    };
}
function nanosForString(nanos) {
    let res = 0;
    if (nanos !== undefined) {
        const precision = 3 - nanos.length / 3;
        res = parseInt(nanos, 10) * Math.pow(1000, precision);
    }
    return res;
}
