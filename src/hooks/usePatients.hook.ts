import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { patientService } from '../services/patient.service'

export function usePatients() {
  const queryClient = useQueryClient()

  const patientiesQuery = useQuery({
    queryKey: ['patients'],
    queryFn: patientService.findAll,
  })

  const createMutation = useMutation({
    mutationFn: patientService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['patients'],
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: patientService.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['patients'],
      })
    },
  })

  return {
    ...patientiesQuery,

    createPatient: createMutation.mutateAsync,
    deletePatient: deleteMutation.mutateAsync,
  }
}
