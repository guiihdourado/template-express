import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { User } from '@modules/users/models/User'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { prisma } from '@shared/infra/prisma'

class UsersRepository implements IUsersRepository {
  private repository: typeof prisma.user

  constructor() {
    this.repository = prisma.user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findFirst({
      where: {
        email,
      },
    })

    return user
  }

  public async create({
    email,
    name,
    password,
    phone,
    tenantId,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.repository.create({
      data: {
        email,
        name,
        password,
        phone,
        tenantId,
      },
    })

    return user
  }
}

export { UsersRepository }
