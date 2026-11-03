import { type NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/blob";

const PATHNAME_RE = /^images\/[\w.-]+\.(jpg|png|gif|webp)$/;

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname");
  // Only serve files uploaded by the image form.
  if (!pathname || !PATHNAME_RE.test(pathname)) {
    return NextResponse.json({ error: "Invalid pathname" }, { status: 400 });
  }

  const result = await get(pathname, { access: "private" });
  if (result?.statusCode !== 200) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
