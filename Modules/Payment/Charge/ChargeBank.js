import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const ChargeBank = async (ctx) => {
    const user = ctx.state.user;

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

    const {
        account_bank,
        account_number,
        amount,
        fullname,
        email,
        phone_number,
        currency,
        tx_ref
    } = ctx.request.body;

    
    try {
        const payload = {
            tx_ref: tx_ref, //This is a unique reference, unique to the particular transaction being carried out. It is generated when it is not provided by the merchant for every transaction.
            amount: amount, //This is the amount to be charged.
            account_bank: account_bank, //This is the Bank numeric code. You can get a list of supported banks and their respective codes Here: https://developer.flutterwave.com/v3.0/reference#get-all-banks
            account_number: account_number,
            currency: currency, // 'NGN'
            email: email,
            phone_number: phone_number, //This is the phone number linked to the customer's mobile money account
            fullname: fullname,
        };

        const response = await flw.Charge.ng(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default ChargeBank;
