export interface HeroSlide {
  id: number;
  title: string;
  content: string;
  image: string;
}

export interface PhotoAlbum {
  id: string;
  title: string;
  description: string;
  date: string;
  cover_images: string[];
  slug: string;
  totalimage: number;
}

export interface Message {
  id: number;
  title: string;
  content: string;
  staff_name: string;
  designation: string;
  image?: string;
}
export interface Journey {
  start_date: string;
  End_date: string | null;
  title: string;
  description: string;
  image: string | null;
}

export interface JourneyMilestone {
  date: string;
  title: string;
  description: string;
  image: string;
  image2: string;
}

export interface MissionApiResponse {
  data: MissionApiItem[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  start: number;
  offset: number;
  count: number;
}

export interface MissionApiItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface Mission {
  id: number;
  icon: string;
  title: string;
  description: string;
}
export interface ArrayMission {
  data: Mission[];
}
export interface HomeArrayMission {
  data: HomeMission;
}
export interface HomeMission {
  id: number;
  title: string;
  content: string;
  image_1: string | null;
  image_2: string | null;
  image_3: string | null;
}

export interface Notice {
  id: number;
  title: string;
  description?: string; // Add this field
  image?: string | StaticImageData | null; // Image from database
  attachment?: string | null; // Add this field
  priority?: "high" | "medium" | "low"; // Add this field
  date: string;
  slug?: string; // Add this field
  isNew: boolean;
}

export interface Organization {
  id: number;
  name: string;
  logo: string;
  color: string;
  website?: string;
  description?: string;
  established?: string;
  category?: string;
  image?: string;

  // NEW: detailed info for detail page
  slug: string;
  fullDescription?: string;
  mission?: string;
  vision?: string;
  values?: string[];
  address?: string;
  phone?: string;
  email?: string;
  teamMembers?: OrgTeamMember[];
  journey?: JourneyMilestone[];
}

export interface OrgTeamMember {
  id: number;
  name: string;
  designation: string;
  image?: string;
  email?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content?: string; // Add this field
  image?: string | StaticImageData | null;
  date: string;
  category: string;
  isNew: string;
  slug: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}
export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image?: string;
  bio?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface AboutStat {
  label: string;
  value: string;
}
export interface Message {
  id: number;
  title: string;
  content: string;
  staff_name: string;
  designation: string;
  image?: string;
  date?: string; // e.g. "January 2025"
  tenure?: string; // e.g. "2023 – Present"
}

export type NewsNoticeCategory = "News" | "Notice";

import { data } from "framer-motion/client";
import { StaticImageData } from "next/image";

export interface NoticeItem {
  id: number;
  title: string;
  description: string;
  attachment: string | null;
  image?: string | StaticImageData;
  date: string;
  category: NewsNoticeCategory;
  isNew?: boolean;
  slug?: string;
  priority: "high" | "medium" | "low";
}

export interface Album {
  id: string;
  title: string;
  description: string;
  date: string;
  cover_images: string[];
  slug: string;
  totalimage: number;
}
export interface AlbumApiResponse {
  data: Album[];
}
export interface Photo {
  id: number;
  title: string;
  image: string;
  order_index: string;
  is_cover: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string; // YouTube embed or video file URL
  date: string;
  duration?: string; // e.g., "5:32"
  category?: string; // e.g., "Events", "Workshops", "Interviews"
}

export interface Staff {
  id: number;
  name: string;
  designation: string;
  image?: string;
  email?: string;
  phone?: string;
  address?: string;
  bio?: string;
  order: number; // for custom ordering
}

export interface OrgNews {
  id: number;
  organizationId: number;
  title: string;
  summary: string;
  content: string;
  image?: string;
  date: string;
  slug: string;
}

export interface OrgNotice {
  id: string;
  organizationId: number;
  title: string;
  summary: string;
  content: string;
  date: string;
  isNew?: boolean;
  slug: string;
}

export interface OrgFaq {
  id: number;
  organizationId: number;
  question: string;
  answer: string;
}
export interface JourneyApiResponse {
  data: JourneyApiItem[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  start: number;
  offset: number;
  count: number;
}

export interface JourneyApiItem {
  start_date: string;
  End_date: string | null;
  title: string;
  description: string;
  image: string | null;
}

export interface JourneyMilestone {
  date: string;
  title: string;
  description: string;
  images?: string[];
}

export type OtherOrganization = Organization;

export interface BlogItem {
  id: number;
  title: string;
  summary: string;
  location: string;
  end_date:string
  is_home: boolean;
  name: string;
  image: string | null;
  start_date: string;
}

export interface EventItem {
  id: number;
  summary: string;
  location: string;
  image: string | null;
  start_date: string;
  end_date: string;
  title: string;
  is_home: boolean;
}

export interface EventApiResponse {
  data: EventItem[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  start: number;
  offset: number;
  count: number;
}

export interface BlogsApiResponse {
  data: BlogItem[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  start: number;
  offset: number;
  count: number;
}
export interface AlbumsApiResponse {
  data: Album[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  start: number;
  offset: number;
  count: number;
}

export interface NoticeApiResponse {
  data: any[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  start: number;
  offset: number;
  count: number;
}
export interface NewsNoticeItem {}
export interface MessageApiItem {
  id: number;
  title: string;
  content: string;
  "staff-name": string;
  designation: string;
  image: string | null;
  date: string | null;
  tenure: string | null;
}
export interface MessageApiResponse {
  data: MessageApiItem[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  start: number;
  offset: number;
  count: number;
}

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

// API Response type
export interface FaqApiResponse {
  data: Faq[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  start: number;
  offset: number;
  count: number;
}
export interface AdmissionClass {
  id: number;
  class: string;
  min_age: number;
  documents_en: string[];
  documents_np: string[];
  required_age: string;
  selection_en: string;
  selection_np: string;
  qualification_en: string;
  qualification_np: string;
  dob_not_later_than: string;
  order_index: number;
}

export interface AnnualFeeComponent {
  id: number;
  item: string;
  frequency: string;
  amount_npr: number;
  order_index: number;
}

export interface MonthlyFeeClass {
  id: number;
  classes: string;
  amount_npr: number;
  order_index: number;
}

export interface MonthlyFeeOtherCharge {
  id: number;
  item: string;
  amount_npr: number;
  order_index: number;
}

export interface ProposedFeeMonthly {
  id: number;
  frequency: string;
  amount_npr: number;
  class_type: string;
  order_index: number;
}

export interface ProposedFeeAnnual {
  id: number;
  item: string;
  frequency: string;
  amount_npr: number;
  order_index: number;
}

export interface AdmissionFeeSettings {
  admission_classes: AdmissionClass[];
  annual_fee_components: AnnualFeeComponent[];
  monthly_fee_classes: MonthlyFeeClass[];
  monthly_fee_other_charges: MonthlyFeeOtherCharge[];
  proposed_fee_monthly: ProposedFeeMonthly[];
  proposed_fee_annual: ProposedFeeAnnual[];
  total_annual_fee: number;
}