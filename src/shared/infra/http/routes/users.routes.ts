import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController'

const usersRoutes = Router()

const createUserController = new CreateUserController()

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      phone: Joi.string(),
      tenantId: Joi.string(),
    },
  }),
  createUserController.handle,
)

export { usersRoutes }
