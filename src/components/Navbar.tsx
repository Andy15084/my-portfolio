'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-[var(--accent-green)] font-bold text-xl">
              AP
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="#about" className="nav-link">
                About
              </Link>
              <Link href="#skills" className="nav-link">
                Skills
              </Link>
              <Link href="#projects" className="nav-link">
                Projects
              </Link>
              <Link href="#contact" className="nav-link">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 