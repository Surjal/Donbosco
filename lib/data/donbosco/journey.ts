import type { JourneyMilestone } from "@/lib/types";
import api from "@/lib/axios";

// API Response type
interface Journey {
  start_date: string;
  End_date: string | null;
  title: string;
  description: string;
  image: string | null;
  image2: string | null;
}

interface JourneyApiResponse {
  data: Journey[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  start: number;
  offset: number;
  count: number;
}

/**
 * Transform API Journey data to Timeline format
 */
function transformJourneyToTimeline(journeys: Journey[]): JourneyMilestone[] {
  return (
    journeys.map((journey) => ({
      date: journey.start_date,
      title: journey.title,
      description: journey.description,
      image: journey.image ?? "",
      image2: journey.image2 ?? "",
    })) ?? []
  );
}

/**
 * Fetch CNI Journey data from API (organization_id = 1)
 * Falls back to static data if API fails
 */
export async function fetchCNIJourney(): Promise<JourneyMilestone[]> {
  try {
    const response = await api.get<JourneyApiResponse>("/journeys/1");
    return transformJourneyToTimeline(response.data.data);
  } catch (error) {
    console.error(
      "Failed to fetch journey from API, using fallback data:",
      error,
    );
    return [];
  }
}

/**
 * Get journeys for any organization (if needed in the future)
 */
export async function fetchJourneyByOrgId(
  organizationId: number,
): Promise<JourneyMilestone[]> {
  try {
    const response = await api.get<JourneyApiResponse>(
      `/journeys/${organizationId}`,
    );
    return transformJourneyToTimeline(response.data.data);
  } catch (error) {
    console.error(`Failed to fetch journey for org ${organizationId}:`, error);
    return [];
  }
}
