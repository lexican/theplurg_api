import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const createOTP = async (ctx) => {
    const user = ctx.state.user;
    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }
    const { length, name, email, phoneNumber, sender, send, medium, expiry } = ctx.request.body;
    try {
        const payload = {
            length: length,
            customer: { name: name, email: email, phone: phoneNumber },
            sender: sender,
            send: send,
            medium: medium, //['email', 'whatsapp']
            expiry: expiry,
        };

        const response = await flw.Otp.create(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default createOTP;
