"use strict";

exports.__esModule = true;
exports.getData = getData;
exports.getPlaceholder = getPlaceholder;
var _imageServiceConstants = require("../../helpers/imageServiceConstants");
var _imageServiceUtils = require("../../helpers/imageServiceUtils");
var _attributes = require("../../engines/attributes");
var _transform = require("../transform");
var _uri = require("../uri");
var _srcset = require("../srcset");
var _imagePlaceholderUtils = require("../../helpers/imagePlaceholderUtils");
const PLACEHOLDER_IMG_CSS_OVERRIDES = {
  width: '100%',
  height: '100%'
};

/**
 * returns image _placeholder_ transform uri and the
 * needed css for alignment and positioning
 *
 * @param {FittingType}             fittingType imageServicesTypes.fittingTypes
 * @param {ImageTransformSource}    src         image
 * @param {ImagePlaceholderTransformTarget}    target      target dimensions
 * @param {ImageTransformOptions} [options]   environment / transformation  options
 *
 * @returns {ImageDataAttributes}
 */
function getPlaceholder(fittingType, src, target, options = {}) {
  const {
    autoEncode = true,
    isSEOBot,
    shouldLoadHQImage,
    hasAnimation,
    allowAnimatedTransform,
    encoding
  } = options;
  if (!(0, _imageServiceUtils.isValidRequest)(fittingType, src, target)) {
    return _imageServiceConstants.emptyData;
  }
  const IS_IN_PLACEHOLDER_FLOW = true;

  // In placeholder flow, allow animated transforms by default unless explicitly disabled
  const shouldAllowAnimatedTransformInPlaceholder = allowAnimatedTransform ?? IS_IN_PLACEHOLDER_FLOW;
  const canTransformImage = (0, _imageServiceUtils.isImageTransformApplicable)(src.id, hasAnimation, shouldAllowAnimatedTransformInPlaceholder);
  if (!canTransformImage || shouldLoadHQImage) {
    /* Either:
     * 1. Transform isn't applicable so target is original size applied with fluid CSS
     * 2. User asked for an HQ image, so they must have supplied target size (width/height)
     */
    return getData(fittingType, src, target, {
      ...options,
      autoEncode,
      useSrcset: canTransformImage
    });
  }

  // If there aren't dimensions, we make them up
  const newTarget = {
    ...target,
    ...(0, _imagePlaceholderUtils.validateTargetDimensions)(src, target)
  };
  const {
    alignment,
    htmlTag
  } = newTarget;
  const isFakeTile = (0, _imagePlaceholderUtils.getIsFakeTile)(fittingType, src, newTarget);
  const scaledDimensions = (0, _imagePlaceholderUtils.getScaledDimensions)(fittingType, src, newTarget, isSEOBot);
  const blur = (0, _imagePlaceholderUtils.getBlurValue)(newTarget.width, fittingType, isSEOBot);
  const convertedFittingType = (0, _imagePlaceholderUtils.getConvertedFitting)(fittingType, isFakeTile);
  const overrideCSS = (0, _imagePlaceholderUtils.getCSSOverrides)(fittingType, src, target, alignment);
  const {
    uri
  } = getData(convertedFittingType, src, {
    ...scaledDimensions,
    alignment,
    htmlTag
  }, {
    autoEncode,
    filters: blur ? {
      blur
    } : {},
    hasAnimation,
    allowAnimatedTransform: shouldAllowAnimatedTransformInPlaceholder,
    encoding,
    isPlaceholderFlow: IS_IN_PLACEHOLDER_FLOW
  });
  const {
    attr = {},
    css
  } = getData(fittingType, src, {
    ...newTarget,
    alignment,
    htmlTag
  }, {});
  css.img = css.img || {};
  css.container = css.container || {};
  Object.assign(css.img, overrideCSS.img, PLACEHOLDER_IMG_CSS_OVERRIDES);
  Object.assign(css.container, overrideCSS.container);
  return {
    uri,
    css,
    attr,
    transformed: true
  };
}

/**
 * returns image transform uri and the
 * needed css for alignment and positioning
 *
 * @param {FittingType}             fittingType         imageServicesTypes.fittingTypes
 * @param {ImageTransformSource}    src                 source image
 * @param {ImageTransformTarget}    target              target component
 * @param {ImageTransformOptions}   [options]          transform options
 *
 * @returns {ImageDataAttributes}
 */
function getData(fittingType, src, target, options) {
  let data = {};

  // check if valid request
  if ((0, _imageServiceUtils.isValidRequest)(fittingType, src, target)) {
    // handle site BG legacy fitting types if needed
    const targetObj = (0, _transform.getTarget)(fittingType, src, target);
    // parse request and create working OBJ
    const transformObj = (0, _transform.getTransform)(fittingType, src, targetObj, options);
    data.uri = (0, _uri.getURI)(fittingType, src, targetObj, options, transformObj);
    if (options != null && options.useSrcset) {
      data.srcset = (0, _srcset.getSrcset)(fittingType, src, targetObj, options, data);
    }

    // set the CSS or the SVG property
    Object.assign(data, (0, _attributes.getAttributes)(transformObj, targetObj), {
      transformed: transformObj.transformed
    });
  } else {
    // empty data
    data = _imageServiceConstants.emptyData;
  }

  // return data to be used in html
  return data;
}
//# sourceMappingURL=api.js.map