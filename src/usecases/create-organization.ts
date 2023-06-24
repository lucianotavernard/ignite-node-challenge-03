import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'

import {
  CreateOrganizationParams,
  OrganizationsRepository,
} from '@/repositories/organizations-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

type CreateOrganizationUseCaseRequest = Omit<
  CreateOrganizationParams,
  'passwordHash'
> & {
  password: string
}

type CreateOrganizationUseCaseResponse = {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    responsableName,
    whatsapp,
    zipcode,
    address,
    city,
    uf,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const passwordHash = await hash(password, 8)

    const organizationWithSameName =
      await this.organizationsRepository.findByName(name)

    if (organizationWithSameName) {
      throw new OrganizationAlreadyExistsError()
    }

    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      name,
      email,
      passwordHash,
      responsableName,
      whatsapp,
      zipcode,
      address,
      city,
      uf,
    })

    return {
      organization,
    }
  }
}
