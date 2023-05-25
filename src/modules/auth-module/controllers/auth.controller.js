import Joi from 'joi';

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
      return data;
    })
    .catch(err => {
      return Promise.reject({
        error: 'SchemaValidationError',
        message: err.message,
      });
    });
}

export function loginAccount(req, res) {
  res.send({});
}
