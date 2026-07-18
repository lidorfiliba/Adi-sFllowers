import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "לא מורשה" }, { status: 401 });

  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  type OrderItemInput = { bouquetId: string; name: string; price: number; quantity: number; imageUrl?: string };
  const incoming: OrderItemInput[] = body.items || [];

  if (!incoming.length) {
    return NextResponse.json({ error: "יש לבחור לפחות פריח אחד" }, { status: 400 });
  }

  // Verify all bouquets exist and get current prices
  const ids = incoming.map((i) => i.bouquetId);
  const bouquets = await prisma.bouquetCatalog.findMany({ where: { id: { in: ids } } });
  const bouquetMap = Object.fromEntries(bouquets.map((b) => [b.id, b]));

  const resolvedItems = incoming.map((i) => {
    const b = bouquetMap[i.bouquetId];
    return {
      bouquetId: i.bouquetId,
      name: b ? b.name : i.name,
      price: b ? b.price : i.price,
      imageUrl: b ? b.imageUrl : (i.imageUrl || ""),
      quantity: i.quantity,
    };
  });

  const totalAmount = resolvedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const order = await prisma.order.create({
    data: {
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerEmail: body.customerEmail || "",
      items: JSON.stringify(resolvedItems),
      bouquetType: body.bouquetType || "full_set",
      deliveryType: body.deliveryType,
      deliveryAddress: body.deliveryAddress || "",
      deliveryDate: body.deliveryDate,
      deliveryTime: body.deliveryTime || "",
      greetingMessage: body.greetingMessage || "",
      totalAmount,
      status: "PENDING_PAYMENT",
    },
  });

  return NextResponse.json(order, { status: 201 });
}
