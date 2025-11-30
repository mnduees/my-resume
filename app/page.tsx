// app/page.tsx
import { Linkedin, Mail } from "lucide-react";
import ParallaxCarousel from "./components/parallaxCarousel/Carousel";

export default function Home() {
  const projectSlides = [
    {
      id: "fullstack-01",
      title: "Medical AId",
      description:
        "React.js/Node.js app integrating a machine-learning model for symptom diagnosis, including user alerts based on geographic location.",
      imageSrc: "/projects/project2.png",
    },
    {
      id: "fullstack-02",
      title: "Work Order Management Software",
      description:
        "React.js/Node.js application for managing work orders in a dental laboratory.",
      imageSrc: "/projects/project1.png",
    },
    {
      id: "integration-03",
      title: "Ecommerce website",
      description:
        "React.js/Next.js application developed to gain experience integrating with Transbank, the main payment service provider in Chile.",
      imageSrc: "/projects/project3.png",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section id="hero" className="scroll-mt-28 pt-24 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-400">
            Data Engineer & Backend Developer
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Raimundo Estévez
          </h1>
          <p className="mt-4 max-w-5xl text-sm text-slate-300 sm:text-base">
            I like to work on programming solutions to solve real-life problems.
            <br />I have experience building data pipelines, dashboards, and
            backend applications as business solutions.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-indigo-600 border hover:border-indigo-400"
            >
              View Projects
            </a>
            <a
              href="/my/timeline"
              className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-indigo-600 border hover:border-indigo-400"
            >
              Experience & Education
            </a>
            <a
              href="#contact"
              className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-indigo-600 border hover:border-indigo-400"
            >
              Contact Me
            </a>
          </div>
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="scroll-mt-10 py-16 sm:py-8 border-t border-slate-800"
        >
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Skills
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Languages
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs">
                  Python
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs">
                  SQL
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs">
                  Java
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs">
                  JavaScript
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Tools & Frameworks
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs">
                  Power BI
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs">
                  Spring Boot
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs">
                  PySpark
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs">
                  React
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs">
                  Git
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs">
                  Docker
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="scroll-mt-10 py-16 sm:py-8 border-t border-slate-800"
        >
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Projects
          </h2>
          <div className="mt-10">
            <ParallaxCarousel slides={projectSlides} />
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="scroll-mt-10 py-16 sm:py-24 border-t border-slate-800"
        >
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Contact
          </h2>
          <p className="mt-4 max-w-5xl text-sm text-slate-300 sm:text-base">
            I&apos;m open to full-time or freelance opportunities as a Data
            Engineer or Java Developer. I&apos;m also open to collaborations for
            learning and growth.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <a
              href="mailto:raimundoestevezs@gmail.com"
              className="group flex items-center gap-3 text-indigo-400 transition hover:text-indigo-300"
            >
              <Mail className="h-5 w-5" aria-hidden />
              <span className="sr-only">Email</span>
              <span>raimundoestevezs@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/raimundo-estevez/"
              className="group flex items-center gap-3 text-indigo-400 transition hover:text-indigo-300"
            >
              <Linkedin className="h-5 w-5" aria-hidden />
              <span className="sr-only">LinkedIn</span>
              <span>/in/raimundo-estevez/</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 text-xs text-slate-500 sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} Raimundo Estévez.</span>
          <span>Built with Next.js & Tailwind CSS</span>
        </div>
      </footer>
    </div>
  );
}
