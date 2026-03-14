"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsList } from "./NewsList";
import { NoticeList } from "./NoticesList";
import { NoticeApiResponse } from "@/lib/types";
import { NewsApiResponse } from "@/lib/data/news-notices/news";

interface Props {
  news: NewsApiResponse;
  notices: NoticeApiResponse;
}

export function NewsNoticesContent({ news, notices }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filterTab = searchParams.get("filter");

  const [tab, setTab] = useState<string>("news");

  // Sync tab with URL
  useEffect(() => {
    if (filterTab === "news" || filterTab === "notice") {
      setTab(filterTab);
    }
  }, [filterTab]);

  const handleTabChange = (value: string) => {
    setTab(value);
    router.push(`?filter=${value}`, { scroll: false });
  };

  return (
    <section className="py-20 bg-white min-h-[60vh]">
      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
        <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="news" className="px-6 cursor-pointer">
              News
            </TabsTrigger>
            <TabsTrigger value="notice" className="px-6 cursor-pointer">
              Notice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="news">
            <NewsList items={news} />
          </TabsContent>

          <TabsContent value="notice">
            <NoticeList items={notices} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
