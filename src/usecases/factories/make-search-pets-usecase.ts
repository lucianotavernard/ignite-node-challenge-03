import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsUseCase } from '../search-pets'

export function makeSearchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  return new SearchPetsUseCase(petsRepository)
}
