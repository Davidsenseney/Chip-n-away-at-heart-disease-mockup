"use strict";

exports.__esModule = true;
exports.getData = getData;
var _imageServiceConstants = require("../../helpers/imageServiceConstants");
exports.fittingTypes = _imageServiceConstants.fittingTypes;
exports.alignTypes = _imageServiceConstants.alignTypes;
exports.htmlTag = _imageServiceConstants.htmlTag;
exports.upscaleMethods = _imageServiceConstants.upscaleMethods;
var _imageServiceUtils = require("../../helpers/imageServiceUtils");
var _populateFeatureSupport = require("../../helpers/populateFeatureSupport");
exports.populateGlobalFeatureSupport = _populateFeatureSupport.populateGlobalFeatureSupport;
var _transform = require("../transform");
var _uri = require("../uri");
/**
 * returns image transform uri
 *
 * @param {FittingType}             fittingType         imageServicesTypes.fittingTypes
 * @param {ImageTransformSource}    src                 source image
 * @param {ImageTransformTarget}    target              target component
 * @param {ImageTransformOptions}   [options]           transform options
 *
 * @returns {{uri: string}}
 */
function getData(fittingType, src, target, options) {
  // check if valid request
  if ((0, _imageServiceUtils.isValidRequest)(fittingType, src, target)) {
    // handle site BG legacy fitting types
    const targetObj = (0, _transform.getTarget)(fittingType, src, target);
    // parse request and create working OBJ
    const transformObj = (0, _transform.getTransform)(fittingType, src, targetObj, options);
    return {
      uri: (0, _uri.getURI)(fittingType, src, targetObj, options || {}, transformObj)
    };
  }
  return {
    uri: ''
  };
}
//# sourceMappingURL=index.js.map