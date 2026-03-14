"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  Globe,
  Bus,
  BadgePercent,
  BookOpen,
  Info,
  AlertCircle,
} from "lucide-react";
import { admissionNotice } from "@/lib/data/donbosco/admissions";
import { AdmissionFeeSettings } from "@/lib/types";
import { a } from "framer-motion/client";

export function AdmissionsContent({
  admissionFeeSettings,
}: {
  admissionFeeSettings?: AdmissionFeeSettings;
}) {
  const {
    admission_classes,
    annual_fee_components,
    monthly_fee_classes,
    monthly_fee_other_charges,
    proposed_fee_annual,
    proposed_fee_monthly,
  } = admissionFeeSettings || {};
  const d = admissionNotice;
  return (
    <main className="bg-white">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            style={{
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
            className="w-full h-full"
          />
        </div>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80"
            alt="Admissions"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/95 to-primary-dark/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold tracking-wider uppercase mb-5">
              Admission {d.year}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 leading-tight">
              Admissions at <br />
              <span className="text-accent">Don Bosco</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg font-medium mb-2">
              {d.school.name}
            </p>
            <p className="text-white/60 text-sm mb-8">{d.school.address}</p>

            {/* School contact strip */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70 mb-10">
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="text-accent" />
                {d.school.contact}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={14} className="text-accent" />
                {d.school.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe size={14} className="text-accent" />
                {d.school.website}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#admission-notice"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20"
              >
                View Admission Notice <ArrowRight size={18} />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Admission Notice ─────────────────────────────────── */}
      <div
        id="admission-notice"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14"
      >
        {/* ── Section 1: Application Form ── */}
        <NoticeSection number="1" titleEn={d.applicationForm.titleEn}>
          <BulletList items={d.applicationForm.pointsEn} />
          <NepaliBlock items={d.applicationForm.pointsNp} />
        </NoticeSection>

        {/* ── Admission Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                    Class
                    <br />
                    <span className="font-normal text-white/70 text-xs">
                      कक्षा
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                    DOB Not Later Than
                    <br />
                    <span className="font-normal text-white/70 text-xs">
                      जन्म मिति
                    </span>
                  </th>
                  <th className="px-4 py-3 text-center font-semibold whitespace-nowrap">
                    Min Age
                    <br />
                    <span className="font-normal text-white/70 text-xs">
                      न्यूनतम उमेर
                    </span>
                  </th>
                  <th className="px-4 py-3 text-center font-semibold whitespace-nowrap">
                    Req. Age
                    <br />
                    <span className="font-normal text-white/70 text-xs">
                      आवश्यक उमेर
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Qualification
                    <br />
                    <span className="font-normal text-white/70 text-xs">
                      योग्यता
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Selection
                    <br />
                    <span className="font-normal text-white/70 text-xs">
                      चयन प्रक्रिया
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Documents Required
                    <br />
                    <span className="font-normal text-white/70 text-xs">
                      आवश्यक कागजात
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {admission_classes?.map((row, i) => (
                  <tr
                    key={row.id}
                    className={i % 2 === 0 ? "bg-white" : "bg-surface"}
                  >
                    <td className="px-4 py-3 font-bold text-primary-dark whitespace-nowrap">
                      {row.class}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {row.dob_not_later_than}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {row.min_age}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {row.required_age}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <p>{row.qualification_en}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {row.qualification_np}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <p>{row.selection_en}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {row.selection_np}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <ul className="space-y-1">
                        {row.documents_en?.map((doc, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-1.5 text-gray-700"
                          >
                            <CheckCircle2
                              size={13}
                              className="text-accent flex-shrink-0 mt-0.5"
                            />
                            <span className="text-xs">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ── Section 2: Form Submission ── */}
        <NoticeSection number="2" titleEn={d.formSubmission.titleEn}>
          <BulletList items={d.formSubmission.pointsEn} />
          <NepaliBlock items={d.formSubmission.pointsNp} />
        </NoticeSection>

        {/* ── Section 3: Oral Interaction ── */}
        <NoticeSection number="3" titleEn={d.oralInteraction.titleEn}>
          <p className="text-gray-700 leading-relaxed">
            {d.oralInteraction.contentEn}
          </p>
          <p className="mt-3 text-sm text-gray-500 italic leading-relaxed">
            {d.oralInteraction.contentNp}
          </p>
        </NoticeSection>

        {/* ── Section 4: Results ── */}
        <NoticeSection number="4" titleEn={d.results.titleEn}>
          <BulletList items={d.results.pointsEn} />
          <NepaliBlock items={d.results.pointsNp} />
        </NoticeSection>

        {/* ── Section 5: Admission Form & Fee Submission ── */}
        <NoticeSection number="5" titleEn={d.admissionFormFee.titleEn}>
          <BulletList items={d.admissionFormFee.pointsEn} />

          <div className="mt-4">
            <p className="font-semibold text-primary-dark mb-2">
              Documents Required:
            </p>
            <ol className="space-y-2">
              {d.admissionFormFee.documentsEn.map((doc, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="flex-shrink-0 font-bold text-accent">
                    {i + 1}.
                  </span>
                  <span className="text-sm leading-relaxed">{doc}</span>
                </li>
              ))}
            </ol>
          </div>

          <NepaliBlock items={d.admissionFormFee.pointsNp} />
          <div className="mt-2 bg-gray-50 rounded-xl p-4 border border-border">
            <p className="font-semibold text-gray-700 text-sm mb-1">
              आवश्यक कागजतहरू:
            </p>
            <ol className="space-y-1">
              {d.admissionFormFee.documentsNp.map((doc, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-500">
                  <span className="flex-shrink-0 font-bold">{i + 1}.</span>
                  <span className="text-xs leading-relaxed">{doc}</span>
                </li>
              ))}
            </ol>
          </div>
        </NoticeSection>

        {/* ── Section 6: Admission Fee ── */}
        <NoticeSection number="6" titleEn={d.admissionFee.titleEn}>
          <div className="inline-flex items-center gap-3 bg-accent/10 border border-accent/20 rounded-2xl px-6 py-4 mb-4">
            <BadgePercent size={28} className="text-accent" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                One-time Admission Fee
              </p>
              <p className="text-3xl font-display font-bold text-primary-dark">
                Rs. {d.admissionFee.amount.toLocaleString("en-NP")}.00
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                (Yearly / Annual fee not included)
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">
            {d.admissionFee.noteNp}
          </p>
        </NoticeSection>

        {/* ── Section 7: Annual Fee ── */}
        <NoticeSection number="7" titleEn={d.annualFee.titleEn}>
          <p className="text-gray-700 mb-1">{d.annualFee.noteEn}</p>
          <p className="text-sm text-gray-500 italic mb-4">
            {d.annualFee.noteNp}
          </p>

          <div className="rounded-2xl border border-border overflow-hidden shadow-sm">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold text-primary-dark">
                    Components / विवरण
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-primary-dark">
                    Amount (NPR)
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-primary-dark">
                    Frequency
                  </th>
                </tr>
              </thead>
              <tbody>
                {annual_fee_components?.map((c, i) => (
                  <tr
                    key={i}
                    className={`border-t border-border ${
                      i % 2 === 0 ? "bg-white" : "bg-surface"
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-700">{c.item}</td>
                    <td className="px-4 py-3 text-right font-medium text-primary-dark">
                      {c.amount_npr.toLocaleString("en-NP")}.00
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-gray-500">
                      {c.frequency}
                    </td>
                  </tr>
                ))}
                <tr className="bg-primary/5 border-t-2 border-primary/20">
                  <td className="px-4 py-3 font-bold text-primary-dark">
                    Total Annual Fee
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-accent">
                    {annual_fee_components
                      ?.reduce((s, c) => s + c.amount_npr, 0)
                      .toLocaleString("en-NP")}
                    .00
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </NoticeSection>

        {/* ── Section 8: Monthly Fee ── */}
        <NoticeSection number="8" titleEn={d.monthlyFee.titleEn}>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {/* Tuition */}
            <div className="rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="bg-primary px-4 py-2">
                <p className="text-white font-semibold text-sm">Tuition Fee</p>
              </div>
              <table className="min-w-full text-sm">
                <tbody>
                  {monthly_fee_classes?.map((t, i) => (
                    <tr
                      key={i}
                      className={`border-t border-border ${
                        i % 2 === 0 ? "bg-white" : "bg-surface"
                      }`}
                    >
                      <td className="px-4 py-3 text-gray-700">{t.classes}</td>
                      <td className="px-4 py-3 text-right font-semibold text-primary-dark">
                        Rs. {t.amount_npr.toLocaleString("en-NP")}.00
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Other monthly fees */}
            <div className="rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="bg-primary px-4 py-2">
                <p className="text-white font-semibold text-sm">
                  Other Monthly Fees
                </p>
              </div>
              <table className="min-w-full text-sm">
                <tbody>
                  {monthly_fee_other_charges?.map((f, i) => (
                    <tr
                      key={i}
                      className={`border-t border-border ${
                        i % 2 === 0 ? "bg-white" : "bg-surface"
                      }`}
                    >
                      <td className="px-4 py-3 text-gray-700">{f.item}</td>
                      <td className="px-4 py-3 text-right font-semibold text-primary-dark whitespace-nowrap">
                        Rs. {f.amount_npr}.00
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2 mb-4">
            {d.monthlyFee.notesEn.map((note, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-gray-700 text-sm leading-relaxed"
              >
                <Info size={15} className="text-primary flex-shrink-0 mt-0.5" />
                <span>{note}</span>
              </div>
            ))}
          </div>
          <NepaliBlock items={d.monthlyFee.notesNp} />
        </NoticeSection>

        {/* ── Section 9: Examination Fee ── */}
        <NoticeSection number="9" titleEn={d.examinationFee.titleEn}>
          <div className="flex items-center gap-4 bg-surface rounded-2xl border border-border px-6 py-4 mb-3">
            <BookOpen size={28} className="text-primary" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Per Term · All Classes · {d.examinationFee.terms} Terms/Year
              </p>
              <p className="text-2xl font-display font-bold text-primary-dark">
                Rs. {d.examinationFee.amountPerTerm}.00
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">
            {d.examinationFee.noteNp}
          </p>
        </NoticeSection>

        {/* ── Section 10: Transport ── */}
        <NoticeSection number="10" titleEn={d.transport.titleEn}>
          <p className="text-gray-700 mb-1">{d.transport.noteEn}</p>
          <p className="text-sm text-gray-500 italic mb-4">
            {d.transport.noteNp}
          </p>

          <p className="text-gray-700 mb-4">{d.transport.paymentNoteEn}</p>

          <div className="space-y-4 mb-4">
            {d.transport.routes.map((r) => (
              <div
                key={r.routeNo}
                className="rounded-2xl border border-border bg-surface p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Bus size={18} className="text-accent" />
                  <span className="font-bold text-primary-dark">
                    {r.routeNo}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {r.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
            <AlertCircle
              size={18}
              className="text-amber-600 flex-shrink-0 mt-0.5"
            />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">
                Note (NB)
              </p>
              <p className="text-sm text-amber-700 leading-relaxed">
                {d.transport.importantNoteEn}
              </p>
              <p className="text-xs text-amber-600 mt-2 leading-relaxed">
                {d.transport.importantNoteNp}
              </p>
            </div>
          </div>
        </NoticeSection>

        {/* ── Section 11: Selection ── */}
        <NoticeSection number="11" titleEn={d.selection.titleEn}>
          <p className="text-gray-700 leading-relaxed">{d.selection.noteEn}</p>
          <p className="mt-2 text-sm text-gray-500 italic leading-relaxed">
            {d.selection.noteNp}
          </p>
        </NoticeSection>
      </div>

      {/* ─── Proposed Fee Structure 2083 ──────────────────────── */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-3">
              Fee Overview
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-dark">
              {d.proposedFeeStructure.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border overflow-hidden shadow-sm"
          >
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-3 text-left font-semibold">
                    Class / Types
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Frequency
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    2083 (NPR)
                  </th>
                </tr>
              </thead>
              <tbody>
                {proposed_fee_monthly?.map((r, i) => (
                  <tr
                    key={i}
                    className={`border-t border-border ${
                      i % 2 === 0 ? "bg-white" : "bg-surface"
                    }`}
                  >
                    <td className="px-4 py-2.5 text-gray-700">
                      {r.class_type}
                    </td>
                    <td className="px-4 py-2.5 text-center text-gray-500 text-xs">
                      {r.frequency}
                    </td>
                    <td className="px-4 py-2.5 text-right font-bold text-primary-dark">
                      {r.amount_npr.toLocaleString("en-NP")}
                    </td>
                  </tr>
                ))}

                {/* separator row */}
                <tr className="bg-gray-100">
                  <td
                    colSpan={3}
                    className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                  >
                    Annual / One-time Fees
                  </td>
                </tr>

                {proposed_fee_annual?.map((r, i) => (
                  <tr
                    key={i}
                    className={`border-t border-border ${
                      i % 2 === 0 ? "bg-white" : "bg-surface"
                    }`}
                  >
                    <td className="px-4 py-2.5 text-gray-700">{r.item}</td>
                    <td className="px-4 py-2.5 text-center text-gray-500 text-xs">
                      {r.frequency}
                    </td>
                    <td className="px-4 py-2.5 text-right font-bold text-primary-dark">
                      {r.amount_npr.toLocaleString("en-NP")}
                    </td>
                  </tr>
                ))}

                {/* Total row */}
                <tr className="border-t-2 border-primary/30 bg-primary/5">
                  <td
                    className="px-4 py-3 font-bold text-primary-dark"
                    colSpan={2}
                  >
                    Total (Annual Fees)
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-accent text-base">
                    {proposed_fee_annual
                      ?.reduce((s, c) => s + c.amount_npr, 0)
                      .toLocaleString("en-NP")}
                  </td>
                </tr>

                {/* New Admission Fee row */}
                <tr className="border-t border-border bg-accent/5">
                  <td
                    className="px-4 py-3 font-bold text-primary-dark"
                    colSpan={2}
                  >
                    New Admission Fee 2083 (From Nursery to Class II)
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-accent text-base">
                    {admissionFeeSettings?.total_annual_fee?.toLocaleString(
                      "en-NP",
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Phone size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-dark mb-3">
              Have Questions?
            </h2>
            <p className="text-gray-500 mb-2">
              Call us at{" "}
              <a
                href={`tel:${d.school.contact}`}
                className="font-semibold text-primary hover:underline"
              >
                {d.school.contact}
              </a>{" "}
              or email{" "}
              <a
                href={`mailto:${d.school.email}`}
                className="font-semibold text-primary hover:underline"
              >
                {d.school.email}
              </a>
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Office Hours: 9:30 AM – 4:00 PM (except Saturdays &amp; public
              holidays)
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
            >
              Contact the Admissions Office <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

/* ─── Small reusable helpers ──────────────────────────────────── */

function NoticeSection({
  number,
  titleEn,
  children,
}: {
  number: string;
  titleEn: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary text-white text-sm font-bold flex items-center justify-center">
          {number}
        </span>
        <h2 className="text-xl md:text-2xl font-display font-bold text-primary-dark uppercase tracking-wide">
          {titleEn}
        </h2>
      </div>
      <div className="pl-0 md:pl-12 space-y-3">{children}</div>
    </motion.section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-gray-700 text-sm leading-relaxed"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function NepaliBlock({ items }: { items: string[] }) {
  return (
    <div className="bg-gray-50 rounded-xl border border-border p-4 mt-2">
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-gray-500 text-xs leading-relaxed"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0 mt-1.5" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
