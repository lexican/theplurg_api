import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const createTransfer = async (ctx) => {
    const user = ctx.state.user;

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

    const {
        account_bank,
        amount,
        narration,
        currency,
        reference,
        debit_currency,
        callback_url,
    } = ctx.request.body;
    //callback ***************8
    try {
        const payload = {
            account_bank: account_bank, //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
            account_number: account_number,
            amount: amount,
            narration: narration,
            currency: currency,
            reference: reference,
            // reference: 'transfer-' + Date.now(), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
            callback_url: callback_url,
            debit_currency: debit_currency,
        };

        const response = await flw.Transfer.initiate(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default createTransfer;
