"use client";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { techIcons } from "./techIcons";

export const WHATSAPP_NUMBER = "923420757848"; // 0342 0757848, international format for wa.me
const MESSAGE = "Hi Afshal, I found your portfolio and would like to discuss a project.";

/** Floating WhatsApp button, bottom-right on every page. */
export default function WhatsAppFloat() {
  const reduce = useReducedMotion();
  const [tip, setTip] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setTip(true), 6000);
    const h = setTimeout(() => setTip(false), 12000);
    return () => { clearTimeout(t); clearTimeout(h); };
  }, []);
  const wa = techIcons.whatsapp;

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 md:bottom-7 md:right-7">
      <motion.span
        className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-xl sm:block"
        initial={false}
        animate={{ opacity: tip ? 1 : 0, x: tip ? 0 : 12 }}
        transition={{ duration: 0.3 }}
        aria-hidden
      >
        Chat on WhatsApp
      </motion.span>
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Afshal on WhatsApp (0342 0757848)"
        onPointerEnter={() => setTip(true)}
        onPointerLeave={() => setTip(false)}
        className="relative grid h-14 w-14 place-items-center rounded-full shadow-[0_12px_32px_rgba(37,211,102,.45)] md:h-16 md:w-16"
        style={{ background: wa.hex }}
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.2 }}
        whileHover={reduce ? undefined : { scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        {!reduce && <span aria-hidden className="absolute inset-0 animate-ping rounded-full opacity-30" style={{ background: wa.hex, animationDuration: "2.4s" }} />}
        <svg viewBox="0 0 24 24" className="relative h-7 w-7 md:h-8 md:w-8" fill="#fff" aria-hidden><path d={wa.path} /></svg>
      </motion.a>
    </div>
  );
}
