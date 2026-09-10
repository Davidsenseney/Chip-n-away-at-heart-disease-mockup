"use strict";

exports.__esModule = true;
exports.setFeature = exports.getFeature = void 0;
const globalFeaturesSupportObj = {
  /**
   * @type {object<boolean>}
   */
  isMobile: false
};
const getFeature = function (feature) {
  return globalFeaturesSupportObj[feature];
};
exports.getFeature = getFeature;
const setFeature = function (feature, value) {
  globalFeaturesSupportObj[feature] = value;
};
exports.setFeature = setFeature;
//# sourceMappingURL=imageServiceFeatureSupportObject.js.map