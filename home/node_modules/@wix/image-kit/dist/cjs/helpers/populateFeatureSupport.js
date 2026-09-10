"use strict";

exports.__esModule = true;
exports.populateGlobalFeatureSupport = populateGlobalFeatureSupport;
var _imageServiceFeatureSupportObject = require("./imageServiceFeatureSupportObject");
/**
 * Populate the global feature support object with browser specific values
 */
function populateGlobalFeatureSupport() {
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    const isSmallScreen = window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
    const isMobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    // set is mobile
    (0, _imageServiceFeatureSupportObject.setFeature)('isMobile', isSmallScreen && isMobileAgent);
  }
}
//# sourceMappingURL=populateFeatureSupport.js.map