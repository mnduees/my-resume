"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ConnectedSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const presentRef = useRef<HTMLDivElement>(null);
  const pathScrollRef = useRef<ScrollTrigger | null>(null);
  const pathTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const updatePath = () => {
      const container = containerRef.current;
      const svg = svgRef.current;
      const path = pathRef.current;
      const present = presentRef.current;
      const startBlock = blocksRef.current[0];
      if (!container || !svg || !path) return;

      const containerRect = container.getBoundingClientRect();
      const points = blocksRef.current
        .map((block) => {
          if (!block) return null;
          const rect = block.getBoundingClientRect();
          return {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2,
          };
        })
        .filter(Boolean) as { x: number; y: number }[];

      if (points.length < 2) return;

      // Match the SVG viewBox to the container so coordinates stay in sync
      svg.setAttribute(
        "viewBox",
        `0 0 ${Math.max(containerRect.width, 1)} ${Math.max(
          containerRect.height,
          1
        )}`
      );

      const buildSmoothPath = (pts: { x: number; y: number }[]) => {
        if (pts.length < 2) return "";
        let d = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 1; i < pts.length; i += 1) {
          const prev = pts[i - 1];
          const current = pts[i];
          const midY = (prev.y + current.y) / 2;
          const cp1 = { x: prev.x, y: midY };
          const cp2 = { x: current.x, y: midY };
          d += ` C ${cp1.x} ${cp1.y} ${cp2.x} ${cp2.y} ${current.x} ${current.y}`;
        }
        return d;
      };

      path.setAttribute("d", buildSmoothPath(points));

      const length = path.getTotalLength();
      if (length <= 0) return;

      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      pathTweenRef.current?.kill();
      pathScrollRef.current?.kill();

      if (startBlock && present) {
        pathTweenRef.current = gsap.fromTo(
          path,
          { strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: startBlock,
              start: "top center",
              endTrigger: present,
              end: "top center",
              scrub: 3,
            },
          }
        );
        pathScrollRef.current = pathTweenRef.current.scrollTrigger ?? null;
      }
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    return () => {
      window.removeEventListener("resize", updatePath);
      pathTweenRef.current?.kill();
      pathScrollRef.current?.kill();
    };
  }, []);

  useLayoutEffect(() => {
    if (!presentRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const fadeIn = gsap.fromTo(
      presentRef.current,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: presentRef.current,
          start: "top 85%",
          end: "top 55%",
          scrub: 0.5,
        },
      }
    );

    const fadeOut = gsap.fromTo(
      presentRef.current,
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -16,
        ease: "power1.in",
        immediateRender: false,
        scrollTrigger: {
          trigger: presentRef.current,
          start: "bottom 60%",
          end: "bottom 25%",
          scrub: 0.5,
        },
      }
    );

    return () => {
      fadeIn.scrollTrigger?.kill();
      fadeOut.scrollTrigger?.kill();
      fadeIn.kill();
      fadeOut.kill();
    };
  }, []);

  return (
    <>
      <section className="relative min-h-[120vh] bg-slate-950 text-white">
        {/* Parallax / line container */}
        <div
          ref={containerRef}
          className="relative mx-auto max-w-7xl py-32 px-6 sm:px-10 lg:px-16"
        >
          {/* SVG overlay for the line */}
          <svg
            ref={svgRef}
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              className="drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]"
            />
          </svg>
          {/* Content blocks to connect */}
          <div className="relative space-y-20 md:space-y-28 lg:space-y-32">
            {/* Title */}
            <div className="relative mb-8 flex flex-col items-center justify-center text-center">
              <h3 className="mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">
                My timeline
              </h3>
            </div>
            {/* Section A - date left */}
            <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-8 md:justify-start">
              <div
                ref={(el) => {
                  blocksRef.current[0] = el;
                }}
                className="order-2 md:order-1 relative z-10 max-w-xl rounded-2xl bg-slate-900/70 p-10 backdrop-blur"
              >
                <h2 className="text-xl font-semibold">Section A</h2>
                <p className="text-sm text-slate-300">
                  First block you want to connect with the line.
                </p>
              </div>
              <span className="order-1 md:order-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur">
                March 2042
              </span>
            </div>

            {/* Section B - date right */}
            <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-end md:gap-8">
              <span className="order-1 md:order-1 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur">
                July 2043
              </span>
              <div
                ref={(el) => {
                  blocksRef.current[1] = el;
                }}
                className="order-2 md:order-2 relative z-10 max-w-xl rounded-2xl bg-slate-900/70 p-10 backdrop-blur"
              >
                <h2 className="text-xl font-semibold">Section B</h2>
                <p className="text-sm text-slate-300">
                  Second block connected with a parallax-animated line.
                </p>
              </div>
            </div>

            {/* Section C - date left */}
            <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-8 md:justify-start">
              <div
                ref={(el) => {
                  blocksRef.current[2] = el;
                }}
                className="order-2 md:order-1  relative z-10 max-w-xl rounded-2xl bg-slate-900/70 p-10 backdrop-blur"
              >
                <h2 className="text-xl font-semibold">Section C</h2>
                <p className="text-sm text-slate-300">
                  Third block, following the design pattern, connected by the
                  line.
                </p>
              </div>
              <span className="order-1 md:order-2  rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur">
                January 2045
              </span>
            </div>

            {/* Section D - date right */}
            <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-end md:gap-8">
              <span className="order-1 md:order-1 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur">
                October 2046
              </span>
              <div
                ref={(el) => {
                  blocksRef.current[3] = el;
                }}
                className="order-2 md:order-2 relative z-10 max-w-xl rounded-2xl bg-slate-900/70 p-10 backdrop-blur"
              >
                <h2 className="text-xl font-semibold">Section D</h2>
                <p className="text-sm text-slate-300">
                  Fourth block, continuing the pattern, connected by the line.
                </p>
              </div>
            </div>

            {/* Section E - date left */}
            <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-8 md:justify-start">
              <div
                ref={(el) => {
                  blocksRef.current[4] = el;
                }}
                className="order-2 md:order-1  relative z-10 max-w-xl rounded-2xl bg-slate-900/70 p-10 backdrop-blur"
              >
                <h2 className="text-xl font-semibold">Section E</h2>
                <p className="text-sm text-slate-300">
                  Fifth block, following the design pattern, connected by the
                  line.
                </p>
              </div>
              <span className="order-1 md:order-2  rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur">
                January 2045
              </span>
            </div>

            {/* Section F - date right */}
            <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-end md:gap-8">
              <span className="order-1 md:order-1 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur">
                October 2046
              </span>
              <div
                ref={(el) => {
                  blocksRef.current[5] = el;
                }}
                className="order-2 md:order-2 relative z-10 max-w-xl rounded-2xl bg-slate-900/70 p-10 backdrop-blur"
              >
                <h2 className="text-xl font-semibold">Section D</h2>
                <p className="text-sm text-slate-300">
                  Fourth block, continuing the pattern, connected by the line.
                </p>
              </div>
            </div>
          </div>

          {/* Present Section */}
          <div
            ref={presentRef}
            className="mx-auto mt-20 flex max-w-xl flex-col items-center gap-6 rounded-2xl border border-white/10 bg-slate-900/50 px-8 py-15 text-center opacity-0 backdrop-blur"
          >
            <h3
              className="text-2xl font-semibold tracking-tight sm:text-3xl mb-10"
              ref={(el) => {
                blocksRef.current[6] = el;
              }}
            >
              Present
            </h3>
            <div className="relative flex h-40 w-40 items-center justify-center">
              <div className="absolute h-full w-full rotate-45 rounded-lg border-4 border-amber-500 bg-amber-400 shadow-xl shadow-amber-500/20" />
              <div className="relative z-10 px-6 text-center text-sm font-semibold text-slate-900 sm:text-base">
                Building my next chapter
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
