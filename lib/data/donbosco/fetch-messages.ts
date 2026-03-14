import type { Message } from "@/lib/types";
import api from "@/lib/axios";

// Static fallback data

// API Response types — matches GET /messages/{organization_id}
interface     MessageApiItem {
  id: number;
  title: string;
  content: string;
  "staff-name": string;
  designation: string;
  image: string | null;
  date: string | null;
  tenure: string | null;
}

interface MessageApiResponse {
  data: MessageApiItem[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  start: number;
  offset: number;
  count: number;
}

/**
 * Transform API message data to Message type
 */
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

/**
 * Fetch messages from API
 * @param organizationId - defaults to 1 for CNI
 */
export async function fetchMessages(
  schoolId: number = 1,
): Promise<Message[]> {
  const endpoint = `/messages/${schoolId}`;
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  try {
    const response = await api.get<MessageApiResponse>(endpoint);
    const msgs = response.data.data;
    console.log(`[fetchMessages] ✅ Fetched ${msgs} messages from ${fullUrl}`);
    return msgs?.map(transformToMessage) ?? [];
  } catch (error: any) {
    console.error(`[fetchMessages] ❌ Failed to fetch from ${fullUrl}`);
    if (error.response) {
      console.error(
        `[fetchMessages] HTTP Error ${error.response.status}: ${error.response.statusText}`,
      );
    } else if (error.request) {
      console.error(`[fetchMessages] Network Error: No response received`);
    } else {
      console.error(`[fetchMessages] Error:`, error.message);
    }
    return [];
  }
}
