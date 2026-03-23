import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { professionalService } from '../services/professional.service'

export function useProfessionals() {
  const queryClient = useQueryClient()

  const professionalsQuery = useQuery({
    queryKey: ['professionals'],
    queryFn: professionalService.findAll,
  })

  const createMutation = useMutation({
    mutationFn: professionalService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['professionals'],
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: professionalService.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['professionals'],
      })
    },
  })

  return {
    ...professionalsQuery,
    createProfessional: createMutation.mutateAsync,
    deleteProfessional: deleteMutation.mutateAsync,
  }
}
