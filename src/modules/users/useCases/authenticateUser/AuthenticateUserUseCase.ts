/* eslint-disable @typescript-eslint/no-unused-vars */
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import auth from '@config/auth'
import { IHashProvider } from '@modules/users/providers/HashProvider/IHashProvider'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    const { expiresInToken, secretToken } = auth

    if (!user) {
      throw new AppError('Email or password incorrect!')
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    )

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!')
    }

    const token = sign(
      {
        email: user.email,
        tenantId: user.tenantId,
      },
      secretToken,
      {
        subject: user.id,
        expiresIn: expiresInToken,
      },
    )

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }
