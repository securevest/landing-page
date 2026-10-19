"use client";

import { useEffect, useRef } from "react";
import "./custom-cursor.css";

const INTERACTIVE =
  "a[href], button, [role='button'], summary, label[for], select, input[type='range'], input[type='checkbox'], input[type='radio'], input[type='submit'], input[type='button']";

const TEXT_FIELD =
  "input:not([type='range']):not([type='checkbox']):not([type='radio']):not([type='submit']):not([type='button']), textarea, [contenteditable='true']";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only for devices with a real mouse. Touch devices keep their normal behavior.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;
    let seen = false;

    const setState = (state: string) => {
      dot.dataset.state = state;
      ring.dataset.state = state;
    };

    const classify = (target: EventTarget | null) => {
      const el = target instanceof Element ? target : null;
      if (!el) return setState("idle");
      if (el.closest(TEXT_FIELD)) return setState("text");
      if (el.closest(INTERACTIVE)) return setState("link");
      setState("idle");
    };

    // The ring trails the pointer; the loop stops once it catches up.
    const tick = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf =
        Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1
          ? requestAnimationFrame(tick)
          : 0;
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;

      if (!seen) {
        seen = true;
        rx = mx;
        ry = my;
        classify(e.target);
      }

      if (reduceMotion) {
        rx = mx;
        ry = my;
        ring.style.transform = dot.style.transform;
        return;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onOver = (e: PointerEvent) => {
      if (seen) classify(e.target);
    };

    const setPressed = (pressed: boolean) => {
      dot.dataset.pressed = String(pressed);
      ring.dataset.pressed = String(pressed);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const onLeave = () => setState("hidden");
    const onEnter = () => {
      if (seen) setState("idle");
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    root.addEventListener("mouseleave", onLeave);
    root.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-custom-cursor");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      root.removeEventListener("mouseleave", onLeave);
      root.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="sv-cursor sv-cursor-ring"
        data-state="hidden"
      >
        <span />
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="sv-cursor sv-cursor-dot"
        data-state="hidden"
      >
        <span />
      </div>
    </>
  );
};
