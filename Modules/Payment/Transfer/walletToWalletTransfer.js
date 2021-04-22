import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const walletToWalletTransfer = async (ctx) => {
    const user = ctx.state.user;

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

    const { currency, amount, debit_currency, merchant_id } = ctx.request.body;
    try {
        const payload = {
            account_bank: 'flutterwave', // This should always be set to flutterwave
            merchant_id: merchant_id, //This is the recipient merchant ID
            amount: amount, //This is the amount to transfer to the recipient
            narration: narration,
            currency: currency, //This can be NGN, GHS, KES, UGX, TZS, USD
            reference: 'wallet-transfer' + Date.now(), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
            debit_currency: debit_currency, //You can pass this when you want to debit a currency balance and send money in another currency.
        };

        const response = await flw.Transfer.wallet_to_wallet(payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export default walletToWalletTransfer;
