"use strict";

exports.__esModule = true;
exports.getAlignedRect = getAlignedRect;
exports.getAlignment = getAlignment;
exports.getDevicePixelRatio = getDevicePixelRatio;
exports.getDimension = getDimension;
exports.getFileExtension = getFileExtension;
exports.getFileName = getFileName;
exports.getFileType = getFileType;
exports.getFocalPoint = getFocalPoint;
exports.getOverlappingRect = getOverlappingRect;
exports.getPreferredImageQuality = getPreferredImageQuality;
exports.getScaleFactor = getScaleFactor;
exports.getTransformData = getTransformData;
exports.getUpscaleString = getUpscaleString;
exports.imageIsAnimated = imageIsAnimated;
exports.isAVIF = isAVIF;
exports.isExternalUrl = isExternalUrl;
exports.isGIF = isGIF;
exports.isImageTransformApplicable = isImageTransformApplicable;
exports.isImageTypeSupported = isImageTypeSupported;
exports.isPNG = isPNG;
exports.isSEOBot = isSEOBot;
exports.isValidRequest = isValidRequest;
exports.isWEBP = isWEBP;
exports.roundToFixed = roundToFixed;
var _imageServiceConstants = require("./imageServiceConstants");
var _utils = require("./utils");
const SUPPORTED_IMAGE_EXTENSIONS = [_imageServiceConstants.fileType.PNG, _imageServiceConstants.fileType.JPEG, _imageServiceConstants.fileType.JPG, _imageServiceConstants.fileType.JPE, _imageServiceConstants.fileType.WIX_ICO_MP, _imageServiceConstants.fileType.WIX_MP, _imageServiceConstants.fileType.WEBP, _imageServiceConstants.fileType.AVIF];
const JPG_EXTENSIONS = [_imageServiceConstants.fileType.JPEG, _imageServiceConstants.fileType.JPG, _imageServiceConstants.fileType.JPE];

/**
 * checks if image type is supported
 * @param {string}     uri      image source uri
 *
 * @returns {boolean}
 */
function isImageTypeSupported(uri) {
  return SUPPORTED_IMAGE_EXTENSIONS.includes(getFileExtension(uri));
}

/**
 * check request integrity
 * @param {FittingType}             fittingType         imageService.fittingTypes
 * @param {ImageTransformSource}    src
 * @param {ImageTransformTarget}    target
 *
 * @returns {boolean}
 */
function isValidRequest(fittingType, src, target) {
  return target && src && !isUrlEmptyOrNone(src.id) && Object.values(_imageServiceConstants.fittingTypes).includes(fittingType);
}

/**
 * Returns true if animated WebP/AVIF images can be transformed.
 * These formats can only be transformed when explicitly allowed via allowAnimatedTransform.
 *
 * @param uri - Image URI to check
 * @param hasAnimation - Whether the image has animation metadata
 * @param allowAnimatedTransform - Whether animated transforms are allowed (used in placeholder flow)
 * @returns true if the image can be transformed
 */
function canTransformAnimatedWebpOrAvif(uri, hasAnimation, allowAnimatedTransform) {
  const isAvifWebpFormat = isWEBP(uri) || isAVIF(uri);
  if (!isAvifWebpFormat || !hasAnimation) {
    return true;
  }
  return allowAnimatedTransform;
}

/**
 * Returns true if a GIF can be transformed.
 * GIFs can be transformed in two scenarios:
 * 1. In placeholder flow when allowAnimatedTransform is true
 * 2. In non-placeholder flow when allowFullGIFTransformation is true
 *
 * @param uri - Image URI to check
 * @param allowAnimatedTransform - Whether animated transforms are allowed (used in placeholder flow)
 * @param allowFullGIFTransformation - Whether full GIF transformation is allowed (used in non-placeholder flow)
 * @returns true if the GIF can be transformed
 */
function canTransformGIF(uri, allowAnimatedTransform, allowFullGIFTransformation) {
  if (!isGIF(uri)) {
    return false;
  }
  return !!(allowAnimatedTransform || allowFullGIFTransformation);
}

