import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SocialPlatform, ReelsIdea } from "../types";
import { socialMediaService } from "../services/socialMediaService";
import { parseReelsResponse } from "../utils/reelsParser";

export const useSocialMedia = () => {
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<ReelsIdea[]>([]);
  const { toast } = useToast();

  const generateIdeas = async (platform: SocialPlatform, topic: string) => {
    if (!topic.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen bir konu girin",
        variant: "destructive"
      });
      return;
    }

    const apiKey = localStorage.getItem("openai_api_key");
    if (!apiKey) {
      toast({
        title: "API Anahtarı Gerekli",
        description: "Lütfen OpenAI API anahtarınızı ayarlarda belirtin",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      switch (platform) {
        case "instagram_reels": {
          const { gpt4Response, gpt35Response } = await socialMediaService.generateReelsIdeas(topic, apiKey);
          const newIdeas = [
            ...parseReelsResponse(gpt4Response),
            ...parseReelsResponse(gpt35Response)
          ];
          setIdeas(newIdeas);
          break;
        }
        // Add other platform cases here
        default:
          setIdeas([]);
      }
    } catch (error) {
      console.error("Content generation error:", error);
      toast({
        title: "Hata",
        description: "İçerik fikirleri üretilirken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    ideas,
    generateIdeas
  };
};
