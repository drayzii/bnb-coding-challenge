export default function LoanRequest() {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="test" className="block text-sm font-medium text-gray-700">
          Test
        </label>
        <input
          type="text"
          id="test"
          name="test"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  )
}
