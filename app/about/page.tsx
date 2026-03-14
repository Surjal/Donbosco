export const dynamic = "force-dynamic";
import { PageHero } from "@/components/layout/PageHero";
import {
  getMissions,
  getTeamMembers,
  getAboutHero,
  getCNIJourneyData,
  getStats,
  getAboutStory, // Updated import
} from "@/lib/api";

import { AboutContent } from "./_components/AboutContent";

export const metadata = {
  title: "About Us | Don Bosco Institute",
  description:
    "Learn about Don Bosco Institute, Tankisinwari — our mission, history, team, and impact.",
};

export default async function AboutPage() {
  const [aboutHero, missions, team, stats, aboutStory, journey] =
    await Promise.all([
      getAboutHero(),
      getMissions(1),
      getTeamMembers(),
      getStats(),
      getAboutStory(),
      getCNIJourneyData(),
    ]);

  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title={aboutHero.data[0].title}
        description={aboutHero.data[0].content}
        breadcrumbs={[{ label: "About" }]}
      />
      <AboutContent
        missions={missions}
        team={team}
        stats={stats}
        aboutStory={aboutStory}
        journey={journey}
      />
    </>
  );
}
