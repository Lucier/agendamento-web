import { useQuery } from '@tanstack/react-query'
import { professionalService } from '../services/professional.service'

export function useProfessionals() {
  const professionalsQuery = useQuery({
    queryKey: ['professionals'],
    queryFn: professionalService.findAll,
  })

  return {
    ...professionalsQuery,
  }
}
