"use client";
import { useRef, useState } from "react";

export default function Draggable({
  children,
  as: Tag = "div",
  className = "",
}) {
  const ref = useRef(null);
  const start = useRef(null);
  const moved = useRef(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  // keep the element inside its parent <section>
  function clamp(nx, ny) {
    const el = ref.current.getBoundingClientRect();
    const box = ref.current.closest("section").getBoundingClientRect();
    const dx = nx - pos.x,
      dy = ny - pos.y;
    if (el.left + dx < box.left) nx += box.left - (el.left + dx);
    if (el.right + dx > box.right) nx -= el.right + dx - box.right;
    if (el.top + dy < box.top) ny += box.top - (el.top + dy);
    if (el.bottom + dy > box.bottom) ny -= el.bottom + dy - box.bottom;
    return { x: nx, y: ny };
  }

  function onPointerDown(e) {
    if (e.pointerType === "touch") return; // keeps phones scrollable
    ref.current.setPointerCapture(e.pointerId);
    start.current = { px: e.clientX, py: e.clientY, x: pos.x, y: pos.y };
    moved.current = false;
    setDragging(true);
  }
  function onPointerMove(e) {
    if (!start.current) return;
    const dx = e.clientX - start.current.px,
      dy = e.clientY - start.current.py;
    if (Math.abs(dx) + Math.abs(dy) > 3) moved.current = true;
    setPos(clamp(start.current.x + dx, start.current.y + dy));
  }
  function onPointerUp() {
    start.current = null;
    setDragging(false);
  }

  // if it was dragged, don't treat the release as a click on a link/button
  function onClickCapture(e) {
    if (moved.current) {
      e.preventDefault();
      e.stopPropagation();
      moved.current = false;
    }
  }

  // arrow keys move it too, for keyboard users
  function onKeyDown(e) {
    const step = 10;
    const d = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    }[e.key];
    if (!d) return;
    e.preventDefault();
    setPos(clamp(pos.x + d[0], pos.y + d[1]));
  }

  return (
    <Tag
      ref={ref}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={onClickCapture}
      onKeyDown={onKeyDown}
      className={`relative select-none ${dragging ? "z-20 cursor-grabbing" : "cursor-grab"} ${className}`}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      {children}
    </Tag>
  );
}
