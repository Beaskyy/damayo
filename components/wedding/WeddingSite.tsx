"use client";

import { useState } from "react";
import { weddingConfig } from "@/lib/wedding/config";
import { IntroScreen, useBackgroundMusic } from "./IntroScreen";
import { HeroSection, MusicToggle } from "./HeroSection";
import { CountdownSection } from "./CountdownSection";
import { WelcomeSection, secondaryGalleryImages, secondaryGalleryPositions } from "./WelcomeSection";
import { VenueSection } from "./VenueSection";
import { ProgramSection, DressCodeSection } from "./ProgramSection";
import { PreWeddingEventsSection, AccommodationSection } from "./EventsSections";
import { TransportSection, GiftsSection } from "./TransportGiftsSections";
import { GalleryMarquee, SectionDivider } from "./GalleryMarquee";
import { RsvpSection } from "./RsvpSection";
import { FooterSection } from "./FooterSection";

export function WeddingSite() {
  const [showIntro, setShowIntro] = useState(true);
  const { isMuted, isPlaying, startMusic, toggleMute } = useBackgroundMusic();

  return (
    <>
      {showIntro ? (
        <IntroScreen
          onEnter={() => setShowIntro(false)}
          onStartMusic={startMusic}
        />
      ) : (
        <>
          <main className="bg-background">
            <HeroSection
              name1={weddingConfig.hero_name_1}
              name2={weddingConfig.hero_name_2}
            />
            <CountdownSection targetDate={weddingConfig.wedding_date} />
            <WelcomeSection />
            <SectionDivider type="floral" />
            <VenueSection />
            <SectionDivider type="line" />
            <ProgramSection />
            <SectionDivider type="champagne" />
            <DressCodeSection />
            <SectionDivider type="bow" />
            <PreWeddingEventsSection />
            <SectionDivider type="cupid" />
            <TransportSection />
            <SectionDivider type="matchbox" />
            <AccommodationSection />
            <SectionDivider type="locket" />
            <div className="bg-ivory w-full overflow-hidden pb-16 md:pb-20">
              <GalleryMarquee
                images={secondaryGalleryImages}
                positions={secondaryGalleryPositions}
              />
            </div>
            <GiftsSection />
            <SectionDivider type="swans" />
            <RsvpSection />
            <SectionDivider type="rings" />
            <FooterSection
              name1={weddingConfig.couple_name_1}
              name2={weddingConfig.couple_name_2}
              date={weddingConfig.wedding_date}
            />
          </main>
          {isPlaying && (
            <MusicToggle isMuted={isMuted} onToggle={toggleMute} />
          )}
        </>
      )}
    </>
  );
}
