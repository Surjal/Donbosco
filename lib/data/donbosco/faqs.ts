import type { Faq } from "@/lib/types";
import api from "@/lib/axios";

// Static fallback data
export const fallbackFaqs: Faq[] = [
  {
    id: 1,
    question: "What is Don Bosco and what does it do?",
    answer:
      "Don Bosco is the provincial chapter of the Confederation of Nepalese Industries (CNI). We work to promote industrial growth, advocate for favorable business policies, and foster collaboration among industries within Koshi Province.",
  },
  {
    id: 2,
    question: "How can I become a member of Don Bosco?",
    answer:
      "Membership is open to all registered industries and businesses operating within Koshi Province. You can apply online through our website or visit our office with your business registration documents. Our team will guide you through the process.",
  },
  {
    id: 3,
    question: "What are the benefits of CNI membership?",
    answer:
      "Members enjoy networking opportunities, policy advocacy, business matchmaking services, access to training programs, participation in trade fairs, and representation in government consultations affecting the industrial sector.",
  },
  {
    id: 4,
    question: "Does Don Bosco offer support for startups?",
    answer:
      "Yes, we have dedicated programs for startups including mentorship, incubation support, funding connections, and access to our extensive network of established industries and investors.",
  },
  {
    id: 5,
    question: "How can I participate in CNI events and programs?",
    answer:
      "You can stay updated about our events through our website, social media channels, or by subscribing to our newsletter. Both members and non-members can participate in most of our events and workshops.",
  },
];

// API Response type
interface FaqApiResponse {
  data: Faq[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  start: number;
  offset: number;
  count: number;
}

/**
 * Fetch FAQs from API
 * @param organizationId - The organization ID (default: 1 for CNI Koshi)
 * @returns Promise with FAQ data or fallback data on error
 */
export async function fetchFaqs(organizationId: number = 1): Promise<Faq[]> {
  const endpoint = `/faqs/${organizationId}`;
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;


  try {
    const response = await api.get<FaqApiResponse>(endpoint);
    // console.log(
    //   `[fetchFaqs] Success! Received ${response.data.data.length} FAQs`,
    // );
    // console.log(response.data.data)
    return response.data.data;
  } catch (error: any) {
    console.error(`[fetchFaqs] ❌ Failed to fetch FAQs from ${fullUrl}`);

    if (error.response) {
      // Server responded with error status
      console.error(
        `[fetchFaqs] HTTP Error ${error.response.status}: ${error.response.statusText}`,
      );
      console.error(`[fetchFaqs] Response data:`, error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error(`[fetchFaqs] Network Error: No response received`);
      console.error(`[fetchFaqs] Request details:`, error.request);
    } else {
      // Something else happened
      console.error(`[fetchFaqs] Error:`, error.message);
    }

    console.log(
      `[fetchFaqs] Using fallback data (${fallbackFaqs.length} FAQs)`,
    );
    return fallbackFaqs;
  }
}

/**
 * Fetch FAQs with pagination support
 * @param organizationId - The organization ID
 * @param page - Page number (default: 1)
 * @param perPage - Items per page (default: 10)
 * @returns Promise with full API response
 */
export async function fetchFaqsPaginated(
  organizationId: number = 1,
  page: number = 1,
  perPage: number = 10,
): Promise<FaqApiResponse> {
  const endpoint = `/faqs/${organizationId}`;
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}?page=${page}&per_page=${perPage}`;

  try {
    const response = await api.get<FaqApiResponse>(endpoint, {
      params: { page, per_page: perPage },
    });
    console.log(
      `[fetchFaqsPaginated] Success! Received ${response.data.data.length} FAQs (page ${page})`,
    );
    return response.data;
  } catch (error: any) {
    console.error(
      `[fetchFaqsPaginated] ❌ Failed to fetch FAQs from ${fullUrl}`,
    );

    if (error.response) {
      console.error(
        `[fetchFaqsPaginated] HTTP Error ${error.response.status}: ${error.response.statusText}`,
      );
      console.error(`[fetchFaqsPaginated] Response data:`, error.response.data);
    } else if (error.request) {
      console.error(`[fetchFaqsPaginated] Network Error: No response received`);
    } else {
      console.error(`[fetchFaqsPaginated] Error:`, error.message);
    }

    // Return fallback response structure
    return {
      data: fallbackFaqs,
      total: fallbackFaqs.length,
      per_page: perPage,
      current_page: page,
      last_page: 1,
      start: 1,
      offset: 0,
      count: fallbackFaqs.length,
    };
  }
}

// For backward compatibility - export static data
export const faqs = fallbackFaqs;
