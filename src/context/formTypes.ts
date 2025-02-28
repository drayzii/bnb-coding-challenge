import { z } from 'zod'

export const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
})

export type FormData = z.infer<typeof formSchema>
