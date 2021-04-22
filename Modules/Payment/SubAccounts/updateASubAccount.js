import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';

import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const updateASubAccountPaymentPlan = async (ctx) => {
           const user = ctx.state.user;
           if (typeof user === 'undefined') {
               ctx.status = 406;
               ctx.body = 'Session might have expired';
               return;
           }

           const {
               id,
               business_name,
               business_email,
               account_bank,
               account_number,
               split_type,
               split_value,
           } = ctx.request.body;

           try {
               const payload = {
                   id: id, //This is the unique id of the subaccount you want to update. It is returned in the call to create a subaccount as data.id
                   business_name: business_name,
                   business_email: business_email,
                   account_bank: account_bank,
                   account_number: account_number,
                   split_type: split_type,
                   split_value: split_value,
               };

               const response = await flw.Subaccount.update(payload);
               console.log(response);
           } catch (error) {
               console.log(error);
           }
       };

export default updateASubAccountPaymentPlan;
