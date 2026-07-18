import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const items = await prisma.testimonial.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "לא מורשה" }, { status: 401 });

  const body = await request.json();
  const item = await prisma.testimonial.create({
    data: {
      author: body.author,
      text: body.text,
      rating: Number(body.rating) || 5,
      active: body.active !== false,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
