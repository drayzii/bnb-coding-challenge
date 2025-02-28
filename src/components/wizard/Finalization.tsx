export default function Finalization() {
  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Review Your Application</h3>
        <div className="space-y-4">
          <div>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I confirm that all provided information is accurate and complete.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 