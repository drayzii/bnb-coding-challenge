import { ReactNode, useEffect, useState } from 'react'
import { useForm, FormProvider as RHFFormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema, type FormData } from './formTypes'
import * as api from '../services/api'

const UUID_STORAGE_KEY = 'loan_application_uuid'

const defaultValues: FormData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  phone: '',
  loanAmount: 10000,
  upfrontPayment: 0,
  terms: 10,
  monthlySalary: 0,
  hasAdditionalIncome: false,
  additionalIncome: 0,
  hasMortgage: false,
  mortgage: 0,
  hasOtherCredits: false,
  otherCredits: 0,
  isConfirmed: false,
}

export default function FormProvider({ children }: { children: ReactNode }) {
  const [uuid, setUuid] = useState<string | null>(localStorage.getItem(UUID_STORAGE_KEY))
  const [isLoading, setIsLoading] = useState(true)

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  })

  useEffect(() => {
    async function loadSavedApplication() {
      try {
        if (uuid) {
          const response = await api.getEntity(uuid)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { uuid: _, ...rest } = response
          methods.reset(rest)
        }
      } catch (error) {
        console.error('Failed to load saved application:', error)
        localStorage.removeItem(UUID_STORAGE_KEY)
        setUuid(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadSavedApplication()
  }, [uuid, methods])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <RHFFormProvider {...methods}>
      {children}
    </RHFFormProvider>
  )
}
