import * as Joi from 'joi'

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'testing').required(),
  PORT: Joi.number().default(3000),
  MONGO_URI: Joi.string().required(),

})