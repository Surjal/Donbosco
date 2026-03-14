export const dynamic = "force-dynamic";
import { PageHero } from "@/components/layout/PageHero";
import { getEvents } from "@/lib/api";
import { EventsContent } from "./_components/EventsContent";
import { Suspense } from "react";


export const metadata = {
  title: "Events | Don Bosco",
  description: "Discover upcoming and past events from Don Bosco.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHero
        isHome={false}
        eyebrow="What's Happening"
        title="Our Events"
        description="Discover upcoming and past events organized by Don Bosco Institute "
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Events" }]}
      />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        }
      >
        <EventsContent items={events} />
      </Suspense>
    </>
  );
}
