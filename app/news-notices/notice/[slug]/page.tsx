export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { NoticeDetailContent } from "./_components/NoticeDetailContent";
import { getNewsNotices, getNoticeBySlug } from "@/lib/api";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { noticesData } = await getNewsNotices();
  const notices = noticesData.data;
  return notices.map((item: any) => ({ slug: item.slug ?? item.id }));
}



export default async function NoticeDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNoticeBySlug(slug);
  if (!item) notFound();

  const { noticesData } = await getNewsNotices();
  const recentNotices = noticesData?.data;

  return (
    <>
      <PageHero
        isHome
        href={"/news-notices?filter=notice"}
        eyebrow="Notice"
        title={item?.title as string}
        description={item?.date}
        breadcrumbs={[
          { label: "News & Notices", href: "/news-notices" },
          { label: "Notice" },
        ]}
      />
      <NoticeDetailContent item={item} recentItems={recentNotices} />
    </>
  );
}
