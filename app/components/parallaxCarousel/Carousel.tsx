"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Slide = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
};

type Props = {
  slides: Slide[];
};

export default function ParallaxCarousel({ slides }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasMounted = useRef(false);
  const prevIndexRef = useRef(0);

  // Initialize slide stacking and opacity
  useEffect(() => {
    if (!slides.length) return;
    slides.forEach((_, i) => {
      const slide = slideRefs.current[i];
      if (!slide) return;
      gsap.set(slide, {
        position: "absolute",
        inset: 0,
        opacity: i === 0 ? 1 : 0,
        zIndex: i === 0 ? 2 : 1,
      });
    });
    hasMounted.current = true;
  }, [slides]);

  // Animate between slides
  useEffect(() => {
    if (!hasMounted.current || !slides.length) return;
    const total = slides.length;
    const prevIndex = prevIndexRef.current;
    if (prevIndex === activeIndex) return;

    const direction =
      (activeIndex === 0 && prevIndex === total - 1) ||
      (activeIndex > prevIndex &&
        !(activeIndex === total - 1 && prevIndex === 0))
        ? 1
        : -1;

    const outgoing = slideRefs.current[prevIndex];
    const incoming = slideRefs.current[activeIndex];
    if (!incoming || !outgoing) {
      prevIndexRef.current = activeIndex;
      return;
    }

    gsap.set(incoming, { zIndex: 3, opacity: 1 });
    gsap.set(outgoing, { zIndex: 2 });

    const tl = gsap.timeline({
      defaults: { duration: 0.9, ease: "power2.out" },
      onComplete: () => {
        gsap.set(outgoing, { opacity: 0, zIndex: 1 });
      },
    });

    tl.fromTo(
      incoming.querySelector("[data-image]"),
      { x: 80 * direction, opacity: 0 },
      { x: 0, opacity: 1 },
      0
    )
      .fromTo(
        incoming.querySelector("[data-text]"),
        { x: -50 * direction, opacity: 0 },
        { x: 0, opacity: 1 },
        0
      )
      .to(
        outgoing.querySelector("[data-image]"),
        { x: -80 * direction, opacity: 0 },
        0
      )
      .to(
        outgoing.querySelector("[data-text]"),
        { x: 50 * direction, opacity: 0 },
        0
      );

    prevIndexRef.current = activeIndex;
    return () => {
      tl.kill();
    };
  }, [activeIndex, slides.length]);

  const handleNext = () =>
    setActiveIndex((idx) => (idx + 1) % Math.max(slides.length, 1));

  const handlePrev = () =>
    setActiveIndex(
      (idx) =>
        (idx - 1 + Math.max(slides.length, 1)) % Math.max(slides.length, 1)
    );

  if (!slides.length) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-slate-900/60 p-6 shadow-xl backdrop-blur">
      <div className="relative h-[420px] w-full sm:h-[520px]">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            ref={(el) => {
              slideRefs.current[idx] = el;
            }}
            className="grid h-full w-full grid-cols-1 items-center gap-8 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-8 sm:grid-cols-2"
          >
            <div data-text className="flex flex-col gap-3 text-white">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-300">
                #{idx + 1}
              </p>
              <h3 className="text-2xl font-semibold sm:text-3xl">
                {slide.title}
              </h3>
              <p className="text-sm text-slate-200 sm:text-base">
                {slide.description}
              </p>
            </div>
            <div
              data-image
              className="relative h-56 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 shadow-lg sm:h-72"
            >
              <Image
                src={slide.imageSrc}
                alt={slide.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={idx === activeIndex}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between gap-3 text-white">
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
            aria-label="Previous slide"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
            aria-label="Next slide"
          >
            Next
          </button>
        </div>
        <div className="flex items-center gap-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition ${
                idx === activeIndex ? "w-6 bg-white" : "w-2.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
