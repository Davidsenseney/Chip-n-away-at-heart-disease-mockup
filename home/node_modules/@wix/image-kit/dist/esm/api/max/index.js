import { alignTypes, fittingTypes, htmlTag, upscaleMethods, fileType, } from '../../helpers/imageServiceConstants';
import { isWEBP, getFileExtension } from '../../helpers/imageServiceUtils';
import { populateGlobalFeatureSupport } from '../../helpers/populateFeatureSupport';
import { getData, getPlaceholder } from './api';
import { getScaleToFitImageURL, getScaleToFillImageURL, getCropImageURL, wixStatic, wixStaticWithMedia, } from '../../sdk';
import { getResponsiveImageProps } from '../../helpers/responsiveImageUtils';
populateGlobalFeatureSupport();
const sdk = {
    getScaleToFitImageURL,
    getScaleToFillImageURL,
    getCropImageURL,
};
export * from '../../types';
const STATIC_MEDIA_URL = wixStaticWithMedia;
const MEDIA_ROOT_URL = wixStatic;
export { STATIC_MEDIA_URL, MEDIA_ROOT_URL, alignTypes, fittingTypes, getData, getPlaceholder, htmlTag, populateGlobalFeatureSupport, sdk, upscaleMethods, isWEBP, getFileExtension, fileType, getResponsiveImageProps, };
//# sourceMappingURL=index.js.map