/**
 * Check if image transform is supported for source image.
 * Returns true if:
 * - Image is a supported type (PNG, JPEG, WebP, AVIF, etc.), OR
 * - Image is a GIF that can be transformed (see canTransformGIF)
 *
 * @param uri - Image URI to check
 * @param hasAnimation - Whether the image has animation metadata
 * @param allowAnimatedTransform - Whether animated transforms are allowed (used in placeholder flow)
 * @param allowFullGIFTransformation - Whether full GIF transformation is allowed (used in non-placeholder flow)
 * @returns true if the image can be transformed
 */
function isImageTransformApplicable(uri, hasAnimation, allowAnimatedTransform, allowFullGIFTransformation) {
  // External URLs cannot be transformed
  if (isExternalUrl(uri)) {
    return false;
  }

  // Check if animated webp/avif can be transformed
  if (!canTransformAnimatedWebpOrAvif(uri, hasAnimation, allowAnimatedTransform)) {
    return false;
  }

  // Check if image type is supported or if it's a transformable GIF
  const isSupportedImageType = isImageTypeSupported(uri);
  const isTransformableGif = canTransformGIF(uri, allowAnimatedTransform, allowFullGIFTransformation);
  return isSupportedImageType || isTransformableGif;
}

/**
 * returns true if image is of JPG type
 * @param {string}  uri
 *
 * @returns {boolean}
 */
function isJPG(uri) {
  return JPG_EXTENSIONS.includes(getFileExtension(uri));
}

/**
 * returns true if image is of PNG type
 * @param {string}  uri
 *
 * @returns {boolean}
 */
function isPNG(uri) {
  return getFileExtension(uri) === _imageServiceConstants.fileType.PNG;
}

/**
 * returns true if image is of webP type
 * @param {string}  uri
 *
 * @returns {boolean}
 */
function isWEBP(uri) {
  return getFileExtension(uri) === _imageServiceConstants.fileType.WEBP;
}

/**
 * returns true if image is of GIF type
 * @param {string}  uri
 *
 * @returns {boolean}
 */
function isGIF(uri) {
  return getFileExtension(uri) === _imageServiceConstants.fileType.GIF;
}

/**
 * returns true if image is of webP type
 * @param {string}  uri
 *
 * @returns {boolean}
 */
function isAVIF(uri) {
  return getFileExtension(uri) === _imageServiceConstants.fileType.AVIF;
}

/**
 * returns true if the url starts with http, https, // or data
 * @param {string}  url
 *
 * @returns {boolean}
 */
function isExternalUrl(url) {
  return /(^https?)|(^data)|(^\/\/)/.test(url);
}

/**
 * returns true if the url empty or none string
 * @param {string}  url
 *
 * @returns {boolean}
 */
function isUrlEmptyOrNone(url) {
  return !url || !url.trim() || url.toLowerCase() === 'none';
}

/**
 * returns search bot true or false as indicated in options
 * @param {ImageTransformOptions}   options
 *
 * @returns {boolean}
 */
function isSEOBot(options) {
  return (options == null ? void 0 : options.isSEOBot) ?? false;
}

// https://jira.wixpress.com/browse/WEED-12667
// const illegalChars = ['/', '\\', '#', '^', '?', '{', '}', '<', '>', '|', '`', '“', ':', '"'].map(encodeURIComponent)
const ILLEGAL_CHARS = ['/', '\\', '?', '<', '>', '|', '“', ':', '"'].map(encodeURIComponent);
const URL_SAFE_ILLEGAL_CHARS = ['\\.', '\\*'];
const ILLEGAL_CHARS_REPLACEMENT = '_';

/**
 * returns source image file name (no extension)
 * @param {string}     uri      image source uri
 * @param {string}     [name]   optional image source name
 *
 * @returns {string}
 */
