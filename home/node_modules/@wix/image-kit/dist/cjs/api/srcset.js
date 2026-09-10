"use strict";

exports.__esModule = true;
exports.getSrcset = getSrcset;
var _uri = require("./uri");
function getSrcset(fittingType, src, target, options, data) {
  const dpr = target.pixelAspectRatio || 1;
  return {
    dpr: [`${dpr === 1 ? data.uri : (0, _uri.getURI)(fittingType, src, {
      ...target,
      pixelAspectRatio: 1
    }, options)} 1x`, `${dpr === 2 ? data.uri : (0, _uri.getURI)(fittingType, src, {
      ...target,
      pixelAspectRatio: 2
    }, options)} 2x`]
  };
}
//# sourceMappingURL=srcset.js.map