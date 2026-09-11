"use strict";

exports.__esModule = true;
exports.setTransformOptions = setTransformOptions;
var _utils = require("./utils");
var _imageServiceUtils = require("./imageServiceUtils");
var _imageServiceConstants = require("./imageServiceConstants");
/**
 * returns image filters part of the image transform uri
 * @param {ImageTransformObject}    transformsObj    transform parts object
 * @param {ImageTransformOptions}   [options]
 */
function setTransformOptions(transformsObj, options) {
  var _options;
  options = options || {};
  // options - general
  transformsObj.quality = getQuality(transformsObj, options);
  transformsObj.progressive = getProgressive(options);
  transformsObj.watermark = getWatermark(options);
  transformsObj.autoEncode = options.autoEncode ?? true;
  transformsObj.encoding = (_options = options) == null ? void 0 : _options.encoding;
  // options - filters & adjustments
  transformsObj.unsharpMask = getUnsharpMask(transformsObj, options);
  transformsObj.filters = getFilters(options);
}

/**
 *
 * @param {ImageTransformOptions}   options
 * @returns {string}
 */
function getWatermark(options) {
  return options.watermark;
}

/**
 * returns progressive if required
 * @param {ImageTransformOptions}   options
 *
 * @returns {boolean}
 */
function getProgressive(options) {
  return options.progressive !== false;
}

/**
 * returns image filters part of the image transform uri
 * @param {ImageTransformObject}    transformsObj    transform parts object
 * @param {ImageTransformOptions}   options
 *
 * @returns {number}
 */
function getQuality(transformsObj, options) {
  const isPNG = transformsObj.fileType === _imageServiceConstants.fileType.PNG;
  const isJPG = transformsObj.fileType === _imageServiceConstants.fileType.JPG;
  const isWEBP = transformsObj.fileType === _imageServiceConstants.fileType.WEBP;
  const isAVIF = transformsObj.fileType === _imageServiceConstants.fileType.AVIF;
  const isQualitySupported = isJPG || isPNG || isWEBP || isAVIF;
  if (isQualitySupported) {
    const transformData = (0, _utils.last)(transformsObj.parts);
    const defaultQuality = (0, _imageServiceUtils.getPreferredImageQuality)(transformData.width, transformData.height);
    let quality = options.quality && options.quality >= 5 && options.quality <= 90 ? options.quality : defaultQuality;
    // increase quality by 5 for webp images
    quality = isPNG ? quality + 5 : quality;
    return quality;
  }
  // quality not supported
  return 0;
}

/**
 * returns the desired transformed image filters
 * @param {ImageTransformOptions}   options
 *
 * @returns {object}
 */
function getFilters(options) {
  const filterOptions = options.filters || {};
  const filters = {};

  // contrast
  if (isValidImageFilter(filterOptions[_imageServiceConstants.imageFilters.CONTRAST], -100, 100)) {
    filters[_imageServiceConstants.imageFilters.CONTRAST] = filterOptions[_imageServiceConstants.imageFilters.CONTRAST];
  }

  // brightness
  if (isValidImageFilter(filterOptions[_imageServiceConstants.imageFilters.BRIGHTNESS], -100, 100)) {
    filters[_imageServiceConstants.imageFilters.BRIGHTNESS] = filterOptions[_imageServiceConstants.imageFilters.BRIGHTNESS];
  }

  // saturation
  if (isValidImageFilter(filterOptions[_imageServiceConstants.imageFilters.SATURATION], -100, 100)) {
    filters[_imageServiceConstants.imageFilters.SATURATION] = filterOptions[_imageServiceConstants.imageFilters.SATURATION];
  }

  // hue
  if (isValidImageFilter(filterOptions[_imageServiceConstants.imageFilters.HUE], -180, 180)) {
    filters[_imageServiceConstants.imageFilters.HUE] = filterOptions[_imageServiceConstants.imageFilters.HUE];
  }

  // blur
  if (isValidImageFilter(filterOptions[_imageServiceConstants.imageFilters.BLUR], 0, 100)) {
    filters[_imageServiceConstants.imageFilters.BLUR] = filterOptions[_imageServiceConstants.imageFilters.BLUR];
  }
  return filters;
}

