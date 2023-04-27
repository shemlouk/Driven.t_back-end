import Joi from 'joi';

export const bookingSchema = Joi.object({ roomId: Joi.number().positive().integer().required() });
export const bookingParamSchema = Joi.object({ bookingId: Joi.number().positive().integer().required() });
