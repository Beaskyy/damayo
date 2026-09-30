"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Quote,
  Send,
  CheckCircle2,
  X,
  MessageSquarePlus,
  PenLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { t } from "@/lib/wedding/content";
import type { WeddingComment } from "@/lib/wedding/comments";

const FALLBACK_COMMENTS: WeddingComment[] = [
  {
    id: "seed-1",
    name: "Uncle Segun & Auntie Bukola",
    message:
      "Wishing you both a lifetime of unending love, joy, and peace. You two are truly made for each other! Congratulations Oyindamola & Ayomide!",
    createdAt: "2026-09-28T14:30:00.000Z",
  },
  {
    id: "seed-2",
    name: "The Adebayo Family",
    message:
      "Congratulations Oyindamola and Ayomide! May your union be abundantly blessed with happiness, good health, fruitfulness, and boundless grace.",
    createdAt: "2026-09-28T16:15:00.000Z",
  },
  {
    id: "seed-3",
    name: "Kemi & Dapo",
    message:
      "So incredibly thrilled to celebrate your special day with you! Here is to the start of the greatest and sweetest adventure together.",
    createdAt: "2026-09-29T10:00:00.000Z",
  },
  {
    id: "seed-4",
    name: "Pastor & Mrs. Olatunji",
    message:
      "May God's unending grace, wisdom, and divine favor guide your beautiful marriage today and through all the years ahead. Huge congratulations!",
    createdAt: "2026-09-29T12:45:00.000Z",
  },
];

function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

