"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const INK = "#800020";

function PencilIcon() {
  return (
    <svg viewBox="0 0 100 36" fill="none" aria-hidden="true">
      <path
        d="M16 11 76 8l8 16-65 3L5 20Z"
        fill="#f5efe6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m22 11 5 15M69 9l7 16M26 16l46-2M28 21l46-2M5 20l8 3 1-6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="m77 8 9-1c8-1 13 15 4 16l-6 1Z" fill="currentColor" />
      <path
        d="M8 32c18-5 28 4 42-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function DoodlePencil() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef(null);
  const triggerRef = useRef(null);
  const strokes = useRef([]);
  const drawing = useRef(null);

  function paint() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ratio = window.devicePixelRatio || 1;
    const width = Math.round(window.innerWidth * ratio);
    const height = Math.round(window.innerHeight * ratio);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, canvas.width / ratio, canvas.height / ratio);
    ctx.strokeStyle = INK;
    ctx.fillStyle = INK;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const points of strokes.current) {
      ctx.beginPath();
      points.forEach((point, i) => {
        const x = point.x - window.scrollX;
        const y = point.y - window.scrollY;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      if (points.length === 1) {
        ctx.arc(
          points[0].x - window.scrollX,
          points[0].y - window.scrollY,
          1,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      } else ctx.stroke();
    }
  }

  useEffect(() => {
    if (!active) return;
    paint();
    let frame = 0;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };
    const escape = (event) => {
      if (event.key === "Escape") {
        setActive(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("scroll", refresh, { passive: true });
    window.addEventListener("resize", refresh);
    window.addEventListener("keydown", escape);
    return () => {
      drawing.current = null;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", refresh);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("keydown", escape);
    };
  }, [active]);

  function start(event) {
    if (event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const stroke = [{ x: event.pageX, y: event.pageY }];
    strokes.current.push(stroke);
    drawing.current = { id: event.pointerId, stroke };
    paint();
  }

  function move(event) {
    if (drawing.current?.id !== event.pointerId) return;
    drawing.current.stroke.push({ x: event.pageX, y: event.pageY });
    paint();
  }

  function stop(event) {
    if (drawing.current?.id === event.pointerId) drawing.current = null;
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="doodle-pencil"
        onClick={() => setActive(true)}
        aria-label="Pick up the pencil and doodle on this website"
        aria-pressed={active}
        title="A pencil… pick it up?"
      >
        <PencilIcon />
      </button>
      {active &&
        createPortal(
          <>
            <canvas
              ref={canvasRef}
              className="doodle-canvas"
              data-doodle-canvas
              aria-hidden="true"
              onPointerDown={start}
              onPointerMove={move}
              onPointerUp={stop}
              onPointerCancel={stop}
              onLostPointerCapture={stop}
            />
            <div
              className="doodle-toolbar"
              role="region"
              aria-label="Pencil mode"
            >
              <p role="status">
                When was the last time you doodled?
                <br />
                <span>
                  Now you can.<br></br>Feel free to draw or even make notes ha!
                </span>
              </p>
              <div className="doodle-controls">
                <button
                  type="button"
                  onClick={() => {
                    strokes.current = [];
                    drawing.current = null;
                    paint();
                  }}
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActive(false);
                    triggerRef.current?.focus();
                  }}
                >
                  Done <span aria-hidden="true">✕</span>
                </button>
              </div>
              <small>Hold and drag to draw · Esc to exit</small>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
