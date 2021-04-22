import query from '../../../Controller/Query.js'

export const GetSubCategoryById = async id => {
    const sql = `SELECT S.sub_category,C.category FROM data_product_categories_sub_lists S, data_product_categories C WHERE S.sub_lists_id=${id} AND S.product_category_id = C.product_category_id`
    let response = await query(sql).then(response => response);
    return response[0]
}

