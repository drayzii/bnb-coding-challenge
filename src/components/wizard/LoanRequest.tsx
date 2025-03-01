import { useFormContext } from 'react-hook-form'
import type { FormData } from '../../context/formTypes'

export default function LoanRequest() {
  const { register, formState: { errors }, watch } = useFormContext<FormData>()
  const loanAmount = watch('loanAmount')

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">
          Loan Amount (€)
        </label>
        <input
          type="number"
          id="loanAmount"
          min={10000}
          max={70000}
          step={1000}
          {...register('loanAmount', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.loanAmount && (
          <p className="mt-1 text-sm text-red-600">{errors.loanAmount.message}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Enter an amount between €10,000 and €70,000
        </p>
      </div>

      <div>
        <label htmlFor="upfrontPayment" className="block text-sm font-medium text-gray-700">
          Upfront Payment (€)
        </label>
        <input
          type="number"
          id="upfrontPayment"
          min={0}
          max={loanAmount - 1}
          step={1000}
          {...register('upfrontPayment', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.upfrontPayment && (
          <p className="mt-1 text-sm text-red-600">{errors.upfrontPayment.message}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Must be less than the loan amount
        </p>
      </div>

      <div>
        <label htmlFor="terms" className="block text-sm font-medium text-gray-700">
          Loan Term (months)
        </label>
        <input
          type="number"
          id="terms"
          min={10}
          max={30}
          {...register('terms', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.terms && (
          <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Choose between 10 and 30 months (subject to age restrictions)
        </p>
      </div>
    </div>
  )
}
