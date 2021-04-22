import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';
import { sendResponse } from '../../../Controller/Query.js';
import Flutterwave from 'flutterwave-node-v3';

import { FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY } from '../utils.js';

const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_PRIVATE_KEY);

export const AllBranches = async (ctx) => {
    const user = ctx.state.user;

    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }

     const { id } = JSON.parse(ctx.request.header['abstract-data']);

    try {
        const payload = {
            id: id, //Unique bank ID, it is returned in the call to fetch banks GET /banks/:country
        };
        const response = await flw.Bank.branches(payload);
        console.log(response);
        ctx.status = 200;
        ctx.body = sendResponse(200, response);
    } catch (error) {
        console.log(error);
    }
};

export default AllBranches;
