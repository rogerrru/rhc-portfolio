import React, { useEffect, useMemo, useRef, useState } from 'react';

// Cycled per-card so the tilt reads as deliberate art direction rather than random jitter.
const ROTATIONS = [-2, 1, -1.5, 2, -1, 1.5];

const CLICK_DRAG_THRESHOLD = 6; // px of movement before a pointerdown counts as a drag, not a click
const RESUME_DELAY = 1500; // ms of inactivity after a drag before auto-scroll resumes
const MOMENTUM_DECAY = 0.995; // velocity multiplier applied per ms while coasting
const MOMENTUM_MIN_VELOCITY = 0.01; // px/ms — below this, momentum is considered settled
const MOMENTUM_MAX_VELOCITY = 2.5; // px/ms — clamp so a hard flick doesn't fling it off-screen

const CarouselCard = ({ project, clickable, hidden = false }) => (
  <div
    className="shrink-0 w-[180px] sm:w-[240px] md:w-[280px] lg:w-[310px]"
    style={{ transform: `rotate(${project.rotation}deg)` }}
    aria-hidden={hidden || undefined}
  >
    <div
      data-project-id={project.id}
      className={`relative aspect-[3/4] rounded-[22px] overflow-hidden bg-gray-100 ${
        clickable ? 'cursor-pointer' : ''
      }`}
    >
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          loading="lazy"
          draggable={false}
        />
      )}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <h3 className="absolute left-[18px] bottom-4 right-4 font-lexend_exa text-[18px] font-bold tracking-[0.04em] text-white leading-tight line-clamp-2">
        {project.title}
      </h3>
    </div>
  </div>
);

const InfiniteProjectCarousel = ({ projects = [], speed = 32, pauseOnHover = true, onCardClick }) => {
  const items = useMemo(
    () => projects.map((p, i) => ({ ...p, rotation: ROTATIONS[i % ROTATIONS.length] })),
    [projects]
  );
  const trackItems = useMemo(() => [...items, ...items], [items]);

  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Animation/drag state lives in refs, not React state — it's mutated every
  // animation frame and must never trigger a re-render.
  const positionRef = useRef(0);
  const groupWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isManualRef = useRef(false);
  const wasDraggedRef = useRef(false);
  const velocityRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragStartPositionRef = useRef(0);
  const lastMoveXRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const resumeTimeoutRef = useRef(null);
  const lastFrameTimeRef = useRef(null);
  const reducedMotionRef = useRef(false);
  const pendingClickProjectRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mq.matches;
    const onChange = () => { reducedMotionRef.current = mq.matches; };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Track holds two concatenated copies of `items`, so half its rendered
  // width is exactly one full, un-duplicated loop.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => { groupWidthRef.current = track.scrollWidth / 2; };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [trackItems]);

  useEffect(() => {
    let rafId;

    const frame = (timestamp) => {
      if (lastFrameTimeRef.current == null) lastFrameTimeRef.current = timestamp;
      const dt = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;

      if (!isDraggingRef.current) {
        if (velocityRef.current !== 0) {
          positionRef.current += velocityRef.current * dt;
          velocityRef.current *= Math.pow(MOMENTUM_DECAY, dt);
          if (Math.abs(velocityRef.current) < MOMENTUM_MIN_VELOCITY) velocityRef.current = 0;
        } else if (
          !isManualRef.current &&
          !reducedMotionRef.current &&
          !(pauseOnHover && isHoveredRef.current) &&
          groupWidthRef.current
        ) {
          const pxPerMs = groupWidthRef.current / (speed * 1000);
          positionRef.current -= pxPerMs * dt;
        }
      }

      const gw = groupWidthRef.current;
      if (gw) {
        if (positionRef.current <= -gw) positionRef.current += gw;
        else if (positionRef.current > 0) positionRef.current -= gw;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(rafId);
      lastFrameTimeRef.current = null;
    };
  }, [speed, pauseOnHover]);

  useEffect(() => () => clearTimeout(resumeTimeoutRef.current), []);

  const handlePointerDown = (e) => {
    if (items.length === 0 || e.button === 2) return;
    isDraggingRef.current = true;
    isManualRef.current = true;
    wasDraggedRef.current = false;
    velocityRef.current = 0;
    setIsDragging(true);
    clearTimeout(resumeTimeoutRef.current);
    dragStartXRef.current = e.clientX;
    dragStartPositionRef.current = positionRef.current;
    lastMoveXRef.current = e.clientX;
    lastMoveTimeRef.current = performance.now();
    e.currentTarget.setPointerCapture(e.pointerId);

    // setPointerCapture redirects the browser's synthesized click event's
    // target to this root element, so a card's own onClick would never fire
    // via native bubbling — resolve and invoke it ourselves on release instead.
    const cardEl = e.target.closest?.('[data-project-id]');
    pendingClickProjectRef.current = cardEl
      ? items.find((p) => String(p.id) === cardEl.dataset.projectId) ?? null
      : null;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > CLICK_DRAG_THRESHOLD) wasDraggedRef.current = true;
    positionRef.current = dragStartPositionRef.current + dx;

    const now = performance.now();
    const dt = now - lastMoveTimeRef.current;
    if (dt > 0) velocityRef.current = (e.clientX - lastMoveXRef.current) / dt;
    lastMoveXRef.current = e.clientX;
    lastMoveTimeRef.current = now;
  };

  const endDrag = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    velocityRef.current = reducedMotionRef.current
      ? 0
      : Math.max(-MOMENTUM_MAX_VELOCITY, Math.min(MOMENTUM_MAX_VELOCITY, velocityRef.current));
    resumeTimeoutRef.current = setTimeout(() => { isManualRef.current = false; }, RESUME_DELAY);
    if (e?.pointerId != null && e.currentTarget?.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (!wasDraggedRef.current && pendingClickProjectRef.current && onCardClick) {
      onCardClick(pendingClickProjectRef.current);
    }
    pendingClickProjectRef.current = null;
  };

  if (items.length === 0) return null;

  return (
    <div
      className={`relative w-full overflow-hidden select-none touch-pan-y ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      role="region"
      aria-label="Project carousel. Drag to browse."
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') isHoveredRef.current = true; }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') isHoveredRef.current = false; }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div ref={trackRef} className="flex gap-6 md:gap-8 w-max will-change-transform">
        {trackItems.map((project, i) => (
          <CarouselCard
            key={`${project.id}-${i}`}
            project={project}
            clickable={!!onCardClick}
            hidden={i >= items.length}
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteProjectCarousel;
