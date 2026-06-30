import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white/50 backdrop-blur-sm mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* PM Accelerator Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold text-gray-700">
              Product Manager Accelerator
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-md">
              PM Accelerator is the premier destination for aspiring product managers, 
              offering comprehensive training, mentorship, and career acceleration programs 
              to help you break into and excel in product management.
            </p>
            <a
              href="https://www.linkedin.com/company/product-manager-accelerator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-pm-blue hover:underline mt-2"
            >
              LinkedIn <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Developer Info */}
          <div className="text-center sm:text-right">
            <p className="text-sm font-medium text-gray-700">
              WeatherVerse — Full Stack Weather Intelligence Platform
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Built with Next.js, TypeScript, Prisma & WeatherAPI
            </p>
            <p className="text-xs text-gray-400 mt-1">
              © {new Date().getFullYear()} — Technical Assessment Submission
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}