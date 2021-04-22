import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';


import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);
export const getAllTransactions = async (ctx) => {
    const user = ctx.state.user;

    console.log('Usre: ' + user);

    //date format "2020-01-01"

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

    const { from, to } = ctx.request.body;

    try {
        const payload = {
            from: from,
            to: to,
        };
        const response = await flw.Transaction.fetch(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default getAllTransactions;
