const ThirdPartyProcessor = require('./third-party-processor');

const makePayment = async ({ payerId, payeeId, amount }) => {
  
  //validateArguments(args);

  await ThirdPartyProcessor.processPayment({ payerId, payeeId, amount });
};

module.exports = {
  makePayment,
};