function getFileName(uri, name) {
  const beforeLeadingSlashRegexp = /\/(.*?)$/;
  const fileExtensionRegexp = /\.([^.]*)$/;
  const illegalCharsRegex = new RegExp(`(${ILLEGAL_CHARS.concat(URL_SAFE_ILLEGAL_CHARS).join('|')})`, 'g');

  // if name is a non empty string, remove only supported extension if exists and url encode the string
  if (name && name.length) {
    let fileName = name;
    const extension = name.match(fileExtensionRegexp);
    if (extension && SUPPORTED_IMAGE_EXTENSIONS.includes(extension[1])) {
      fileName = name.replace(fileExtensionRegexp, '');
    }
    return encodeURIComponent(fileName).replace(illegalCharsRegex, ILLEGAL_CHARS_REPLACEMENT);
  }

  // else, trim any preceding media structure from the uri string (like "media/" etc.) and remove extension
  const trimmed = uri.match(beforeLeadingSlashRegexp);
  const fileName = trimmed ? trimmed[1] : uri;
  return fileName.replace(fileExtensionRegexp, '');
}

/**
 * returns source image file name (no extension)
 * @param {string}     uri      image source uri
 *
 * @returns {FileType}
 */
function getFileType(uri) {
  if (isJPG(uri)) {
    return _imageServiceConstants.fileType.JPG;
  } else if (isPNG(uri)) {
    return _imageServiceConstants.fileType.PNG;
  } else if (isWEBP(uri)) {
    return _imageServiceConstants.fileType.WEBP;
  } else if (isGIF(uri)) {
    return _imageServiceConstants.fileType.GIF;
  } else if (isAVIF(uri)) {
    return _imageServiceConstants.fileType.AVIF;
  }
  return _imageServiceConstants.fileType.UNRECOGNIZED;
}

/**
 * returns source image file extension
 * @param {string}     uri      image source uri
 *
 * @returns {string}
 */
function getFileExtension(uri) {
  const splitURI = /[.]([^.]+)$/.exec(uri);
  return (splitURI && /[.]([^.]+)$/.exec(uri)[1] || '').toLowerCase();
}

/**
 * returns scale factor needed if FIT fitting
 * @param {number}  sWidth
 * @param {number}  sHeight
 * @param {number}  dWidth
 * @param {number}  dHeight
 *
 * @returns {number}
 */
function getFitScaleFactor(sWidth, sHeight, dWidth, dHeight) {
  return Math.min(dWidth / sWidth, dHeight / sHeight);
}

/**
 * returns scale factor needed if FILL fitting
 * @param {number}  sWidth
 * @param {number}  sHeight
 * @param {number}  dWidth
 * @param {number}  dHeight
 *
 * @returns {number}
 */
function getFillScaleFactor(sWidth, sHeight, dWidth, dHeight) {
  return Math.max(dWidth / sWidth, dHeight / sHeight);
}

/**
 * returns scale factor source target
 * @param {number}  sWidth
 * @param {number}  sHeight
 * @param {number}  dWidth
 * @param {number}  dHeight
 * @param {string}  transformType
 *
 * @returns {number}
 */
function getScaleFactor(sWidth, sHeight, dWidth, dHeight, transformType) {
  let scaleFactor;
  if (transformType === _imageServiceConstants.transformTypes.FILL) {
    scaleFactor = getFillScaleFactor(sWidth, sHeight, dWidth, dHeight);
  } else if (transformType === _imageServiceConstants.transformTypes.FIT) {
    scaleFactor = getFitScaleFactor(sWidth, sHeight, dWidth, dHeight);
  } else {
    scaleFactor = 1;
  }
  return scaleFactor;
}

/**
 * get calculated scale factor , width and height while considering wixmp image transform dimension limits
 * @param sWidth
 * @param sHeight
 * @param dWidth
 * @param dHeight
 * @param transformType
 * @returns {{scaleFactor: *, width: *, height: *}}
 */
