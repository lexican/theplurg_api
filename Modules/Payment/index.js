//Charge Routes Import



import {ChargeCard} from './Charge/chargeCard.js';
import { ChargeBank } from './Charge/ChargeBank.js';

//Banks Routes import
import { AllBanks } from './Banks/getAllBanks.js';
import { AllBranches } from './Banks/getAllBranches.js';

//OTP Routes import
import { createOTP } from './OTPS/createOTP.js';
import { validateOTP } from './OTPS/validateOTP.js';

//Paymentplan routes import
import { cancelAPaymentPlan } from './PaymentPlans/cancelAPaymentPlan.js';
import { createPaymentPlan } from './PaymentPlans/createPaymentPlan.js';
import { getAPaymentPlan } from './PaymentPlans/getAPaymentPlan.js';
import { getAllPaymentPlan } from './PaymentPlans/getAllPaymentPlan.js';
import { updateAPaymentPlan } from './PaymentPlans/updateAPaymentPlan.js';

//Subaccount

import { createASubAccountPaymentPlan } from './SubAccounts/createPaymentPlan.js';
import { deleteASubAccountPaymentPlan } from './SubAccounts/deleteASubaccount.js';
import { fetchAllSubAccountPaymentPlan } from './SubAccounts/fetchAllSubAccounts.js';
import { fetchASubAccountPaymentPlan } from './SubAccounts/fetchASubaccount.js';
import { updateASubAccountPaymentPlan } from './SubAccounts/updateASubAccount.js';

//Transactions

import { getAllTransactions } from './Transactions/getAllTransactions.js';
import { getTransactionFee } from './Transactions/getTransactionFee.js';
import { resendTransactionWebhook } from './Transactions/resendTransactionWebhook.js';
import { transactionRefund } from './Transactions/transactionRefund.js';
import { verifyTransaction } from './Transactions/verifyTransaction.js';
import { viewTransactionTimeline } from './Transactions/viewTransactionTimeline.js';

//Transfer

import { createBulkTransfer } from './Transfer/createBulkTransfer.js';
import { createTransfer } from './Transfer/createTransfer.js';
import { getATransfer } from './Transfer/getATransfer.js';
import { getAllTransfer } from './Transfer/getAllTransfer.js';
import { getTransferFee } from './Transfer/getTransferFee.js';
import { walletToWalletTransfer } from './Transfer/walletToWalletTransfer.js';

//Virtual Account
import { createVirtualAccount } from './VirtualCards/createAVirtualAccount.js';
import { createBulkAccount } from './VirtualCards/createBulkAccount.js';
import { fetchBulkAccount } from './VirtualCards/fetchBulk.js';
import { getVirtualAccount } from './VirtualCards/getAVirtualAccountNumber.js';

import Router from '@koa/router';

const router = new Router();

//Banks Routes
router.get('/v1/ewallet/banks/getAllBanks', AllBanks);
router.get('/v1/ewallet/banks/getAllBranches', AllBranches);

//Charge Routes
router.post('/v1/ewallet/chargebank', ChargeBank);
router.post('/v1/ewallet/chargecard', ChargeCard);

//OTP routes
router.post('/v1/ewallet/createOTP', createOTP);
router.post('/v1/ewallet/validateOTP', validateOTP);

//PayentPlan Routes
router.post('/v1/ewallet/cancelAPaymentPlan', cancelAPaymentPlan);
router.post('/v1/ewallet/createAPayment', createPaymentPlan);
router.post('/v1/ewallet/getAPayment', getAPaymentPlan);
router.post('/v1/ewallet/getAllPayment', getAllPaymentPlan);
router.post('/v1/ewallet/updatePaymentPlan', updateAPaymentPlan);

//SubAccount
router.post('/v1/ewallet/createASubAccountPaymentPlan', createASubAccountPaymentPlan);
router.post('/v1/ewallet/deleteASubAccountPaymentPlan', deleteASubAccountPaymentPlan);
router.post('/v1/ewallet/fetchAllSubAccountPaymentPlan', fetchAllSubAccountPaymentPlan);
router.post('/v1/ewallet/fetchASubAccountPaymentPlan', fetchASubAccountPaymentPlan);
router.post('/v1/ewallet/updateASubAccountPaymentPlan', updateASubAccountPaymentPlan);

//Transactions
router.post('/v1/ewallet/getAllTransactions', getAllTransactions);
router.post('/v1/ewallet/getTransactionFee', getTransactionFee);
router.post('/v1/ewallet/resendTransactionWebhook', resendTransactionWebhook);
router.post('/v1/ewallet/transactionRefund', transactionRefund);
router.post('/v1/ewallet/verifyTransaction', verifyTransaction);
router.post('/v1/ewallet/viewTransactionTimeline', viewTransactionTimeline);

//transfer
router.post('/v1/ewallet/createBulkTransfer', createBulkTransfer);
router.post('/v1/ewallet/createTransfer', createTransfer);
router.post('/v1/ewallet/getATransfer', getATransfer);
router.post('/v1/ewallet/getAllTransfer', getAllTransfer);
router.post('/v1/ewallet/getTransferFee', getTransferFee);
router.post('/v1/ewallet/walletToWalletTransfer', walletToWalletTransfer);

//Virtul Account
router.post('/v1/ewallet/createVirtualAccount', createVirtualAccount);
router.post('/v1/ewallet/createBulkAccount', createBulkAccount);
router.post('/v1/ewallet/fetchBulkAccount', fetchBulkAccount);
router.post('/v1/ewallet/getAllPaymentPlan', getAllPaymentPlan);
router.post('/v1/ewallet/getVirtualAccount', getVirtualAccount);

export default router;
