import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

type SearchPetsUseCaseRequest = {
  city?: string
  age?: 'Puppy' | 'Adult' | 'Senior'
  size?: 'Low' | 'Medium' | 'High'
  environment?: 'Small' | 'Medium' | 'Large'
  energyLevel?: 'Calm' | 'Peaceful' | 'Fussy'
  independenceLevel?: 'Low' | 'Medium' | 'High'
}

type SearchPetsUseCaseResponse = {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private readonly petRepository: PetsRepository) {}

  async execute(
    params: SearchPetsUseCaseRequest,
  ): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petRepository.findMany(params)

    return {
      pets,
    }
  }
}
