import query from '../../../Controller/Query.js';

export const SellerInfo = async (shopID) => {
    let sql = `SElECT shop_name,shop_full_address,nationality from shops WHERE shop_id=${shopID}`;
    const result = await query(sql).then((response) => response);
    const seller = result[0];
    seller.nationality = JSON.parse(seller.nationality);
    return seller;
};

export const ProductImage = async (ProductImage) => {
    const images = JSON.parse(ProductImage);
    const productImage = [];
    if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            let _sql = `SELECT * FROM shop_uploads WHERE id=${images[i]}`;
            const result = await query(_sql).then((response) => response);
            productImage.push(result[0]);
        }
    }
    return productImage;
};

export const ProductReviewsCount = async (product_id) => {
    let sql = `SElECT * from product_feeds_review WHERE product_id=${product_id}`;
    const result = await query(sql).then((response) => response);
    const count = result.length;
    return count;
};
