import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { scheduleService } from '../services/schedule.service'

export function useSchedules() {
  const queryClient = useQueryClient()

  const schedulesQuery = useQuery({
    queryKey: ['schedules'],
    queryFn: scheduleService.findAll,
  })

  const createMutation = useMutation({
    mutationFn: scheduleService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedules'],
      })
    },
  })

  return {
    ...schedulesQuery,

    createSchedule: createMutation.mutateAsync,
  }
}
