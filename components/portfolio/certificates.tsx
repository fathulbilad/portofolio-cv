"use client";

import Image from "next/image";
import { Dialog } from "radix-ui";
import { ArrowUpRight, BadgeCheck, X, ZoomIn, ZoomOut } from "lucide-react";
import { useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { useLanguage } from "@/contexts/language-context";
import { certificates, ui, type Certificate } from "@/lib/portfolio";

type PreviewCertificate = Certificate & { image: string };
const previews = certificates.filter((certificate): certificate is PreviewCertificate => typeof certificate.image === "string");

export function CertificateGallery() {
  const { lang } = useLanguage();
  const [active, setActive] = useState<PreviewCertificate | null>(null);
  const [lastActive, setLastActive] = useState<PreviewCertificate | null>(null);
  if (active && active !== lastActive) setLastActive(active);
  const shown = active ?? lastActive;
  const [zoomed, setZoomed] = useState(false);
  const fan = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const viewerId = useId();
  const copy = ui[lang];

  useLayoutEffect(() => {
    if (!fan.current) return;
    const media = gsap.matchMedia(fan.current);
    media.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)", motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
      const cards = gsap.utils.toArray<HTMLButtonElement>(".certificate-fan-card", fan.current);
      const spread = context.conditions?.desktop ? 75 : 35;
      const rotation = context.conditions?.desktop ? 10 : 5;
      gsap.set(cards, { x: (index) => (index - (cards.length - 1) / 2) * spread, rotation: (index) => (index - (cards.length - 1) / 2) * rotation });
      if (context.conditions?.motion) gsap.fromTo(cards,
        { scale: 0, opacity: 0, y: 80 },
        { scale: 1, opacity: 1, y: 0, stagger: 0.08, delay: 0.5, duration: 1, ease: "elastic.out(1, 0.5)" });
    });
    return () => media.revert();
  }, []);

  function spreadCards(hovered: number | null) {
    if (!window.matchMedia("(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    const cards = gsap.utils.toArray<HTMLButtonElement>(".certificate-fan-card", fan.current);
    cards.forEach((card, index) => {
      const offset = index - (cards.length - 1) / 2;
      const selected = index === hovered;
      gsap.to(card, {
        x: offset * 75 + (hovered === null || selected ? 0 : index < hovered ? -40 : 40),
        rotation: selected ? 0 : offset * 10, y: selected ? -20 : 0,
        scale: hovered === null ? 1 : selected ? 1.08 : 0.95,
        duration: hovered === null ? 0.4 : 0.35, ease: "power3.out", overwrite: "auto",
      });
    });
  }

  function show(certificate: Certificate, button: HTMLButtonElement) {
    if (!certificate.image) return;
    opener.current = button;
    setZoomed(false);
    setActive({ ...certificate, image: certificate.image });
  }

  return (
    <Dialog.Root open={!!active} onOpenChange={(open) => { if (!open) setActive(null); }}>
      <div className="certificate-fan" ref={fan} onPointerLeave={() => spreadCards(null)}>
        {previews.map((certificate, index) => <button key={certificate.name} type="button"
          className="certificate-fan-card" style={{ "--fan-offset": index - (previews.length - 1) / 2 } as CSSProperties}
          aria-label={`${copy.preview}: ${certificate.name}`} aria-haspopup="dialog"
          onPointerEnter={() => spreadCards(index)} onFocus={() => spreadCards(index)} onBlur={() => spreadCards(null)}
          onClick={(event) => show(certificate, event.currentTarget)}>
          <Image src={certificate.image} alt="" width={180} height={180} unoptimized />
        </button>)}
      </div>
      <div className="certificate-list">
        {certificates.map((certificate) => <article className="certificate-row" key={certificate.name}>
          <BadgeCheck size={24} strokeWidth={1.6} /><div><p className="eyebrow">{certificate.issuer} · {certificate.year}</p><h2>{certificate.name}</h2>
            {certificate.image ? <button type="button" className="text-link certificate-trigger" aria-haspopup="dialog"
              onClick={(event) => show(certificate, event.currentTarget)}>{copy.preview}<ArrowUpRight size={15} /></button>
              : <p className="small-note">{copy.certificateUnavailable}</p>}
          </div>
        </article>)}
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="certificate-overlay certificate-preview-overlay" />
        <Dialog.Content id={viewerId} className="certificate-viewer" aria-describedby={undefined}
          onCloseAutoFocus={(event) => { event.preventDefault(); opener.current?.focus({ preventScroll: true }); }}>
          {shown && <>
            <div className="certificate-toolbar"><Dialog.Title>{shown.name}</Dialog.Title><Dialog.Close className="icon-button" aria-label={copy.close}><X size={21} /></Dialog.Close></div>
            <div className={`certificate-image-scroll ${zoomed ? "is-zoomed" : ""}`}><Image src={shown.image} alt={`${shown.issuer} ${shown.name}, ${shown.year}`} width={shown.width ?? 350} height={shown.height ?? 350} unoptimized /></div>
            <div className="certificate-controls"><button type="button" className="button" onClick={() => setZoomed(!zoomed)}>{zoomed ? <ZoomOut size={17} /> : <ZoomIn size={17} />}{zoomed ? copy.zoomOut : copy.zoom}</button><a className="text-link" href={shown.pdf ?? shown.image} target="_blank" rel="noopener noreferrer">{shown.pdf ? (lang === "en" ? "Open original PDF" : "Buka PDF asli") : copy.original}<ArrowUpRight size={16} /></a></div>
          </>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
