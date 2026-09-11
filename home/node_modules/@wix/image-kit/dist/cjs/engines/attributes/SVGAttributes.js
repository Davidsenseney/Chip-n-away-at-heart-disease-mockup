"use strict";

exports.__esModule = true;
exports.get = getSvgAttr;
var _imageServiceConstants = require("../../helpers/imageServiceConstants");
var _imageServiceUtils = require("../../helpers/imageServiceUtils");
/* eslint-disable indent */
/**
 * get CSS or SVG attributes to be used in the browser
 * @param {ImageTransformObject}  transformsObj  transform parts object
 * @param {ImageTransformTarget}  target
 *
 * @returns {SVGImageAttributes}
 */
function getSvgAttr(transformsObj, target) {
  const attributes = {
    css: {
      container: {}
    },
    attr: {
      container: {},
      img: {}
    }
  };
  const {
    css,
    attr
  } = attributes;
  const {
    fittingType
  } = transformsObj;
  const alignType = target.alignment;
  const {
    width: sourceWidth,
    height: sourceHeight
  } = transformsObj.src;
  let imageScale;
  css.container.position = 'relative';

  // populate SVG attributes object
  // eslint-disable-line indent
  switch (fittingType) {
    case _imageServiceConstants.fittingTypes.ORIGINAL_SIZE:
    case _imageServiceConstants.fittingTypes.LEGACY_ORIGINAL_SIZE:
    case _imageServiceConstants.fittingTypes.TILE:
      if (transformsObj.parts && transformsObj.parts.length) {
        attr.img.width = transformsObj.parts[0].width;
        attr.img.height = transformsObj.parts[0].height;
      } else {
        attr.img.width = sourceWidth;
        attr.img.height = sourceHeight;
      }
      attr.img.preserveAspectRatio = 'xMidYMid slice';
      break;
    case _imageServiceConstants.fittingTypes.SCALE_TO_FIT:
    case _imageServiceConstants.fittingTypes.LEGACY_FIT_WIDTH:
    case _imageServiceConstants.fittingTypes.LEGACY_FIT_HEIGHT:
    case _imageServiceConstants.fittingTypes.LEGACY_FULL:
      attr.img.width = '100%';
      attr.img.height = '100%';
      attr.img.transform = '';
      attr.img.preserveAspectRatio = '';
      break;
    case _imageServiceConstants.fittingTypes.STRETCH:
      attr.img.width = target.width;
      attr.img.height = target.height;
      attr.img.x = 0;
      attr.img.y = 0;
      attr.img.transform = '';
      attr.img.preserveAspectRatio = 'none';
      break;
    case _imageServiceConstants.fittingTypes.SCALE_TO_FILL:
      if (!(0, _imageServiceUtils.isImageTransformApplicable)(transformsObj.src.id)) {
        imageScale = (0, _imageServiceUtils.getDimension)(sourceWidth, sourceHeight, target.width, target.height, _imageServiceConstants.transformTypes.FILL);
        attr.img.width = imageScale.width;
        attr.img.height = imageScale.height;
      } else {
        attr.img.width = target.width;
        attr.img.height = target.height;
      }
      attr.img.x = 0;
      attr.img.y = 0;
      attr.img.transform = '';
      attr.img.preserveAspectRatio = 'xMidYMid slice';
      break;
  }

  // set alignment for cases where the requested src is smaller or bigger than the target element,
  if (typeof attr.img.width === 'number' && typeof attr.img.height === 'number' && (attr.img.width !== target.width || attr.img.height !== target.height)) {
    // x and y to use in svg <pattern> element
    let x = 0;
    let y = 0;
    let right;
    let bottom;
    if (fittingType === _imageServiceConstants.fittingTypes.TILE) {
      right = target.width % attr.img.width;
      bottom = target.height % attr.img.height;
    } else {
      right = target.width - attr.img.width;
      bottom = target.height - attr.img.height;
    }
    const center = Math.round(right / 2);
    const middle = Math.round(bottom / 2);
    switch (alignType) {
      case _imageServiceConstants.alignTypes.TOP_LEFT:
        x = 0;
        y = 0;
        break;
      case _imageServiceConstants.alignTypes.TOP:
        x = center;
        y = 0;
        break;
      case _imageServiceConstants.alignTypes.TOP_RIGHT:
        x = right;
        y = 0;
        break;
      case _imageServiceConstants.alignTypes.LEFT:
        x = 0;
        y = middle;
        break;
      case _imageServiceConstants.alignTypes.CENTER:
        x = center;
        y = middle;
        break;
      case _imageServiceConstants.alignTypes.RIGHT:
        x = right;
        y = middle;
        break;
      case _imageServiceConstants.alignTypes.BOTTOM_LEFT:
        x = 0;
        y = bottom;
        break;
      case _imageServiceConstants.alignTypes.BOTTOM:
        x = center;
        y = bottom;
        break;
      case _imageServiceConstants.alignTypes.BOTTOM_RIGHT:
        x = right;
        y = bottom;
        break;
    }
    attr.img.x = x;
    attr.img.y = y;
  }
  attr.container.width = target.width;
  attr.container.height = target.height;
  attr.container.viewBox = [0, 0, target.width, target.height].join(' ');

  // return attributes object
  return attributes;
}
/* eslint-enable indent */
//# sourceMappingURL=SVGAttributes.js.map