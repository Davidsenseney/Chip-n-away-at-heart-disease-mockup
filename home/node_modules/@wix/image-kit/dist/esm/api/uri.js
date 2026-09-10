import { isAVIF, isImageTransformApplicable, isWEBP, } from '../helpers/imageServiceUtils';
import { getImageURI } from '../engines/transforms';
import { getTransform } from './transform';
/**
 * returns image transform uri
 *
 * @param {string}                  fittingType         imageServicesTypes.fittingTypes
 * @param {ImageTransformSource}    src                 source image
 * @param {ImageTransformTarget}    target              target component
 * @param {ImageTransformOptions}   options             transform options
 * @param {Object}                  [transformObj]      transform data object to use
 *
 * @returns {string}
 */
function getURI(fittingType, src, target, options = {}, transformObj) {
    // check if image transformation is applicable (e.g. .gif, .wix_mp)
    if (isImageTransformApplicable(src.id, options?.hasAnimation, options?.allowAnimatedTransform, options?.allowFullGIFTransformation)) {
        if ((isWEBP(src.id) || isAVIF(src.id)) &&
            !options.allowWebpAvifTransforms) {
            // exclude alignment, focalPoint and crop from webp and avif transformation in order not to break webp or avif images before transformation was enabled
            const { alignment, ...transformTarget } = target;
            src.focalPoint = { x: undefined, y: undefined };
            delete src?.crop;
            transformObj = getTransform(fittingType, src, transformTarget, options);
        }
        else {
            transformObj =
                transformObj || getTransform(fittingType, src, target, options);
        }
        // set the uri property
        return getImageURI(transformObj);
    }
    return src.id;
}
export { getURI };
//# sourceMappingURL=uri.js.map