function getSafeTransformData(sWidth, sHeight, dWidth, dHeight, transformType) {
  let scaleFactor;
  // defaults for FILL transform type
  let width = dWidth;
  let height = dHeight;

  // calculate safe image transformed area
  scaleFactor = getScaleFactor(sWidth, sHeight, dWidth, dHeight, transformType);
  if (transformType === _imageServiceConstants.transformTypes.FIT) {
    width = sWidth * scaleFactor;
    height = sHeight * scaleFactor;
  }

  // adjust target width & height & scaleFactor
  if (width && height && width * height > _imageServiceConstants.SAFE_TRANSFORMED_AREA) {
    const dimensionScaleFactor = Math.sqrt(_imageServiceConstants.SAFE_TRANSFORMED_AREA / (width * height));
    width *= dimensionScaleFactor;
    height *= dimensionScaleFactor;
    // get the new scale factor
    scaleFactor = getScaleFactor(sWidth, sHeight, width, height, transformType);
  }
  return {
    scaleFactor,
    width,
    height
  };
}

/**
 * returns the destination rectangle
 * @param {number}                  sWidth
 * @param {number}                  sHeight
 * @param {TransformType}           transformType
 * @param {ImageTransformTarget}    target
 * @param {number}                  dpr - device pixel ratio
 * @param {UpscaleMethod}           upscaleMethod
 *
 * @returns {ImageTransformData & {upscaleMethodValue: number}}
 */
function getTransformData(sWidth, sHeight, transformType, target, dpr, upscaleMethod) {
  // use target dimension is src not provided
  sWidth = sWidth || target.width;
  sHeight = sHeight || target.height;

  // adjust image transform values considering server side transform limitations and performance
  const {
    scaleFactor,
    width,
    height
  } = getSafeTransformData(sWidth, sHeight, target.width * dpr, target.height * dpr, transformType);

  // adjust image transform values to optimizing upsacle quality and payload
  return getOptimizedTransformData(sWidth, sHeight, width, height, upscaleMethod, scaleFactor, transformType);
}

/**
 * converts 9 grid alignment to Focal point position
 * @param {string}  [alignment]
 *
 * @returns {x:number,y:number}
 */

function getFocalPointFrom9GridAlignment(alignment = _imageServiceConstants.alignTypes.CENTER) {
  return _imageServiceConstants.ALIGN_TYPE_TO_FOCAL_POINT[alignment];
}

/**
 * returns overlapping rectangle where sRect
 * id aligned (according to alignment) within dRect
 * @param {{ width: number; height: number }} sRect rect 1
 * @param {{ width: number, height: number }} dRect rect 2
 * @param {{x: number, y: number}|undefined}  sFP   source image focal point
 * @param {string}                            alignment
 *
 * @returns {{x: number, y: number, width: number, height: number}}
 */
function getAlignedRect(sRect, dRect, sFP, alignment) {
  const fp = getFocalPoint(sFP) || getFocalPointFrom9GridAlignment(alignment);
  const x = Math.max(0, Math.min(sRect.width - dRect.width, fp.x * sRect.width - dRect.width / 2));
  const y = Math.max(0, Math.min(sRect.height - dRect.height, fp.y * sRect.height - dRect.height / 2));

  // rect
  return {
    x,
    y,
    width: Math.min(sRect.width, dRect.width),
    height: Math.min(sRect.height, dRect.height)
  };
}

/**
 * returns overlapping rectangle between sRect and dRect
 * @param {object}      sRect         rect 1
 * @param {object}      dRect         rect 2
 *
 * @returns {{x:number,y:number,width:number, height:number} || null}
 */
function getOverlappingRect(sRect, dRect) {
  const width = Math.max(0, Math.min(sRect.width, dRect.x + dRect.width) - Math.max(0, dRect.x));
  const height = Math.max(0, Math.min(sRect.height, dRect.y + dRect.height) - Math.max(0, dRect.y));
  const isValidRect = width && height && (sRect.width !== width || sRect.height !== height);

  // return overlapping sRect/dRect rectangle(x, y, width, height)
  return isValidRect ? {
    x: Math.max(0, dRect.x),
    y: Math.max(0, dRect.y),
    width,
    height
  } : null;
}

/**
 * returns pixel aspect ratio value
 * @param {ImageTransformTarget}    target
 *
 * @returns {number}
 */
function getDevicePixelRatio(target) {
  return Math.min(target.pixelAspectRatio || 1, _imageServiceConstants.MAX_DEVICE_PIXEL_RATIO);
}

