import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const createVirtualAccount = async (ctx) => {
    const user = ctx.state.user;

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

    const { email, is_permanent, tx_ref } = ctx.request.body;

    try {
        const payload = {
            email: email,
            is_permanent: is_permanent,
            tx_ref: tx_ref,
        };
        const response = await flw.VirtualAcct.create(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default createVirtualAccount;
