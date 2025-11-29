import { Balthazar } from "next/font/google";

const balthazar = Balthazar({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <div className="flex items-center justify-center height: 50%">
      <main className="flex items-center justify-center bg-[#FAEBD7] w-[362px] h-[202px] border-white rounded-md">
        <div
          className={`${balthazar.className} relative w-[360px] h-[200px] border border-black rounded-md p-4 text-black`}
        >
          {/* top left random number */}
          <span className="absolute top-2 left-3 text-sm">#81427</span>

          {/* top right fictional company */}
          <span className="absolute top-2 right-3 text-sm font-semibold">
            Freelance
          </span>

          {/* centered name + role */}
          <div className="flex flex-col items-center justify-center h-full leading-tight">
            <h1>test</h1>
            <p className="mt-1">Programmer & Data Engineer</p>
          </div>

          {/* bottom fictional address */}
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm">
            xd@gmail.com
          </span>
        </div>
      </main>
    </div>
  );
}
