import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const getTransactionFee = async (ctx) => {
    const user = ctx.state.user;

    console.log('Usre: ' + user);

    //return

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

    const { amount, currency } = ctx.request.body;

   

    // const payload = {
    //     amount: '1000',
    //     currency: 'NGN',
    // };

    try {
        const payload = {
            amount: amount,
            currency: currency,
        };
        const response = await flw.Transaction.fee(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default getTransactionFee;
