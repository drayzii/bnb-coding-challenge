import { z } from 'zod'

const nameRegex = /^[a-zA-ZäöüßÄÖÜ]+$/
const lastNameRegex = /^[a-zA-ZäöüßÄÖÜ\s]+$/

export const formSchema = z.object({
  // Personal Information
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .regex(nameRegex, 'First name can only be one word and only contain Latin and German letters')
    .max(50, 'First name cannot exceed 50 characters'),
  
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .regex(lastNameRegex, 'Last name can only contain Latin and German letters and spaces')
    .max(100, 'Last name cannot exceed 100 characters'),
  
  dateOfBirth: z.string()
    .refine((date) => {
      const dob = new Date(date)
      return !isNaN(dob.getTime())
    }, 'Please enter a valid date')
    .refine((date) => {
      const dob = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - dob.getFullYear()
      const monthDiff = today.getMonth() - dob.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        return age - 1 <= 79
      }
      return age <= 79
    }, 'Age must be 79 years or younger'),

  // Contact Details
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  
  phone: z.string()
    .min(1, 'Phone number is required')
    .regex(/^\+[1-9]\d{1,14}$/, 'Phone number must be in E.164 format (e.g., +1234567890)'),
})

export type FormData = z.infer<typeof formSchema>
