import { ReelsIdea, ReelsResponse, ContentType } from "../types";

export const parseReelsResponse = (response: any): ReelsIdea[] => {
  try {
    const content = response?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("Empty response content");
    }

    // Remove code blocks if present
    const cleanContent = content.replace(/```json\n?|\n?```/g, "").trim();
    const parsed = JSON.parse(cleanContent) as ReelsResponse;
    const ideas: ReelsIdea[] = [];

    // Parse normal version
    if (parsed.normal_version) {
      ideas.push(createReelsIdea(parsed.normal_version, "normal"));
    }

    // Parse viral version
    if (parsed.viral_version) {
      ideas.push(createReelsIdea(parsed.viral_version, "viral"));
    }

    return ideas;
  } catch (error) {
    console.error("Parse error:", error);
    return [];
  }
};

const createReelsIdea = (version: any, type: ContentType): ReelsIdea => ({
  id: crypto.randomUUID(),
  title: version.title,
  type,
  duration: version.duration,
  scenes: version.scenes.map((scene: any) => ({
    duration: scene.duration,
    description: scene.description,
    cameraAngle: scene.camera_angle,
    textOverlay: scene.text_overlay
  })),
  music: {
    title: version.music.title,
    artist: version.music.artist
  },
  effects: version.effects,
  transitions: version.transitions,
  tips: version.tips,
  createdAt: new Date().toISOString()
});
