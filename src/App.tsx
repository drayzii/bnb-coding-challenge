import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Test from './pages/Test'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div className="flex items-center py-4">
                  <Link to="/" className="text-xl font-bold text-gray-800">My App</Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Link to="/" className="py-4 px-2 text-gray-500 hover:text-gray-900">Home</Link>
                  <Link to="/test" className="py-4 px-2 text-gray-500 hover:text-gray-900">Test</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
