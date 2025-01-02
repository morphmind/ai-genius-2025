import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Moon, Sun, Pencil, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import ContentGenerator from "@/components/ContentGenerator";
import ImagePromptGenerator from "@/components/ImagePromptGenerator";
import InternalLinkGenerator from "@/components/InternalLinkGenerator";
import URLAnalyzer from "@/components/URLAnalyzer";
import SocialMedia from "./social-media";
import ContentWriter from "./content-writer";

const Index = () => {
  const navigate = useNavigate();
  const [mainTab, setMainTab] = useState("content-writer");
  const [contentTab, setContentTab] = useState("content");
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[rgb(186,73,73)] to-[rgb(186,73,73,0.7)] bg-clip-text text-transparent dark:from-[rgb(186,73,73,0.8)] dark:to-[rgb(186,73,73,0.5)]">
              KAho Write Tools
            </h1>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
                <SettingsIcon className="h-5 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Navigation */}
          <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content-writer" className="flex items-center gap-2">
                <Pencil className="h-4 w-4" />
                İçerik Üretici
              </TabsTrigger>
              <TabsTrigger value="social-media" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Sosyal Medya
              </TabsTrigger>
            </TabsList>

            {/* Content Writer Section */}
            <TabsContent value="content-writer" className="mt-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <Tabs value={contentTab} onValueChange={setContentTab} className="p-6">
                  <TabsList className="grid w-full grid-cols-5 mb-6">
                    <TabsTrigger value="content">Pre-Content Gen</TabsTrigger>
                    <TabsTrigger value="full-content">Full Content Writer</TabsTrigger>
                    <TabsTrigger value="image">Image Generator</TabsTrigger>
                    <TabsTrigger value="url-analyzer">URL Analyzer</TabsTrigger>
                    <TabsTrigger value="internal-link">Internal Link</TabsTrigger>
                  </TabsList>
                  <TabsContent value="content" className="mt-0">
                    <ContentGenerator />
                  </TabsContent>
                  <TabsContent value="full-content" className="mt-0">
                    <ContentWriter />
                  </TabsContent>
                  <TabsContent value="image" className="mt-0">
                    <ImagePromptGenerator />
                  </TabsContent>
                  <TabsContent value="url-analyzer" className="mt-0">
                    <URLAnalyzer />
                  </TabsContent>
                  <TabsContent value="internal-link" className="mt-0">
                    <InternalLinkGenerator />
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>

            {/* Social Media Section */}
            <TabsContent value="social-media" className="mt-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <SocialMedia />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
