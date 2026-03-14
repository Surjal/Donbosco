export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { NewsDetailContent } from "./_components/NewsDetailContent";
import { fetchCNINews } from "@/lib/data/news-notices/news";
import { getNewBySlug, getNewsNoticeById, getNewsNotices } from "@/lib/api";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await fetchCNINews();
  const newsItems = data.filter((item: any) => item.category === "News");
  return newsItems.map((item: any) => ({ slug: item.slug ?? item.id }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = await getNewBySlug(slug);
  if (!item) return notFound();
  return {
    title: `${item.title} | Don Bosco`,
    description: item.summary,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsNoticeById(slug, "News");

  if (!item || item.category !== "News") notFound();

  const { newsData } = await getNewsNotices();
  const recentNews = newsData?.data;

  return (
    <>
      <PageHero
        isHome
        href={"/news-notices?filter=news"}
        eyebrow="News"
        title={item.title}
        description={item.date}
        breadcrumbs={[
          { label: "News & Notices", href: "/news-notices" },
          { label: "News", href: "/news-notices" },
        ]}
      />
      <NewsDetailContent item={item} recentItems={recentNews} />
    </>
  );
}
