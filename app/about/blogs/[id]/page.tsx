export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { BlogDetailContent } from "./_components/BlogDetailContent";
import { getBlogById, getBlogs } from "@/lib/api";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const items = await getBlogs();
  return items?.data?.map((item) => ({ id: item.id.toString() }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const item = await getBlogById(Number(id));
  if (!item) return {};
  return {
    title: `${item.title} | Don Bosco`,
    description: item.summary?.slice(0, 160) || "",
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await getBlogById(Number(id));

  if (!item) notFound();

  const allBlogs = await getBlogs();

  return (
    <>
      <PageHero
        isHome
        href={"/about/blogs"}
        eyebrow="Blog"
        title={item.title}
        description={item.start_date || ""}
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Blogs", href: "/about/blogs" },
          { label: item.title },
        ]}
      />
      <BlogDetailContent item={item} recentItems={allBlogs as any} />
    </>
  );
}
