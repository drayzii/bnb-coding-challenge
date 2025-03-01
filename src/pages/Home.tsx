import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="prose lg:prose-xl">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <div className="space-y-6">
        <Link
          to="/apply/personal-info"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700"
        >
          Apply Now
        </Link>
      </div>
    </div>
  )
}
