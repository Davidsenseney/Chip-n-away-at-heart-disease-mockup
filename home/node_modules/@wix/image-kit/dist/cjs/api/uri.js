"use strict";

exports.__esModule = true;
exports.getURI = getURI;
var _imageServiceUtils = require("../helpers/imageServiceUtils");
var _transforms = require("../engines/transforms");
var _transform = require("./transform");
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
  if ((0, _imageServiceUtils.isImageTransformApplicable)(src.id, options == null ? void 0 : options.hasAnimation, options == null ? void 0 : options.allowAnimatedTransform, options == null ? void 0 : options.allowFullGIFTransformation)) {
    if (((0, _imageServiceUtils.isWEBP)(src.id) || (0, _imageServiceUtils.isAVIF)(src.id)) && !options.allowWebpAvifTransforms) {
      // exclude alignment, focalPoint and crop from webp and avif transformation in order not to break webp or avif images before transformation was enabled
      const {
        alignment,
        ...transformTarget
      } = target;
      src.focalPoint = {
        x: undefined,
        y: undefined
      };
      src == null || delete src.crop;
      transformObj = (0, _transform.getTransform)(fittingType, src, transformTarget, options);
    } else {
      transformObj = transformObj || (0, _transform.getTransform)(fittingType, src, target, options);
    }

    // set the uri property
    return (0, _transforms.getImageURI)(transformObj);
  }
  return src.id;
}
//# sourceMappingURL=uri.js.map