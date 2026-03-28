import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoute } from '../components/PrivateRoute'
import { AppLayout } from '../layouts/AppLayout'
import { AppointmentForm } from '../pages/appointments/create'
import { AppointmentList } from '../pages/appointments/list'
import { Consulta } from '../pages/consulta'
import { Dashboard } from '../pages/dashborad'
import { Home } from '../pages/home/Home'
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
    element: <Home />,
  },
  {
    path: '/consulta',
    element: <Consulta />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/',
    element: <LoginForm />,
  },
  {
    path: '/appointments/new',
    element: <AppointmentForm />,
  },

  // ROTAS PROTEGIDAS
  {
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/schedules',
        element: <ScheduleList />,
      },
      {
        path: '/schedules/new',
        element: <ScheduleForm />,
      },
      {
        path: '/schedules/edit/:id',
        element: <ScheduleForm />,
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
        path: '/specialties',
        element: <SpecialtyList />,
      },
      {
        path: '/specialties/new',
        element: <SpecialtyForm />,
      },
      {
        path: '/specialties/:id',
        element: <SpecialtyForm />,
      },
      {
        path: '/professionals',
        element: <ProfessionalList />,
      },
      {
        path: '/professionals/new',
        element: <ProfessionalForm />,
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
    ],
  },
])
