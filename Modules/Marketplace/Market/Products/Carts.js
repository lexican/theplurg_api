import query, { sendResponse } from '../../../../Controller/Query.js';

export const AddToCart = async (ctx) => {
    const user = ctx.state.user;
    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = sendResponse(406, 'Session might have expired');
        return;
    }
    let data = ctx.request.body;
    data = typeof data == 'string' ? JSON.parse(data) : data;
    let checkCartBox = await query(`SELECT * FROM carts where uid=${user.uid}`).then((response) => response);
    if (checkCartBox.length < 1) {
        let newCartBox = [data.product_id];
        let dataToInsert = {
            uid: user.uid,
            products: JSON.stringify(newCartBox),
        };
        await query('INSERT INTO carts SET ?', dataToInsert).then((response) => response);
    } else {
        let carts = checkCartBox[0];
        let getPreviousCarts = JSON.parse(carts.products);
        getPreviousCarts.push(data.product_id);
        let newCartBox = JSON.stringify(getPreviousCarts);
        await query(`UPDATE carts SET products = '${newCartBox}'`).then((response) => response);
    }

    let carts = await query(`SELECT * FROM carts where uid=${user.uid}`).then((response) => response);
    if (carts) {
        ctx.status = 200;
        ctx.body = sendResponse(200, carts);
    }
};

export const GetAvailableCarts = async (ctx) => {
    const user = ctx.state.user;
    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = sendResponse(406, 'Session might have expired');
        return;
    }
    let carts = await query(`SELECT * FROM carts where uid=${user.uid}`).then((response) => response);
    if (carts) {
        ctx.status = 200;
        ctx.body = sendResponse(200, carts);
    }
};

export const CheckIfAlreadyAddedToCart = async (ctx) => {
    const user = ctx.state.user;
    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = sendResponse(406, 'Session might have expired');
        return;
    }
    let data = ctx.request.body;
    data = typeof data == 'string' ? JSON.parse(data) : data;
    let carts = await query(`SELECT * FROM carts where uid=${user.uid}`).then((response) => response);
    let cartsObject = JSON.parse(carts[0].products);
    if (cartsObject.includes(data.product_id)) {
        ctx.status = 200;
        ctx.body = sendResponse(200, 'existed');
    } else {
        ctx.status = 200;
        ctx.body = sendResponse(200, 'not existed');
    }
    console.log(cartsObject);
};
