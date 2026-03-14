"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface DropdownItem {
  label: string;
  href: string;
  external?: boolean;
  subItems?: DropdownItem[]; // NEW: support nested menus
}

interface Props {
  label: string;
  href: string; // Add href for the main label
  items: DropdownItem[];
  scrolled: boolean;
}

export function NavDropdown({ label, href, items, scrolled }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const submenuTimeoutRef = useRef<NodeJS.Timeout>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveSubmenu(null);
    }, 150);
  };

  const handleSubmenuEnter = (label: string) => {
    if (submenuTimeoutRef.current) clearTimeout(submenuTimeoutRef.current);
    setActiveSubmenu(label);
  };

  const handleSubmenuLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => setActiveSubmenu(null), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (submenuTimeoutRef.current) clearTimeout(submenuTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={href}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 text-black `}
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-1 min-w-[240px] bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
          >
            {items.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.subItems && handleSubmenuEnter(item.label)
                }
                onMouseLeave={handleSubmenuLeave}
              >
                {item.subItems ? (
                  // Parent with submenu
                  <>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={14} />
                    </Link>

                    {/* Submenu */}
                    <AnimatePresence>
                      {activeSubmenu === item.label && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-full top-0 ml-1 min-w-[280px] max-h-[400px] overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-100 py-2"
                        >
                          {item.subItems.map((subItem) =>
                            subItem.external ? (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            ) : (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            ),
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : item.external ? (
                  // External link without submenu
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  // Internal link without submenu
                  <Link
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
