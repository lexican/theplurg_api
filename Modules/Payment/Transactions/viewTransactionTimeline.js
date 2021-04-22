import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const viewTransactionTimeline = async (ctx) => {
    const user = ctx.state.user;
    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

    const { id } = ctx.request.body;

    try {
        const payload = {
            id: id,
        }; //This is the unique transaction ID. It is returned in the verify transaction call as data.id}
        const response = await flw.Transaction.event(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default viewTransactionTimeline;
