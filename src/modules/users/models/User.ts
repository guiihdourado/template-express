// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Exclude } from 'class-transformer'

class User {
  id: string
  name: string
  email: string

  @Exclude()
  password: string

  tenantId: string
  phone?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export { User }
