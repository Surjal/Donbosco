import type { TeamMember, Staff, OrgTeamMember } from "@/lib/types";
import api from "@/lib/axios";

// API Response types — matches actual API response from GET /teams/{org_id}
interface TeamApiItem {
  id: number;
  name: string;
  designation: string;
  image: string | null;
  bio: string | null;
}

interface TeamApiResponse {
  data: TeamApiItem[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  start: number;
  offset: number;
  count: number;
}

/**
 * Transform API team data to TeamMember type (used on home page)
 */
function transformToTeamMember(item: TeamApiItem): TeamMember {
  return {
    id: item.id,
    name: item.name,
    designation: item.designation,
    image: item.image || undefined,
    bio: item.bio || undefined,
  };
}

/**
 * Transform API team data to Staff type (used on team page)
 */
function transformToStaff(item: TeamApiItem, index: number): Staff {
  return {
    id: item.id,
    name: item.name,
    designation: item.designation,
    image: item.image || undefined,
    bio: item.bio || undefined,
    order: index + 1,
  };
}

/**
 * Transform API team data to OrgTeamMember type (used on sister org detail page)
 */
function transformToOrgTeamMember(item: TeamApiItem): OrgTeamMember {
  return {
    id: item.id,
    name: item.name,
    designation: item.designation,
    image: item.image || undefined,
  };
}

/**
 * Fetch team members from API for a given organization
 */
export async function fetchTeamsByOrgId(
  organizationId: number,
): Promise<TeamApiItem[]> {
  const endpoint = `/teams/${organizationId}`;
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  try {
    const response = await api.get<TeamApiResponse>(endpoint);
    const teams = response.data.data;
    return teams;
  } catch (error: any) {
    console.error(`[fetchTeamsByOrgId] ❌ Failed to fetch from ${fullUrl}`);

    if (error.response) {
      console.error(
        `[fetchTeamsByOrgId] HTTP Error ${error.response.status}: ${error.response.statusText}`,
      );
    } else if (error.request) {
      console.error(`[fetchTeamsByOrgId] Network Error: No response received`);
    } else {
      console.error(`[fetchTeamsByOrgId] Error:`, error.message);
    }

    return [];
  }
}

/**
 * Fetch CNI team members as TeamMember[] (for home page)
 */
export async function fetchCNITeamMembers(): Promise<TeamMember[]> {
  const items = await fetchTeamsByOrgId(1);
  if (items.length === 0) {
    return [];
  }
  return items.map(transformToTeamMember);
}

/**
 * Fetch CNI staff as Staff[] (for team page)
 */
export async function fetchCNIStaff(): Promise<Staff[]> {
  const items = await fetchTeamsByOrgId(1);
  if (items.length === 0) {
    return [];
  }
  return items.map((item, index) => transformToStaff(item, index));
}

/**
 * Fetch team members for a sister org as OrgTeamMember[]
 */
export async function fetchOrgTeamMembers(
  organizationId: number,
): Promise<OrgTeamMember[]> {
  const items = await fetchTeamsByOrgId(organizationId);
  return items.map(transformToOrgTeamMember);
}
