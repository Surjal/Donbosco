export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { getEventById, getEvents } from "@/lib/api";
import { EventDetailContent } from "./_components/EventDetailContent";

interface Props {
  params: Promise<{ id: string }>;
}



export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const item = await getEventById(Number(id));
  if (!item) return {};
  return {
    title: `${item.title} | Don Bosco`,
    description: item.summary?.slice(0, 160) || "",
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await getEventById(Number(id));

  if (!item) notFound();

  const allEvents = await getEvents();

  return (
    <>
      <PageHero
        isHome
        href={"/about/events"}
        eyebrow="Event"
        title={item.title}
        description={item.location || ""}
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Events", href: "/about/events" },
          { label: item.title },
        ]}
      />
      <EventDetailContent item={item} recentItems={allEvents as any} />
    </>
  );
}
