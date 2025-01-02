export type SocialPlatform = 
  | "instagram_reels"
  | "instagram_story" 
  | "instagram_post"
  | "twitter"
  | "linkedin";

export type ImageType = "story" | "post";

export interface ContentIdea {
  id: string;
  title: string;
  description: string;
  platform: SocialPlatform;
  createdAt: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  platform: SocialPlatform;
  type: ImageType;
  prompt: string;
  createdAt: string;
}

export interface PlatformConfig {
  id: SocialPlatform;
  name: string;
  description: string;
  imageTypes: ImageType[];
  maxCharacters?: number;
  imageSize?: {
    width: number;
    height: number;
  };
}
