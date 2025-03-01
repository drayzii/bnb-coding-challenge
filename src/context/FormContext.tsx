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
    },
    mode: 'onChange',
  })

  return <RHFFormProvider {...methods}>{children}</RHFFormProvider>
}
