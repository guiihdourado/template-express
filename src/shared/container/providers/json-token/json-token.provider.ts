export type Payload = string | Buffer | object
export type Config = {
  secretToken: string
  expiresIn?: string | number | undefined
  subject?: string
}

export type VerifyPayload = {
  [key: string]: any
  iss?: string | undefined
  sub?: string | undefined
  exp?: number | undefined
}

export interface IJsonTokenProvider {
  generateToken(payload: Payload, config: Config): string
  verifyToken(token: string, secretToken: string): VerifyPayload
}
