"use client";
import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import ContactForm from "./ContactForm";

const Ctx = createContext<{ open: (topic?: string) => void }>({ open: () => {} });
export const useContact = () => useContext(Ctx);

/** Site-wide contact popup. Any button can call useContact().open("Website fix"). */
export function ContactProvider({ children }: { children: ReactNode }) {
  const [topic, setTopic] = useState<string | null>(null);
  const open = useCallback((t?: string) => setTopic(t ?? ""), []);
  const close = () => setTopic(null);

  useEffect(() => {
    if (topic === null) return;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    addEventListener("keydown", k);
    return () => { removeEventListener("keydown", k); window.__lenis?.start(); document.body.style.overflow = ""; };
  }, [topic]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {topic !== null && (
          <motion.div
            className="fixed inset-0 z-[75] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm md:items-center md:p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              role="dialog" aria-modal="true" aria-label="Contact Afshal"
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-[28px] border border-white/10 bg-[#0c0c12] p-6 shadow-[0_40px_120px_rgba(0,0,0,.6)] md:rounded-[28px] md:p-10"
              initial={{ y: 60, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <button onClick={close} autoFocus className="absolute right-4 top-4 rounded-full border border-white/15 px-3 py-1.5 text-xs text-mute transition-colors hover:text-ink">Close</button>
              <div className="label">Let&apos;s talk</div>
              <h2 className="display mt-3 text-4xl md:text-5xl">Tell me about your project.</h2>
              <div className="mt-8"><ContactForm defaultService={topic || undefined} compact /></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

/** A button that opens the contact popup. */
export function ContactButton({ children, topic, className = "" }: { children: ReactNode; topic?: string; className?: string }) {
  const { open } = useContact();
  return <button type="button" onClick={() => open(topic)} className={className}>{children}</button>;
}
