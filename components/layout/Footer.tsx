"use client";
import Link from "next/link";

import {
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import Image from "next/image";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Our Team", href: "/about/team" },
  { label: "News & Notices", href: "/news-notices" },
  { label: "Events", href: "/about/events" },
  { label: "Blogs", href: "/about/blogs" },
];

const resources = [
  "Annual Reports",
  "Newsletters",
  "Policy Papers",
  "Research",
  "Gallery",
  "Downloads",
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-primary-dark text-white relative overflow-hidden"
    >
      <div className="h-1 bg-gradient-to-r from-accent via-accent-light to-accent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/30 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              {/* <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center font-display font-bold text-primary-dark text-lg">
                CNI
              </div>
              <div>
                <p className="font-display font-bold text-sm">
                  Don Bosco
                </p>
                <p className="text-[10px] text-white/50 tracking-wider uppercase">
                  Confederation of Nepalese Industries
                </p>
              </div> */}
              <Image
                src="/logo.jpeg"
                alt="Don Bosco Logo"
                width={225}
                height={25}
              />
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Don Bosco Institute, Tankisinwari, is a leading educational
              institution dedicated to providing quality education and
              vocational training to empower the youth of Nepal.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-accent hover:text-primary-dark hover:border-accent transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-accent">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white hover:pl-2 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-accent">
              Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-white/60 hover:text-white hover:pl-2 transition-all duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-accent">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="flex-shrink-0 mt-0.5 text-accent"
                />
                <p className="text-sm text-white/60">
                  Biratnagar, Koshi Province
                  <br />
                  Nepal
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-accent" />
                <p className="text-sm text-white/60">+977-021-XXXXXXX</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0 text-accent" />
                <p className="text-sm text-white/60">info@donbosco.com.np</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Don Bosco Institute. All rights
            reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-accent hover:text-primary-dark hover:border-accent transition-all duration-300"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
