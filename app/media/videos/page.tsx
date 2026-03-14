export const dynamic = "force-dynamic";
import { PageHero } from "@/components/layout/PageHero";
import { VideoGalleryContent } from "./_components/VideoGalleryContent";
import { getVideos } from "@/lib/api";

export const metadata = {
  title: "Video Gallery | Don Bosco",
  description: "Watch videos from Don Bosco events, workshops, and interviews.",
};

export default async function VideoGalleryPage() {
  const videos = await getVideos();

  return (
    <>
      <PageHero
        isHome={true}
        href="/media"
        eyebrow="Media Center"
        title="Video Gallery"
        description="Event highlights, interviews, and video resources"
        breadcrumbs={[{ label: "Media", href: "/media" }, { label: "Videos" }]}
      />
      <VideoGalleryContent videos={videos} />
    </>
  );
}
