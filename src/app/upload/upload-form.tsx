"use client";

import { useActionState } from "react";
import { uploadImage, type UploadState } from "./actions";

export default function UploadForm() {
  const [state, formAction, pending] = useActionState<UploadState, FormData>(
    uploadImage,
    {},
  );

  return (
    <form action={formAction} className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <input
        type="file"
        name="image"
        accept="image/jpeg,image/png,image/gif,image/webp"
        required
        className="text-sm file:mr-4 file:rounded-full file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-background"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-foreground px-6 py-2 font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {pending ? "Uploading..." : "Upload"}
      </button>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.pathname && <p className="text-sm text-green-600">Uploaded!</p>}
    </form>
  );
}
