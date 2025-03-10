import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { findTrendById } from "@/data/trendData";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Gauge } from "lucide-react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
} from "lucide-react";
import { usePageTitle } from '@/hooks/usePageTitle';

interface ContentConfig {
  format: string;
  tonality: string;
  channel: string;
  prompt: string;
}

const CONTENT_FORMATS = [
  "Video Script",
  "Blog Post",
  "Tweet (X)",
  "LinkedIn Post",
  "Email Newsletter",
  "Infographic Outline",
];

const TONALITIES = [
  "Informative",
  "Humorous",
  "Persuasive",
  "Technical",
  "Inspirational",
  "Neutral",
];

const CHANNELS = [
  { name: "LinkedIn", icon: Linkedin },
  { name: "Blog", icon: Mail },
  { name: "X (Twitter)", icon: Twitter },
  { name: "Email", icon: Mail },
  { name: "Facebook", icon: Facebook },
  { name: "Instagram", icon: Instagram },
  { name: "YouTube", icon: Youtube },
];

export default function ContentGenerator() {
  usePageTitle('Content Generator');
  const navigate = useNavigate();
  const { trendId } = useParams();

  const { data: trend, isLoading, isError } = useQuery({
    queryKey: ['trend', trendId],
    queryFn: () => {
      const trendData = findTrendById(trendId || '');
      if (!trendData) {
        throw new Error('Trend not found');
      }
      return trendData;
    },
  });

  const [config, setConfig] = useState<ContentConfig>({
    format: CONTENT_FORMATS[0],
    tonality: TONALITIES[0],
    channel: CHANNELS[0].name,
    prompt: "",
  });

  const [generatedContent, setGeneratedContent] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [viralityScore] = useState(85);
  const [bestTime] = useState("Tuesday at 10:00 AM EST");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (isError || !trend) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-8">
        <div className="container mx-auto text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Homepage
          </Button>
          <h1 className="text-2xl font-semibold mb-4">Trend Not Found</h1>
          <p className="text-muted-foreground">
            The trend you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const handleGenerate = () => {
    setGeneratedContent(
      `Sample generated content for ${trend?.name} with ${config.format} format and ${config.tonality} tone.`
    );
    setHasGenerated(true);
  };

  const handleSuggestPrompt = () => {
    setConfig((prev) => ({
      ...prev,
      prompt: `Create engaging content about ${trend?.name} focusing on latest developments and industry impact.`,
    }));
  };

  return (
    <div className="space-y-8">
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-8">
        <div className="container mx-auto">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Trend Details
            </Button>
          </div>

          <h1 className="text-2xl font-semibold mb-6">Generate Content for {trend.name}</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Content Format</Label>
                    <RadioGroup
                      value={config.format}
                      onValueChange={(value) =>
                        setConfig((prev) => ({ ...prev, format: value }))
                      }
                      className="grid grid-cols-2 gap-4"
                    >
                      {CONTENT_FORMATS.map((format) => (
                        <div key={format} className="flex items-center space-x-2">
                          <RadioGroupItem value={format} id={`format-${format}`} />
                          <Label htmlFor={`format-${format}`}>{format}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label>Tonality</Label>
                    <RadioGroup
                      value={config.tonality}
                      onValueChange={(value) =>
                        setConfig((prev) => ({ ...prev, tonality: value }))
                      }
                      className="grid grid-cols-2 gap-4"
                    >
                      {TONALITIES.map((tone) => (
                        <div key={tone} className="flex items-center space-x-2">
                          <RadioGroupItem value={tone} id={`tone-${tone}`} />
                          <Label htmlFor={`tone-${tone}`}>{tone}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label>Target Channel</Label>
                    <RadioGroup
                      value={config.channel}
                      onValueChange={(value) =>
                        setConfig((prev) => ({ ...prev, channel: value }))
                      }
                      className="grid grid-cols-2 gap-4"
                    >
                      {CHANNELS.map(({ name, icon: Icon }) => (
                        <div key={name} className="flex items-center space-x-2">
                          <RadioGroupItem value={name} id={`channel-${name}`} />
                          <Label
                            htmlFor={`channel-${name}`}
                            className="flex items-center gap-2"
                          >
                            <Icon className="h-4 w-4" />
                            {name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label>User Prompt</Label>
                    <Textarea
                      placeholder="Enter your content prompt here..."
                      value={config.prompt}
                      onChange={(e) =>
                        setConfig((prev) => ({ ...prev, prompt: e.target.value }))
                      }
                      className="h-32"
                    />
                    <Button
                      variant="outline"
                      onClick={handleSuggestPrompt}
                      className="w-full"
                    >
                      Suggest Prompt
                    </Button>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    className="w-full bg-accent hover:bg-accent/90"
                  >
                    Generate Content
                  </Button>
                </CardContent>
              </Card>
            </div>

            {hasGenerated ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Generated Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={generatedContent}
                      className="h-64"
                      placeholder="Generated content will appear here..."
                      onChange={(e) => setGeneratedContent(e.target.value)}
                    />
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Virality Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Gauge className="h-12 w-12 text-accent" />
                        <div>
                          <p className="text-3xl font-bold">{viralityScore}/100</p>
                          <p className="text-sm text-muted-foreground">
                            High potential for engagement
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Best Time to Post</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-semibold">{bestTime}</p>
                      <p className="text-sm text-muted-foreground">
                        Optimal engagement time for your audience
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Channels</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {CHANNELS.slice(0, 4).map(({ name, icon: Icon }) => (
                        <div
                          key={name}
                          className="flex items-center gap-2 p-3 rounded-lg bg-accent/5"
                        >
                          <Icon className="h-5 w-5 text-accent" />
                          <span>{name}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      These channels are recommended based on your content type and audience engagement patterns.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-lg">
                  Configure your content settings and click "Generate Content" to see the results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
