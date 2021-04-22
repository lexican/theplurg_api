import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const validateOTP = async (ctx) => {
    const user = ctx.state.user;
    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }
    const { reference, otp } = ctx.request.body;
    try {
        const payload = {
            reference: reference,
            otp: otp,
        };

        const response = await flw.Otp.validate(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default validateOTP;
