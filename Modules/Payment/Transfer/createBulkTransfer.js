import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const createBulkTransfer = async (ctx) => {
    const user = ctx.state.user;

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

    const { title, bulk_data } = ctx.request.body;

    try {
        const payload = {
            title: title,
            bulk_data: [...bulk_data],
        };

        const response = await flw.Transfer.bulk(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default createBulkTransfer;
