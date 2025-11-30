// app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section id="hero" className="py-16 sm:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-400">
            Data Engineer & Backend Developer
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Raimundo Estévez
          </h1>
          <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
            I create data pipelines, dashboards and backend apps as business
            solutions.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-indigo-600"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:border-indigo-400"
            >
              Contact Me
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4 text-sm text-slate-400">
            {/* Replace with icons later */}
            <a
              href="https://github.com/your-user"
              className="hover:text-indigo-400"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/your-user"
              className="hover:text-indigo-400"
            >
              LinkedIn
            </a>
            <a href="mailto:you@example.com" className="hover:text-indigo-400">
              Email
            </a>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="py-16 sm:py-24 border-t border-slate-800"
        >
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            About
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
            Short paragraph about your background, what you like to work on, and
            the problems you enjoy solving.
          </p>
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="py-16 sm:py-24 border-t border-slate-800"
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
                {/* Add more */}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Tools & Frameworks
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs">
                  Next.js
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs">
                  Tailwind CSS
                </span>
                {/* Add more */}
              </div>
            </div>

            {/* Add more columns for Databases, Cloud, etc. if needed */}
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="py-16 sm:py-24 border-t border-slate-800"
        >
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Projects
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="text-lg font-semibold">Project Name</h3>
              <p className="mt-2 text-sm text-slate-300">
                Short description of the project, what it does, and why it
                matters.
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Tech stack: Next.js, Tailwind, PostgreSQL
              </p>
              <div className="mt-4 flex gap-3 text-xs">
                <a
                  href="#"
                  className="font-medium text-indigo-400 hover:text-indigo-300"
                >
                  View code
                </a>
                <a
                  href="#"
                  className="font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Live demo
                </a>
              </div>
            </article>

            {/* Repeat cards for more projects */}
          </div>
        </section>

        {/* Experience */}
        <section
          id="experience"
          className="py-16 sm:py-24 border-t border-slate-800"
        >
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Experience
          </h2>
          <div className="mt-8 space-y-8">
            <div>
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <h3 className="text-base font-semibold">
                  Role Title – Company Name
                </h3>
                <p className="text-xs text-slate-400">2022 – Present</p>
              </div>
              <p className="mt-1 text-xs text-slate-400">Location or Remote</p>
              <ul className="mt-3 space-y-1 text-sm text-slate-300">
                <li>• Achievement or responsibility with some impact.</li>
                <li>• Another contribution worth highlighting.</li>
              </ul>
            </div>

            {/* More experience blocks */}
          </div>
        </section>

        {/* Education */}
        <section
          id="education"
          className="py-16 sm:py-24 border-t border-slate-800"
        >
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Education
          </h2>
          <div className="mt-8 space-y-4 text-sm text-slate-300">
            <div>
              <p className="font-semibold">Degree / Diploma – Institution</p>
              <p className="text-xs text-slate-400">Years, Location</p>
            </div>
            {/* More items or certifications */}
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="py-16 sm:py-24 border-t border-slate-800"
        >
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Contact
          </h2>
          <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
            One or two lines about what you are open to (roles, freelance,
            collaborations).
          </p>
          <div className="mt-6 space-y-2 text-sm text-slate-300">
            <p>
              Email:{" "}
              <a
                href="mailto:you@example.com"
                className="text-indigo-400 hover:text-indigo-300"
              >
                you@example.com
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://linkedin.com/in/your-user"
                className="text-indigo-400 hover:text-indigo-300"
              >
                /in/your-user
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 text-xs text-slate-500 sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} Your Name.</span>
          <span>Built with Next.js & Tailwind CSS</span>
        </div>
      </footer>
    </div>
  );
}
