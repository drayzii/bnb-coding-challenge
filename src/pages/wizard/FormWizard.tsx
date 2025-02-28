import { useNavigate, useLocation, Routes, Route, Link } from 'react-router-dom'
import PersonalInfo from '../../components/wizard/PersonalInfo'
import ContactDetails from '../../components/wizard/ContactDetails'
import LoanRequest from '../../components/wizard/LoanRequest'
import FinancialInfo from '../../components/wizard/FinancialInfo'
import Finalization from '../../components/wizard/Finalization'

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
  const currentPath = location.pathname.split('/').pop()
  
  const currentStepIndex = steps.findIndex(step => step.path === currentPath)
  
  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      navigate(`/wizard/${steps[currentStepIndex + 1].path}`)
    }
  }
  
  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      navigate(`/wizard/${steps[currentStepIndex - 1].path}`)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav aria-label="Progress">
        <ol className="flex items-center justify-between">
          {steps.map((step, index) => (
            <li key={step.name} className="relative">
              <Link
                to={`/wizard/${step.path}`}
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

      <div className="mt-8 bg-white p-8 rounded-lg shadow">
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
            type="button"
            onClick={goToNextStep}
            className={`
              px-4 py-2 rounded-md text-sm font-medium
              ${currentStepIndex === steps.length - 1
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'}
            `}
          >
            {currentStepIndex === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
} 