import Link from "next/link";

const features = [
  { title: "Fast", description: "Built with Next.js for great performance." },
  { title: "Responsive", description: "Looks good on any screen size." },
  { title: "Simple", description: "Easy to read and extend." },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-16">
      <section className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to My Website
        </h1>
        <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          A simple website built with Next.js and Tailwind CSS.
        </p>
        <Link
          href="/about"
          className="rounded-full bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-80"
        >
          Learn more
        </Link>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-lg border border-black/10 p-6 dark:border-white/15"
          >
            <h2 className="mb-2 text-xl font-semibold">{f.title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400">{f.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
