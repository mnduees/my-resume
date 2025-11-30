"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const startrails = "/homepage/star_trails.jpg";

export default function ConnectedSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const presentRef = useRef<HTMLDivElement>(null);
  const pathScrollRef = useRef<ScrollTrigger | null>(null);
  const pathTweenRef = useRef<gsap.core.Tween | null>(null);
  const highlightTweensRef = useRef<gsap.core.Tween[]>([]);

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
              scrub: 1,
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
    gsap.registerPlugin(ScrollTrigger);
    highlightTweensRef.current.forEach((tween) => tween.kill());
    highlightTweensRef.current = [];

    const cards = blocksRef.current
      .slice(0, 7)
      .filter(Boolean) as HTMLDivElement[];
    if (presentRef.current) {
      cards.push(presentRef.current);
    }

    cards.forEach((card, idx) => {
      const isPresent = idx === cards.length - 1;
      const tween = gsap.fromTo(
        card,
        {
          scale: 1,
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          backgroundColor: "rgba(15,23,42,0.7)",
          borderColor: "rgba(255,255,255,0.1)",
        },
        {
          scale: isPresent ? 1.05 : 1.035,
          boxShadow: isPresent
            ? "0 0 30px rgba(109, 193, 134, 0.35)"
            : "0 0 24px rgba(109, 193, 134, 0.35)",
          backgroundColor: "rgba(15,23,42,0.7)",
          borderColor: "rgba(255, 255, 255, 0.42)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: isPresent ? "center 75%" : "center center",
            end: isPresent ? "center 80%" : "center 48%",
            scrub: true,
          },
        }
      );
      highlightTweensRef.current.push(tween);
    });

    return () => {
      highlightTweensRef.current.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
      highlightTweensRef.current = [];
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
          <div className="relative space-y-20 md:space-y-28 lg:space-y-32 mb-20">
            {/* Title */}
            <div className="mx-auto mt-6 mb-16 flex w-full max-w-sm items-center justify-center">
              <h3
                className="mb-6 w-full rounded-xl border border-white/20 px-10 py-20 text-center text-3xl font-semibold tracking-tight text-white shadow-xl shadow-slate-900/50 backdrop-blur sm:text-4xl"
                style={{
                  backgroundImage: `linear-gradient(120deg, rgba(15,23,42,0.75), rgba(15,23,42,0.55)), url(${startrails})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                My journey so far.
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
                <h2 className="text-xl font-semibold">
                  Started community college education
                </h2>
                <p className="text-sm text-slate-300">
                  Enrolled in Computer Science, where I wrote my first Python
                  scripts and learned the fundamentals.
                </p>
              </div>
              <span className="order-1 md:order-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur">
                March 2019
              </span>
            </div>

            {/* Section B - date right */}
            <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-end md:gap-8">
              <span className="order-1 md:order-1 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur">
                January 2023
              </span>
              <div
                ref={(el) => {
                  blocksRef.current[1] = el;
                }}
                className="order-2 md:order-2 relative z-10 max-w-xl rounded-2xl bg-slate-900/70 p-10 backdrop-blur"
              >
                <h2 className="text-xl font-semibold">
                  Internship at Agromatch
                </h2>
                <p className="text-sm text-slate-300">
                  My first real-world IT experience as a Web Developer, working
                  with cloud tools and integrating APIs.
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
                <h2 className="text-xl font-semibold">Technical Degree</h2>
                <p className="text-sm text-slate-300">
                  Completed a Technical Degree as a Programmer Analyst,
                  deepening my knowledge in Java, JavaScript, Python, API
                  development, and frameworks such as Spring Boot and Node.js.
                </p>
              </div>
              <span className="order-1 md:order-2  rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur">
                July 2023
              </span>
            </div>

            {/* Section D - date right */}
            <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-end md:gap-8">
              <span className="order-1 md:order-1 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur">
                August 2023
              </span>
              <div
                ref={(el) => {
                  blocksRef.current[3] = el;
                }}
                className="order-2 md:order-2 relative z-10 max-w-xl rounded-2xl bg-slate-900/70 p-10 backdrop-blur"
              >
                <h2 className="text-xl font-semibold">
                  Full-Time Position at Telefónica
                </h2>
                <p className="text-sm text-slate-300">
                  Joined as a Customer Retention Data Analyst; learned about of
                  customer-service operations and developed strong soft skills.
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
                <h2 className="text-xl font-semibold">Professional Degree</h2>
                <p className="text-sm text-slate-300">
                  I obtained a Professional Degree in Computer Engineering; at
                  this stage I gained knowledge in project management, work
                  frameworks, process design, and machine learning.
                </p>
              </div>
              <span className="order-1 md:order-2  rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur">
                December 2024
              </span>
            </div>

            {/* Section F - date right */}
            <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-end md:gap-8">
              <span className="order-1 md:order-1 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur">
                April 2025
              </span>
              <div
                ref={(el) => {
                  blocksRef.current[5] = el;
                }}
                className="order-2 md:order-2 relative z-10 max-w-xl rounded-2xl bg-slate-900/70 p-10 backdrop-blur"
              >
                <h2 className="text-xl font-semibold">
                  Promotion at Telefónica
                </h2>
                <p className="text-sm text-slate-300">
                  Promoted to a Marketing Data Analyst role, where I learned how
                  marketing works and the importance of data-driven decisions in
                  business.
                </p>
              </div>
            </div>

            {/* Section G - date left */}
            <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-8 md:justify-start">
              <div
                ref={(el) => {
                  blocksRef.current[6] = el;
                }}
                className="order-2 md:order-1  relative z-10 max-w-xl rounded-2xl bg-slate-900/70 p-10 backdrop-blur"
              >
                <h2 className="text-xl font-semibold">
                  Full-time Position at Ceptinel
                </h2>
                <p className="text-sm text-slate-300">
                  Started working as a Python Developer; this is my current
                  role, where I mainly build data pipelines to solve business
                  problems.
                </p>
              </div>
              <span className="order-1 md:order-2  rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur">
                October 2025
              </span>
            </div>
          </div>

          {/* Present Section */}
          <div
            ref={presentRef}
            className="mx-auto mt-15 flex max-w-xl flex-col items-center gap-6 rounded-2xl border border-white/10 bg-slate-900/50 px-8 py-15 text-center opacity-0 backdrop-blur"
          >
            <h3
              className="text-2xl font-semibold tracking-tight sm:text-3xl mb-10"
              ref={(el) => {
                blocksRef.current[7] = el;
              }}
            >
              Present
            </h3>
            <div className="relative flex h-40 w-40 items-center justify-center sm:h-46 sm:w-46">
              <div className="absolute inset-0 rotate-45 rounded-xl bg-gradient-to-br from-amber-400 via-amber-400 to-amber-500 shadow-[0_5px_15px_rgba(251,191,36,0.35)]" />
              <div className="absolute inset-2 rotate-45 rounded-lg border border-black shadow-inner shadow-amber-800/40" />
              <div className="relative z-10 flex flex-col items-center gap-2 px-6 text-center text-slate-900">
                <svg
                  className="h-10 w-10 text-amber-800"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3 3 19h18L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    fill="currentColor"
                    fillOpacity="0.12"
                  />
                  <path
                    d="M12 9.5v4.5m0 2.5h.01"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="text-sm font-semibold leading-tight sm:text-base">
                  <div>Building my next</div>
                  <div>chapter</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
