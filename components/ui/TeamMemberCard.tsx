"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, MapPin, X } from "lucide-react";
import type { Staff } from "@/lib/types";
import Link from "next/link";
import Preview from "./Editor";
import { useState, useEffect } from "react";

interface Props {
  member: Staff;
  index?: number;
}

export function TeamMemberCard({ member, index = 0 }: Props) {
  const [showModal, setShowModal] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.6 }}
        className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
      >
        <div className="flex flex-col md:flex-row gap-6 p-3 md:p-6">
          {/* Photo */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-md">
              <Image
                src={
                  member.image ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
                }
                alt={member.name}
                width={128}
                height={128}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col items-start justify-center">
            <h3 className="font-display font-bold text-gray-800 text-xl mb-1 group-hover:text-primary transition-colors">
              {member.name}
            </h3>
            <p className="text-sm text-justify text-muted mb-4">
              {member.designation}
            </p>

            <Preview
              value={
                member?.bio?.length! > 500
                  ? member?.bio?.substring(0, 200) + " ..."
                  : member?.bio || ""
              }
            />

            {member?.bio?.length! > 500 && (
              <button
                onClick={() => setShowModal(true)}
                className="text-primary text-sm px-2 py-1 mt-2 cursor-pointer hover:underline"
              >
                Read More
              </button>
            )}

            <div className="space-y-2">
              {member.address && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={14} className="text-primary flex-shrink-0" />
                  <span>{member.address}</span>
                </div>
              )}
              {member.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} className="text-primary flex-shrink-0" />
                  <a
                    href={`tel:${member.phone}`}
                    className="hover:text-primary transition-colors"
                  >
                    {member.phone}
                  </a>
                </div>
              )}
              {member.email && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={14} className="text-primary flex-shrink-0" />
                  <Link
                    href={`mailto:${member.email}`}
                    className="hover:text-primary transition-colors truncate"
                  >
                    {member.email}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bio Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-2xl flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                  <Image
                    src={
                      member.image ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
                    }
                    alt={member.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-gray-800 text-xl">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted">{member.designation}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <Preview value={member?.bio ?? ""} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
