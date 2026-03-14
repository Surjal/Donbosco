export const dynamic = "force-dynamic";
import { PageHero } from "@/components/layout/PageHero";
import { BlogsContent } from "./_components/BlogsContent";
import { Suspense } from "react";
import { getBlogs } from "@/lib/api";

export const metadata = {
  title: "Blogs | Don Bosco",
  description: "Read the latest blogs and insights from Don Bosco.",
};

export default async function BlogsPage() {
  const blogs = await getBlogs(1);

  return (
    <>
      <PageHero
        isHome={false}
        eyebrow="Insights"
        title="Our Blogs"
        description="Read the latest blogs, articles, and insights from Don Bosco Institute"
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Blogs" }]}
      />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        }
      >
        <BlogsContent items={blogs} />
      </Suspense>
    </>
  );
}
