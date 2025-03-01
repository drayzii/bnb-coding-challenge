import { useNavigate, useLocation, Routes, Route, Link } from 'react-router-dom'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
import type { FormData } from '../context/formTypes'
import PersonalInfo from '../components/wizard/PersonalInfo'
import ContactDetails from '../components/wizard/ContactDetails'
import LoanRequest from '../components/wizard/LoanRequest'
import FinancialInfo from '../components/wizard/FinancialInfo'
import Finalization from '../components/wizard/Finalization'
import * as api from '../services/api'

const STEP_STORAGE_KEY = 'loan_application_step'
const UUID_STORAGE_KEY = 'loan_application_uuid'
const FORM_DATA_STORAGE_KEY = 'loan_application_data'

const steps = [
  { name: 'Personal Information', path: 'personal-info' },
  { name: 'Contact Details', path: 'contact-details' },
  { name: 'Loan Request', path: 'loan-request' },
  { name: 'Financial Information', path: 'financial-info' },
  { name: 'Finalization', path: 'finalization' },
]

export default function FormWizard() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname.split('/').pop() === 'apply' ? null : location.pathname.split('/').pop()
  const { handleSubmit, trigger, getValues, setError, clearErrors, watch } = useFormContext<FormData>()
  
  const currentStepIndex = steps.findIndex(step => step.path === (currentPath || 'personal-info'))
  
  useEffect(() => {
    console.log('currentPath', currentPath);
    const savedStep = localStorage.getItem(STEP_STORAGE_KEY)
    if (savedStep && !currentPath) {
      navigate(`/apply/${savedStep}`)
    } else if (!currentPath) {
      navigate('/apply/personal-info')
    }
  }, [navigate, currentPath])

  useEffect(() => {
    if (currentPath) {
      localStorage.setItem(STEP_STORAGE_KEY, currentPath)
      if (!localStorage.getItem(FORM_DATA_STORAGE_KEY)) {
        const data = watch()
        localStorage.setItem(FORM_DATA_STORAGE_KEY, JSON.stringify(data))
      }
    }
  }, [currentPath, watch])

  const validateLoanRequest = async () => {
    const values = getValues()
    let isValid = true

    if (values.upfrontPayment >= values.loanAmount) {
      setError('upfrontPayment', {
        type: 'custom',
        message: 'Upfront payment must be less than loan amount'
      })
      isValid = false
    } else {
      clearErrors('upfrontPayment')
    }

    const dob = new Date(values.dateOfBirth)
    const today = new Date()
    const ageInMilliseconds = today.getTime() - dob.getTime()
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
    const age = Math.floor(ageInYears)

    console.log('Age calculation:', { age, terms: values.terms, totalAge: (values.terms / 12) + age })
    
    if ((values.terms / 12) + age >= 80) {
      setError('terms', {
        type: 'custom',
        message: 'Loan term would exceed maximum age limit of 80 years'
      })
      isValid = false
    } else {
      clearErrors('terms')
    }

    return isValid
  }

  const validateFinancialInfo = async () => {
    const values = getValues()
    let isValid = true

    const monthlyIncome = values.monthlySalary + (values.hasAdditionalIncome ? values.additionalIncome || 0 : 0)
    const monthlyObligations = 
      (values.hasMortgage ? values.mortgage || 0 : 0) + 
      (values.hasOtherCredits ? values.otherCredits || 0 : 0)
    
    const disposableIncome = monthlyIncome - monthlyObligations
    const totalLoanCapacity = disposableIncome * values.terms * 0.5

    if (totalLoanCapacity <= values.loanAmount) {
      const message = 'Your financial situation does not support this loan amount. Please either:'
        + '\n- Reduce the loan amount (Step 3)'
        + '\n- Increase your income'
        + '\n- Reduce your financial obligations'

      setError('monthlySalary', {
        type: 'custom',
        message
      })
      isValid = false
    } else {
      clearErrors('monthlySalary')
    }

    return isValid
  }
  
  const goToNextStep = async () => {
    const fieldsToValidate = currentPath === 'personal-info'
      ? ['firstName', 'lastName', 'dateOfBirth'] as const
      : currentPath === 'contact-details'
      ? ['email', 'phone'] as const
      : currentPath === 'loan-request'
      ? ['loanAmount', 'upfrontPayment', 'terms'] as const
      : currentPath === 'financial-info'
      ? ['monthlySalary', 'hasAdditionalIncome', 'additionalIncome', 'hasMortgage', 'mortgage', 'hasOtherCredits', 'otherCredits'] as const
      : []
    
    let isValid = await trigger(fieldsToValidate)
    
    if (isValid && currentPath === 'loan-request') {
      isValid = await validateLoanRequest()
    }

    if (isValid && currentPath === 'financial-info') {
      isValid = await validateFinancialInfo()
    }

    console.log('currentStepIndex', `/apply/${steps[currentStepIndex + 1].path}`);

    if (isValid && currentStepIndex < steps.length - 1) {
      navigate(`/apply/${steps[currentStepIndex + 1].path}`)
    }
  }
  
  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      navigate(`/apply/${steps[currentStepIndex - 1].path}`)
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      const uuid = localStorage.getItem(UUID_STORAGE_KEY)
      console.log('uuid', uuid);
      let response

      if (uuid) {
        response = await api.updateEntity(uuid, data)
        localStorage.removeItem(FORM_DATA_STORAGE_KEY)
        alert('Application updated successfully!')
      } else {
        response = await api.createEntity(data)
        localStorage.setItem(UUID_STORAGE_KEY, response.entity.uuid)
        localStorage.removeItem(FORM_DATA_STORAGE_KEY)
        alert('Application submitted successfully!')
      }

      localStorage.removeItem(STEP_STORAGE_KEY)
      navigate('/')
    } catch (error) {
      console.error('Failed to submit application:', error)
      alert('Failed to submit application. Please try again.')
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav aria-label="Progress">
        <ol className="flex items-center justify-between">
          {steps.map((step, index) => (
            <li key={step.name} className="relative">
              <Link
                to={`/apply/${step.path}`}
                className={`
                  flex h-9 w-9 items-center justify-center rounded-full
                  ${index <= currentStepIndex
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-500'}
                `}
              >
                <span className="hidden sm:block">{index + 1}</span>
              </Link>
              <span className="mt-2 hidden sm:block text-xs text-center">
                {step.name}
              </span>
            </li>
          ))}
        </ol>
      </nav>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 bg-white p-8 rounded-lg shadow">
        <Routes>
          <Route path="personal-info" element={<PersonalInfo />} />
          <Route path="contact-details" element={<ContactDetails />} />
          <Route path="loan-request" element={<LoanRequest />} />
          <Route path="financial-info" element={<FinancialInfo />} />
          <Route path="finalization" element={<Finalization />} />
        </Routes>

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={goToPreviousStep}
            disabled={currentStepIndex === 0}
            className={`
              px-4 py-2 rounded-md text-sm font-medium
              ${currentStepIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
          >
            Previous
          </button>
          <button
            type={currentStepIndex === steps.length - 1 ? 'submit' : 'button'}
            onClick={currentStepIndex === steps.length - 1 ? undefined : goToNextStep}
            disabled={currentStepIndex === steps.length - 1 && !watch('isConfirmed')}
            className={`
              px-4 py-2 rounded-md text-sm font-medium
              ${currentStepIndex === steps.length - 1
                ? 'bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'}
            `}
          >
            {currentStepIndex === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  )
} 