import { Response, Request } from 'express'

import { container } from 'tsyringe'

import { CreateUserUseCase } from '@modules/users/application/use-cases/create-user'

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    await createUserUseCase.execute({
      email,
      name,
      password,
    })

    return response.status(201).send()
  }
}

export { CreateUserController }
