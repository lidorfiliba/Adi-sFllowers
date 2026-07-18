import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const items = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "לא מורשה" }, { status: 401 });

  const body = await request.json();
  const max = await prisma.galleryItem.aggregate({ _max: { sortOrder: true } });
  const sortOrder = (max._max.sortOrder ?? -1) + 1;

  const item = await prisma.galleryItem.create({
    data: {
      type: body.type || "image",
      url: body.url,
      caption: body.caption || "",
      sortOrder,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
