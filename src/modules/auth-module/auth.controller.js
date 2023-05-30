import Joi from 'joi';
import * as AccountService from './auth.service';

export async function registerAccount({ data }) {
  const schema = Joi.object({
    firstName: Joi.string()
      .required(),
    lastName: Joi.string()
      .required(),
    email: Joi.string()
      .required(),
    password: Joi.string()
      .required(),
  });

  return schema
    .validateAsync(data, {
      stripUnknown: true
    })
    .then(data => {
      return AccountService.createAccount(data);
    })
    .catch(err => {
      return Promise.reject({
        error: 'SchemaValidationError',
        message: err.message,
      });
    });
}

export async function loginAccount({ data }) {
  const schema = Joi.object({
    email: Joi.string()
      .required(),
    password: Joi.string()
      .required(),
  });

  return schema
    .validateAsync(data, {
      stripUnknown: true
    })
    .then(data => {
      return AccountService.loginAccount(data);
    })
    .catch(err => {
      return Promise.reject({
        status: 400,
        error: 'SchemaValidationError',
        message: err.message,
      });
    });
}
