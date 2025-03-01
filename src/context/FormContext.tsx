import { ReactNode } from 'react'
import { useForm, FormProvider as RHFFormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema, type FormData } from './formTypes'

export default function FormProvider({ children }: { children: ReactNode }) {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
    mode: 'onChange',
  })

  return <RHFFormProvider {...methods}>{children}</RHFFormProvider>
}
