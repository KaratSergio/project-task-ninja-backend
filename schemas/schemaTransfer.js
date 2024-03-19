import Joi from "joi";

const transferSchema = Joi.object({
  source: Joi.object({
    index: Joi.number(),
    droppableId: Joi.string().required(),
  }),
  destination: Joi.object({
    index: Joi.number().required(),
    droppableId: Joi.string().required(),
  }),
});

export default transferSchema;
