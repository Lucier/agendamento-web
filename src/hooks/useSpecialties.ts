import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { specialtyService } from '../services/specialty.service'

export function useSpecialties() {
  const queryClient = useQueryClient()

  const specialtiesQuery = useQuery({
    queryKey: ['specialties'],
    queryFn: specialtyService.findAll,
  })

  const createMutation = useMutation({
    mutationFn: specialtyService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['specialties'],
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: specialtyService.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['specialties'],
      })
    },
  })

  return {
    ...specialtiesQuery,

    createSpecialty: createMutation.mutateAsync,
    deleteSpecialty: deleteMutation.mutateAsync,
  }
}
