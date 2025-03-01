import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Home() {
  const [hasApplication, setHasApplication] = useState(false)

  useEffect(() => {
    const uuid = localStorage.getItem('loan_application_uuid')
    setHasApplication(!!uuid)

    const handleStorageChange = () => {
      const uuid = localStorage.getItem('loan_application_uuid')
      setHasApplication(!!uuid)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <div className="prose lg:prose-xl">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <div className="space-y-6">
        <Link
          to="/apply/personal-info"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700"
        >
          {hasApplication ? 'Update Application' : 'Apply Now'}
        </Link>
      </div>
    </div>
  )
}
