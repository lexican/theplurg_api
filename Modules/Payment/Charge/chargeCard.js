import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

//import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY, FLUTTERWAVE_ENCRPTION_KEY } from '../utils.js';

//const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const ChargeCard = async (ctx) => {
    const user = ctx.state.user;

    console.log('Usre: ' + user);

    //return

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

    const {
        card_number,
        cvv,
        expiry_month,
        expiry_year,
        amount,
        fullname,
        email,
        phone_number,
        tx_ref,
        redirect_url,
        currency,
    } = ctx.request.body;

    const payload = {
        card_number: card_number,
        cvv: cvv,
        expiry_month: expiry_month,
        expiry_year: expiry_year,
        currency: currency,
        amount: amount,
        redirect_url: redirect_url,
        fullname: fullname,
        email: email,
        phone_number: phone_number,
        enckey: FLUTTERWAVE_ENCRPTION_KEY,
        tx_ref: tx_ref, // This is a unique reference, unique to the particular transaction being carried out. It is generated when it is not provided by the merchant for every transaction.
    };

    console.log('Here');
    return;

    //    try {
    //        const response = await flw.Charge.card(payload);
    //        console.log(response);
    //        if (response.meta.authorization.mode === 'pin') {
    //            let payload2 = payload;
    //            payload2.authorization = {
    //                mode: 'pin',
    //                fields: ['pin'],
    //                pin: 3310,
    //            };
    //            const reCallCharge = await flw.Charge.card(payload2);

    //            const callValidate = await flw.Charge.validate({
    //                otp: '12345',
    //                flw_ref: reCallCharge.data.flw_ref,
    //            });
    //            console.log(callValidate);
    //        }
    //        if (response.meta.authorization.mode === 'redirect') {
    //            var url = response.meta.authorization.redirect;
    //            open(url);
    //        }

    //        console.log(response);
    //    } catch (error) {
    //        console.log(error);
    //    }
};

export default ChargeCard;
