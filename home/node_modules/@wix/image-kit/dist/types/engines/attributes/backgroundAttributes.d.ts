import type { ImageTransformObject, ImageTransformTarget } from '../../types';
type BackgroundImageAttributes = {
    css: {
        container: {
            backgroundSize?: string;
            backgroundRepeat?: string;
            backgroundPosition?: string;
        };
    };
};
/**
 * returns BG tag CSS data
 * @param {ImageTransformObject}    transformsObj    transform parts object
 * @param {ImageTransformTarget}    target
 *
 * @returns {BackgroundImageAttributes}
 */
declare function getCSS(transformsObj: ImageTransformObject, target: ImageTransformTarget): BackgroundImageAttributes;
export { getCSS as get };
//# sourceMappingURL=backgroundAttributes.d.ts.map