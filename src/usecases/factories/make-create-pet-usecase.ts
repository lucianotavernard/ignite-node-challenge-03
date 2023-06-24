import { CreatePetUseCase } from '../create-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'

export function makeCreatePetUseCase() {
  const petRepository = new PrismaPetsRepository()
  const organizationRepository = new PrismaOrganizationsRepository()

  return new CreatePetUseCase(petRepository, organizationRepository)
}
