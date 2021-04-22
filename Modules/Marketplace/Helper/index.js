import moment from 'moment';
import { SellerInfo, ProductImage, ProductReviewsCount } from './context.js';

export const ProductFeedsLoops = async (uid, products) => {
    await Promise.all(
        products.map(async (product) => {
            product.created_at = moment(product.created_at).fromNow();
            product.updated_at = moment(product.updated_at).fromNow();
            product.sellerInfo = await SellerInfo(product.shopID);
            product.productImage = await ProductImage(product.productImage);
            product.productReviewsCount = await ProductReviewsCount(product.product_id)
            return product;
        }),
    );
    return products;
};
