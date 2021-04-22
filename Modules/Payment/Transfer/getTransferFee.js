import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const getTransferFee = async (ctx) => {
    const user = ctx.state.user;

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

    const { currency, amount } = ctx.request.body;
    try {
        const payload = {
            amount: amount,
            currency: currency,
        };

        const response = await flw.Transfer.fee(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default getTransferFee;
