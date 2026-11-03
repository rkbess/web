import { Suspense } from "react";
import { connection } from "next/server";
import { list } from "@vercel/blob";
import UploadForm from "./upload-form";

export const metadata = { title: "Upload | My Website" };

async function Gallery() {
  await connection();

  let blobs;
  try {
    ({ blobs } = await list({ prefix: "images/" }));
  } catch (err) {
    console.error("Failed to list images", err);
    return <p className="text-red-600">Could not load images.</p>;
  }

  if (blobs.length === 0) {
    return <p className="text-zinc-600 dark:text-zinc-400">No images yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {blobs.map((blob) => {
        const src = `/api/images?pathname=${encodeURIComponent(blob.pathname)}`;
        return (
          <a key={blob.pathname} href={src} target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element -- served by our own route */}
            <img
              src={src}
              alt={blob.pathname}
              loading="lazy"
              className="aspect-square w-full rounded-lg object-cover"
            />
          </a>
        );
      })}
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
