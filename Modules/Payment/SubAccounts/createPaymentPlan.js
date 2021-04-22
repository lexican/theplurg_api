import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const createASubAccountPaymentPlan = async (ctx) => {
           const user = ctx.state.user;
           if (typeof user === 'undefined') {
               ctx.status = 406;
               ctx.body = 'Session might have expired';
               return;
           }

           const {
               account_bank,
               account_number,
               business_name,
               business_email,
               business_contact,
               business_contact_mobile,
               business_mobile,
               country,
               split_type,
               split_value,
           } = ctx.request.body;

           try {
               const payload = {
                   account_bank: account_bank,
                   account_number: account_number,
                   business_name: business_name,
                   business_email: business_email,
                   business_contact: business_contact,
                   business_contact_mobile: business_contact_mobile,
                   business_mobile: business_mobile,
                   country: country,
                   meta: [
                       {
                           meta_name: 'mem_adr',
                           meta_value: '0x16241F327213',
                       },
                   ],
                   split_type: split_type,
                   split_value: split_value,
               };

               const response = await flw.Subaccount.create(payload);
               console.log(response);
           } catch (error) {
               console.log(error);
           }
       };

export default createASubAccountPaymentPlan;
