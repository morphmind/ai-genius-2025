import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { format } from "date-fns";
import { ReelsIdea } from "../types";

interface IdeaHistoryProps {
  ideas: ReelsIdea[];
  onDelete: (id: string) => void;
}

export function IdeaHistory({ ideas, onDelete }: IdeaHistoryProps) {
  const [openIdeaId, setOpenIdeaId] = useState<string | null>(null);
  const { toast } = useToast();

  // Sort ideas by date
  const sortedIdeas = [...ideas].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleCopy = async (idea: ReelsIdea) => {
    try {
      const text = formatIdeaForCopy(idea);
      await navigator.clipboard.writeText(text);
      toast({
        description: "İçerik kopyalandı"
      });
    } catch (err) {
      toast({
        title: "Hata",
        description: "Kopyalama işlemi başarısız oldu",
        variant: "destructive"
      });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bu fikri silmek istediğinizden emin misiniz?')) {
      onDelete(id);
      if (openIdeaId === id) {
        setOpenIdeaId(null);
      }
    }
  };

  if (sortedIdeas.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Fikir Geçmişi ({sortedIdeas.length})</span>
          {sortedIdeas.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (window.confirm('Tüm fikir geçmişini silmek istediğinizden emin misiniz?')) {
                  sortedIdeas.forEach(idea => onDelete(idea.id));
                }
              }}
            >
              Tümünü Sil
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedIdeas.map((idea) => (
          <Collapsible
            key={idea.id}
            open={openIdeaId === idea.id}
            onOpenChange={(isOpen) => setOpenIdeaId(isOpen ? idea.id : null)}
          >
            <div className="flex items-center justify-between p-4 border rounded-lg mb-2 bg-card">
              <div>
                <h3 className="font-medium">{idea.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(idea.createdAt), "PPP")} - {idea.type}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(idea)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(idea.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {openIdeaId === idea.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
            <CollapsibleContent>
              <div className="p-4 border-x border-b rounded-b-lg bg-card space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Sahneler</h4>
                  {idea.scenes.map((scene, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{scene.duration}</span>
                        <span className="text-sm text-muted-foreground">{scene.cameraAngle}</span>
                      </div>
                      <p className="text-sm">{scene.description}</p>
                      <p className="text-sm text-muted-foreground">{scene.textOverlay}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Müzik</h4>
                  <p className="text-sm">{idea.music.title} - {idea.music.artist}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Efektler ve Geçişler</h4>
                  <div className="text-sm space-y-1">
                    <p><strong>Efektler:</strong> {idea.effects.join(", ")}</p>
                    <p><strong>Geçişler:</strong> {idea.transitions.join(", ")}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">İpuçları</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    {idea.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
}

function formatIdeaForCopy(idea: ReelsIdea): string {
  return `${idea.title}

Süre: ${idea.duration}

Sahneler:
${idea.scenes.map((scene, index) => `
${index + 1}. (${scene.duration})
   ${scene.description}
   Çekim: ${scene.cameraAngle}
   Yazı: ${scene.textOverlay}
`).join('\n')}

Müzik: ${idea.music.title} - ${idea.music.artist}

Efektler:
${idea.effects.map(effect => `- ${effect}`).join('\n')}

Geçişler:
${idea.transitions.map(transition => `- ${transition}`).join('\n')}

İpuçları:
${idea.tips.map(tip => `- ${tip}`).join('\n')}`;
}
