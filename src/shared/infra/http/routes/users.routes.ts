import { Router } from 'express'

import { celebrate, Segments, Joi } from 'celebrate'

import { CreateUserController } from '@modules/users/infra/http/controllers/create-user.controller'

const usersRoutes = Router()

const createUserController = new CreateUserController()

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  createUserController.handle,
)

export { usersRoutes }
