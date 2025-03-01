import { useFormContext } from 'react-hook-form'
import type { FormData } from '../../context/formTypes'

export default function Finalization() {
  const { watch, register, formState: { errors } } = useFormContext<FormData>()
  const formData = watch()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">First Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.firstName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Last Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.lastName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(formData.dateOfBirth)}</dd>
            </div>
          </dl>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Details</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.phone}</dd>
            </div>
          </dl>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Loan Details</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Loan Amount</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatCurrency(formData.loanAmount)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Upfront Payment</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatCurrency(formData.upfrontPayment)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Loan Term</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.terms} months</dd>
            </div>
          </dl>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Information</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Monthly Salary</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatCurrency(formData.monthlySalary)}</dd>
            </div>
            {formData.hasAdditionalIncome && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Additional Income</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatCurrency(formData.additionalIncome || 0)}</dd>
              </div>
            )}
            {formData.hasMortgage && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Monthly Mortgage</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatCurrency(formData.mortgage || 0)}</dd>
              </div>
            )}
            {formData.hasOtherCredits && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Other Credits</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatCurrency(formData.otherCredits || 0)}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <div className="mt-6">
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="isConfirmed"
              type="checkbox"
              {...register('isConfirmed')}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="isConfirmed" className="font-medium text-gray-700">
              I confirm that all provided information is accurate and complete
            </label>
            <p className="text-gray-500">
              By checking this box, you acknowledge that providing false information may result in your application being rejected.
            </p>
          </div>
        </div>
        {errors.isConfirmed && (
          <p className="mt-2 text-sm text-red-600">{errors.isConfirmed.message}</p>
        )}
      </div>

      <style>{`
        .submit-button[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
} 