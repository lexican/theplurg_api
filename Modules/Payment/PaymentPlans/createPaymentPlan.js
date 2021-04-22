import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const createPaymentPlan = async (ctx) => {
    const user = ctx.state.user;

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

    const { amount, name, interval, duration } = ctx.request.body;

    try {
        const payload = {
            amount: amount,
            name: name, //This is the name of the payment, it will appear on the subscription reminder emails
            interval: interval, //This will determine the frequency of the charges for this plan. Could be monthly, weekly, etc.
            duration: duration, //This is the frequency, it is numeric, e.g. if set to 5 and intervals is set to monthly you would be charged 5 months, and then the subscription stops
        };

        const response = await flw.PaymentPlan.create(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default createPaymentPlan;
