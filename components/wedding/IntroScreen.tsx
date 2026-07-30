"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface IntroScreenProps {
  onEnter: () => void;
  onStartMusic?: () => void;
}

export function IntroScreen({ onEnter, onStartMusic }: IntroScreenProps) {
  const [phase, setPhase] = useState<"idle" | "playing" | "fading">("idle");
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("playing");
    onStartMusic?.();
    const playPromise = videoRef.current?.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.currentTime > 0.05 && !showVideo) {
      setShowVideo(true);
    }

    if (video.duration - video.currentTime <= 0.8 && phase === "playing") {
      setPhase("fading");
      setTimeout(() => {
        onEnter();
      }, 800);
    }
  };

  const videoVisible = phase !== "idle" && showVideo;

  return (
    <motion.div
      className="fixed inset-0 z-50 cursor-pointer bg-white"
      onClick={handleClick}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "fading" ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <img
        src="/assets/intro-poster-new-BU7qGwfU.jpg"
        alt=""
        className={`absolute inset-0 w-full h-full object-cover ${videoVisible ? "opacity-0" : "opacity-100"}`}
        style={{ transition: "opacity 50ms ease-out" }}
        draggable={false}
      />
      <video
        ref={videoRef}
        src="/assets/intro-video-new-XmwQeafK.mp4"
        poster="/assets/intro-poster-new-BU7qGwfU.jpg"
        className={`absolute inset-0 w-full h-full object-cover ${videoVisible ? "opacity-100" : "opacity-0"}`}
        style={{ transition: "opacity 50ms ease-out" }}
        onTimeUpdate={handleTimeUpdate}
        playsInline
        muted
        preload="auto"
      />
    </motion.div>
  );
}

export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/assets/wedding-background-music-yxy0nS2O.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    setIsPlaying(!audio.paused);
    setIsMuted(audio.muted);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
    };
  }, []);

  const startMusic = useCallback(() => {
    if (audioRef.current && !startedRef.current) {
      startedRef.current = true;
      const playPromise = audioRef.current.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  }, []);

  return { isMuted, isPlaying, startMusic, toggleMute };
}
