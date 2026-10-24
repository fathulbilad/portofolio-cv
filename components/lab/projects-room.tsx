"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type Ref } from "react";
import { labProjects } from "@/lib/lab";
import Folder from "./vendor/Folder";
import AnimatedContent from "./vendor/AnimatedContent";
import styles from "./projects-room.module.css";

const art = ["lab", "cardio", "next"];
const notes = ["A small corner of the internet, made for playing.", "A little practice. A little progress.", "A blank page for whatever comes next."];
const labels = labProjects.map(project => `${project.title} — ${project.status}`);

function ProjectArt({ index, large = false }: { index: number; large?: boolean }) {
  return <span className={`${styles.art} ${large ? styles.largeArt : ""}`} data-art={art[index]} aria-hidden="true"><span>{index === 0 ? "LAB" : index === 1 ? "///////" : "?"}</span></span>;
}

function ProjectReader({ index, onClose, onExplore }: { index: number; onClose: () => void; onExplore: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const project = labProjects[index];
  useEffect(() => {
    const node = dialog.current;
    node?.show();
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      onClose();
    };
    document.addEventListener("keydown", onEscape, true);
    return () => { document.removeEventListener("keydown", onEscape, true); node?.close(); };
  }, [onClose]);

  return <dialog ref={dialog} className={styles.reader} aria-labelledby="project-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose(); } }}>
    <AnimatedContent trigger="mount" distance={18} scale={0.96} duration={0.42} ease="power3.out">
      <article className={styles.readerPaper}>
        <div className={styles.readerTop}><span>FILE 0{index + 1} / PERSONAL</span><button type="button" onClick={onClose} autoFocus>Put down ×</button></div>
        <h2 id="project-title">{project.title}</h2>
        <ProjectArt index={index} large />
        <p className={styles.description}>{project.description}</p>
        <p className={styles.note}>{project.note}</p>
        <p className={styles.status}>{project.status}</p>
        <a className={styles.projectLink} href={project.href} onClick={project.href.startsWith("#") ? event => { event.preventDefault(); onExplore(); } : undefined}>{project.action} ↗</a>
      </article>
    </AnimatedContent>
  </dialog>;
}

export function ProjectsRoom({ headingRef, onSelectSound, onExplore }: {
  headingRef: Ref<HTMLHeadingElement>;
  onSelectSound: () => void;
  onExplore: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [loose, setLoose] = useState<number[]>([]);
  const [resetKey, setResetKey] = useState(0);
  const [size, setSize] = useState(1);
  const [announcement, setAnnouncement] = useState("");
  const workspace = useRef<HTMLDivElement>(null);
  const dock = useRef<HTMLDivElement>(null);
  const pageOpener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const desk = workspace.current;
    if (!desk) return;
    const observer = new ResizeObserver(() => setSize(Math.min(1.8, desk.clientWidth / 405, desk.clientHeight / 390)));
    observer.observe(desk);
    return () => observer.disconnect();
  }, []);

  const items = useMemo(() => labProjects.map((project, index) => ({ content: <div className={styles.paper}>
    <span className={styles.fileIndex}><span>FILE 0{index + 1}</span><span>↗</span></span>
    <span className={styles.paperTitle}>{project.title}</span>
    <ProjectArt index={index} />
    <span className={styles.paperNote}>{notes[index]}</span>
    <span className={styles.paperStatus}>{project.status}</span>
  </div> })), []);

  const closeReader = useCallback(() => {
    onSelectSound();
    setSelected(null);
    requestAnimationFrame(() => pageOpener.current?.focus({ preventScroll: true }));
  }, [onSelectSound]);

  function fileAll() {
    onSelectSound();
    setResetKey(key => key + 1);
    setLoose([]);
    setOpen(false);
    setAnnouncement("All three projects filed away.");
    dock.current?.querySelector<HTMLElement>(".folder-stage")?.focus({ preventScroll: true });
  }

  return <>
    <div className={styles.intro}>
      <h1 id="lab-heading" ref={headingRef} tabIndex={-1}>Projects</h1>
      <p>Things I make, just because.</p>
      <span className={styles.collection}>03 files. Some finished.<br />Some still becoming something.</span>
    </div>
    <section className={styles.deskArea} aria-label="Project archive" data-reading={selected !== null} onClick={selected !== null ? closeReader : undefined}>
      <div className={styles.workspace} ref={workspace} aria-label="Draggable project workspace" inert={selected !== null}>
        <div className={styles.dock} ref={dock} style={{ "--archive-size": size } as CSSProperties}>
          <Folder items={items} itemLabels={labels} label="PROJECTS" mode="flap" variant="matte" layout="spread"
            color="#00d5db" paperColor="#eae3d2" size={size} tilt={1.05} speed={0.75} bounce={0.18}
            open={open} onOpenChange={next => { onSelectSound(); setOpen(next); }}
            openOn="click" closeOnOutsideClick={false} draggable zoomOnClick={false} peek intro={false} dragBounds={workspace} resetKey={resetKey}
            onItemClick={(_, index) => { pageOpener.current = dock.current?.querySelector<HTMLElement>(`[data-folder-item="${index}"]`) ?? null; onSelectSound(); setSelected(index); }}
            onItemDrop={(_, index, inside) => { onSelectSound(); setLoose(previous => inside ? previous.filter(item => item !== index) : [...new Set([...previous, index])]); setAnnouncement(`${labProjects[index].title} ${inside ? "filed back in the folder" : "placed on the desk"}.`); }}
            frontContent={<div className={styles.front}><span className={styles.sticker}>OFF DUTY / PERSONAL</span><span className={styles.folderTitle}>Work in<br />progress.</span><span className={styles.count}>03 FILES</span></div>}
          />
        </div>
      </div>
      <footer className={styles.deskFooter}>
        <p>{open ? "Drag a page out · click to read · drop it back to file" : loose.length ? "Click a page to read. Drop it back to file." : "Open the folder. See what’s inside."}</p>
        {loose.length > 0 && <button type="button" onClick={fileAll}>File everything away ↙</button>}
      </footer>
    </section>
    <p className={styles.announcement} role="status">{announcement}</p>
    {selected !== null && <ProjectReader index={selected} onClose={closeReader} onExplore={onExplore} />}
  </>;
}
