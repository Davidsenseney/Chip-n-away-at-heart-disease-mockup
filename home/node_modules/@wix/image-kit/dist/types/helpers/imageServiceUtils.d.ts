import type { FileType, FittingType, TransformType, UpscaleMethod, ImageTransformData, ImageTransformOptions, ImageTransformSource, ImageTransformTarget } from '../types';
/**
 * checks if image type is supported
 * @param {string}     uri      image source uri
 *
 * @returns {boolean}
 */
declare function isImageTypeSupported(uri: string): boolean;
/**
 * check request integrity
 * @param {FittingType}             fittingType         imageService.fittingTypes
 * @param {ImageTransformSource}    src
 * @param {ImageTransformTarget}    target
 *
 * @returns {boolean}
 */
declare function isValidRequest(fittingType: FittingType, src: ImageTransformSource, target: ImageTransformTarget): boolean;
/**
 * Check if image transform is supported for source image.
 * Returns true if:
 * - Image is a supported type (PNG, JPEG, WebP, AVIF, etc.), OR
 * - Image is a GIF that can be transformed (see canTransformGIF)
 *
 * @param uri - Image URI to check
 * @param hasAnimation - Whether the image has animation metadata
 * @param allowAnimatedTransform - Whether animated transforms are allowed (used in placeholder flow)
 * @param allowFullGIFTransformation - Whether full GIF transformation is allowed (used in non-placeholder flow)
 * @returns true if the image can be transformed
 */
declare function isImageTransformApplicable(uri: string, hasAnimation?: boolean, allowAnimatedTransform?: boolean, allowFullGIFTransformation?: boolean): boolean;
/**
 * returns true if image is of PNG type
 * @param {string}  uri
 *
 * @returns {boolean}
 */
declare function isPNG(uri: string): boolean;
/**
 * returns true if image is of webP type
 * @param {string}  uri
 *
 * @returns {boolean}
 */
declare function isWEBP(uri: string): boolean;
/**
 * returns true if image is of GIF type
 * @param {string}  uri
 *
 * @returns {boolean}
 */
declare function isGIF(uri: string): boolean;
/**
 * returns true if image is of webP type
 * @param {string}  uri
 *
 * @returns {boolean}
 */
declare function isAVIF(uri: string): boolean;
/**
 * returns true if the url starts with http, https, // or data
 * @param {string}  url
 *
 * @returns {boolean}
 */
declare function isExternalUrl(url: string): boolean;
/**
 * returns search bot true or false as indicated in options
 * @param {ImageTransformOptions}   options
 *
 * @returns {boolean}
 */
declare function isSEOBot(options?: ImageTransformOptions): boolean;
/**
 * returns source image file name (no extension)
 * @param {string}     uri      image source uri
 * @param {string}     [name]   optional image source name
 *
 * @returns {string}
 */
declare function getFileName(uri: string, name?: string): string;
/**
 * returns source image file name (no extension)
 * @param {string}     uri      image source uri
 *
 * @returns {FileType}
 */
declare function getFileType(uri: string): FileType;
/**
 * returns source image file extension
 * @param {string}     uri      image source uri
 *
 * @returns {string}
 */
declare function getFileExtension(uri: string): string;
/**
 * returns scale factor source target
 * @param {number}  sWidth
 * @param {number}  sHeight
 * @param {number}  dWidth
 * @param {number}  dHeight
 * @param {string}  transformType
 *
 * @returns {number}
 */
declare function getScaleFactor(sWidth: number, sHeight: number, dWidth: number, dHeight: number, transformType: TransformType): number;
/**
 * returns the destination rectangle
 * @param {number}                  sWidth
 * @param {number}                  sHeight
 * @param {TransformType}           transformType
 * @param {ImageTransformTarget}    target
 * @param {number}                  dpr - device pixel ratio
 * @param {UpscaleMethod}           upscaleMethod
 *
 * @returns {ImageTransformData & {upscaleMethodValue: number}}
 */
declare function getTransformData(sWidth: number, sHeight: number, transformType: TransformType, target: ImageTransformTarget, dpr: number, upscaleMethod: UpscaleMethod): ImageTransformData & {
    upscaleMethodValue: number;
};
/**
 * returns overlapping rectangle where sRect
 * id aligned (according to alignment) within dRect
 * @param {{ width: number; height: number }} sRect rect 1
 * @param {{ width: number, height: number }} dRect rect 2
 * @param {{x: number, y: number}|undefined}  sFP   source image focal point
 * @param {string}                            alignment
 *
 * @returns {{x: number, y: number, width: number, height: number}}
 */
declare function getAlignedRect(sRect: {
    width: number;
    height: number;
}, dRect: {
    width: number;
    height: number;
}, sFP: {
    x?: number;
    y?: number;
} | undefined, alignment?: string): {
    x: number;
    y: number;
    width: number;
    height: number;
};
/**
 * returns overlapping rectangle between sRect and dRect
 * @param {object}      sRect         rect 1
 * @param {object}      dRect         rect 2
 *
 * @returns {{x:number,y:number,width:number, height:number} || null}
 */
declare function getOverlappingRect(sRect: {
    width: number;
    height: number;
}, dRect: {
    width: number;
    height: number;
    x: number;
    y: number;
}): {
    x: number;
    y: number;
    width: number;
    height: number;
} | null;
/**
 * returns pixel aspect ratio value
 * @param {ImageTransformTarget}    target
 *
 * @returns {number}
 */
declare function getDevicePixelRatio(target: ImageTransformTarget): number;
/**
 * returns target alignment value
 * @param {ImageTransformTarget}    target
 *
 * @returns {string}
 */
declare function getAlignment(target: ImageTransformTarget): import("../types").AlignmentParam;
/**
 * returns the focal point value, if no focal point passed use alignment
 * @param {{x: number, y: number}|undefined} focalPoint
 */
declare function getFocalPoint(focalPoint: {
    x?: number;
    y?: number;
} | undefined): {
    x: string;
    y: string;
} | undefined;
/**
 * returns preferred image quality value
 * @param {number}    imageWidth
 * @param {number}    imageHeight
 *
 * @returns {number}
 */
declare function getPreferredImageQuality(imageWidth: number, imageHeight: number): number;
/**
 * return the actual rounded dimension of a scaled rectangle
 * @param sWidth
 * @param sHeight
 * @param tWidth
 * @param tHeight
 * @param transformType
 * @returns {{width: number, height: number}}
 */
declare function getDimension(sWidth: number, sHeight: number, tWidth: number, tHeight: number, transformType: TransformType): {
    width: number;
    height: number;
};
/**
 * rounds number n digit precision and converts to string
 * @param {number}      value
 * @param {number}      precision
 *
 * @returns {string}
 */
declare function roundToFixed(value: number, precision: number): string;
/**
 * get normalize scale method
 * @param {ImageTransformOptions} [options]
 * @returns {UpscaleMethod}
 */
declare function getUpscaleString(options?: ImageTransformOptions): UpscaleMethod;
declare function imageIsAnimated(uri: string, hasAnimation?: boolean): boolean | undefined;
export { getAlignedRect, getAlignment, getDevicePixelRatio, getDimension, getFileExtension, getFileName, getFileType, getFocalPoint, getOverlappingRect, getPreferredImageQuality, getScaleFactor, getTransformData, getUpscaleString, imageIsAnimated, isExternalUrl, isImageTransformApplicable, isImageTypeSupported, isSEOBot, isValidRequest, isPNG, isWEBP, isGIF, isAVIF, roundToFixed, };
//# sourceMappingURL=imageServiceUtils.d.ts.map