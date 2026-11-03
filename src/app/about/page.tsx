export const metadata = { title: "About | My Website" };

export default function About() {
  return (
    <div className="flex flex-col gap-4 py-16">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        This is a simple website created with Next.js. Edit this page in
        src/app/about/page.tsx.
      </p>
    </div>
  );
}
