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

function detectBrowserLanguage(): Language {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language || "";
  return lang.startsWith("id") ? "id" : "en";
}

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
    const saved = loadSavedLanguage();
    if (saved) {
      setLang(saved);
    } else {
      setLang(detectBrowserLanguage());
    }
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
