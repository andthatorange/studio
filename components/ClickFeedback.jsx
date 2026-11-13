"use client";
import { useEffect } from "react";

const CLICKABLE = "a, button, summary, select, label, [role='button'], .btn";

export default function ClickFeedback() {
  useEffect(() => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    let context;
    let buffer;
    let disposed = false;
    const sound = new Audio("/click.wav");
    sound.volume = 1;
    sound.preload = "auto";
    sound.load();
    if (AudioContextClass) {
      context = new AudioContextClass();
      fetch("/click.wav")
        .then((response) => {
          if (!response.ok) throw new Error("Click audio could not be loaded");
          return response.arrayBuffer();
        })
        .then((data) => context.decodeAudioData(data))
        .then((decoded) => {
          if (!disposed) buffer = decoded;
        })
        .catch((error) => console.warn(error.message));
    }
    const playSound = () => {
      if (context && buffer) {
        const play = () => {
          if (disposed) return;
          const source = context.createBufferSource();
          source.buffer = buffer;
          source.connect(context.destination);
          source.start();
        };
        if (context.state === "suspended") {
          context
            .resume()
            .then(play)
            .catch(() => playFallback());
        } else {
          play();
        }
      } else {
        // Resume inside the gesture while the audio buffer is still loading.
        context?.resume().catch(() => {});
        playFallback();
      }
    };
    const playFallback = () => {
      const voice = sound.cloneNode();
      voice.volume = 1;
      voice
        .play()
        .catch((error) => console.warn("Click audio:", error.message));
    };
    const onPress = (event) => {
      if (event.button !== 0 || event.target.closest?.("[data-doodle-canvas]"))
        return;
      const target = event.target.closest?.(CLICKABLE);
      if (target?.disabled || target?.getAttribute("aria-disabled") === "true")
        return;
      playSound();
    };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (e) => {
      if (e.target.closest?.("[data-doodle-canvas]")) return;
      const target = e.target.closest?.(CLICKABLE);
      if (target?.disabled || target?.getAttribute("aria-disabled") === "true")
        return;

      if (e.detail === 0) playSound();
      // Effect: a small flower pops up where you clicked
      if (reduceMotion.matches) return;
      let x = e.clientX,
        y = e.clientY;
      if (e.detail === 0 && target) {
        // keyboard "click": use the element's center
        const r = target.getBoundingClientRect();
        x = r.left + r.width / 2;
        y = r.top + r.height / 2;
      }
    };

    document.addEventListener("pointerdown", onPress, true);
    document.addEventListener("click", onClick, true);
    return () => {
      disposed = true;
      document.removeEventListener("pointerdown", onPress, true);
      document.removeEventListener("click", onClick, true);
      context?.close().catch(() => {});
    };
  }, []);

  return null;
}
