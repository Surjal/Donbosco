import type { Notice, NoticeItem } from "@/lib/types";
import api from "@/lib/axios";

// API Response types
export interface NoticeApiItem {
  id: number;
  title: string;
  description: string;
  image: string | null; // Add image field
  attachment: string | null;
  priority: "high" | "medium" | "low";
  date: string;
  isNew: boolean;
  catagory: string;
  slug: string;
}

interface NoticeApiResponse {
  data: NoticeApiItem[];
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
 * Transform API notice data to Notice format
 */
function transformNoticeApiToNotice(
  apiNotices: NoticeApiItem[],
): NoticeApiItem[] {
  // Consider notices from the last 7 days as "new"
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return apiNotices?.map((item) => {
    // Try to parse the date safely
    let noticeDate = new Date(item.date);
    if (isNaN(noticeDate.getTime())) {
      // Handle "16 Feb, 2026" format manually if needed, or fallback
      noticeDate = new Date();
    }

    const isNew = noticeDate > sevenDaysAgo;

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      image: item.image, // Map image from API
      attachment: item.attachment,
      priority: item.priority,
      date: item.date,
      catagory: "Notice",
      slug: item.slug,
      isNew,
    };
  }) ?? [];
}

/**
 * Fetch CNI notices from API (organization_id = 1)
 */
export async function fetchCNINotices(): Promise<NoticeApiResponse> {
  try {
    const url = "/notices";

    const response = await api.get<NoticeApiResponse>(url);

    return {
      data: transformNoticeApiToNotice(response.data.data),
      total: response.data.total,
      per_page: response.data.per_page,
      current_page: response.data.current_page,
      last_page: response.data.last_page,
      start: response.data.start,
      offset: response.data.offset,
      count: response.data.count,
    };
  } catch (error: any) {
    console.error("[fetchCNINotices] Failed:", {
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
export const getNoticesPaginate = async (page: number) => {
  try {
    const url = `/notices?notices=${page}`;

    const response = await api.get<NoticeApiResponse>(url);

    return {
      data: transformNoticeApiToNotice(response.data.data),
      total: response.data.total,
      per_page: response.data.per_page,
      current_page: response.data.current_page,
      last_page: response.data.last_page,
      start: response.data.start,
      offset: response.data.offset,
      count: response.data.count,
    };
  } catch (error: any) {
    console.error("[fetchCNINotices] Failed:", {
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
};
/**
 * Fetch notices for any organization
 */
export async function fetchNoticesByOrgId(organizationId: number) {
  try {
    const url = `/notices/${organizationId}`;
    console.log(`[fetchNoticesByOrgId] Fetching from: ${api.getUri() + url}`);

    const response = await api.get<NoticeApiResponse>(url);
    return transformNoticeApiToNotice(response.data.data);
  } catch (error: any) {
    console.error(
      `[fetchNoticesByOrgId] Failed for org ${organizationId}:`,
      error.message,
    );
    return [];
  }
}

/**
 * Fetch notices with pagination
 */
export async function fetchNoticesPaginated(
  organizationId: number = 1,
  page: number = 1,
  perPage: number = 10,
): Promise<NoticeApiResponse> {
  try {
    const response = await api.get<NoticeApiResponse>(
      `/notices/${organizationId}`,
      {
        params: { page, per_page: perPage },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notices from API:", error);
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
