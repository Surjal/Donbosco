import { PageHero } from "@/components/layout/PageHero";

import { Suspense } from "react";
import { fetchCNINews } from "@/lib/data/news-notices/news";
import { fetchCNINotices } from "@/lib/data/news-notices/notices";
import { NewsNoticesContent } from "./_components/NewsNoticesContent";

export const metadata = {
  title: "News & Notices | Don Bosco",
  description: "Latest news and official notices from Don Bosco Institute.",
};

export default async function NewsNoticesPage() {
  const news = await fetchCNINews();
  const notices = await fetchCNINotices();
  return (
    <>
      <PageHero
        eyebrow="Stay Informed"
        isHome={false}
        title="News & Notices"
        description="Latest news and official notices from Don Bosco Institute."
        breadcrumbs={[{ label: "News & Notices" }]}
      />
      <Suspense
        fallback={
          <>
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </>
        }
      >
        <NewsNoticesContent news={news} notices={notices} />
      </Suspense>
    </>
  );
}
