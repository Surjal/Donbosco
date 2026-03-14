"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Building2,
  User,
  MessageSquare,
  ChevronDown,
  Link,
} from "lucide-react";
import { Organization } from "@/lib/types";
import api from "@/lib/axios";
import { toast } from "sonner";

export function ContactContent() {
  const [sisterOrgs, setSisterOrgs] = useState<Organization[]>([]);
  async function fetchNavSisterOrgs(): Promise<Organization[]> {
    try {
      const response = await api.get("/organization/all");
      const items = response.data;
      return (
        items?.organizations?.map((item: any) => ({
          id: item.id,
          name: item.name || item.title || "",
        })) ?? []
      );
    } catch {
      return [];
    }
  }
  const [formData, setFormData] = useState({
    organization_id: 1,
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (
      formData.organization_id === 0 ||
      formData.email === "" ||
      formData.name === "" ||
      formData.phone === "" ||
      formData.message === ""
    ) {
      toast.error("Please fill all the fields");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await api.post("/contact", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);

      setFormData({
        organization_id: 0,
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      toast.success(
        "Thank you for your message! We'll get back to you shortly.",
      );
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    fetchNavSisterOrgs().then((orgs) => {
      if (orgs.length > 0) setSisterOrgs(orgs);
    });
  }, []);
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-primary-dark text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            style={{
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
            className="w-full h-full"
          />
        </div>

        {/* Background image overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80"
            alt="Contact"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/95 to-primary-dark/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Have questions? We're here to help and answer any questions you
              might have.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-light-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} className="text-primary" />
              </div>
              <h3 className="font-bold text-primary mb-2">Address</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                We're here to help with any inquiries.
              </p>
              <p className="mt-2 text-sm font-semibold text-gray-800">
                Bargachhi Chowk, Biratnagar
              </p>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Phone size={28} className="text-accent" />
              </div>
              <h3 className="font-bold text-primary mb-2">Call Us</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-2">
                We're here to help with any inquiries.
              </p>
              <p className="mt-2 text-sm font-semibold text-gray-800">
                021-590567
              </p>
              {/* <Link
                href="tel:021-590567"
                className="text-sm font-semibold text-primary hover:text-accent transition-colors"
              >
                021-590567
              </Link> */}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-red-500" />
              </div>
              <h3 className="font-bold text-primary mb-2">Email</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-2">
                We're here to help with any inquiries.
              </p>
              <p className="mt-2 text-sm font-semibold text-gray-800">
                info@cnicb.org.np
              </p>
              {/* <Link
                href="mailto:info@cnicb.org.np"
                className="text-sm font-semibold text-primary hover:text-accent transition-colors break-all"
              >
                
              </Link> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form + Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold text-primary mb-3">
                  Send us a Message
                </h2>
                <p className="text-text-muted">
                  Fill out the form below and we'll get back to you shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Organization */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Organization <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <select
                      value={formData.organization_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          organization_id: Number(e.target.value),
                        })
                      }
                      required
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 bg-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    >
                      {sisterOrgs.map((org) => (
                        <option key={org.id} value={org.id}>
                          {org.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      placeholder="your.email@example.com"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="tel"
                      value={formData.phone || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+977 XXX-XXXXXXX"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare
                      size={18}
                      className="absolute left-4 top-4 text-gray-400"
                    />
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Query
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-28"
            >
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold text-primary mb-3">
                  Visit us
                </h2>
                <p className="text-text-muted">
                  Located in the heart of Biratnagar, easily accessible.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.3904449107556!2d87.27995!3d26.45827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef741f1e5c3e67%3A0x7a36f5b1c8e8e4b6!2sBiratnagar%2C%20Nepal!5e0!3m2!1sen!2snp!4v1234567890"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>

              <div className="mt-6 bg-light-primary rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  <MapPin size={20} />
                  Office Location
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  Our office is located in the industrial area of Koshi i.e.
                  Biratnagar. You can easily reach us via phone or email, or
                  visit in person during our office hours. We look forward to
                  collaborating with you!
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-700">
                      Office Hours:
                    </span>
                    <span className="text-text-muted ml-2">
                      Sunday - Friday, 10:00 AM - 5:00 PM
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-gray-700">
                      Address:
                    </span>
                    <span className="text-text-muted ml-2">
                      Bargachhi Chowk, Biratnagar, Koshi Province
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
