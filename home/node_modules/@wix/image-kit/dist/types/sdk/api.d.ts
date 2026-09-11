import { populateGlobalFeatureSupport } from '../api/uri/index';
import type { ImageTransformOptions } from '../types';
declare const wixStatic = "https://static.wixstatic.com/";
declare const wixStaticWithMedia = "https://static.wixstatic.com/media/";
declare function getScaleToFitImageURL(relativeUrl: string, sourceWidth: number, sourceHeight: number, targetWidth: number, targetHeight: number, options?: ImageTransformOptions): string;
declare function getScaleToFillImageURL(relativeUrl: string, sourceWidth: number, sourceHeight: number, targetWidth: number, targetHeight: number, options?: ImageTransformOptions): string;
declare function getCropImageURL(relativeUrl: string, sourceWidth: number, sourceHeight: number, cropX: number, cropY: number, cropWidth: number, cropHeight: number, targetWidth: number, targetHeight: number, options?: ImageTransformOptions): string;
export { populateGlobalFeatureSupport, getScaleToFitImageURL, getScaleToFillImageURL, getCropImageURL, wixStatic, wixStaticWithMedia, };
//# sourceMappingURL=api.d.ts.map