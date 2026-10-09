"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { Language } from "@/lib/translations";
import { getTranslation } from "@/lib/translations";
import type { TranslationSet } from "@/lib/translations";

const STORAGE_KEY = "cv-language";

function loadSavedLanguage(): Language | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "id") return saved;
  } catch {
    /* noop */
  }
  return null;
}

function saveLanguage(lang: Language) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* noop */
  }
}

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: TranslationSet;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const initialLanguage = loadSavedLanguage() ?? "en";

    // The server and first client render stay in English to avoid a hydration
    // mismatch; an explicitly saved choice is applied after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLang(initialLanguage);
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "id" : "en";
      saveLanguage(next);
      return next;
    });
  }, []);

  const t = getTranslation(lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
