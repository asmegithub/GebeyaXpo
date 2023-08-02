"use client";

import { Hero, MoreFacts, PhotoGallery, VideoPlayer, WhyExibiti } from "@/containers";

export default function Home() {
  return (
    <main>
      <Hero />
      <VideoPlayer />
      <WhyExibiti />
      <MoreFacts/>
      <PhotoGallery/>
    </main>
  );
}
