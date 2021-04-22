import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const resendTransactionWebhook = async (ctx) => {
    const user = ctx.state.user;

    console.log('Usre: ' + user);

    //return

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

    const { tx_ref } = ctx.request.body;


    try {
        const payload = {
            tx_ref: tx_ref,
        };
        const response = await flw.Transaction.resend_hooks(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default resendTransactionWebhook;
