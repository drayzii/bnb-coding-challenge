import { useFormContext } from 'react-hook-form'
import type { FormData } from '../../context/formTypes'

export default function ContactDetails() {
  const { register, formState: { errors } } = useFormContext<FormData>()

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="+1234567890"
          />
        </div>
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Enter phone number in E.164 format (e.g., +1234567890)
        </p>
      </div>
    </div>
  )
}
