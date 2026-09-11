"use strict";

exports.__esModule = true;
exports.getTarget = getTarget;
exports.getTransform = getTransform;
var _imageServiceUtils = require("../helpers/imageServiceUtils");
var _browserFeatureSupport = require("../helpers/browserFeatureSupport");
var _imageTransformParts = require("../helpers/imageTransformParts");
var _imageTransformOptions = require("../helpers/imageTransformOptions");
var _imageServiceConstants = require("../helpers/imageServiceConstants");
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
function getTransform(fittingType, src, target, options) {
  const _isSEOBot = (0, _imageServiceUtils.isSEOBot)(options);
  const fileType = (0, _imageServiceUtils.getFileType)(src.id);
  const fileName = (0, _imageServiceUtils.getFileName)(src.id, src.name);
  const devicePixelRatio = _isSEOBot ? 1 : (0, _imageServiceUtils.getDevicePixelRatio)(target);
  const fileExtension = (0, _imageServiceUtils.getFileExtension)(src.id);
  const preferredExtension = fileExtension;
  const canTransformImage = (0, _imageServiceUtils.isImageTransformApplicable)(src.id, options == null ? void 0 : options.hasAnimation, options == null ? void 0 : options.allowAnimatedTransform, options == null ? void 0 : options.allowFullGIFTransformation);
  const transformsObj = {
    fileName,
    fileExtension,
    fileType,
    fittingType,
    preferredExtension,
    src: {
      id: src.id,
      width: src.width,
      height: src.height,
      isCropped: false,
      isAnimated: (0, _imageServiceUtils.imageIsAnimated)(src.id, options == null ? void 0 : options.hasAnimation)
    },
    focalPoint: {
      x: src.focalPoint && src.focalPoint.x,
      y: src.focalPoint && src.focalPoint.y
    },
    parts: [],
    // options - general
    devicePixelRatio,
    quality: 0,
    upscaleMethod: (0, _imageServiceUtils.getUpscaleString)(options),
    progressive: true,
    watermark: '',
    unsharpMask: {},
    filters: {},
    transformed: canTransformImage,
    allowFullGIFTransformation: options == null ? void 0 : options.allowFullGIFTransformation,
    isPlaceholderFlow: options == null ? void 0 : options.isPlaceholderFlow
  };
  if (canTransformImage) {
    (0, _imageTransformParts.setTransformParts)(transformsObj, src, target);
    (0, _imageTransformOptions.setTransformOptions)(transformsObj, options);
  }
  return transformsObj;
}

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
function getTarget(fittingType, src, target) {
  const targetObj = {
    ...target
  };
  const _isMobile = (0, _browserFeatureSupport.isMobile)();

  // handle site BG legacy fitting types (desktop & mobile)
  switch (fittingType) {
    case _imageServiceConstants.fittingTypes.LEGACY_BG_FIT_AND_TILE:
    case _imageServiceConstants.fittingTypes.LEGACY_BG_FIT_AND_TILE_HORIZONTAL:
    case _imageServiceConstants.fittingTypes.LEGACY_BG_FIT_AND_TILE_VERTICAL:
    case _imageServiceConstants.fittingTypes.LEGACY_BG_NORMAL:
      const maxBGSiteLegacyWidth = _isMobile ? _imageServiceConstants.MOBILE_MAX_BG_SITE_LEGACY_WIDTH : _imageServiceConstants.DSKTP_MAX_BG_SITE_LEGACY_WIDTH;
      const maxBGSiteLegacyHeight = _isMobile ? _imageServiceConstants.MOBILE_MAX_BG_SITE_LEGACY_HEIGHT : _imageServiceConstants.DSKTP_MAX_BG_SITE_LEGACY_HEIGHT;
      targetObj.width = Math.min(maxBGSiteLegacyWidth, src.width);
      targetObj.height = Math.min(maxBGSiteLegacyHeight, Math.round(targetObj.width / (src.width / src.height)));
      // for legacy types force htmlTag='bg' and devicePixelRatio=1
      targetObj.pixelAspectRatio = 1;
  }
  return targetObj;
}
//# sourceMappingURL=transform.js.map