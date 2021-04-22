import { UploadShopDocument } from './UploadShopDocument.js';
import { UploadProductMedia } from './UploadProductMedia.js';

export default async (file, type, captions, user, shopID = '') => {
    if (type == 'ShopDocuments') {
        return UploadShopDocument(file, type, captions, user);
    } else if (type === 'shop') {
        return UploadProductMedia(file, type, user, shopID);
    }
};
