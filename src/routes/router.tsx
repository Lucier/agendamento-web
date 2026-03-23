import { createBrowserRouter } from 'react-router-dom'
import { AppointmentForm } from '../pages/appointments/create'
import { AppointmentList } from '../pages/appointments/list'
import PatientForm from '../pages/patients/create'
import PatientList from '../pages/patients/list'
import ProfessionalForm from '../pages/professionals/create'
import ProfessionalList from '../pages/professionals/list'
import { ScheduleForm } from '../pages/schedules/create'
import ScheduleList from '../pages/schedules/list'
import SpecialtyForm from '../pages/specialties/create'
import SpecialtyList from '../pages/specialties/list'

export const router = createBrowserRouter([
  {
    path: '/schedules/new',
    element: <ScheduleForm />,
  },
  {
    path: '/schedules',
    element: <ScheduleList />,
  },
  {
    path: '/schedules/edit/:id',
    element: <ScheduleForm />,
  },
  {
    path: '/appointments/new',
    element: <AppointmentForm />,
  },
  {
    path: '/appointments',
    element: <AppointmentList />,
  },
  {
    path: '/appointments/:id',
    element: <AppointmentForm />,
  },
  {
    path: '/specialties/new',
    element: <SpecialtyForm />,
  },
  {
    path: '/specialties',
    element: <SpecialtyList />,
  },
  {
    path: '/specialties/:id',
    element: <SpecialtyForm />,
  },
  {
    path: '/professionals/new',
    element: <ProfessionalForm />,
  },
  {
    path: '/professionals',
    element: <ProfessionalList />,
  },
  {
    path: '/professionals/:id',
    element: <ProfessionalForm />,
  },
  {
    path: '/patients',
    element: <PatientList />,
  },
  {
    path: '/patients/new',
    element: <PatientForm />,
  },
  {
    path: '/patients/:id',
    element: <PatientForm />,
  },
])