/**
 * indicates if requested filter value is valid
 * @param {number|undefined}  filterValue     filter's value
 * @param {number}  minValue        min range
 * @param {number}  maxValue        max range
 *
 * @returns {boolean}
 */
function isValidImageFilter(filterValue, minValue, maxValue) {
  // check if filter name and filter values range valid
  return typeof filterValue === 'number' && !isNaN(filterValue) && filterValue !== 0 && filterValue >= minValue && filterValue <= maxValue;
}

/**
 * returns the desired transformed image unSharpMask values
 * @param {ImageTransformObject}    transformsObj    transform parts object
 * @param {ImageTransformOptions}   options
 *
 * @returns {object}
 */
function getUnsharpMask(transformsObj, options) {
  // If options.unsharpMask is a valid value, use it
  if (isUSMValid(options.unsharpMask)) {
    var _options$unsharpMask, _options$unsharpMask2, _options$unsharpMask3;
    // If we got usm, change values to have trailing zeros (.00), else return undefined
    return {
      radius: (0, _imageServiceUtils.roundToFixed)((_options$unsharpMask = options.unsharpMask) == null ? void 0 : _options$unsharpMask.radius, 2),
      amount: (0, _imageServiceUtils.roundToFixed)((_options$unsharpMask2 = options.unsharpMask) == null ? void 0 : _options$unsharpMask2.amount, 2),
      threshold: (0, _imageServiceUtils.roundToFixed)((_options$unsharpMask3 = options.unsharpMask) == null ? void 0 : _options$unsharpMask3.threshold, 2)
    };
    // if options.unsharpMask is not all zeros and not valid and usm should be used, use default
  } else if (!isZeroUSM(options.unsharpMask) && isUSMNeeded(transformsObj)) {
    return _imageServiceConstants.defaultUSM;
  }
  return;
}

/**
 * indicates if usm is needed
 * @param {ImageTransformObject}      transformsObj   transform parts object
 *
 * @returns {boolean}
 */
function isUSMNeeded(transformsObj) {
  // ---------------------------------------------------------------------------------------
  // do not apply usm if transformed image width & height is same as source image or larger
  // and no force usm is desired
  // and transform type is not fit
  // ---------------------------------------------------------------------------------------
  const transformPart = (0, _utils.last)(transformsObj.parts);
  const upscale = transformPart.scaleFactor >= 1;

  // return if usm is needed
  return !upscale || transformPart.forceUSM || transformPart.transformType === _imageServiceConstants.transformTypes.FIT;
}

/**
 * indicates if all usm values are presented and in range
 * @param {OptionUnsharpMask|undefined}  usm     unsharp mask
 *
 * @returns {boolean}
 */
function isUSMValid(usm) {
  usm = usm || {};
  const radius = typeof usm.radius === 'number' && !isNaN(usm.radius) && usm.radius >= 0.1 && usm.radius <= 500;
  const amount = typeof usm.amount === 'number' && !isNaN(usm.amount) && usm.amount >= 0 && usm.amount <= 10;
  const threshold = typeof usm.threshold === 'number' && !isNaN(usm.threshold) && usm.threshold >= 0 && usm.threshold <= 255;

  // return is a valid USM data
  return radius && amount && threshold;
}

/**
 * indicates if all usm values are presented and are zero. an explicit request to not apply usm
 * @param {OptionUnsharpMask|undefined}  usm     unsharp mask
 *
 * @returns {boolean}
 */
function isZeroUSM(usm) {
  usm = usm || {};
  return typeof usm.radius === 'number' && !isNaN(usm.radius) && usm.radius === 0 && typeof usm.amount === 'number' && !isNaN(usm.amount) && usm.amount === 0 && typeof usm.threshold === 'number' && !isNaN(usm.threshold) && usm.threshold === 0;
}
//# sourceMappingURL=imageTransformOptions.js.map