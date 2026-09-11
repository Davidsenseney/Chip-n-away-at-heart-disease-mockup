import type { FittingType, ImageTransformSource, ImageTransformTarget, ImageTransformOptions, ImageTransformObject } from '../types';
/**
 * returns image transform data
 *
 * @param {FittingType}             fittingType         imageServicesTypes.fittingTypes
 * @param {ImageTransformSource}    src                 source image
 * @param {ImageTransformTarget}    target              target component
 * @param {ImageTransformOptions}   [options]           transform options
 *
 * @returns {ImageTransformObject}
 */
declare function getTransform(fittingType: FittingType, src: ImageTransformSource, target: ImageTransformTarget, options?: ImageTransformOptions): ImageTransformObject;
/**
 * returns target data
 * handle legacy BG site if needed
 *
 * @param {FittingType}             fittingType         imageServicesTypes.fittingTypes
 * @param {ImageTransformSource}    src                 source image
 * @param {ImageTransformTarget}    target              target component
 *
 * @returns {Object}
 */
declare function getTarget(fittingType: FittingType, src: ImageTransformSource, target: ImageTransformTarget): {
    width: number;
    height: number;
    pixelAspectRatio?: number | undefined;
    alignment?: import("../types").AlignType | undefined;
    htmlTag?: import("../types").HTMLTag | undefined;
};
export { getTransform, getTarget };
//# sourceMappingURL=transform.d.ts.map