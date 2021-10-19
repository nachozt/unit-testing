const { expect, sinon } = require('../../chai.commons');
const PaymentEnpoint = require('../../service/payment-endpoint');
const PaymentModule = require('../../service/business-logic/payment-module');

describe('Endpoint: paymentEndpoint', function () {
  const sampleArgs = { payerId: 'sample-payer-id', payeeId: 'sample-payee-id', amount: 1000 };
  let makePaymentStub;

  beforeEach(async function () {
    makePaymentStub = sinon.stub(PaymentModule, 'makePayment');
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

  // tests makePayment => this is a narrow unit test
  it('[SUCCESS] should make payment through PaymentModule', async function () {
    const response = await PaymentEnpoint.paymentEnpoint(sampleArgs);

    expect(response).to.deep.equal({ success: true });
    expect(makePaymentStub).to.have.been.calledWith(sampleArgs);
  });
});
