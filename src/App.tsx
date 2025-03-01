import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import FormProvider from './context/FormContext'
import Home from './pages/Home'
import Application from './pages/Application'

function App() {
  return (
    <FormProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex">
                <div className="flex justify-between w-full">
                  <div className="flex items-center py-4">
                    <Link to="/" className="text-xl font-bold text-gray-800">BnB Coding Challenge</Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="max-w-6xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apply/*" element={<Application />} />
            </Routes>
          </div>
        </div>
      </Router>
    </FormProvider>
  )
}

export default App;
