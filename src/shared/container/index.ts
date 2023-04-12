import { container } from 'tsyringe'

import '@shared/container/providers'

import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository'
import { IHashProvider } from '@modules/users/providers/HashProvider/IHashProvider'
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
