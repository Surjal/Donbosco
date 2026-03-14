"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavDropdown, type DropdownItem } from "./NavDropdown";
import Image from "next/image";
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);



  // Build nav structure dynamically based on fetched org data
  const navStructure = useMemo(
    () => [
      { label: "Home", href: "/" },
      {
        label: "About",
        href: "/about",
        dropdown: [
          { label: "Our Story", href: "/about" },
          { label: "Mission & Values", href: "/about#mission" },
          { label: "Our Journey", href: "/about#journey" },
          { label: "Our Team", href: "/about/team" },
          { label: "Events", href: "/about/events" },
          { label: "Blogs", href: "/about/blogs" },
        ],
      },
      {
        label: "News & Notices",
        href: "/news-notices",
        dropdown: [
          { label: "News", href: "/news-notices?filter=news" },
          { label: "Notices", href: "/news-notices?filter=notice" },
        ],
      },

      {
        label: "Media",
        href: "/media",
        dropdown: [
          { label: "Photo Gallery", href: "/media/photos" },
          { label: "Video Gallery", href: "/media/videos" },
        ],
      },
      { label: "Admissions", href: "/admissions" },
      { label: "FAQ", href: "/faq" },
    ],
    [],
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 py-2"
        : "bg-white shadow-xl py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src={scrolled ? "/donbosco-logo.png" : "/donbosco-logo.png"}
              alt="Don Bosco Logo"
              width={225}
              height={35}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navStructure.map((item) =>
              item.dropdown ? (
                <NavDropdown
                  key={item.label}
                  label={item.label}
                  href={item.href!}
                  items={item.dropdown as DropdownItem[]}
                  scrolled={scrolled}
                />
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`px-4 py-2 text-black rounded-lg 
                       hover:text-primary hover:bg-primary/5
                      text-sm font-medium transition-all duration-300  `}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="/contact"
              className={`ml-3 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${scrolled
                ? "bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20"
                : "bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/10"
                }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-primary" : "text-white"
              }`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {navStructure.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <MobileDropdown
                      label={item.label}
                      items={item.dropdown as DropdownItem[]}
                      onClose={() => setMobileOpen(false)}
                    />
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/contact" // ← Make sure this goes to /contact
                className="ml-3 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/10"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* Mobile dropdown accordion with nested support */
function MobileDropdown({
  label,
  items,
  onClose,
}: {
  label: string;
  items: DropdownItem[];
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-primary/5 transition-colors"
      >
        {label}
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-4 py-2 space-y-1">
              {items.map((item) =>
                item.subItems ? (
                  <MobileNestedDropdown
                    key={item.label}
                    item={item}
                    onClose={onClose}
                  />
                ) : item.external ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Mobile nested dropdown */
function MobileNestedDropdown({
  item,
  onClose,
}: {
  item: DropdownItem;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-4 py-1 space-y-1 max-h-60 overflow-y-auto">
              {item.subItems!.map((subItem) =>
                subItem.external ? (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="block px-3 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-primary/5 rounded transition-colors"
                  >
                    {subItem.label}
                  </Link>
                ) : (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    onClick={onClose}
                    className="block px-3 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-primary/5 rounded transition-colors"
                  >
                    {subItem.label}
                  </Link>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
