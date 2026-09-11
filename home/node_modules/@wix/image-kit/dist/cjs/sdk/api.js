"use strict";

exports.__esModule = true;
exports.getCropImageURL = getCropImageURL;
exports.getScaleToFillImageURL = getScaleToFillImageURL;
exports.getScaleToFitImageURL = getScaleToFitImageURL;
exports.wixStaticWithMedia = exports.wixStatic = void 0;
var _index = require("../api/uri/index");
exports.populateGlobalFeatureSupport = _index.populateGlobalFeatureSupport;
var _imageServiceConstants = require("../helpers/imageServiceConstants");
const wixStatic = exports.wixStatic = 'https://static.wixstatic.com/';
const wixStaticWithMedia = exports.wixStaticWithMedia = 'https://static.wixstatic.com/media/';
const HAS_MEDIA_PREFIX_RE = /^media\//i;
const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
const getWixStaticURL = uri => HAS_MEDIA_PREFIX_RE.test(uri) ? `${wixStatic}${uri}` : `${wixStaticWithMedia}${uri}`;
const getURL = (uri, options) => {
  const baseHostURL = options && options.baseHostURL;
  return baseHostURL ? `${baseHostURL}${uri}` : getWixStaticURL(uri);
};
function getScaleToFitImageURL(relativeUrl, sourceWidth, sourceHeight, targetWidth, targetHeight, options) {
  const data = (0, _index.getData)(_imageServiceConstants.fittingTypes.SCALE_TO_FIT, {
    id: relativeUrl,
    width: sourceWidth,
    height: sourceHeight,
    name: options && options.name
  }, {
    width: targetWidth,
    height: targetHeight,
    htmlTag: _imageServiceConstants.htmlTag.IMG,
    alignment: _imageServiceConstants.alignTypes.CENTER,
    pixelAspectRatio: (options == null ? void 0 : options.devicePixelRatio) ?? devicePixelRatio
  }, options);
  return getURL(data.uri, options);
}
function getScaleToFillImageURL(relativeUrl, sourceWidth, sourceHeight, targetWidth, targetHeight, options) {
  const data = (0, _index.getData)(_imageServiceConstants.fittingTypes.SCALE_TO_FILL, {
    id: relativeUrl,
    width: sourceWidth,
    height: sourceHeight,
    name: options && options.name,
    focalPoint: {
      x: options && options.focalPoint && options.focalPoint.x,
      y: options && options.focalPoint && options.focalPoint.y
    }
  }, {
    width: targetWidth,
    height: targetHeight,
    htmlTag: _imageServiceConstants.htmlTag.IMG,
    alignment: _imageServiceConstants.alignTypes.CENTER,
    pixelAspectRatio: (options == null ? void 0 : options.devicePixelRatio) ?? devicePixelRatio
  }, options);
  return getURL(data.uri, options);
}
function getCropImageURL(relativeUrl, sourceWidth, sourceHeight, cropX, cropY, cropWidth, cropHeight, targetWidth, targetHeight, options) {
  const data = (0, _index.getData)(_imageServiceConstants.fittingTypes.SCALE_TO_FILL, {
    id: relativeUrl,
    width: sourceWidth,
    height: sourceHeight,
    name: options && options.name,
    crop: {
      x: cropX,
      y: cropY,
      width: cropWidth,
      height: cropHeight
    }
  }, {
    width: targetWidth,
    height: targetHeight,
    htmlTag: _imageServiceConstants.htmlTag.IMG,
    alignment: _imageServiceConstants.alignTypes.CENTER,
    pixelAspectRatio: (options == null ? void 0 : options.devicePixelRatio) ?? devicePixelRatio
  }, options);
  return getURL(data.uri, options);
}
//# sourceMappingURL=api.js.map