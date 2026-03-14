export const dynamic = "force-dynamic";
import { PageHero } from "@/components/layout/PageHero";
import { getStaff, getTeamHero } from "@/lib/api";
import { TeamContent } from "../_components/TeamContent";

export const metadata = {
  title: "Our Team | Don Bosco",
  description: "Meet the dedicated team behind Don Bosco.",
};

export default async function TeamPage() {
  const [staff, teamHero] = await Promise.all([getStaff(), getTeamHero()]);

  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title={teamHero.title}
        description={teamHero.content}
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Team" }]}
      />
      <TeamContent staff={staff} />
    </>
  );
}
