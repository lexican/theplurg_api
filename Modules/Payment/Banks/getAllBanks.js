import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';
import { sendResponse } from '../../../Controller/Query.js';
import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from "../utils.js"

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const AllBanks = async (ctx) => {
    const user = ctx.state.user;

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

  const { country } = JSON.parse(ctx.request.header['abstract-data']);

    try {
        const payload = {
            country: country, //Pass either NG, GH, KE, UG, ZA or TZ to get list of banks in Nigeria, Ghana, Kenya, Uganda, South Africa or Tanzania respectively
        };
        const response = await flw.Bank.country(payload);
        console.log(response);
        ctx.status = 200;
        ctx.body = sendResponse(200, response);
    } catch (error) {
        console.log(error);
    }
};

export default AllBanks;
