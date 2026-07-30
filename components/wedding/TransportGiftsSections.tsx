"use client";

import { motion } from "framer-motion";
import { Car, MapPin } from "lucide-react";
import { t } from "@/lib/wedding/content";

export function TransportSection() {
  return (
    <section className="section-padding bg-ivory">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-4xl md:text-7xl text-sage-dark mb-2">
            {t("transport.title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white/80 backdrop-blur-sm border border-gold/20 rounded-2xl p-8 md:p-10 shadow-lg text-center space-y-6">
            <div className="flex flex-col items-center gap-2">
              <MapPin className="w-6 h-6 text-gold" />
              <p className="text-sage-dark font-body text-base leading-relaxed font-medium">
                {t("transport.fullAddress")}
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Finca+El+Olivar+Ronda+Malaga+Spain"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-gold hover:text-sage-dark transition-colors border-b border-gold/40 hover:border-sage-dark pb-0.5"
            >
              Google Maps
            </a>
            <div className="w-12 h-px bg-gold/20 mx-auto" />
            <div className="flex flex-col items-center gap-2">
              <Car className="w-5 h-5 text-gold" />
              <p className="text-sage-dark/70 font-body text-sm leading-relaxed whitespace-pre-line">
                {t("transport.byCarDetails")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function GiftsSection() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/assets/venue-hedsor-front-COdUzTcT.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="relative z-10 px-6 md:px-16 py-10 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg border border-sage/20 p-10 md:p-14 shadow-md max-w-2xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-7xl text-sage-dark mb-6">
              {t("gifts.title")}
            </h2>
            <p className="text-sage-dark/80 font-body text-lg leading-relaxed italic mb-8">
              {t("gifts.text")}
            </p>
            <div className="bg-ivory rounded-lg p-6 mb-4 text-left">
              <h3 className="font-body text-sm uppercase tracking-[0.15em] text-sage-dark font-medium mb-3">
                {t("gifts.account1")}
              </h3>
              <p className="text-sage-dark/70 font-body text-sm whitespace-pre-line leading-relaxed">
                {t("gifts.account1details")}
              </p>
            </div>
            <div className="bg-ivory rounded-lg p-6 text-left">
              <h3 className="font-body text-sm uppercase tracking-[0.15em] text-sage-dark font-medium mb-3">
                {t("gifts.account2")}
              </h3>
              <p className="text-sage-dark/70 font-body text-sm whitespace-pre-line leading-relaxed">
                {t("gifts.account2details")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
