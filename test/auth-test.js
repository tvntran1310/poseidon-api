import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import lodash from 'lodash';

import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import * as authController from '../../poseidon-api/src/modules/auth-module/auth.controller.js';

chai.use(chaiAsPromised);                                                       
                                                                                
const assert = chai.assert;                                                     

function createAccountTest () {
  let args;

  before (function () {
    const { MONGO_HOST_TEST, MONGO_PORT_TEST, MONGO_DB_NAME_TEST } = process.env;
    mongoose.connect(`mongodb://${MONGO_HOST_TEST}:${MONGO_PORT_TEST}/${MONGO_DB_NAME_TEST}`);
  });

  beforeEach(function () {
    args = {
      data: {
        'firstName': 'Truong',
        'lastName': 'Tran',
        'email': 'tvntran@gmail.com',
        'password': '123454'
      }
    };
  });

  it('success-case', async function() {
    const resData = await authController.registerAccount(args);
    assert.equal(resData.firstName, 'Truong');
    assert.equal(resData.lastName, 'Tran');
    assert.equal(resData.email, 'tvntran@gmail.com');
  });

  it('Email is required', async function() {
    lodash.unset(args, 'data.email');
    await assert.isRejected(
      authController.registerAccount(args),
      '\"email\" is required'
    );
  });

  it('Email is duplicate', async function() {
    await assert.isRejected(
      authController.registerAccount(args),
      'Email này đã tồn tại'
    );
  });
};

function loginTest () {
  let args;

  before (function () {
    const { MONGO_HOST_TEST, MONGO_PORT_TEST, MONGO_DB_NAME_TEST } = process.env;
    mongoose.connect(`mongodb://${MONGO_HOST_TEST}:${MONGO_PORT_TEST}/${MONGO_DB_NAME_TEST}`);
  });

  beforeEach(function () {
    args = {
      data: {
        email: 'tvntran@gmail.com',
        password: '123454'
      },
    };
  });

  it('success-case', async function () {
    const resData = await authController.loginAccount(args);
  });

  it('Account not found', function() {
    lodash.set(args.data.email, 'tvntran01@gmail.com');
    assert.isRejected(
      authController.loginAccount(args),
      'Account not found'
    )
  });
  it('Login failed', function() {
    lodash.set(args.data.password, '223454');
    assert.isRejected(
      authController.loginAccount(args),
      'Login failed'
    )
  })
};

describe ('auth-service', () => {

  before(function() {
    this.timeout(20000);
  });

  describe ('create-account', () => createAccountTest());
  describe ('login', () => loginTest());
})