export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { getPhotosForAlbum } from "@/lib/api";
import { PhotoGalleryContent } from "./_components/PhotoGalleryContent";

interface Props {
  params: Promise<{ albumId: string }>;
}


export default async function PhotoGalleryPage({ params }: Props) {
  const { albumId } = await params;
  if (!albumId) return notFound();

  const gallery = await getPhotosForAlbum(albumId);

  return (
    <>
      <PageHero
        isHome
        href={"/media/photos"}
        eyebrow="Photo Gallery"
        title={gallery.details.title}
        description={`${gallery.data.length} photos • ${new Date(gallery.details.created_at).toDateString()}`}
        breadcrumbs={[
          { label: "Media", href: "/media" },
          { label: "Photo Albums", href: "/media/photos" },
          { label: gallery.details.title },
        ]}
      />
      <PhotoGalleryContent data={gallery.data} />
    </>
  );
}
