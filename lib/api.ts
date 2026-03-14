// ─────────────────────────────────────────────
// Centralized API Service with Full Error Handling + TypeScript Types
// ─────────────────────────────────────────────

import api from "./axios";
import { fetchMessages } from "./data/donbosco/fetch-messages";
import {
  fetchCNITeamMembers,
  fetchCNIStaff,
  fetchOrgTeamMembers,
} from "./data/donbosco/fetch-teams";
import { fetchFaqs } from "./data/donbosco/faqs";
import { fetchCNIJourney, fetchJourneyByOrgId } from "./data/donbosco/journey";
import defaultNoticeImg from "@/public/notice.png";
import { fetchCNINews, fetchNewsByOrgId } from "./data/news-notices/news";
import { videos } from "./data/media";
import {
  fetchCNINotices,
  fetchNoticesByOrgId,
} from "./data/news-notices/notices";

import type {
  HeroSlide,
  Message,
  Mission,
  Faq,
  Stat,
  TeamMember,
  AboutStat,
  AlbumsApiResponse,
  Video,
  Photo,
  Staff,
  OrgNotice,
  OrgFaq,
  OrgTeamMember,
  JourneyMilestone,
  BlogItem,
  EventItem,
  HomeArrayMission,
  ArrayMission,
  EventApiResponse,
  BlogsApiResponse,
  NewsNoticeCategory,
  NewsItem,
  AdmissionFeeSettings,
} from "./types";

