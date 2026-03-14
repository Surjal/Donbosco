export const dynamic = "force-dynamic";
import { PageHero } from "@/components/layout/PageHero";
import { MediaOverviewContent } from "./_components/MediaOverviewContent";
import { getPhotoAlbums, getVideos, getMediaHero } from "@/lib/api";

export const metadata = {
  title: "Media Gallery | Don Bosco",
  description:
    "Photos, videos, and media resources from Don Bosco events and activities.",
};

export default async function MediaPage() {
  const [albums, videos, mediaHero] = await Promise.all([
    getPhotoAlbums(),
    getVideos(),
    getMediaHero(),
  ]);
  return (
    <>
      <PageHero
        eyebrow="Media Center"
        title={mediaHero.title}
        description={mediaHero.content}
        breadcrumbs={[{ label: "Media" }]}
      />
      <MediaOverviewContent
        albums={albums.data.slice(0, 5)}
        videos={videos.slice(0, 4)}
      />
    </>
  );
}
