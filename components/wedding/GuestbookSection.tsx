"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Quote,
  Send,
  Sparkles,
  CheckCircle2,
  PenLine,
  X,
  MessageCircleHeart,
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

const QUICK_BLESSINGS = [
  "Wishing you endless joy & peace! 🥂",
  "May God richly bless your holy union! 🙏",
  "Happy Married Life Oyindamola & Ayomide! 💍",
  "Here is to a beautiful forever together! ✨",
  "So thrilled and happy for you both! 💕",
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

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
}

export function GuestbookSection() {
  const [comments, setComments] = useState<WeddingComment[]>(FALLBACK_COMMENTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newlyAddedId, setNewlyAddedId] = useState<string | null>(null);

  // Responsive cards per view
  const [visibleCards, setVisibleCards] = useState(3);

  // Likes / reactions map (stored in localStorage for delight)
  const [likes, setLikes] = useState<Record<string, number>>({});

  // Form state
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [websiteHoneypot, setWebsiteHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Confetti animation state
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  // Calculate cards per view on resize
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  // Fetch comments on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchComments() {
      try {
        const res = await fetch("/api/comments");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data.comments) && data.comments.length > 0) {
            setComments(data.comments);
          }
        }
      } catch (err) {
        console.error("Failed to load wishes:", err);
      }
    }
    fetchComments();

    // Load stored likes
    try {
      const storedLikes = localStorage.getItem("damayo_wishes_likes");
      if (storedLikes) setLikes(JSON.parse(storedLikes));
    } catch {}

    return () => {
      isMounted = false;
    };
  }, []);

  const total = comments.length;
  const maxIndex = Math.max(0, total - visibleCards);

  // Carousel navigation
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay
  useEffect(() => {
    if (isHovered || isFormOpen || total <= visibleCards) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(interval);
  }, [isHovered, isFormOpen, total, visibleCards, handleNext]);

  // Touch Swipe Handling
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => {
      const current = prev[id] || 0;
      const updated = { ...prev, [id]: current + 1 };
      try {
        localStorage.setItem("damayo_wishes_likes", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const triggerConfetti = () => {
    const colors = ["#5B1425", "#c5a46d", "#f7ecd2", "#b33951", "#ffffff"];
    const pieces: ConfettiPiece[] = Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 400,
      y: -Math.random() * 260 - 40,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.7 + 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 2600);
  };

  const handleQuickBlessing = (phrase: string) => {
    setMessage((prev) => {
      if (!prev.trim()) return phrase;
      return `${prev} ${phrase}`;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!message.trim()) {
      setFormError("Please write a message or blessing.");
      return;
    }

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

      // Optimistic update & immediately show the new wish at index 0
      setComments((prev) => [newComment, ...prev]);
      setNewlyAddedId(newComment.id);
      setCurrentIndex(0);
      setName("");
      setMessage("");
      setFormSuccess(true);
      triggerConfetti();

      setTimeout(() => {
        setFormSuccess(false);
        setIsFormOpen(false);
      }, 3500);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="guestbook"
      className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{
        backgroundImage: "url(/assets/white-textured-paper-KasY8RAJ.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative ambient corner flourishes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#c5a46d]/40 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5B1425]/5 border border-[#c5a46d]/40 mb-3 shadow-[0_2px_8px_rgba(91,20,37,0.04)]">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a46d]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-body text-[#5B1425] font-semibold">
              {t("wishes.subtitle")}
            </span>
          </div>

          {/* Majestic Script Title */}
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-sage-dark mb-3 tracking-normal">
            {t("wishes.title")}
          </h2>

          <p className="text-sage-dark/80 font-body text-sm md:text-base max-w-xl mx-auto leading-relaxed px-4">
            {t("wishes.intro")}
          </p>

          {/* Stats & Action Bar */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#c5a46d]/30 text-xs font-body text-sage-dark/70 shadow-xs">
              <MessageCircleHeart className="w-3.5 h-3.5 text-[#5B1425]" />
              <span className="font-medium text-sage-dark">
                {total} {total === 1 ? "blessing" : "blessings"} shared
              </span>
            </span>

            <Button
              type="button"
              onClick={() => {
                setIsFormOpen((prev) => !prev);
                setFormError(null);
              }}
              className="group inline-flex items-center gap-2 rounded-full px-5 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-body font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              style={{
                backgroundColor: isFormOpen ? "#5B1425" : "#ffffff",
                color: isFormOpen ? "#ffffff" : "#5B1425",
                border: "1px solid rgba(197, 164, 109, 0.5)",
              }}
            >
              {isFormOpen ? (
                <>
                  <X className="w-4 h-4 text-[#c5a46d]" />
                  <span>Close Wish Form</span>
                </>
              ) : (
                <>
                  <PenLine className="w-4 h-4 text-[#c5a46d] group-hover:rotate-12 transition-transform duration-200" />
                  <span>Leave a Wish for the Couple</span>
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Collapsible Wish Form Card */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.97 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mb-12"
            >
              <div className="max-w-xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-[#c5a46d]/40 relative">
                {/* Gold accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c5a46d]/20 via-[#5B1425] to-[#c5a46d]/20" />

                {/* Confetti Container */}
                {confetti.length > 0 && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-30">
                    {confetti.map((piece) => (
                      <motion.div
                        key={piece.id}
                        initial={{ opacity: 1, x: 0, y: 0, scale: piece.scale, rotate: 0 }}
                        animate={{
                          opacity: 0,
                          x: piece.x,
                          y: piece.y,
                          rotate: piece.rotation,
                        }}
                        transition={{ duration: 1.8, ease: "easeOut" }}
                        className="absolute w-2.5 h-2.5 rounded-sm"
                        style={{ backgroundColor: piece.color }}
                      />
                    ))}
                  </div>
                )}

                {formSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-200 shadow-xs">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-4xl text-sage-dark mb-1">
                      {t("wishes.success")}
                    </h3>
                    <p className="text-sage-dark/70 text-sm font-body max-w-sm mx-auto">
                      Your warm wish has been added to the guestbook and is now displayed below!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot field for bot protection */}
                    <div
                      className="absolute -left-[9999px] opacity-0"
                      aria-hidden="true"
                    >
                      <label htmlFor="guestbook-website">Website</label>
                      <input
                        type="text"
                        id="guestbook-website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={websiteHoneypot}
                        onChange={(e) => setWebsiteHoneypot(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="wish-name"
                        className="text-sage-dark font-medium text-sm flex items-center justify-between"
                      >
                        <span>{t("wishes.nameLabel")}</span>
                      </Label>
                      <Input
                        id="wish-name"
                        type="text"
                        placeholder={t("wishes.namePlaceholder")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={70}
                        required
                        className="mt-1.5 bg-ivory border-[#c5a46d]/40 text-sage-dark focus-visible:ring-[#5B1425] text-sm md:text-base py-2.5"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="wish-message"
                        className="text-sage-dark font-medium text-sm"
                      >
                        {t("wishes.messageLabel")}
                      </Label>

                      {/* Quick Blessing Prompts */}
                      <div className="mt-2 mb-2 flex flex-wrap gap-1.5">
                        <span className="text-[11px] text-[#5B1425] font-semibold uppercase tracking-wider flex items-center mr-1">
                          Quick Inspiration:
                        </span>
                        {QUICK_BLESSINGS.map((phrase) => (
                          <button
                            key={phrase}
                            type="button"
                            onClick={() => handleQuickBlessing(phrase)}
                            className="text-[11px] font-body bg-ivory hover:bg-[#5B1425] hover:text-white text-sage-dark/80 px-2.5 py-1 rounded-full border border-[#c5a46d]/30 transition-all duration-200 cursor-pointer active:scale-95"
                          >
                            {phrase}
                          </button>
                        ))}
                      </div>

                      <Textarea
                        id="wish-message"
                        placeholder={t("wishes.messagePlaceholder")}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={1000}
                        required
                        className="bg-ivory border-[#c5a46d]/40 text-sage-dark min-h-[110px] focus-visible:ring-[#5B1425] text-sm md:text-base"
                      />
                      <div className="flex justify-between items-center mt-1 text-[11px] text-sage-dark/50">
                        <span>Max 1,000 characters</span>
                        <span>{message.length} / 1000</span>
                      </div>
                    </div>

                    {formError && (
                      <p className="text-destructive text-sm font-body">{formError}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full text-white font-body text-sm py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
                      style={{ backgroundColor: "#5B1425" }}
                    >
                      {submitting ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1" />
                          <span>{t("wishes.sending")}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#c5a46d]" />
                          <span className="font-semibold">{t("wishes.send")}</span>
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Carousel Showcase Container */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative"
        >
          {total === 0 ? (
            <div className="bg-white/80 rounded-2xl p-12 text-center border border-[#c5a46d]/20 max-w-md mx-auto">
              <p className="text-sage-dark/70 font-body">{t("wishes.noWishes")}</p>
            </div>
          ) : (
            <div className="overflow-hidden py-3">
              {/* Sliding Track */}
              <motion.div
                animate={{
                  x: `-${currentIndex * (100 / visibleCards)}%`,
                }}
                transition={{
                  type: "spring",
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
                      className="px-2.5 sm:px-3"
                    >
                      <div
                        className={`h-full min-h-[300px] sm:min-h-[320px] rounded-2xl bg-white/95 backdrop-blur-sm border transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 relative shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(91,20,37,0.08)] hover:-translate-y-1 group ${
                          isNew
                            ? "border-[#5B1425] ring-2 ring-[#c5a46d]/40"
                            : "border-[#c5a46d]/30 hover:border-[#c5a46d]/70"
                        }`}
                      >
                        {/* Decorative Top Accent Line */}
                        <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#c5a46d]/40 to-transparent group-hover:via-[#5B1425]/60 transition-all duration-300" />

                        {/* Top Metadata Row */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-1.5">
                              <Quote className="w-5 h-5 text-[#c5a46d]/70 flex-shrink-0" />
                              {isNew ? (
                                <span className="text-[10px] uppercase tracking-wider font-semibold font-body bg-[#5B1425] text-white px-2 py-0.5 rounded-full">
                                  New Wish
                                </span>
                              ) : (
                                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold font-body text-[#c5a46d]">
                                  Blessing
                                </span>
                              )}
                            </div>

                            {/* Like / Heart Reaction */}
                            <button
                              type="button"
                              onClick={(e) => handleLike(comment.id, e)}
                              title="Send love to this wish"
                              className="inline-flex items-center gap-1 text-xs font-body text-sage-dark/60 hover:text-[#5B1425] transition-colors p-1 rounded-full hover:bg-ivory cursor-pointer active:scale-125"
                            >
                              <Heart
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  commentLikes > 0
                                    ? "fill-[#5B1425] text-[#5B1425] scale-110"
                                    : "text-sage-dark/40"
                                }`}
                              />
                              {commentLikes > 0 && (
                                <span className="text-[11px] font-medium text-[#5B1425]">
                                  {commentLikes}
                                </span>
                              )}
                            </button>
                          </div>

                          {/* Message Body */}
                          <p className="font-serif text-base sm:text-lg text-sage-dark/90 leading-relaxed italic line-clamp-6">
                            &ldquo;{comment.message}&rdquo;
                          </p>
                        </div>

                        {/* Bottom Author Section */}
                        <div className="pt-4 mt-4 border-t border-[#c5a46d]/20 flex items-center gap-3">
                          {/* Monogram Seal */}
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-xs text-white shadow-xs border border-[#c5a46d]/40 flex-shrink-0"
                            style={{
                              backgroundColor: "#5B1425",
                            }}
                          >
                            {getInitials(comment.name)}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h4 className="font-body font-semibold text-sm sm:text-base text-sage-dark truncate group-hover:text-[#5B1425] transition-colors">
                              {comment.name}
                            </h4>
                            {comment.createdAt && (
                              <p className="text-[11px] text-sage-dark/50 font-body">
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

          {/* Carousel Controls */}
          {total > visibleCards && (
            <div className="flex items-center justify-between mt-8 px-2 max-w-sm mx-auto">
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous wishes"
                className="w-10 h-10 rounded-full bg-white border border-[#c5a46d]/40 text-sage-dark hover:bg-[#5B1425] hover:text-white hover:border-[#5B1425] flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5 px-3">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      idx === currentIndex
                        ? "w-6 h-2 bg-[#5B1425]"
                        : "w-2 h-2 bg-[#c5a46d]/40 hover:bg-[#c5a46d]"
                    }`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next wishes"
                className="w-10 h-10 rounded-full bg-white border border-[#c5a46d]/40 text-sage-dark hover:bg-[#5B1425] hover:text-white hover:border-[#5B1425] flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
