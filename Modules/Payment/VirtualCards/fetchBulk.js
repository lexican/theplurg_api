import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const fetchBulkAccount = async (ctx) => {
    const user = ctx.state.user;

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

    const { batch_id } = ctx.request.body;
    try {
        const payload = {
            batch_id: batch_id, // This is the batch ID returned in the bulk virtual account numbers creation
        };
        const response = await flw.VirtualAcct.fetch_bulk(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default fetchBulkAccount;
