'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CloudSun, History, GitCompare } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: CloudSun },
  { href: '/history', label: 'History', icon: History },
  { href: '/compare', label: 'Compare', icon: GitCompare },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <CloudSun className="w-7 h-7 text-pm-blue group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-gray-900">
              Weather<span className="text-pm-blue">Verse</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-pm-light text-pm-blue'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}