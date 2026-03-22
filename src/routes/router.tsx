import { createBrowserRouter } from 'react-router-dom'
import { AppointmentForm } from '../pages/appointments/create'
import { AppointmentList } from '../pages/appointments/list'
import { ScheduleForm } from '../pages/schedules/create'
import ScheduleList from '../pages/schedules/list'

export const router = createBrowserRouter([
  {
    path: 'schedules/new',
    element: <ScheduleForm />,
  },
  {
    path: 'schedules',
    element: <ScheduleList />,
  },
  {
    path: 'schedules/edit/:id',
    element: <ScheduleForm />,
  },
  {
    path: 'appointments/new',
    element: <AppointmentForm />,
  },
  {
    path: '/appointments',
    element: <AppointmentList />,
  },
  {
    path: 'appointments/:id',
    element: <AppointmentForm />,
  },
])