export function GuestbookSection() {
  const [comments, setComments] = useState<WeddingComment[]>(FALLBACK_COMMENTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newlyAddedId, setNewlyAddedId] = useState<string | null>(null);
  const [visibleCards, setVisibleCards] = useState(3);
  const [likes, setLikes] = useState<Record<string, number>>({});

  // Form state
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [websiteHoneypot, setWebsiteHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    let mounted = true;
    fetch("/api/comments", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (mounted && Array.isArray(data.comments) && data.comments.length > 0)
          setComments(data.comments);
      })
      .catch(() => {});

    try {
      const stored = localStorage.getItem("damayo_wishes_likes");
      if (stored) setLikes(JSON.parse(stored));
    } catch {}

    return () => {
      mounted = false;
    };
  }, []);

  const total = comments.length;
  const maxIndex = Math.max(0, total - visibleCards);

  const handleNext = useCallback(() => {
    setCurrentIndex((p) => (p >= maxIndex ? 0 : p + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((p) => (p <= 0 ? maxIndex : p - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isHovered || isModalOpen || total <= visibleCards) return;
    const id = setInterval(handleNext, 6000);
    return () => clearInterval(id);
  }, [isHovered, isModalOpen, total, visibleCards, handleNext]);

  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => {
      const updated = { ...prev, [id]: (prev[id] || 0) + 1 };
      try {
        localStorage.setItem("damayo_wishes_likes", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setFormError("Please enter your name.");
    if (!message.trim()) return setFormError("Please write a message.");

    setSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          website: websiteHoneypot,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not post your wish.");
      }

      const data = await res.json();
      const newComment: WeddingComment = data.comment || {
        id: crypto.randomUUID(),
        name: name.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
      };

      setComments((prev) => [newComment, ...prev]);
      setNewlyAddedId(newComment.id);
      setCurrentIndex(0);
      setName("");
      setMessage("");
      setFormSuccess(true);

      setTimeout(() => {
        setFormSuccess(false);
        setIsModalOpen(false);
      }, 3000);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Section ── */}
      <section
        id="guestbook"
        className="section-padding"
        style={{
          backgroundImage: "url(/assets/white-textured-paper-KasY8RAJ.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Header — matches ProgramSection / WelcomeSection pattern */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-7xl text-sage-dark mb-2">
              {t("wishes.title")}
            </h2>
            <p className="text-gold font-body tracking-wide font-medium">
              {t("wishes.subtitle")}
            </p>
            <p className="text-sage-dark/80 font-body text-lg leading-relaxed italic max-w-lg mx-auto mt-6">
              {t("wishes.intro")}
            </p>

            {/* Action button inside the section header so it is directly visible to anyone viewing the guestbook */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-gold/40 text-xs sm:text-sm font-body text-sage-dark shadow-xs">
                <MessageSquarePlus className="w-4 h-4 text-gold" />
                <span className="font-semibold text-sage-dark">
                  {total} {total === 1 ? "Wish" : "Wishes"} Shared
                </span>
              </span>

              <Button
                type="button"
                onClick={() => {
                  setIsModalOpen(true);
                  setFormError(null);
                  setFormSuccess(false);
                }}
                className="inline-flex items-center gap-2 rounded-full px-6 sm:px-8 py-3 text-sm sm:text-base font-body font-medium bg-sage-dark hover:bg-sage-dark/90 text-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <PenLine className="w-4 h-4 text-gold" />
                <span>Leave a Wish for the Couple</span>
              </Button>
            </div>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="relative"
            >
              {total === 0 ? (
                <div className="bg-white/80 backdrop-blur-sm border border-gold/20 rounded-2xl p-12 text-center shadow-lg max-w-md mx-auto">
                  <p className="text-sage-dark/70 font-body text-lg italic">
                    {t("wishes.noWishes")}
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden">
                  <motion.div
                    animate={{ x: `-${currentIndex * (100 / visibleCards)}%` }}
                    transition={{
                      type: "spring" as const,
                      stiffness: 260,
                      damping: 28,
                      mass: 0.8,
                    }}
                    className="flex"
                  >
                    {comments.map((comment) => {
                      const commentLikes = likes[comment.id] || 0;
                      const isNew = comment.id === newlyAddedId;

                      return (
                        <div
                          key={comment.id}
                          style={{
                            flex: `0 0 ${100 / visibleCards}%`,
                            maxWidth: `${100 / visibleCards}%`,
                          }}
                          className="px-2 sm:px-3"
                        >
                          <div
                            className={`h-full min-h-[300px] rounded-2xl bg-white/80 backdrop-blur-sm border shadow-lg p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group ${
                              isNew
                                ? "border-gold ring-1 ring-gold/30"
                                : "border-gold/20"
                            }`}
                          >
                            {/* Top */}
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <Quote className="w-5 h-5 text-gold/60" />
                                <button
                                  type="button"
                                  onClick={(e) => handleLike(comment.id, e)}
                                  className="inline-flex items-center gap-1 text-sage-dark/50 hover:text-sage-dark transition-colors cursor-pointer"
                                >
                                  <Heart
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                      commentLikes > 0
                                        ? "fill-gold text-gold scale-110"
                                        : ""
                                    }`}
                                  />
                                  {commentLikes > 0 && (
                                    <span className="text-xs font-body font-medium text-gold">
                                      {commentLikes}
                                    </span>
                                  )}
                                </button>
                              </div>

                              <p
                                className="font-body text-sage-dark text-base sm:text-lg leading-relaxed italic"
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 6,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                &ldquo;{comment.message}&rdquo;
                              </p>
                            </div>

                            {/* Author */}
                            <div className="pt-4 mt-auto border-t border-gold/20 flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-sage-dark flex items-center justify-center text-white text-xs font-body font-medium flex-shrink-0">
                                {getInitials(comment.name)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-body font-medium text-sm text-sage-dark truncate">
                                  {comment.name}
                                </h4>
                                {comment.createdAt && (
                                  <p className="text-xs text-sage-dark/50 font-body">
                                    {formatDate(comment.createdAt)}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              )}

              {/* Navigation */}
              {total > visibleCards && (
                <div className="flex items-center justify-center gap-6 mt-10">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous"
                    className="w-10 h-10 rounded-full bg-white border border-gold/30 text-sage-dark hover:bg-sage-dark hover:text-white hover:border-sage-dark flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: Math.min(maxIndex + 1, 8) }).map(
                      (_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCurrentIndex(idx)}
                          className={`transition-all duration-300 rounded-full cursor-pointer ${
                            idx === currentIndex
                              ? "w-6 h-2 bg-sage-dark"
                              : "w-2 h-2 bg-gold/40 hover:bg-gold"
                          }`}
                        />
                      )
                    )}
                    {maxIndex + 1 > 8 && (
                      <span className="text-xs text-sage-dark/40 font-body ml-1">
                        +{maxIndex + 1 - 8}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next"
                    className="w-10 h-10 rounded-full bg-white border border-gold/30 text-sage-dark hover:bg-sage-dark hover:text-white hover:border-sage-dark flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Floating Action Button (Always visible on screen at bottom-right) ── */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
        }}
      >
        <motion.button
          type="button"
          onClick={() => {
            setIsModalOpen(true);
            setFormError(null);
            setFormSuccess(false);
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="group relative flex items-center justify-center rounded-full focus:outline-none cursor-pointer select-none"
          style={{ width: "86px", height: "86px" }}
          aria-label="Leave a wish"
        >
          {/* Subtle pulse ring behind button */}
          <div className="absolute -inset-1 rounded-full bg-gold/30 animate-ping opacity-60 pointer-events-none" />

          {/* Backplate */}
          <div className="absolute inset-0 rounded-full bg-white/95 backdrop-blur-md shadow-2xl border-2 border-gold/50 group-hover:border-gold transition-colors" />

          {/* Rotating text with Framer Motion */}
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
            >
              <path
                id="guestbookTextPath"
                d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="none"
              />
              <text
                className="fill-sage-dark font-body font-semibold uppercase"
                style={{ fontSize: "8.5px", letterSpacing: "2.6px" }}
              >
                <textPath href="#guestbookTextPath" startOffset="0%">
                  ✦ LEAVE A WISH ✦ SIGN GUESTBOOK ✦
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Center icon */}
          <div
            className="relative z-10 rounded-full bg-sage-dark text-white flex items-center justify-center shadow-lg group-hover:bg-[#5B1425] transition-colors duration-300"
            style={{ width: "46px", height: "46px" }}
          >
            <MessageSquarePlus className="w-5 h-5" />
          </div>
        </motion.button>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            style={{ position: "fixed", inset: 0, zIndex: 10000 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gold/20 z-10 my-auto"
            >
              {/* Close */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ivory text-sage-dark hover:bg-sage-dark hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {formSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-ivory text-sage-dark flex items-center justify-center mx-auto mb-4 border border-gold/30">
                    <CheckCircle2 className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-display text-4xl text-sage-dark mb-2">
                    {t("wishes.success")}
                  </h3>
                  <p className="text-sage-dark/70 font-body text-sm italic max-w-sm mx-auto">
                    Your wish is now displayed on the guestbook.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-2">
                    <h3 className="font-display text-3xl md:text-4xl text-sage-dark mb-1">
                      {t("wishes.title")}
                    </h3>
                    <p className="text-gold font-body tracking-wide font-medium text-sm">
                      {t("wishes.subtitle")}
                    </p>
                  </div>

                  <div className="w-12 h-px bg-gold/20 mx-auto" />

                  {/* Honeypot */}
                  <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                    <label htmlFor="gb-website">Website</label>
                    <input
                      type="text"
                      id="gb-website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={websiteHoneypot}
                      onChange={(e) => setWebsiteHoneypot(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="wish-name" className="text-sage-dark font-medium text-base">
                      {t("wishes.nameLabel")}
                    </Label>
                    <Input
                      id="wish-name"
                      type="text"
                      placeholder={t("wishes.namePlaceholder")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={70}
                      required
                      className="mt-2 bg-ivory border-[#c5a46d]/30 text-sage-dark"
                    />
                  </div>

                  <div>
                    <Label htmlFor="wish-message" className="text-sage-dark font-medium text-base">
                      {t("wishes.messageLabel")}
                    </Label>
                    <Textarea
                      id="wish-message"
                      placeholder={t("wishes.messagePlaceholder")}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={1000}
                      required
                      className="mt-2 bg-ivory border-[#c5a46d]/30 text-sage-dark min-h-[100px]"
                    />
                    <p className="text-right text-xs text-sage-dark/50 font-body mt-1">
                      {message.length} / 1000
                    </p>
                  </div>

                  {formError && (
                    <p className="text-destructive text-sm font-body">{formError}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-sage-dark hover:bg-sage-dark/90 text-white cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        {t("wishes.sending")}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t("wishes.send")}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
