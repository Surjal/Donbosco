import api from "./axios";
import {
  Faq,
  FaqApiResponse,
  HeroSlide,
  HomeArrayMission,
  Message,
  MessageApiItem,
  MessageApiResponse,
  NewsApiResponse,
  NewsItem,
  NoticeApiItem,
  NoticeApiResponse,
} from "./types";

import defaultNoticeImg from "@/public/notice.png";

// ─────────────────────────────────────────────
// Safe API Wrapper
// ─────────────────────────────────────────────
async function safeApiRequest<T>(
  request: Promise<any>,
  fallback: T,
): Promise<T> {
  try {
    const response = await request;
    return response?.data ?? fallback;
  } catch (error: any) {
    console.error("API ERROR:", {
      message: error?.message,
      status: error?.response?.status,
      data: error?.response?.data,
    });

    return fallback;
  }
}

// ─────────────────────────────────────────────
// HERO SLIDES
// ─────────────────────────────────────────────
export async function getHeroSlides(): Promise<HeroSlide[]> {
  const data = await safeApiRequest<{ data: HeroSlide[] }>(api.get("/heros"), {
    data: [],
  });

  return data?.data ?? [];
}

// ─────────────────────────────────────────────
// MESSAGES
// ─────────────────────────────────────────────
function transformToMessage(item: MessageApiItem): Message {
  return {
    id: item.id,
    title: item.title,
    content: item.content,
    staff_name: item["staff-name"],
    designation: item.designation,
    image: item.image || undefined,
    date: item.date || undefined,
    tenure: item.tenure || undefined,
  };
}

export async function getMessages(schoolId: number): Promise<Message[]> {
  const endpoint = `/messages/${schoolId}`;

  const data = await safeApiRequest<MessageApiResponse>(api.get(endpoint), {
    data: [],
    total: 0,
    per_page: 0,
    current_page: 0,
    last_page: 0,
    start: 0,
    offset: 0,
    count: 0,
  });

  return data?.data?.map(transformToMessage) ?? [];
}

// ─────────────────────────────────────────────
// HOME MISSION
// ─────────────────────────────────────────────
export async function getHomeMission(): Promise<HomeArrayMission> {
  const data = await safeApiRequest<HomeArrayMission>(
    api.get("/homemissions"),
    {} as HomeArrayMission,
  );

  return data;
}

// ─────────────────────────────────────────────
// NOTICE TRANSFORMER
// ─────────────────────────────────────────────
function transformNoticeApiToNotice(
  apiNotices: NoticeApiItem[],
): NoticeApiItem[] {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return (
    apiNotices?.map((item) => {
      let noticeDate = new Date(item.date);

      if (isNaN(noticeDate.getTime())) {
        noticeDate = new Date();
      }

      const isNew = noticeDate > sevenDaysAgo;

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        attachment: item.attachment,
        priority: item.priority,
        date: item.date,
        catagory: "Notice",
        slug: item.slug,
        isNew,
      };
    }) ?? []
  );
}

// ─────────────────────────────────────────────
// FETCH NOTICES
// ─────────────────────────────────────────────
export async function fetchCNINotices(): Promise<NoticeApiResponse> {
  const fallback = {
    data: [],
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 1,
    start: 1,
    offset: 0,
    count: 0,
  };

  const data = await safeApiRequest<NoticeApiResponse>(
    api.get("/notices"),
    fallback,
  );

  return {
    ...data,
    data: transformNoticeApiToNotice(data?.data ?? []),
  };
}

export async function getNotices() {
  const data = await fetchCNINotices();

  return data?.data?.map((item) => ({
    ...item,
    image: item.image || defaultNoticeImg,
  }));
}

// ─────────────────────────────────────────────
// NEWS
// ─────────────────────────────────────────────
function transformNewsApiToNewsItem(apiNews: NewsItem[]) {
  return (
    apiNews?.map((item) => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      content: item.content,
      image: item.image,
      date: item.date,
      category: "News",
      slug: item.slug,
    })) ?? []
  );
}

export async function fetchCNINews(): Promise<NewsApiResponse> {
  const fallback = {
    data: [],
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 1,
    start: 1,
    offset: 0,
    count: 0,
  };

  const data = await safeApiRequest<NewsApiResponse>(
    api.get("/news"),
    fallback,
  );

  return {
    ...data,
    data: transformNewsApiToNewsItem(data?.data ?? []) as any,
  };
}

export async function getNews() {
  const data = await fetchCNINews();
  return data;
}

// ─────────────────────────────────────────────
// FAQS
// ─────────────────────────────────────────────
export async function getFaqs(organizationId: number = 1): Promise<Faq[]> {
  const endpoint = `/faqs/${organizationId}`;

  const data = await safeApiRequest<FaqApiResponse>(api.get(endpoint), {
    data: [],
    total: 0,
    per_page: 0,
    current_page: 0,
    last_page: 0,
    start: 0,
    offset: 0,
    count: 0,
  });

  return data?.data ?? [];
}
