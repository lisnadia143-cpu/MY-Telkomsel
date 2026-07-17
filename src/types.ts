export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: "connectivity" | "iot" | "cloud" | "security" | "marketing";
  iconName: string;
  features: string[];
  benefits: string;
  badge?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceOfInterest: string;
  message: string;
  createdAt: string;
  status: "New" | "Followed Up" | "Completed";
}

export interface EmailLog {
  id: string;
  to: string;
  subject: string;
  body: string;
  sentAt: string;
  status: "Sent" | "Failed";
}

export interface TrafficPoint {
  date: string;
  visitors: number;
  chats: number;
  inquiries: number;
}

export interface ChatTopicCount {
  connectivity: number;
  iot: number;
  cloud: number;
  security: number;
  general: number;
}

export interface AdminStats {
  trafficStats: TrafficPoint[];
  chatCategories: ChatTopicCount;
  contacts: ContactSubmission[];
  emailLogs: EmailLog[];
}
