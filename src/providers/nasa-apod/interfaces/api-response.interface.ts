export interface ApiResponse {
  copyright: string;
  date: string;
  explanation: string;
  hdurl?: string;
  thumbnail_url?: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
}
