import { Suspense } from "react";
import Image from "next/image";
import { connection } from "next/server";
import { list } from "@vercel/blob";
import UploadForm from "./upload-form";

export const metadata = { title: "Upload | My Website" };

async function Gallery() {
  await connection();
  const { blobs } = await list({ prefix: "images/" });

  if (blobs.length === 0) {
    return <p className="text-zinc-600 dark:text-zinc-400">No images yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {blobs.map((blob) => (
        <a key={blob.pathname} href={blob.url} target="_blank" rel="noopener noreferrer">
          <Image
            src={blob.url}
            alt={blob.pathname}
            width={300}
            height={300}
            className="aspect-square w-full rounded-lg object-cover"
          />
        </a>
      ))}
    </div>
  );
}

export default function UploadPage() {
  return (
    <div className="flex flex-col gap-8 py-16">
      <h1 className="text-3xl font-bold">Upload an Image</h1>
      <UploadForm />
      <Suspense fallback={<p>Loading images...</p>}>
        <Gallery />
      </Suspense>
    </div>
  );
}
