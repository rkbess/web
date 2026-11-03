"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

const MAX_SIZE = 4 * 1024 * 1024;
// SVG is excluded because it can carry scripts.
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};

export type UploadState = { error?: string; url?: string };

export async function uploadImage(
  _prev: UploadState,
  formData: FormData,
): Promise<UploadState> {
  const file = formData.get("image");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Please choose an image." };
  }
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return { error: "Only JPEG, PNG, GIF and WebP images are allowed." };
  }
  if (file.size > MAX_SIZE) {
    return { error: "Image must be 4 MB or smaller." };
  }

  const blob = await put(`images/upload.${ext}`, file, {
    access: "public",
    contentType: file.type,
    addRandomSuffix: true,
  });

  revalidatePath("/upload");
  return { url: blob.url };
}
