"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LIMIT = exports.PAGING_METADATA_RESULT_PROPERTY_NAME = exports.ITEMS_RESULT_PROPERTY_NAME = exports.RESTResponseToSDKResponseRenameMap = exports.SDKRequestToRESTRequestRenameMap = exports.WIX_PROTOCOL = void 0;
exports.WIX_PROTOCOL = 'wix:';
exports.SDKRequestToRESTRequestRenameMap = {
    _id: 'id',
    _createdDate: 'createdDate',
    _updatedDate: 'updatedDate',
};
exports.RESTResponseToSDKResponseRenameMap = {
    id: '_id',
    createdDate: '_createdDate',
    updatedDate: '_updatedDate',
};
exports.ITEMS_RESULT_PROPERTY_NAME = 'items';
exports.PAGING_METADATA_RESULT_PROPERTY_NAME = 'pagingMetadata';
exports.DEFAULT_LIMIT = 50;
