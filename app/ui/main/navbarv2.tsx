"use client";

import { useState } from "react";

interface NavbarProps {
  brandName?: string;
  cvUrl?: string;
  navLinks?: Array<{
    label: string;
    href: string;
  }>;
}

export default function Navbar2({
  brandName = "Raimundo Estévez",
  cvUrl = "/cv.pdf",
  navLinks = [
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/#projects" },
    { label: "Experience & Education", href: "/my/timeline" },
    { label: "Contact", href: "/#contact" },
  ],
}: NavbarProps = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a
          className="text-sm font-semibold tracking-tight sm:text-base"
          href={"/"}
        >
          {brandName}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 text-xs sm:text-sm md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-indigo-400"
            >
              {link.label}
            </a>
          ))}
          <a
            href={cvUrl}
            className="rounded-full bg-indigo-500 px-3 py-1 text-xs font-medium text-slate-950 transition-colors hover:bg-indigo-600"
          >
            Download CV
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 items-center justify-center w-8 h-8"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-slate-200 transition-transform duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-slate-200 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-slate-200 transition-transform duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-900/95 md:hidden">
          <nav className="flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="px-3 py-2 text-sm transition-colors hover:text-indigo-400 hover:bg-slate-800 rounded"
              >
                {link.label}
              </a>
            ))}
            <a
              href={cvUrl}
              onClick={closeMenu}
              className="mt-2 w-full rounded-full bg-indigo-500 px-3 py-2 text-center text-sm font-medium text-slate-950 transition-colors hover:bg-indigo-600"
            >
              Download CV
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
