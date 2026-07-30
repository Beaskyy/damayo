"use client";

import { motion } from "framer-motion";
import { t } from "@/lib/wedding/content";

const preWeddingEvents = [
  {
    title: "Welcome Drinks",
    date: "Friday, September 11th, 2026",
    time: "8:00 PM",
    location: "Bodega García Hidalgo, Ronda",
    illustration: "/assets/sunday-lunch-illustration-Dn7RcvEs.png",
  },
  {
    title: "Farewell Brunch",
    date: "Sunday, September 13th, 2026",
    time: "12:00 PM",
    location: "Parador de Ronda (terrace)",
    illustration: "/assets/teacup-illustration-LM5oRWej.png",
  },
];

export function PreWeddingEventsSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: "#c5a46d" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-white/80">
            Pre-Wedding Events
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-2xl mx-auto mb-6"
        >
          <h2 className="font-display text-4xl md:text-7xl mb-2 text-white">
            {t("info.title")}
          </h2>
          <p className="font-body text-sm leading-relaxed text-white/80">
            {t("info.subtitle")}
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {preWeddingEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg text-center"
            >
              <img
                src={event.illustration}
                alt=""
                className="w-20 h-auto mx-auto mb-3 opacity-90"
              />
              <h3
                className="font-display text-3xl md:text-4xl mb-3"
                style={{ color: "#825f30" }}
              >
                {event.title}
              </h3>
              <div
                className="w-10 h-px mx-auto mb-3"
                style={{ backgroundColor: "rgba(130,95,48,0.2)" }}
              />
              <p
                className="font-body text-sm font-medium tracking-wide mb-1"
                style={{ color: "rgba(130,95,48,0.85)" }}
              >
                {event.date}
              </p>
              <p
                className="font-body text-sm tracking-wide mb-1"
                style={{ color: "rgba(130,95,48,0.7)" }}
              >
                {event.time}
              </p>
              <p
                className="font-body text-sm italic"
                style={{ color: "rgba(130,95,48,0.6)" }}
              >
                {event.location}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const hotels = [
  {
    name: "Parador de Ronda",
    location: "Ronda",
    details: "2 km de la finca",
    phone: "+34 952 877 500",
    email: "ronda@parador.es",
    website: "https://www.parador.es/es/paradores/parador-de-ronda",
    promoCode: null,
  },
  {
    name: "Hotel Catalonia Ronda",
    location: "Ronda",
    details: "1.5 km",
    phone: "+34 952 872 315",
    email: "ronda@hoteles-catalonia.es",
    website: "https://www.cataloniahotels.com/es/hotel/catalonia-ronda",
    promoCode: "BODA2026",
  },
  {
    name: "Hotel Montelirio",
    location: "Ronda",
    details: "Boutique | Sobre el Tajo",
    phone: "+34 952 873 855",
    email: "reservas@hotelmontelirio.com",
    website: "https://www.hotelmontelirio.com",
    promoCode: null,
  },
];

export function AccommodationSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/assets/white-textured-paper-KasY8RAJ.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-4xl md:text-7xl text-sage-dark leading-tight">
            {t("accommodation.title")}
          </h2>
          <p className="text-sage-dark/70 font-body tracking-wide mt-4">
            {t("accommodation.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm border border-gold/20 rounded-2xl p-8 md:p-10 shadow-lg"
        >
          <div className="space-y-0">
            {hotels.map((hotel, index) => (
              <div
                key={hotel.name}
                className="text-center py-6 first:pt-0 last:pb-0"
              >
                {index > 0 && (
                  <div className="w-12 h-px bg-gold/25 mx-auto mb-6" />
                )}
                <h3 className="font-body text-sm md:text-base uppercase tracking-[0.2em] text-sage-dark">
                  {hotel.name}
                </h3>
                <p className="text-sage-dark/60 font-body text-sm italic mt-1">
                  {hotel.location}
                </p>
                <p className="text-sage-dark/50 font-body text-xs tracking-wide mt-1.5">
                  {hotel.details}
                </p>
                <p className="text-sage-dark/50 font-body text-xs tracking-wide mt-0.5">
                  <a
                    href={`tel:${hotel.phone.replace(/\s/g, "")}`}
                    className="underline hover:text-gold transition-colors"
                  >
                    {hotel.phone}
                  </a>
                  {" · "}
                  <a
                    href={`mailto:${hotel.email}`}
                    className="underline hover:text-gold transition-colors"
                  >
                    {hotel.email}
                  </a>
                </p>
                <a
                  href={hotel.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-gold font-body text-xs tracking-wide mt-1.5 underline hover:text-sage-dark transition-colors"
                >
                  Visit Website
                </a>
                {hotel.promoCode && (
                  <p className="text-gold font-body text-xs tracking-wide mt-1 font-medium">
                    Promo Code: {hotel.promoCode}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sage-dark/60 mt-8 font-body text-sm italic"
        >
          {t("accommodation.recommend")}
        </motion.p>
      </div>
    </section>
  );
}
