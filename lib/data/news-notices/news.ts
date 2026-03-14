import type { EventApiResponse, NewsItem } from "@/lib/types";
import api from "@/lib/axios";

// API Response types
interface NewsApiItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  image: string | null;
  date: string;
  slug: string;
}

export interface NewsApiResponse {
  data: NewsItem[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  start: number;
  offset: number;
  count: number;
}

// Static fallback data

/**
 * Transform API news data to NewsItem format
 */
function transformNewsApiToNewsItem(apiNews: NewsItem[]) {
  return apiNews?.map((item) => ({
    id: item.id,
    title: item.title,
    summary: item.summary,
    content: item.content,
    image: item.image,
    date: item.date,
    category: "News",
    slug: item.slug,
  })) ?? [];
}

/**
 * Fetch CNI news from API (organization_id = 1)
 */
export async function fetchCNINews(): Promise<any> {
  try {
    const url = "/news";
    const response = await api.get<NewsApiResponse>(url);
    return {
      data: transformNewsApiToNewsItem(response.data.data),
      total: response.data.total,
      per_page: response.data.per_page,
      current_page: response.data.current_page,
      last_page: response.data.last_page,
      start: response.data.start,
      offset: response.data.offset,
      count: response.data.count,
    };
  } catch (error: any) {
    console.error("[fetchCNINews] Failed:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return {
      data: [],
      total: 0,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      start: 1,
      offset: 0,
      count: 0,
    };
  }
}
export async function getNewsPaginate(page: number = 1) {
  try {
    const response = await api.get(`/news?page=${page}`);
    return {
      data: transformNewsApiToNewsItem(response.data.data),
      total: response.data.total,
      per_page: response.data.per_page,
      current_page: response.data.current_page,
      last_page: response.data.last_page,
      start: response.data.start,
      offset: response.data.offset,
      count: response.data.count,
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
/**
 * Fetch news for any organization
 */
export async function fetchNewsByOrgId(organizationId: number) {
  try {
    const url = `/news/${organizationId}`;

    const response = await api.get<NewsApiResponse>(url);
    return transformNewsApiToNewsItem(response.data.data);
  } catch (error: any) {
    console.error(
      `[fetchNewsByOrgId] Failed for org ${organizationId}:`,
      error.message,
    );
    return [];
  }
}

/**
 * Fetch news with pagination
 */
export async function fetchNewsPaginated(
  organizationId: number = 1,
  page: number = 1,
  perPage: number = 10,
): Promise<NewsApiResponse> {
  try {
    const response = await api.get<NewsApiResponse>(`/news/${organizationId}`, {
      params: { page, per_page: perPage },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch news from API:", error);
    return {
      data: [],
      total: 0,
      per_page: perPage,
      current_page: page,
      last_page: 1,
      start: 1,
      offset: 0,
      count: 0,
    };
  }
}

