export const dynamic = "force-dynamic";
import { AdmissionsSection } from "@/components/sections/AdmissionsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { MessageSection } from "@/components/sections/MessageSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { NoticesSection } from "@/components/sections/NoticesSection";
import {
  getFaqs,
  getHeroSlides,
  getHomeMission,
  getMessages,
  getNews,
  getNotices,
} from "@/lib/live-api";

export default async function Home() {
  const [slides, messages, mission, notices, news, faqs] = await Promise.all([
    getHeroSlides(),
    getMessages(1),
    getHomeMission(),
    getNotices(),
    getNews(),
    getFaqs(),
  ]);
  return (
    <main>
      <HeroCarousel heroSlides={slides} />
      <MissionSection homeMissions={mission} />
      <MessageSection messages={messages} />
      <NoticesSection notices={notices as any} />
      <NewsSection news={news?.data as any} />
      <AdmissionsSection />
      <FaqSection faqs={faqs} />
    </main>
  );
}
