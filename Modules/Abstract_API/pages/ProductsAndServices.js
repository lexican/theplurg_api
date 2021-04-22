import query from '../../../Controller/Query.js';

export const ProductsAndServicesCategories = async (ctx) => {
    const { selectOptions } = JSON.parse(ctx.request.header['abstract-data']);
    const result = `SELECT * FROM data_product_categories`;
    const fetched = await query(result).then((response) => response);
    let response = {};
    if (selectOptions === true) {
        let items = [];
        for (let i = 0; i < fetched.length; i++) {
            items.push({
                name: fetched[i].category,
                product_category_id: fetched[i].product_category_id,
                id: i + 900000,
                children: [],
            });
        }
        response = items;
    } else {
        response = fetched;
    }
    ctx.body = JSON.stringify({ statusCode: 200, response: response });
    ctx.status = 200;
};

export const ProductsAndServicesSubCategories = async (ctx) => {
    const { product_category_id, selectOptions } = JSON.parse(ctx.request.header['abstract-data']);
    const result = `SELECT * FROM data_product_categories_sub_lists WHERE product_category_id=${product_category_id}`;
    const fetched = await query(result).then((response) => response);
    let response = {};
    if (selectOptions === true) {
        let items = [];
        for (let i = 0; i < fetched.length; i++) {
            items.push({
                name: fetched[i].sub_category,
                id: fetched[i].sub_lists_id,
            });
        }
        response = items;
    } else {
        response = fetched;
    }
    ctx.body = JSON.stringify({ statusCode: 200, response: response });
    ctx.status = 200;
};



export const GetOnlyServiceCategory = async (ctx) => {
    const { selectOptions } = JSON.parse(ctx.request.header['abstract-data']);
    const result = `SELECT * FROM data_product_categories WHERE category='Services'`;
    const fetched = await query(result).then((response) => response);
    let response = {};
    if (selectOptions === true) {
        let items = [];
        for (let i = 0; i < fetched.length; i++) {
            items.push({
                name: fetched[i].category,
                product_category_id: fetched[i].product_category_id,
                id: i + 900000,
                children: [],
            });
        }
        response = items;
    } else {
        response = fetched;
    }
    ctx.body = JSON.stringify({ statusCode: 200, response: response });
    ctx.status = 200;
};

export const GetAllServicesCategory = async (ctx) => {
    const { selectOptions } = JSON.parse(ctx.request.header['abstract-data']);
    const getServiceID = await query(
        `SELECT product_category_id FROM data_product_categories WHERE category='Services'`,
    ).then((response) => response);

    const result = `SELECT * FROM data_product_categories_sub_lists WHERE product_category_id=${getServiceID[0].product_category_id}`;
    const fetched = await query(result).then((response) => response);
    let response = {};
    if (selectOptions === true) {
        let items = [];
        for (let i = 0; i < fetched.length; i++) {
            items.push({
                name: fetched[i].sub_category,
                id: fetched[i].sub_lists_id,
            });
        }
        response = items;
    } else {
        response = fetched;
    }
    ctx.body = JSON.stringify({ statusCode: 200, response: response });
    ctx.status = 200;
};
