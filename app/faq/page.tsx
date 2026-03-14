import { PageHero } from "@/components/layout/PageHero";
import { FaqContent } from "./_components/FaqContent";
import { getFaqs, getFaqHero } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "FAQ | Don Bosco",
  description:
    "Find answers to frequently asked questions about Don Bosco, membership, and our programs.",
};
export default async function FaqPage() {
  const [faqs, faqHero] = await Promise.all([getFaqs(), getFaqHero()]);
  return (
    <>
      <PageHero
        eyebrow="Help Center"
        title={faqHero.title}
        description={faqHero.content}
        breadcrumbs={[{ label: "FAQ" }]}
      />
      <FaqContent faqs={faqs} />
    </>
  );
}
