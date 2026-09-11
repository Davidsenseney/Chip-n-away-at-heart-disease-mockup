"use strict";

exports.__esModule = true;
var _exportNames = {
  STATIC_MEDIA_URL: true,
  MEDIA_ROOT_URL: true,
  sdk: true,
  alignTypes: true,
  fittingTypes: true,
  htmlTag: true,
  upscaleMethods: true,
  fileType: true,
  isWEBP: true,
  getFileExtension: true,
  populateGlobalFeatureSupport: true,
  getData: true,
  getPlaceholder: true,
  getResponsiveImageProps: true
};
exports.sdk = exports.STATIC_MEDIA_URL = exports.MEDIA_ROOT_URL = void 0;
var _imageServiceConstants = require("../../helpers/imageServiceConstants");
exports.alignTypes = _imageServiceConstants.alignTypes;
exports.fittingTypes = _imageServiceConstants.fittingTypes;
exports.htmlTag = _imageServiceConstants.htmlTag;
exports.upscaleMethods = _imageServiceConstants.upscaleMethods;
exports.fileType = _imageServiceConstants.fileType;
var _imageServiceUtils = require("../../helpers/imageServiceUtils");
exports.isWEBP = _imageServiceUtils.isWEBP;
exports.getFileExtension = _imageServiceUtils.getFileExtension;
var _populateFeatureSupport = require("../../helpers/populateFeatureSupport");
exports.populateGlobalFeatureSupport = _populateFeatureSupport.populateGlobalFeatureSupport;
var _api = require("./api");
exports.getData = _api.getData;
exports.getPlaceholder = _api.getPlaceholder;
var _sdk = require("../../sdk");
var _responsiveImageUtils = require("../../helpers/responsiveImageUtils");
exports.getResponsiveImageProps = _responsiveImageUtils.getResponsiveImageProps;
var _types = require("../../types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  exports[key] = _types[key];
});
(0, _populateFeatureSupport.populateGlobalFeatureSupport)();
const sdk = exports.sdk = {
  getScaleToFitImageURL: _sdk.getScaleToFitImageURL,
  getScaleToFillImageURL: _sdk.getScaleToFillImageURL,
  getCropImageURL: _sdk.getCropImageURL
};
const STATIC_MEDIA_URL = exports.STATIC_MEDIA_URL = _sdk.wixStaticWithMedia;
const MEDIA_ROOT_URL = exports.MEDIA_ROOT_URL = _sdk.wixStatic;
//# sourceMappingURL=index.js.map