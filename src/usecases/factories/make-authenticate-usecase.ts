import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const organizationRepository = new PrismaOrganizationsRepository()
  return new AuthenticateUseCase(organizationRepository)
}
