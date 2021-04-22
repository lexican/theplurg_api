import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const getAllTransfer = async (ctx) => {
    const user = ctx.state.user;

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

    const { status } = ctx.request.body;
    try {
        const payload = {
            status: status,
        };

        const response = await flw.Transfer.fetch(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default getAllTransfer;
