import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "לא מורשה" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const order = await prisma.order.update({ where: { id }, data: { status: body.status } });
  return NextResponse.json(order);
}
