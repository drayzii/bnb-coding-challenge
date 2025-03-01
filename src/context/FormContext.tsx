import { ReactNode, useEffect } from 'react'
import { useForm, FormProvider as RHFFormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema, type FormData } from './formTypes'

const STORAGE_KEY = 'loan_application_form'

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
  const savedForm = localStorage.getItem(STORAGE_KEY)
  
  const initialValues = savedForm 
    ? { ...defaultValues, ...JSON.parse(savedForm) }
    : defaultValues

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  })

  useEffect(() => {
    const subscription = methods.watch((data) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    })
    return () => subscription.unsubscribe()
  }, [methods])

  return <RHFFormProvider {...methods}>{children}</RHFFormProvider>
}
