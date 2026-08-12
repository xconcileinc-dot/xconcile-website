"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SuccessStoryVideo {
  title?: string;
  clientName?: string;
  embedUrl?: string | null;
  videoFile?: string | null;
  videoTitle: string;
}

interface SuccessStoriesVideoSliderProps {
  videos: SuccessStoryVideo[];
}

export const SuccessStoriesVideoSlider: React.FC<SuccessStoriesVideoSliderProps> = ({
  videos,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", loop: videos.length > 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {videos.map((video, index) => (
            <article
              key={`${video.embedUrl || video.videoFile}-${index}`}
              className="min-w-0 flex-[0_0_100%] px-2 md:px-6"
            >
              <div className="mx-auto max-w-5xl">
                <div className="overflow-hidden rounded-3xl bg-neutral-950 shadow-2xl ring-1 ring-neutral-200">
                  {video.embedUrl ? (
                    <iframe
                      src={video.embedUrl}
                      title={video.videoTitle}
                      className="aspect-video w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={video.videoFile || undefined}
                      title={video.videoTitle}
                      className="aspect-video w-full"
                      controls
                    />
                  )}
                </div>
                {(video.title || video.clientName) && (
                  <div className="mt-5 text-center">
                    {video.title && (
                      <h3 className="text-xl font-semibold text-neutral-900">
                        {video.title}
                      </h3>
                    )}
                    {video.clientName && (
                      <p className="mt-1 text-neutral-600">
                        {video.clientName}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {videos.length > 1 && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-0 top-[40%] z-10 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg ring-1 ring-neutral-200 transition hover:bg-primary-600 hover:text-white lg:flex"
            aria-label="Previous success story video"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-0 top-[40%] z-10 hidden h-12 w-12 translate-x-1/2 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg ring-1 ring-neutral-200 transition hover:bg-primary-600 hover:text-white lg:flex"
            aria-label="Next success story video"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition hover:border-primary-600 hover:bg-primary-600 hover:text-white lg:hidden"
              aria-label="Previous success story video"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {videos.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "w-8 bg-primary-600"
                      : "w-3 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to success story video ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={scrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition hover:border-primary-600 hover:bg-primary-600 hover:text-white lg:hidden"
              aria-label="Next success story video"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
