export const dynamic = "force-dynamic";

import { PageHero } from "@/components/layout/PageHero";
import { PhotoAlbumsContent } from "./_components/PhotoAlbumsContent";
import { getPhotoAlbums } from "@/lib/api";

export const metadata = {
  title: "Photo Albums | Don Bosco",
  description: "Browse photo albums from Don Bosco events and activities.",
};

export default async function PhotoAlbumsPage() {
  const albums = await getPhotoAlbums();

  return (
    <>
      <PageHero
        isHome={true}
        href="/media"
        eyebrow="Media Center"
        title="Photo Albums"
        description="Latest picture showcases from our events and activities"
        breadcrumbs={[
          { label: "Media", href: "/media" },
          { label: "Photo Albums" },
        ]}
      />
      <PhotoAlbumsContent albums={albums} />
    </>
  );
}
