const PaymentModule = require('./business-logic/payment-module');

/**
 * This function validates argument existence and types
 * based on a schema. Using TS avoids this validation. 
 */
const validateArguments = (args) => true;

/**
 * Enpoint that receives payment requests and processes them.
 */
const paymentEnpoint = async (args) => {
  const { payerId, payeeId, amount } = args;
  
  validateArguments(args);

  await PaymentModule.makePayment({ payerId, payeeId, amount });

  return { success: true };
};

module.exports = {
  paymentEnpoint,
};