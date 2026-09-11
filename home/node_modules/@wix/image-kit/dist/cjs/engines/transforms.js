"use strict";

exports.__esModule = true;
exports.getImageURI = getImageURI;
var _utils = require("../helpers/utils");
var _imageServiceConstants = require("../helpers/imageServiceConstants");
var _imageServiceUtils = require("../helpers/imageServiceUtils");
// transform templates
const fitTemplate = (0, _utils.template)`fit/w_${'width'},h_${'height'}`;
const fillTemplate = (0, _utils.template)`fill/w_${'width'},h_${'height'},al_${'alignment'}`;
const fillFocalTemplate = (0, _utils.template)`fill/w_${'width'},h_${'height'},fp_${'focalPointX'}_${'focalPointY'}`;
const cropTemplate = (0, _utils.template)`crop/x_${'x'},y_${'y'},w_${'width'},h_${'height'}`;

// legacy templates
const legacyCropTemplate = (0, _utils.template)`crop/w_${'width'},h_${'height'},al_${'alignment'}`;
const legacyFillTemplate = (0, _utils.template)`fill/w_${'width'},h_${'height'},al_${'alignment'}`;

// upscale template
const upscaleTemplate = (0, _utils.template)`,lg_${'upscaleMethodValue'}`;

// options templates
const qualityTemplate = (0, _utils.template)`,q_${'quality'}`;
const qualityAutoTemplate = (0, _utils.template)`,quality_auto`;
const unSharpMaskTemplate = (0, _utils.template)`,usm_${'radius'}_${'amount'}_${'threshold'}`;
const nonProgressiveTemplate = (0, _utils.template)`,bl`;
const watermarkTemplate = (0, _utils.template)`,wm_${'watermark'}`;
const filterTemplatesMap = {
  [_imageServiceConstants.imageFilters.CONTRAST]: (0, _utils.template)`,con_${'contrast'}`,
  [_imageServiceConstants.imageFilters.BRIGHTNESS]: (0, _utils.template)`,br_${'brightness'}`,
  [_imageServiceConstants.imageFilters.SATURATION]: (0, _utils.template)`,sat_${'saturation'}`,
  [_imageServiceConstants.imageFilters.HUE]: (0, _utils.template)`,hue_${'hue'}`,
  [_imageServiceConstants.imageFilters.BLUR]: (0, _utils.template)`,blur_${'blur'}`
};
const autoEncodeTemplate = (0, _utils.template)`,enc_auto`;
const AVIFEncodeTemplate = (0, _utils.template)`,enc_avif`;
const pAVIFEncodeTemplate = (0, _utils.template)`,enc_pavif`;
const animatedTransformTemplate = (0, _utils.template)`,pstr`;
const animatedGIFTransformTemplate = (0, _utils.template)`,anm_all`;
/**
 * returns image transform uri
 * @param {object}  transformsObj
 *
 * @returns {string}
 */
function getImageURI(transformsObj) {
  var _transformsObj$src;
  // construct image transforms
  const transformsObjStrArr = [];

  // construct transform
  transformsObj.parts.forEach(transformPart => {
    switch (transformPart.transformType) {
      case _imageServiceConstants.transformTypes.CROP:
        transformsObjStrArr.push(cropTemplate(transformPart));
        break;
      case _imageServiceConstants.transformTypes.LEGACY_CROP:
        transformsObjStrArr.push(legacyCropTemplate(transformPart));
        break;
      case _imageServiceConstants.transformTypes.LEGACY_FILL:
        let legacyFillStr = legacyFillTemplate(transformPart);
        if (transformPart.upscale) {
          legacyFillStr += upscaleTemplate(transformPart);
        }
        transformsObjStrArr.push(legacyFillStr);
        break;
      case _imageServiceConstants.transformTypes.FIT:
        let fitStr = fitTemplate(transformPart);
        if (transformPart.upscale) {
          fitStr += upscaleTemplate(transformPart);
        }
        transformsObjStrArr.push(fitStr);
        break;
      case _imageServiceConstants.transformTypes.FILL:
        let fillStr = fillTemplate(transformPart);
        if (transformPart.upscale) {
          fillStr += upscaleTemplate(transformPart);
        }
        transformsObjStrArr.push(fillStr);
        break;
      case _imageServiceConstants.transformTypes.FILL_FOCAL:
        let fillFocalStr = fillFocalTemplate(transformPart);
        if (transformPart.upscale) {
          fillFocalStr += upscaleTemplate(transformPart);
        }
        transformsObjStrArr.push(fillFocalStr);
        break;
    }
  });
  let transformsStr = transformsObjStrArr.join('/');

  // construct transform options
  // quality
  if (transformsObj.quality) {
    transformsStr += qualityTemplate(transformsObj);
  }
  // un-sharp mask
  if (transformsObj.unsharpMask) {
    transformsStr += unSharpMaskTemplate(transformsObj.unsharpMask);
  }
  // progressive
  if (!transformsObj.progressive) {
    transformsStr += nonProgressiveTemplate(transformsObj);
  }
  // watermark
  if (transformsObj.watermark) {
    transformsStr += watermarkTemplate(transformsObj);
  }
  // filters
  if (transformsObj.filters) {
    transformsStr += Object.keys(transformsObj.filters).map(filterName => filterTemplatesMap[filterName](transformsObj.filters)).join('');
  }

  // encoding
  if (transformsObj.fileType !== _imageServiceConstants.fileType.GIF) {
    if (transformsObj.encoding === _imageServiceConstants.encodingTypes.AVIF) {
      transformsStr += AVIFEncodeTemplate(transformsObj);
      transformsStr += qualityAutoTemplate(transformsObj);
    } else if (transformsObj.encoding === _imageServiceConstants.encodingTypes.PAVIF) {
      transformsStr += pAVIFEncodeTemplate(transformsObj);
      transformsStr += qualityAutoTemplate(transformsObj);
    } else if (transformsObj.autoEncode) {
      transformsStr += autoEncodeTemplate(transformsObj);
    }
  }

  // animated images transforms
  if ((_transformsObj$src = transformsObj.src) != null && _transformsObj$src.isAnimated && transformsObj.transformed) {
    const isGif = (0, _imageServiceUtils.isGIF)(transformsObj.src.id);
    const isPlaceholderFlow = transformsObj.isPlaceholderFlow === true;
    const allowFullGIFTransformation = transformsObj.allowFullGIFTransformation === true;
    if (isPlaceholderFlow) {
      transformsStr += animatedTransformTemplate(transformsObj);
    } else if (isGif && allowFullGIFTransformation) {
      // Non-placeholder flow + GIF + flag enabled: use anm_all
      transformsStr += animatedGIFTransformTemplate(transformsObj);
    }
  }

  // image url string
  return `${transformsObj.src.id}/${_imageServiceConstants.API_VERSION}/${transformsStr}/${transformsObj.fileName}.${transformsObj.preferredExtension}`;
}
//# sourceMappingURL=transforms.js.map