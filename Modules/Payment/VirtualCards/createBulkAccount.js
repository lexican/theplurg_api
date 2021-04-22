import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const createBulkAccount = async (ctx) => {
    const user = ctx.state.user;

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

    const { accounts, email, is_permanent, tx_ref } = ctx.request.body;

    try {
        const payload = {
            accounts: accounts, //This is the number of virtual account numbers you want to generate
            email: email,
            is_permanent: is_permanent,
            tx_ref: tx_ref,
        };
        const response = await flw.VirtualAcct.create_bulk(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default createBulkAccount;
