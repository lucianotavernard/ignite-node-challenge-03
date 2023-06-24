import { Pet, Prisma } from '@prisma/client'

export type CreatePetParams = Prisma.PetUncheckedCreateInput

export type SearchPetsParams = {
  city?: string
  age?: 'Puppy' | 'Adult' | 'Senior'
  size?: 'Low' | 'Medium' | 'High'
  environment?: 'Small' | 'Medium' | 'Large'
  energyLevel?: 'Calm' | 'Peaceful' | 'Fussy'
  independenceLevel?: 'Low' | 'Medium' | 'High'
}

export interface PetsRepository {
  create(data: CreatePetParams): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findMany(params: SearchPetsParams): Promise<Pet[]>
}
