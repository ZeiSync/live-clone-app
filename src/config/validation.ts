import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'testing')
    .required(),
  PORT: Joi.number().default(3000),
  MONGO_URI: Joi.string().required(),
  SECRET_KEY: Joi.string().required(),
  SENDGRID_API_KEY: Joi.string().required(),
  EMAIL: Joi.string().default('no-reply@6weeks.vn'),
  CLIENT_ID: Joi.string().required(),
  CLIENT_SECRET: Joi.string().required(),
  CALLBACK_URL: Joi.string().required(),
});
