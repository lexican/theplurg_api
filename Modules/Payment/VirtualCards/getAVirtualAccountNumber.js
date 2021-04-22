import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const getVirtualAccount = async (ctx) => {
    const user = ctx.state.user;

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

    const { order_ref } = ctx.request.body;

    try {
        const payload = {
            order_ref: order_ref, // This is the order reference returned in the virtual account number creation
        };
        const response = await flw.VirtualAcct.fetch(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default getVirtualAccount;
