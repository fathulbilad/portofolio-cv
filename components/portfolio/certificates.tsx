"use client";

import Image from "next/image";
import { Dialog } from "radix-ui";
import { ArrowUpRight, BadgeCheck, X, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { certificates, ui } from "@/lib/portfolio";

export function CertificateGallery() {
  const { lang } = useLanguage();
  const [zoomed, setZoomed] = useState(false);
  const copy = ui[lang];
  return (
    <div className="certificate-list">
      {certificates.map((certificate) => <article className="certificate-row" key={certificate.name}>
        <BadgeCheck size={24} strokeWidth={1.6} /><div><p className="eyebrow">{certificate.issuer} · {certificate.year}</p><h2>{certificate.name}</h2>
          {certificate.image ? <Dialog.Root onOpenChange={() => setZoomed(false)}>
            <Dialog.Trigger className="text-link certificate-trigger">{copy.preview}<ArrowUpRight size={15} /></Dialog.Trigger>
            <Dialog.Portal><Dialog.Overlay className="certificate-overlay" /><Dialog.Content className="certificate-viewer" aria-describedby={undefined}>
              <div className="certificate-toolbar"><Dialog.Title>{certificate.name}</Dialog.Title><Dialog.Close className="icon-button" aria-label={copy.close}><X size={21} /></Dialog.Close></div>
              <div className={`certificate-image-scroll ${zoomed ? "is-zoomed" : ""}`}><Image src={certificate.image} alt={`${certificate.issuer} ${certificate.name}, ${certificate.year}`} width={350} height={350} unoptimized /></div>
              <div className="certificate-controls"><button type="button" className="button" onClick={() => setZoomed(!zoomed)}>{zoomed ? <ZoomOut size={17} /> : <ZoomIn size={17} />}{zoomed ? copy.zoomOut : copy.zoom}</button><a className="text-link" href={certificate.image} target="_blank" rel="noopener noreferrer">{copy.original}<ArrowUpRight size={16} /></a></div>
            </Dialog.Content></Dialog.Portal>
          </Dialog.Root> : <p className="small-note">{copy.certificateUnavailable}</p>}
        </div>
      </article>)}
    </div>
  );
}
