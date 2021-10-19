const { expect, sinon } = require('../../chai.commons');
const PaymentEnpoint = require('../../service/payment-endpoint');
const ThirdPartyProcessor = require('../../service/business-logic/third-party-processor');

describe('Endpoint: paymentEndpoint', function () {
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
      await PaymentEnpoint.paymentEnpoint({ some_bad_arguments: 'wrong_format' });

      expect.fail('Should have thrown error');
    } catch (error) {
      expect(error).to.exist;
      expect(error.name).to.equal('Bad Request Error');
    }
  });

  // tests makePayment => this is a broad unit test (or a simple integration test)
  it('[SUCCESS] should make payment through ThirdPartyModule', async function () {
    const response = await PaymentEnpoint.paymentEnpoint(sampleArgs);

    expect(response).to.deep.equal({ success: true });
    expect(processPaymentStub).to.have.been.calledWith(sampleArgs);
  });

  // tests makePayment => this is a broad unit test (or a simple integration test)
  it('[ERROR] should throw ThirdPartyModule error', async function () {});
});
