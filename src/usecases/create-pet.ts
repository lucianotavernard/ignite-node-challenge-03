import { Pet } from '@prisma/client'

import { CreatePetParams, PetsRepository } from '@/repositories/pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { OrganizationNotFoundError } from './errors/organization-not-found-error'

type CreatePetUseCaseRequest = CreatePetParams

type CreatePetUseCaseResponse = {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private readonly petRepository: PetsRepository,
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    name,
    description,
    organizationId,
    independenceLevel,
    energyLevel,
    environment,
    size,
    age,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(
      organizationId,
    )

    if (!organization) {
      throw new OrganizationNotFoundError()
    }

    const pet = await this.petRepository.create({
      name,
      description,
      organizationId,
      independenceLevel,
      energyLevel,
      environment,
      size,
      age,
    })

    return {
      pet,
    }
  }
}
