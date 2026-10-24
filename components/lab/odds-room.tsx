"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type Ref } from "react";
import { oddVoices } from "@/lib/lab";
import { oddsInkContour } from "@/lib/lab-ink-contours";
import AnimatedContent from "./vendor/AnimatedContent";
import styles from "./odds-room.module.css";

export function OddsRoom({ reduced, headingRef, onSelectSound, onInkChange }: {
  reduced: boolean;
  headingRef: Ref<HTMLHeadingElement>;
  onSelectSound: () => void;
  onInkChange: (path: string) => void;
}) {
  const [selected, setSelected] = useState(0);
  const [opened, setOpened] = useState(true);
  const stage = useRef<HTMLDivElement>(null);
  const contacts = useRef<HTMLElement>(null);
  const thread = useRef<HTMLElement>(null);
  const voice = oddVoices[selected];

  useEffect(() => {
    const frame = stage.current, pane = thread.current, nav = contacts.current;
    if (!frame || !pane || !nav) return;
    const measure = () => {
      const bounds = frame.getBoundingClientRect(), box = pane.getBoundingClientRect();
      const person = nav.querySelector<HTMLElement>(`[data-voice="${selected}"]`)?.getBoundingClientRect();
      if (!bounds.width || !bounds.height || !person) return;
      const x = (value: number) => (value - bounds.left) / bounds.width * 1440;
      const y = (value: number) => (value - bounds.top) / bounds.height * 900;
      onInkChange(oddsInkContour({ left: x(box.left), top: y(box.top), right: x(box.right), bottom: y(box.bottom), tail: y(person.top + person.height / 2) }));
    };
    measure();
    const sizing = new ResizeObserver(measure);
    sizing.observe(frame); sizing.observe(pane); sizing.observe(nav);
    return () => sizing.disconnect();
  }, [selected, onInkChange]);

  function choose(index: number) {
    if (selected === index && opened) return;
    onSelectSound();
    setSelected(index);
    setOpened(true);
  }

  function close() {
    onSelectSound();
    setOpened(false);
    contacts.current?.querySelector<HTMLButtonElement>(`[data-voice="${selected}"]`)?.focus({ preventScroll: true });
  }

  return <div className={styles.stage} ref={stage} data-odds-room onKeyDown={event => {
    if (event.key === "Escape" && opened) { event.preventDefault(); close(); }
  }}>
    <div className={styles.intro}>
      <h1 id="lab-heading" ref={headingRef} tabIndex={-1}>Odds &amp; Ends</h1>
      <p>five tabs open. one brain.</p>
    </div>

    <nav className={styles.contacts} aria-label="Five sides of my mind" ref={contacts}>
      <p className={styles.contactsLabel}>pick a side of me</p>
      <AnimatedContent trigger="mount" distance={12} duration={0.38} stagger={0.055} className={styles.contactList}>
        {oddVoices.map((item, index) => <button type="button" key={item.id} className={styles.contact} data-voice={index} aria-pressed={opened && index === selected} aria-controls="odds-thread" onClick={() => choose(index)} onKeyDown={event => {
          if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          const next = event.key === "Home" ? 0 : event.key === "End" ? oddVoices.length - 1 : (index + (event.key === "ArrowDown" ? 1 : oddVoices.length - 1)) % oddVoices.length;
          contacts.current?.querySelector<HTMLButtonElement>(`[data-voice="${next}"]`)?.focus({ preventScroll: true });
          choose(next);
        }}>
          <span className={styles.initial} aria-hidden="true">{item.initial}</span>
          <span className={styles.contactCopy}><span className={styles.contactName}>
            {opened && index === selected && <motion.span className={styles.contactMark} layoutId="odds-contact-mark" initial={false} transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 450, damping: 36 }} aria-hidden="true" />}
            <span>{item.name}</span>
          </span><small>{item.teaser}</small></span>
        </button>)}
      </AnimatedContent>
    </nav>

    <section className={styles.thread} ref={thread} id="odds-thread" aria-label={opened ? `${voice.name} thoughts` : "Choose a voice"} data-chat-open={opened}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div key={opened ? `${voice.id}-${reduced}` : "closed"} className={styles.threadContent} data-chat-voice={opened ? voice.id : "closed"}
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: reduced ? 0 : 0.16 }}>
          {opened ? <>
            <header className={styles.threadHeader}>
              <div><h2>{voice.name}</h2><p>{voice.description}</p></div>
              <button type="button" onClick={close} aria-label="Close thoughts">Close ×</button>
            </header>
            <ol className={styles.messages} aria-label={`${voice.name} and me`}>
              {voice.messages.map((message, index) => <li key={`${voice.id}-${index}`} className={styles.messageEntrance} data-from={message.from} data-odds-message>
                <AnimatedContent trigger="mount" distance={16} scale={0.96} duration={0.4} ease="back.out(1.15)" delay={reduced ? 0 : index * 0.085} className={styles.message}>
                  <span className={styles.sender}>{message.from === "me" ? "me" : voice.name}</span><p>{message.text}</p>
                </AnimatedContent>
              </li>)}
            </ol>
            <p className={styles.chatNote}>a thought, left here.</p>
          </> : <div className={styles.empty}>
            <span>five voices. one head.</span><h2>who’s on<br />my mind?</h2><p>pick someone on the left.<br />the group chat never really ends.</p>
          </div>}
        </motion.div>
      </AnimatePresence>
    </section>
    <p className={styles.footnote}>no grand point.<br />just brain noise.</p>
    <p className={styles.status} role="status">{opened ? `${voice.name} thoughts selected.` : "Thoughts closed. Pick another voice."}</p>
  </div>;
}
