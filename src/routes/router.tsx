import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoute } from '../components/PrivateRoute'
import { AppointmentForm } from '../pages/appointments/create'
import { AppointmentList } from '../pages/appointments/list'
import { LoginForm } from '../pages/login/LoginForm'
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
    path: '/',
    element: <LoginForm />,
  },
  {
    path: '/schedules/new',
    element: (
      <PrivateRoute>
        <ScheduleForm />
      </PrivateRoute>
    ),
  },
  {
    path: '/schedules',
    element: (
      <PrivateRoute>
        <ScheduleList />
      </PrivateRoute>
    ),
  },
  {
    path: '/schedules/edit/:id',
    element: (
      <PrivateRoute>
        <ScheduleForm />
      </PrivateRoute>
    ),
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
    element: (
      <PrivateRoute>
        <AppointmentForm />
      </PrivateRoute>
    ),
  },
  {
    path: '/specialties/new',
    element: (
      <PrivateRoute>
        <SpecialtyForm />
      </PrivateRoute>
    ),
  },
  {
    path: '/specialties',
    element: (
      <PrivateRoute>
        <SpecialtyList />
      </PrivateRoute>
    ),
  },
  {
    path: '/specialties/:id',
    element: (
      <PrivateRoute>
        <SpecialtyForm />
      </PrivateRoute>
    ),
  },
  {
    path: '/professionals/new',
    element: (
      <PrivateRoute>
        <ProfessionalForm />
      </PrivateRoute>
    ),
  },
  {
    path: '/professionals',
    element: (
      <PrivateRoute>
        <ProfessionalList />
      </PrivateRoute>
    ),
  },
  {
    path: '/professionals/:id',
    element: (
      <PrivateRoute>
        <ProfessionalForm />
      </PrivateRoute>
    ),
  },
  {
    path: '/patients',
    element: (
      <PrivateRoute>
        <PatientList />
      </PrivateRoute>
    ),
  },
  {
    path: '/patients/new',
    element: <PatientForm />,
  },
  {
    path: '/patients/:id',
    element: (
      <PrivateRoute>
        <PatientForm />
      </PrivateRoute>
    ),
  },
])