/**
 * returns target alignment value
 * @param {ImageTransformTarget}    target
 *
 * @returns {string}
 */
function getAlignment(target) {
  return target.alignment && _imageServiceConstants.alignTypesMap[target.alignment] || _imageServiceConstants.alignTypesMap[_imageServiceConstants.alignTypes.CENTER];
}

/**
 * returns the focal point value, if no focal point passed use alignment
 * @param {{x: number, y: number}|undefined} focalPoint
 */
function getFocalPoint(focalPoint) {
  let fp;
  if (focalPoint && typeof focalPoint.x === 'number' && !isNaN(focalPoint.x) && typeof focalPoint.y === 'number' && !isNaN(focalPoint.y)) {
    fp = {
      x: roundToFixed(Math.max(0, Math.min(100, focalPoint.x)) / 100, 2),
      y: roundToFixed(Math.max(0, Math.min(100, focalPoint.y)) / 100, 2)
    };
  }
  return fp;
}

/**
 * returns preferred image quality value
 * @param {number}    imageWidth
 * @param {number}    imageHeight
 *
 * @returns {number}
 */
function getPreferredImageQuality(imageWidth, imageHeight) {
  return _imageServiceConstants.imageScaleDefaults[getImageQualityKey(imageWidth, imageHeight)].quality;
}

/**
 * returns the scale descriptor of CLASSIC upscale method
 * @param sWidth
 * @param sHeight
 * @returns {{optimizedScaleFactor: number, upscaleMethodValue: number, forceUSM: boolean}}
 */
function getClassicScaleData(sWidth, sHeight) {
  const imageKey = getImageQualityKey(sWidth, sHeight);
  return {
    optimizedScaleFactor: _imageServiceConstants.imageScaleDefaults[imageKey].maxUpscale,
    upscaleMethodValue: _imageServiceConstants.upscaleMethodsValues.classic,
    forceUSM: false
  };
}

/**
 * returns the scale descriptor of AUTO upscale method
 * @param sWidth
 * @param sHeight
 * @returns {{optimizedScaleFactor: number, upscaleMethodValue: number, forceUSM: boolean}}
 */
function getAutoScaleData(sWidth, sHeight) {
  const imageKey = getImageQualityKey(sWidth, sHeight);
  return {
    optimizedScaleFactor: _imageServiceConstants.imageScaleDefaults[imageKey].maxUpscale,
    upscaleMethodValue: _imageServiceConstants.upscaleMethodsValues.classic,
    forceUSM: false
  };
}

/**
 * returns the scale descriptor of SUPER upscale method
 * @param scaleFactor
 * @returns {{optimizedScaleFactor: number, upscaleMethodValue: number, forceUSM: boolean}}
 */
function getSuperScaleData(scaleFactor) {
  return {
    optimizedScaleFactor: (0, _utils.last)(_imageServiceConstants.SUPER_UPSCALE_MODELS),
    upscaleMethodValue: _imageServiceConstants.upscaleMethodsValues.super,
    forceUSM: !(_imageServiceConstants.SUPER_UPSCALE_MODELS.includes(scaleFactor) || scaleFactor > (0, _utils.last)(_imageServiceConstants.SUPER_UPSCALE_MODELS))
  };
}

/**
 * returns upscale descriptor object
 * @param {number}    sWidth
 * @param {number}    sHeight
 * @param {string}    upscaleMethod
 * @param {number}    scaleFactor
 *
 * @returns  {{maxScale: number, upscaleMethodValue: number, forceUSM: boolean}}
 */
function getOptimizedScaleData(sWidth, sHeight, scaleFactor, upscaleMethod) {
  if (upscaleMethod === 'auto') {
    return getAutoScaleData(sWidth, sHeight);
  } else if (upscaleMethod === 'super') {
    return getSuperScaleData(scaleFactor);
  }

  // assuming 'classic' method
  return getClassicScaleData(sWidth, sHeight);
}

