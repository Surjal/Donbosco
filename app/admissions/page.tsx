import { getAdmissionFeeSettings } from "@/lib/api";
import { AdmissionsContent } from "./_components/AdmissionsContent";

export const metadata = {
  title: "Admissions | Don Bosco",
  description:
    "Apply for admission at Don Bosco School. Learn about our admission process, required documents, important dates, and academic levels open for enrollment.",
};

export default async function AdmissionsPage() {
  const admissionFeeSettings = await getAdmissionFeeSettings();

  return (
    <>
      <AdmissionsContent admissionFeeSettings={admissionFeeSettings} />
    </>
  );
}
