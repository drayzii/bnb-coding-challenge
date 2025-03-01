import { useFormContext } from 'react-hook-form'
import type { FormData } from '../../context/formTypes'

export default function FinancialInfo() {
  const { register, watch, formState: { errors } } = useFormContext<FormData>()
  
  const hasAdditionalIncome = watch('hasAdditionalIncome')
  const hasMortgage = watch('hasMortgage')
  const hasOtherCredits = watch('hasOtherCredits')

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="monthlySalary" className="block text-sm font-medium text-gray-700">
          Monthly Salary (€)
        </label>
        <input
          type="number"
          id="monthlySalary"
          min={0}
          step={100}
          {...register('monthlySalary', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.monthlySalary && (
          <p className="mt-1 text-sm text-red-600">{errors.monthlySalary.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasAdditionalIncome"
            {...register('hasAdditionalIncome')}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="hasAdditionalIncome" className="ml-2 block text-sm text-gray-700">
            I have additional income
          </label>
        </div>

        {hasAdditionalIncome && (
          <div>
            <label htmlFor="additionalIncome" className="block text-sm font-medium text-gray-700">
              Additional Monthly Income (€)
            </label>
            <input
              type="number"
              id="additionalIncome"
              min={0}
              step={100}
              {...register('additionalIncome', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.additionalIncome && (
              <p className="mt-1 text-sm text-red-600">{errors.additionalIncome.message}</p>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasMortgage"
            {...register('hasMortgage')}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="hasMortgage" className="ml-2 block text-sm text-gray-700">
            I have a mortgage
          </label>
        </div>

        {hasMortgage && (
          <div>
            <label htmlFor="mortgage" className="block text-sm font-medium text-gray-700">
              Monthly Mortgage Payment (€)
            </label>
            <input
              type="number"
              id="mortgage"
              min={0}
              step={100}
              {...register('mortgage', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.mortgage && (
              <p className="mt-1 text-sm text-red-600">{errors.mortgage.message}</p>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasOtherCredits"
            {...register('hasOtherCredits')}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="hasOtherCredits" className="ml-2 block text-sm text-gray-700">
            I have other credits
          </label>
        </div>

        {hasOtherCredits && (
          <div>
            <label htmlFor="otherCredits" className="block text-sm font-medium text-gray-700">
              Monthly Credit Payments (€)
            </label>
            <input
              type="number"
              id="otherCredits"
              min={0}
              step={100}
              {...register('otherCredits', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.otherCredits && (
              <p className="mt-1 text-sm text-red-600">{errors.otherCredits.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
