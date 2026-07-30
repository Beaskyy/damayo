"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import { weddingConfig } from "@/lib/wedding/config";
import { t } from "@/lib/wedding/content";
import { formatWeddingDate } from "@/lib/wedding/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Guest = { name: string; email: string; dietaryRequirements: string };

function RsvpConfirmation({
  attendance,
  name1,
  name2,
  weddingDate,
  venueLocation,
}: {
  attendance: string;
  name1: string;
  name2: string;
  weddingDate: string;
  venueLocation: string;
}) {
  const [showMessage, setShowMessage] = useState(false);
  const [fadingVideo, setFadingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const formattedDate = formatWeddingDate(weddingDate);

  useEffect(() => {
    if (attendance === "no") {
      setShowMessage(true);
      setTimeout(() => {
        document
          .getElementById("rsvp-confirmation")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.duration - video.currentTime <= 1.5 && !fadingVideo) {
        setFadingVideo(true);
      }
    };

    const onEnded = () => {
      setShowMessage(true);
      setTimeout(() => {
        document
          .getElementById("rsvp-confirmation")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [attendance, fadingVideo]);

  const addToCalendar = () => {
    const datePart = weddingDate.replace(/-/g, "");
    const title = `Wedding ${name1} & ${name2}`;
    const details = `Wedding of ${name1} and ${name2}`;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${datePart}T140000/${datePart}T235900&location=${encodeURIComponent(venueLocation)}&details=${encodeURIComponent(details)}`;
    window.open(url, "_blank");
  };

  if (attendance === "no") {
    return (
      <section id="rsvp-confirmation" className="section-padding bg-ivory">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          <h2 className="font-display text-4xl md:text-6xl text-sage-dark mb-6">
            {t("confirm.thankYou")}
          </h2>
          <p className="text-sage-dark/80 font-body text-lg leading-relaxed">
            {t("confirm.cantMake")}
          </p>
          <p className="text-sage-dark/60 font-display text-2xl mt-8">
            — {name1} & {name2}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      id="rsvp-confirmation"
      className="min-h-screen bg-ivory flex items-center justify-center relative overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!showMessage ? (
          <motion.div
            key="video"
            initial={{ opacity: 1 }}
            animate={{ opacity: fadingVideo ? 0 : 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-ivory"
          >
            <video
              ref={videoRef}
              src="/assets/rsvp-confirmation-DYbKwzwP.webm"
              className="w-full max-w-lg h-auto"
              playsInline
              muted={false}
            />
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-20"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl text-sage-dark mb-8 text-center leading-relaxed tracking-wide"
            >
              {t("confirm.thankResponse")}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-6 max-w-2xl text-center"
            >
              <p className="text-sage-dark font-body text-lg md:text-xl leading-relaxed">
                {t("confirm.excited")}
              </p>
              <p className="text-sage-dark font-body text-lg md:text-xl leading-relaxed">
                {t("confirm.thankPart")}
              </p>
              <p className="text-sage-dark/90 font-body text-base md:text-lg font-medium mt-4">
                {t("confirm.lookForward")}
              </p>
              <p className="text-sage-dark/80 font-body text-base md:text-lg capitalize">
                {formattedDate}
              </p>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-sage-dark/80 font-display text-3xl md:text-4xl mt-10"
            >
              — {name1} & {name2}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mt-12 flex flex-col items-center gap-4"
            >
              <Button
                onClick={addToCalendar}
                variant="outline"
                className="gap-2 border-sage-dark/30 text-sage-dark hover:bg-sage-dark hover:text-white transition-colors"
              >
                <Calendar className="w-4 h-4" />
                {t("confirm.addCalendar")}
              </Button>
              <p className="text-sage-dark/60 font-body text-sm max-w-md text-center">
                {t("confirm.plansChange")}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function RsvpSection() {
  const [submitted, setSubmitted] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [hasChildren, setHasChildren] = useState("no");
  const [childrenCount, setChildrenCount] = useState(0);
  const [guests, setGuests] = useState<Guest[]>([
    { name: "", email: "", dietaryRequirements: "" },
  ]);
  const [form, setForm] = useState({
    attendance: "yes",
    message: "",
    website: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateGuestCount = (count: number) => {
    setGuestCount(count);
    setGuests((prev) => {
      const next = [...prev];
      while (next.length < count) {
        next.push({ name: "", email: "", dietaryRequirements: "" });
      }
      return next.slice(0, count);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    const names = guests.map((g) => g.name).filter((n) => n.trim());
    const dietary = guests
      .map((g, i) =>
        g.dietaryRequirements.trim()
          ? `${g.name || `Guest ${i + 1}`}: ${g.dietaryRequirements.trim()}`
          : null
      )
      .filter(Boolean)
      .join(" | ");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: names.join(", ") || guests[0]?.name || "Guest",
          email: guests[0]?.email,
          attendance: form.attendance,
          guest_count: guestCount,
          adult_count: guestCount,
          children_count: hasChildren === "yes" ? childrenCount : 0,
          dietary_requirements: dietary || undefined,
          message: form.message || undefined,
          website: form.website,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || t("rsvp.error"));
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("rsvp.error"));
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <RsvpConfirmation
        attendance={form.attendance}
        name1={weddingConfig.couple_name_1}
        name2={weddingConfig.couple_name_2}
        weddingDate={weddingConfig.wedding_date}
        venueLocation={weddingConfig.venue_location}
      />
    );
  }

  return (
    <section id="rsvp" className="section-padding" style={{ backgroundColor: "#c5a46d" }}>
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-7xl text-white mb-2">
            {t("rsvp.title")}
          </h2>
          <p
            className="font-body tracking-wide font-medium"
            style={{ color: "#f9f7f2" }}
          >
            {t("rsvp.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl p-6 md:p-8 shadow-sm relative"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div
              className="absolute -left-[9999px] opacity-0"
              aria-hidden="true"
            >
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
            </div>

            <div>
              <Label className="text-sage-dark font-medium text-base">
                {t("rsvp.attend")}
              </Label>
              <RadioGroup
                value={form.attendance}
                onValueChange={(v) => setForm({ ...form, attendance: v })}
                className="flex flex-col gap-3 mt-3"
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem
                    value="yes"
                    id="yes"
                    className="border-[#c5a46d] text-[#c5a46d] mt-0.5"
                  />
                  <Label
                    htmlFor="yes"
                    className="cursor-pointer text-sage-dark leading-tight"
                  >
                    {t("rsvp.yes")}
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem
                    value="no"
                    id="no"
                    className="border-[#c5a46d] text-[#c5a46d] mt-0.5"
                  />
                  <Label
                    htmlFor="no"
                    className="cursor-pointer text-sage-dark leading-tight"
                  >
                    {t("rsvp.no")}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {form.attendance === "no" ? (
              <div>
                <Label htmlFor="name-decline" className="text-sage-dark font-medium">
                  {t("rsvp.fullName")}
                </Label>
                <Input
                  id="name-decline"
                  required
                  value={guests[0]?.name || ""}
                  onChange={(e) => {
                    const next = [...guests];
                    next[0] = { ...next[0], name: e.target.value };
                    setGuests(next);
                  }}
                  className="mt-2 bg-ivory border-[#c5a46d]/30 text-sage-dark placeholder:text-sage-dark/50 focus:border-[#c5a46d]"
                  placeholder={t("rsvp.enterName")}
                />
              </div>
            ) : (
              <>
                <div>
                  <Label className="text-sage-dark font-medium">
                    {t("rsvp.howMany")}
                  </Label>
                  <Select
                    value={String(guestCount)}
                    onValueChange={(v) => updateGuestCount(Number(v))}
                  >
                    <SelectTrigger className="mt-2 bg-ivory border-[#c5a46d]/30 text-sage-dark">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {guests.map((guest, index) => (
                  <div key={index} className="space-y-4 border rounded-lg p-4 bg-muted/20">
                    <p className="font-body text-sm font-medium text-sage-dark">
                      {index === 0
                        ? t("rsvp.person1")
                        : `${t("rsvp.personN")} ${index + 1}`}
                    </p>
                    <div>
                      <Label className="text-sage-dark">{t("rsvp.name")}</Label>
                      <Input
                        required={index === 0}
                        value={guest.name}
                        onChange={(e) => {
                          const next = [...guests];
                          next[index] = { ...next[index], name: e.target.value };
                          setGuests(next);
                        }}
                        className="mt-1 bg-ivory border-[#c5a46d]/30 text-sage-dark"
                      />
                    </div>
                    {index === 0 && (
                      <div>
                        <Label className="text-sage-dark">{t("rsvp.email")}</Label>
                        <Input
                          type="email"
                          value={guest.email}
                          onChange={(e) => {
                            const next = [...guests];
                            next[index] = { ...next[index], email: e.target.value };
                            setGuests(next);
                          }}
                          className="mt-1 bg-ivory border-[#c5a46d]/30 text-sage-dark"
                        />
                      </div>
                    )}
                    <div>
                      <Label className="text-sage-dark">{t("rsvp.dietary")}</Label>
                      <Input
                        value={guest.dietaryRequirements}
                        onChange={(e) => {
                          const next = [...guests];
                          next[index] = {
                            ...next[index],
                            dietaryRequirements: e.target.value,
                          };
                          setGuests(next);
                        }}
                        placeholder={t("rsvp.dietaryPlaceholder")}
                        className="mt-1 bg-ivory border-[#c5a46d]/30 text-sage-dark"
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <Label className="text-sage-dark font-medium">
                    {t("rsvp.childrenQuestion")}
                  </Label>
                  <RadioGroup
                    value={hasChildren}
                    onValueChange={setHasChildren}
                    className="flex gap-4 mt-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="yes"
                        id="children-yes"
                        className="border-[#c5a46d] text-[#c5a46d]"
                      />
                      <Label htmlFor="children-yes" className="cursor-pointer text-sage-dark">
                        {t("rsvp.childrenYes")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="no"
                        id="children-no"
                        className="border-[#c5a46d] text-[#c5a46d]"
                      />
                      <Label htmlFor="children-no" className="cursor-pointer text-sage-dark">
                        {t("rsvp.childrenNo")}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {hasChildren === "yes" && (
                  <div>
                    <Label className="text-sage-dark font-medium">
                      {t("rsvp.childrenCount")}
                    </Label>
                    <Select
                      value={String(childrenCount)}
                      onValueChange={(v) => setChildrenCount(Number(v))}
                    >
                      <SelectTrigger className="mt-2 bg-ivory border-[#c5a46d]/30 text-sage-dark">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
            )}

            <div>
              <Label className="text-sage-dark font-medium">{t("rsvp.message")}</Label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t("rsvp.messagePlaceholder")}
                className="mt-2 bg-ivory border-[#c5a46d]/30 text-sage-dark min-h-[80px]"
              />
            </div>

            {error && (
              <p className="text-destructive text-sm font-body">{error}</p>
            )}

            <Button
              type="submit"
              disabled={sending}
              className="w-full bg-sage-dark hover:bg-sage-dark/90 text-white"
            >
              {sending ? t("rsvp.sending") : t("rsvp.send")}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
