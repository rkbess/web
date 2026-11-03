export const metadata = { title: "Contact | My Website" };

export default function Contact() {
  return (
    <div className="flex flex-col gap-4 py-16">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Reach us at{" "}
        <a href="mailto:hello@example.com" className="underline">
          hello@example.com
        </a>
        .
      </p>
    </div>
  );
}
