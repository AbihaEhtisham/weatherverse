import Link from 'next/link';
import { CloudOff, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <CloudOff className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-gray-500 mb-8 text-lg">This page is not in the forecast.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-pm-blue text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}