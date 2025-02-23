import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Check, Wand2, Megaphone, MoreHorizontal, Share2, Download } from "lucide-react";
import { useState } from "react";

interface TrendActionsProps {
  onGenerateContent: () => void;
  onCreateCampaign: () => void;
}

export function TrendActions({ onGenerateContent, onCreateCampaign }: TrendActionsProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className={`transition-colors ${
          isFollowing
            ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700'
            : ''
        }`}
        onClick={() => setIsFollowing(!isFollowing)}
      >
        {isFollowing ? (
          <>
            <Check className="h-4 w-4 mr-1" />
            Following
          </>
        ) : (
          <>
            <Plus className="h-4 w-4 mr-1" />
            Follow
          </>
        )}
      </Button>

      <div className="bg-gray-100 rounded-lg p-1 flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-white hover:text-purple-600"
          onClick={onGenerateContent}
        >
          <Wand2 className="h-4 w-4 mr-1" />
          Generate Ideas
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-white hover:text-purple-600"
          onClick={onCreateCampaign}
        >
          <Megaphone className="h-4 w-4 mr-1" />
          New Campaign
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-white hover:text-purple-600"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>
              <Share2 className="h-4 w-4 mr-2" />
              Share Trend
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}