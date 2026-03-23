export type Schedule = {
  id: string
  date: string
  professionalId: string
  professional: {
    id: string
    name: string
  }
  timeSlots: {
    time: string
  }[]
}

export type TimeSlot = {
  id: string
  hour: string
  scheduleId: string
}[]

export type Professional = {
  id: string
  name: string
}

export type Appointment = {
  id: string
  dateTime: string
  patientId: string
  professionalId: string
  timeSlotId: string
  patient?: {
    id: string
    name: string
    sus_card: string
  }
  professional?: {
    id: string
    name: string
  }
  timeSlot?: {
    id: string
    time: string
  }
}

export type Specialty = {
  id: string
  name: string
}

export type Patient = {
  id: string
  name: string
  sus_card: string
}