/**
 * returns optimized upscale data, considering requested upscale method , optimize upscale for best quality and bandwidth
 * @param {number}    sWidth
 * @param {number}    sHeight
 * @param {number}    tWidth
 * @param {number}    tHeight
 * @param {UpscaleMethod}    upscaleMethod
 * @param {number}    scaleFactor
 * @param {TransformType}    transformType
 *
 * @returns  {ImageTransformData}
 */
function getOptimizedTransformData(sWidth, sHeight, tWidth, tHeight, upscaleMethod, scaleFactor, transformType) {
  const {
    optimizedScaleFactor,
    upscaleMethodValue,
    forceUSM
  } = getOptimizedScaleData(sWidth, sHeight, scaleFactor, upscaleMethod);
  let width = tWidth;
  let height = tHeight;
  if (scaleFactor <= optimizedScaleFactor) {
    // target upscale within limits or downscale
    return {
      width,
      height,
      scaleFactor,
      upscaleMethodValue,
      forceUSM,
      cssUpscaleNeeded: false
    };
  }
  // limited upscale
  switch (transformType) {
    case _imageServiceConstants.transformTypes.FILL:
      width = tWidth * (optimizedScaleFactor / scaleFactor);
      height = tHeight * (optimizedScaleFactor / scaleFactor);
      break;
    case _imageServiceConstants.transformTypes.FIT:
      width = sWidth * optimizedScaleFactor;
      height = sHeight * optimizedScaleFactor;
      break;
    default:
      break;
  }
  // adjust transform values
  return {
    width,
    height,
    scaleFactor: optimizedScaleFactor,
    upscaleMethodValue,
    forceUSM,
    cssUpscaleNeeded: true
  };
}

/**
 * returns image quality key
 * @param {number}    imageWidth
 * @param {number}    imageHeight
 *
 * @returns {ImageQuality}
 */
function getImageQualityKey(imageWidth, imageHeight) {
  const size = imageWidth * imageHeight;
  if (size > _imageServiceConstants.imageScaleDefaults[_imageServiceConstants.imageQuality.HIGH].size) {
    return _imageServiceConstants.imageQuality.HIGH;
  } else if (size > _imageServiceConstants.imageScaleDefaults[_imageServiceConstants.imageQuality.MEDIUM].size) {
    return _imageServiceConstants.imageQuality.MEDIUM;
  } else if (size > _imageServiceConstants.imageScaleDefaults[_imageServiceConstants.imageQuality.LOW].size) {
    return _imageServiceConstants.imageQuality.LOW;
  }
  return _imageServiceConstants.imageQuality.TINY;
}

/**
 * return the actual rounded dimension of a scaled rectangle
 * @param sWidth
 * @param sHeight
 * @param tWidth
 * @param tHeight
 * @param transformType
 * @returns {{width: number, height: number}}
 */
function getDimension(sWidth, sHeight, tWidth, tHeight, transformType) {
  const scaleFactor = getScaleFactor(sWidth, sHeight, tWidth, tHeight, transformType);
  return {
    width: Math.round(sWidth * scaleFactor),
    height: Math.round(sHeight * scaleFactor)
  };
}

/**
 * rounds number n digit precision and converts to string
 * @param {number}      value
 * @param {number}      precision
 *
 * @returns {string}
 */
function roundToFixed(value, precision) {
  const truncatePrecision = Math.pow(10, precision || 0);
  return (value * truncatePrecision / truncatePrecision).toFixed(precision);
}

/**
 * get normalize scale method
 * @param {ImageTransformOptions} [options]
 * @returns {UpscaleMethod}
 */
function getUpscaleString(options) {
  if (!options || !options.upscaleMethod) {
    return _imageServiceConstants.upscaleMethods.AUTO;
  }
  return _imageServiceConstants.upscaleMethods[options.upscaleMethod.toUpperCase()] || _imageServiceConstants.upscaleMethods.AUTO;
}
function imageIsAnimated(uri, hasAnimation) {
  const isAvifWebpFormat = isWEBP(uri) || isAVIF(uri);
  return getFileExtension(uri) === _imageServiceConstants.fileType.GIF || isAvifWebpFormat && hasAnimation;
}
//# sourceMappingURL=imageServiceUtils.js.map