// ─────────────────────────────────────────────
// Helper: safe API wrapper
// ─────────────────────────────────────────────
async function safeApiRequest<T>(
  request: Promise<any>,
  fallback: T,
): Promise<T> {
  try {
    const res = await request;
    return res?.data ?? fallback;
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
  return data.data;
}

export async function getMediaHero(): Promise<HeroSlide> {
  return safeApiRequest<HeroSlide>(api.get("/media-hero"), {
    id: 0,
    title: "Media Gallery",
    content:
      "Photos, videos, and media resources from Don Bosco events and activities",
    image: "",
  });
}

export async function getMessageHero(): Promise<HeroSlide> {
  return safeApiRequest<HeroSlide>(api.get("/message-hero"), {
    id: 0,
    title: "Leadership Messages",
    content: "Words of guidance and inspiration from our school leadership",
    image: "",
  });
}

export async function getFaqHero(): Promise<HeroSlide> {
  return safeApiRequest<HeroSlide>(api.get("/faq-hero"), {
    id: 0,
    title: "Frequently Asked Questions",
    content:
      "Everything you need to know about Don Bosco, membership benefits, and how to get involved.",
    image: "",
  });
}

export async function getTeamHero(): Promise<HeroSlide> {
  return safeApiRequest<HeroSlide>(api.get("/team-hero"), {
    id: 0,
    title: "Staff",
    content:
      "Meets our best teachers and staff members who are dedicated to providing quality education and support to our students.",
    image: "",
  });
}

// ─────────────────────────────────────────────
// MESSAGES
// ─────────────────────────────────────────────
function transformToMessage(item: any): Message {
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

export async function getMessages(): Promise<Message[]> {
  const msgs = await safeApiRequest<Message[]>(fetchMessages(), []);
  return msgs.map(transformToMessage);
}

export async function getMessageById(id: number): Promise<Message | undefined> {
  const allMessages = await getMessages();
  return allMessages.find((m) => m.id === id);
}

// ─────────────────────────────────────────────
// MISSIONS
// ─────────────────────────────────────────────
export async function getMissions(
  organizationId: number,
): Promise<ArrayMission[]> {
  return safeApiRequest<ArrayMission[]>(
    api.get(`/missions/${organizationId}`),
    [],
  );
}

export async function getOrganizationMissions(
  organizationId: number,
): Promise<Mission[]> {
  return safeApiRequest<Mission[]>(api.get(`/missions/${organizationId}`), []);
}

export async function getHomeMission(): Promise<HomeArrayMission> {
  return safeApiRequest<HomeArrayMission>(
    api.get("/homemissions"),
    {} as HomeArrayMission,
  );
}

// ─────────────────────────────────────────────
// NOTICES
// ─────────────────────────────────────────────
export async function getNotices(): Promise<OrgNotice[]> {
  const data = await fetchCNINotices();
  return (
    data?.data?.map((item: any) => ({
      ...item,
      image: item.image || defaultNoticeImg,
    })) ?? []
  );
}

export async function getNoticeBySlug(
  slug: string,
): Promise<OrgNotice | undefined> {
  const notices = await getNotices();
  return notices.find((n) => n.slug === slug);
}

// ─────────────────────────────────────────────
// FAQS
// ─────────────────────────────────────────────
export async function getFaqs(): Promise<Faq[]> {
  return fetchFaqs();
}

export async function getOrganizationFaqs(orgId: number): Promise<OrgFaq[]> {
  const faqItems = await fetchFaqs(orgId);
  return faqItems.map((item) => ({
    id: item.id,
    organizationId: orgId,
    question: item.question,
    answer: item.answer,
  }));
}

// ─────────────────────────────────────────────
// STATS & TEAM
// ─────────────────────────────────────────────
export async function getStats(): Promise<Stat[]> {
  return safeApiRequest<Stat[]>(api.get("/stats"), []);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const apiTeam = await fetchCNITeamMembers();
  return apiTeam.length > 0 ? apiTeam : [];
}

export async function getAboutStats(): Promise<AboutStat[]> {
  return [];
}

export async function getStaff(): Promise<Staff[]> {
  const apiStaff = await fetchCNIStaff();
  return apiStaff.length > 0 ? apiStaff.sort((a, b) => a.order - b.order) : [];
}

export async function getOrganizationTeamMembers(
  orgId: number,
): Promise<OrgTeamMember[]> {
  return fetchOrgTeamMembers(orgId);
}

// ─────────────────────────────────────────────
// JOURNEY
// ─────────────────────────────────────────────
export async function getCNIJourneyData(): Promise<JourneyMilestone[]> {
  return fetchCNIJourney();
}

export async function getOrganizationJourneyData(
  organizationId: number,
): Promise<JourneyMilestone[]> {
  return fetchJourneyByOrgId(organizationId);
}

// ─────────────────────────────────────────────
// NEWS & NOTICES
// ─────────────────────────────────────────────
export async function getNews(): Promise<{ data: NewsItem[]; total: number }> {
  return fetchCNINews();
}

export async function getNewsNotices(category?: NewsNoticeCategory | "All") {
  const [newsData, noticesData] = await Promise.all([
    fetchCNINews(),
    fetchCNINotices(),
  ]);

  return {
    newsData,
    noticesData,
  };
}

export async function getNewsNoticeById(
  idOrSlug: string,
  category?: NewsNoticeCategory,
): Promise<any> {
  const { newsData, noticesData } = await getNewsNotices();
  if (category === "News") {
    return newsData?.data.find(
      (item: any) => item.id === idOrSlug || item.slug === idOrSlug,
    );
  }
  return noticesData?.data.find(
    (item: any) => item.id === idOrSlug || item.slug === idOrSlug,
  );
}

// ─────────────────────────────────────────────
// MEDIA
// ─────────────────────────────────────────────
export async function getPhotoAlbums(): Promise<AlbumsApiResponse> {
  return safeApiRequest<AlbumsApiResponse>(api.get("/collections"), {
    data: [],
    total: 0,
    per_page: 0,
    current_page: 0,
    last_page: 0,
    start: 0,
    offset: 0,
    count: 0,
  });
}

export async function getPhotosForAlbum(
  albumId: string,
): Promise<{ data: Photo[]; details: any }> {
  return safeApiRequest(api.get(`/gallery-items/${albumId}`), {
    data: [],
    details: {},
  });
}

export async function getVideos(): Promise<Video[]> {
  return videos;
}

export async function getAboutHero(): Promise<{ data: HeroSlide[] }> {
  return safeApiRequest(api.get("/about-hero"), { data: [] });
}

// ─────────────────────────────────────────────
// ORGANIZATION-SPECIFIC DATA
// ─────────────────────────────────────────────
// export async function getOrganizationNews(orgId: number): Promise<NewsItem[]> {
//   const newsItems = await fetchNewsByOrgId(orgId);
//   return newsItems.map((item: any) => ({
//     id: item.id,
//     organizationId: orgId,
//     title: item.title,
//     summary: item.summary,
//     content: item.content || "",
//     image: typeof item.image === "string" ? item.image : undefined,
//     date: item.date,
//     slug: item.slug,
//   }));
// }

// export async function getOrgNewsById(orgId: number, newsSlug: string): Promise<NewsItem | undefined> {
//   const allNews = await getOrganizationNews(orgId);
//   return allNews.find((n: any) => n.slug === newsSlug);
// }

export async function getOrganizationNotices(
  orgId: number,
): Promise<OrgNotice[]> {
  const noticeItems = await fetchNoticesByOrgId(orgId);
  return noticeItems.map((item: any) => ({
    id: item.id.toString(),
    organizationId: orgId,
    title: item.title,
    summary: item.description || "",
    content: item.description || "",
    date: item.date,
    isNew: item.isNew,
    slug: item.slug || item.id.toString(),
  }));
}

export async function getOrgNoticeById(
  orgId: number,
  noticeSlug: string,
): Promise<OrgNotice | undefined> {
  const allNotices = await getOrganizationNotices(orgId);
  return allNotices.find((notice) => notice.slug === noticeSlug);
}

export async function getAboutStory() {
  try {
    const aboutStory = await api.get("/about-story");
    return (
      aboutStory.data.data[0] ?? {
        id: 0,
        title: "Our Story",
        content:
          "Learn about our journey, milestones, and impact over the years.",
        image: "",
      }
    );
  } catch (error) {
    console.error(error);
  }
}
export async function getPaginatedAlbums(
  page: number,
): Promise<AlbumsApiResponse> {
  try {
    const response = await api.get<AlbumsApiResponse>(
      `/collections?page=${page}`,
    );
    return response.data;
  } catch (error: any) {
    console.error("[getPaginatedAlbums] Failed to fetch albums:", {
      message: error?.message,
      status: error?.response?.status,
      data: error?.response?.data,
    });

    // Return safe fallback
    return {
      data: [],
      total: 0,
      per_page: 0,
      current_page: 0,
      last_page: 0,
      start: 0,
      offset: 0,
      count: 0,
    };
  }
}

export async function getPaginatedEvents(
  page: number,
): Promise<EventApiResponse> {
  try {
    const response = await api.get<EventApiResponse>(`/events?page=${page}`);
    const items = response.data;

    return {
      data:
        items?.data?.map(
          (item: any): EventItem => ({
            id: item.id,
            summary: item.description || item.summary || "",
            location: item.location || "",
            image: item.image || null,
            start_date: item.start_date || "",
            end_date: item.end_date || "",
            is_home: item.is_home || false,
            title: item.title || "",
          }),
        ) || [],
      total: items?.total || 0,
      per_page: items?.per_page || 0,
      current_page: items?.current_page || 0,
      last_page: items?.last_page || 0,
      start: items?.start || 0,
      offset: items?.offset || 0,
      count: items?.count || 0,
    };
  } catch (error: any) {
    console.error("[getPaginatedEvents] Failed to fetch events:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Return safe fallback
    return {
      data: [],
      total: 0,
      per_page: 0,
      current_page: 0,
      last_page: 0,
      start: 0,
      offset: 0,
      count: 0,
    };
  }
}
export async function getPaginatedBlogs(
  page: number,
): Promise<BlogsApiResponse> {
  try {
    const response = await api.get(`/blogs?page=${page}`);
    const items = response.data;
    return {
      data: items?.data?.map((item: any) => ({
        id: item.id,
        summary: item.description || item.summary || "",
        location: item.location || "",
        image: item.image || null,
        start_date: item.start_date || "",
        end_date: item.end_date || "",
        is_home: item.is_home || false,
        title: item.title || "",
      })),
      total: items?.total,
      per_page: items?.per_page,
      current_page: items?.current_page,
      last_page: items?.last_page,
      start: items?.start,
      offset: items?.offset,
      count: items?.count,
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      total: 0,
      per_page: 0,
      current_page: 0,
      last_page: 0,
      start: 0,
      offset: 0,
      count: 0,
    };
  }
}

export async function getNewBySlug(slug: string) {
  try {
    const notices = await fetchCNINews();
    return notices.data.find((notice: any) => notice.slug === slug);
  } catch (error) {
    console.error(error);
  }
}
export async function getEvents(): Promise<EventApiResponse> {
  try {
    const response = await api.get("/events");
    const items = response.data;
    return {
      data: items.data.map((item: any) => ({
        id: item.id,
        summary: item.description || item.summary || "",
        location: item.location || "",
        image: item.image || null,
        start_date: item.start_date || "",
        end_date: item.end_date || "",
        is_home: item.is_home || false,
        title: item.title || "",
      })),
      total: items.total,
      per_page: items.per_page,
      current_page: items.current_page,
      last_page: items.last_page,
      start: items.start,
      offset: items.offset,
      count: items.count,
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      total: 0,
      per_page: 0,
      current_page: 0,
      last_page: 0,
      start: 0,
      offset: 0,
      count: 0,
    };
  }
}
// ── Blogs ──
export async function getBlogs(page: number = 1): Promise<BlogsApiResponse> {
  try {
    const response = await api.get(`/blogs?page=${page}`);
    const items = response.data ?? {
      data: [],
      total: 0,
      per_page: 0,
      current_page: 0,
      last_page: 0,
      start: 0,
      offset: 0,
      count: 0,
    };
    return {
      data:
        items?.data?.map((item: any) => ({
          id: item.id,
          title: item.title || "",
          description: item.description || "",
          name: item.name || "",
          image: item.image || null,
          start_date: item.start_date || "",
        })) ?? [],
      total: items.total,
      per_page: items.per_page,
      current_page: items.current_page,
      last_page: items.last_page,
      start: items.start,
      offset: items.offset,
      count: items.count,
    };
  } catch {
    return {
      data: [],
      total: 0,
      per_page: 0,
      current_page: 0,
      last_page: 0,
      start: 0,
      offset: 0,
      count: 0,
    };
  }
}

export async function getBlogById(id: number): Promise<BlogItem | undefined> {
  const blogs = await getBlogs();
  return blogs.data.find((b) => b.id === id);
}

export async function getEventById(id: number): Promise<EventItem | undefined> {
  const events = await getEvents();
  return events.data.find((e) => e.id === id);
}

// admission-fee-settings

export async function getAdmissionFeeSettings(): Promise<
  AdmissionFeeSettings | undefined
> {
  try {
    const adminmissionSettingData = await api.get<AdmissionFeeSettings>(
      "/admission-fee-settings",
    );
    return (
      adminmissionSettingData.data ?? {
        admission_classes: [],
        annual_fee_components: [],
        monthly_fee_classes: [],
        monthly_fee_other_charges: [],
        proposed_fee_monthly: [],
        proposed_fee_annual: [],
        total_annual_fee: 0,
      }
    );
  } catch (error: any) {
    console.error("API ERROR:", {
      message: error?.message,
      status: error?.response?.status,
      data: error?.response?.data,
    });
    return {
      admission_classes: [],
      annual_fee_components: [],
      monthly_fee_classes: [],
      monthly_fee_other_charges: [],
      proposed_fee_monthly: [],
      proposed_fee_annual: [],
      total_annual_fee: 0,
    };
  }
}
