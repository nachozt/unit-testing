const { expect, sinon } = require('../../chai.commons');
const PaymentModule = require('../../service/business-logic/payment-module');
const ThirdPartyProcessor = require('../../service/business-logic/third-party-processor');

describe('BusinessLogic: processPayment', function () {
  const sampleArgs = { payerId: 'sample-payer-id', payeeId: 'sample-payee-id', amount: 1000 };
  let processPaymentStub;

  beforeEach(async function () {
    processPaymentStub = sinon.stub(ThirdPartyProcessor, 'processPayment');
  });

  afterEach(function () {
    sinon.restore();
  });

  // tests `validateArguments`
  it('[ERROR] should through bad request error if argument X is missing or bad format', async function () {
    try {
      await PaymentModule.processPayment({ some_bad_arguments: 'wrong_format' });

      expect.fail('Should have thrown error');
    } catch (error) {
      expect(error).to.exist;
      expect(error.name).to.equal('Bad Request Error');
    }
  });

  // tests makePayment => this is a narrow unit test
  it('[SUCCESS] should make payment through ThirdPartyModule', async function () {
    const response = await PaymentModule.processPayment(sampleArgs);

    expect(response).to.deep.equal({ success: true });
    expect(processPaymentStub).to.have.been.calledWith(sampleArgs);
  });
});
