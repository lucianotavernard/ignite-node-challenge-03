import { compare } from 'bcryptjs'
import { Organization } from '@prisma/client'

import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InvalidCredentialsError } from '@/usecases/errors/invalid-credentials-error'

type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = {
  organization: Organization
}

export class AuthenticateUseCase {
  constructor(
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = await compare(
      password,
      organization.passwordHash,
    )

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      organization,
    }
  }
}
