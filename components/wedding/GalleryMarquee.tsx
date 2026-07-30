"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface GalleryMarqueeProps {
  images: string[];
  positions: string[];
}

export function GalleryMarquee({ images, positions }: GalleryMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handlePause = () => {
      const el = ref.current;
      if (!el) return;
      el.style.animationPlayState = "paused";
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (ref.current) ref.current.style.animationPlayState = "running";
      }, 100);
    };

    window.addEventListener("resize", handlePause);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) handlePause();
    });

    return () => {
      window.removeEventListener("resize", handlePause);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flex animate-marquee gap-3 md:gap-4"
      style={{ width: "max-content" }}
    >
      {[...images, ...images].map((src, index) => (
        <div
          key={`${src}-${index}`}
          className="flex-shrink-0 overflow-hidden"
          style={{ height: "340px", width: "240px" }}
        >
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: positions[index % positions.length] }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

export function SectionDivider({
  type,
}: {
  type: "line" | "floral" | "champagne" | "bow" | "cupid" | "matchbox" | "locket" | "swans" | "rings";
}) {
  const imageMap = {
    floral: "/assets/floral-vase-6x28LN74.png",
    champagne: "/assets/champagne-tower-Or6MBjHQ.png",
    bow: "/assets/bow-illustration-DWFdIPv5.png",
    cupid: "/assets/cupid-illustration-BO3_EWaD.png",
    matchbox: "/assets/matchbox-illustration-Cje_YC4u.png",
    locket: "/assets/locket-illustration-B7vFK6H-.png",
    swans: "/assets/swans-framed-ByH4RE7t.png",
    rings: "/assets/wedding-rings-_6IG5mf0.png",
  };

  if (type === "line") {
    return (
      <div className="bg-ivory flex justify-center py-16 md:py-20">
        <div className="w-24 h-px bg-sage-dark/20" />
      </div>
    );
  }

  const sizeClass =
    type === "bow"
      ? "w-16 md:w-20"
      : type === "champagne" || type === "swans"
        ? "w-32 md:w-40"
        : "w-24 md:w-32";

  const wrapperClass =
    type === "floral"
      ? "bg-ivory flex flex-col items-center py-16 md:py-20"
      : type === "bow"
        ? "bg-ivory flex flex-col items-center py-16 md:py-20"
        : type === "swans"
          ? "bg-ivory flex justify-center py-10 md:py-14"
          : "bg-ivory flex justify-center py-16 md:py-20";

  return (
    <div className={wrapperClass}>
      {type === "floral" && <div className="w-24 h-px bg-sage-dark/20 mb-10" />}
      <img
        src={imageMap[type]}
        alt=""
        className={`${sizeClass} h-auto opacity-80`}
      />
    </div>
  );
}
