"use client";

import YouTube from "react-youtube";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId: string | null;
};

export default function TrailerModal({ open, onOpenChange, videoId }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-screen h-screen max-w-none rounded-none p-0 overflow-hidden md:h-auto md:max-w-5xl md:rounded-lg flex items-center justify-center bg-black [&>button]:text-white [&>button]:opacity-100">
        <VisuallyHidden>
          <DialogTitle>Trailer</DialogTitle>
        </VisuallyHidden>

        {videoId && (
          <div className="w-full aspect-video">
            <YouTube
              videoId={videoId}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: { autoplay: 1 },
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
