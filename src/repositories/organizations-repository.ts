import { Prisma, Organization } from '@prisma/client'

export type CreateOrganizationParams = Prisma.OrganizationCreateInput

export interface OrganizationsRepository {
  findById(id: string): Promise<Organization | null>
  findByName(name: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
  create(params: CreateOrganizationParams): Promise<Organization>
}
