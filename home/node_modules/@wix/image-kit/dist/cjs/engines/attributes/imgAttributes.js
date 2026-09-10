"use strict";

exports.__esModule = true;
exports.get = getCSS;
var _imageServiceConstants = require("../../helpers/imageServiceConstants");
/**
 * align type to position
 * @param verticalMiddle
 * @param horizontalMiddle
 * @param target
 * @returns {{}}
 */
function alignTypeToPosition(verticalMiddle, horizontalMiddle, target) {
  return {
    [_imageServiceConstants.alignTypes.TOP_LEFT]: {
      top: 0,
      left: 0
    },
    [_imageServiceConstants.alignTypes.TOP_RIGHT]: {
      top: 0,
      right: 0
    },
    [_imageServiceConstants.alignTypes.TOP]: {
      top: 0,
      left: horizontalMiddle
    },
    [_imageServiceConstants.alignTypes.BOTTOM_LEFT]: {
      bottom: 0,
      left: 0
    },
    [_imageServiceConstants.alignTypes.BOTTOM_RIGHT]: {
      bottom: 0,
      right: 0
    },
    [_imageServiceConstants.alignTypes.BOTTOM]: {
      bottom: 0,
      left: horizontalMiddle
    },
    [_imageServiceConstants.alignTypes.RIGHT]: {
      top: verticalMiddle,
      right: 0
    },
    [_imageServiceConstants.alignTypes.LEFT]: {
      top: verticalMiddle,
      left: 0
    },
    [_imageServiceConstants.alignTypes.CENTER]: {
      width: target.width,
      height: target.height,
      objectFit: 'none'
    }
  };
}
const alignTypeToPositionStr = {
  [_imageServiceConstants.alignTypes.CENTER]: 'center',
  [_imageServiceConstants.alignTypes.TOP]: 'top',
  [_imageServiceConstants.alignTypes.TOP_LEFT]: 'top left',
  [_imageServiceConstants.alignTypes.TOP_RIGHT]: 'top right',
  [_imageServiceConstants.alignTypes.BOTTOM]: 'bottom',
  [_imageServiceConstants.alignTypes.BOTTOM_LEFT]: 'bottom left',
  [_imageServiceConstants.alignTypes.BOTTOM_RIGHT]: 'bottom right',
  [_imageServiceConstants.alignTypes.LEFT]: 'left',
  [_imageServiceConstants.alignTypes.RIGHT]: 'right'
};
const aligmentDefaults = {
  position: 'absolute',
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
};

/**
 * returns image tag CSS data
 * @param {ImageTransformObject}    transformsObj    transform parts object
 * @param {ImageTransformTarget}    target
 *
 * @returns {ImageAttributes}
 */
function getCSS(transformsObj, target) {
  const attributes = {
    css: {
      container: {},
      img: {}
    }
  };
  const {
    css
  } = attributes;
  const {
    fittingType
  } = transformsObj;
  const alignType = target.alignment;
  css.container.position = 'relative';
  switch (fittingType) {
    case _imageServiceConstants.fittingTypes.ORIGINAL_SIZE:
    case _imageServiceConstants.fittingTypes.LEGACY_ORIGINAL_SIZE:
      if (transformsObj.parts && transformsObj.parts.length) {
        css.img.width = transformsObj.parts[0].width;
        css.img.height = transformsObj.parts[0].height;
      } else {
        css.img.width = transformsObj.src.width;
        css.img.height = transformsObj.src.height;
      }
      break;
    case _imageServiceConstants.fittingTypes.SCALE_TO_FIT:
    case _imageServiceConstants.fittingTypes.LEGACY_FIT_WIDTH:
    case _imageServiceConstants.fittingTypes.LEGACY_FIT_HEIGHT:
    case _imageServiceConstants.fittingTypes.LEGACY_FULL:
      css.img.width = target.width;
      css.img.height = target.height;
      css.img.objectFit = 'contain';
      css.img.objectPosition = alignTypeToPositionStr[alignType] || 'unset';
      break;
    // BG_NORMAL is a sitebackground legacy for original size fitting type.
    // target width and height were modified in transform.js
    case _imageServiceConstants.fittingTypes.LEGACY_BG_NORMAL:
      css.img.width = '100%';
      css.img.height = '100%';
      css.img.objectFit = 'none';
      css.img.objectPosition = alignTypeToPositionStr[alignType] || 'unset';
      break;
    case _imageServiceConstants.fittingTypes.STRETCH:
      css.img.width = target.width;
      css.img.height = target.height;
      css.img.objectFit = 'fill';
      break;
    case _imageServiceConstants.fittingTypes.SCALE_TO_FILL:
      css.img.width = target.width;
      css.img.height = target.height;
      css.img.objectFit = 'cover';
      break;
  }

  // set alignment in a private case where the image src is smaller than the image container,
  if (typeof css.img.width === 'number' && typeof css.img.height === 'number' && (css.img.width !== target.width || css.img.height !== target.height)) {
    const verticalMiddle = Math.round((target.height - css.img.height) / 2);
    const horizontalMiddle = Math.round((target.width - css.img.width) / 2);
    Object.assign(css.img, aligmentDefaults, alignTypeToPosition(verticalMiddle, horizontalMiddle, target)[alignType]);
  }
  return attributes;
}
//# sourceMappingURL=imgAttributes.js.map