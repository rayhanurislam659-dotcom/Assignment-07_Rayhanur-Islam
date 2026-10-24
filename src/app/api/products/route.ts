import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/api";

export const revalidate = 60;

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  try {
    const products = await getProducts({
      category: category || undefined,
    });
    return NextResponse.json(products, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
    });
  } catch {
    return NextResponse.json(
      { error: "পণ্যের তথ্য লোড করা যায়নি।" },
      { status: 502 },
    );
  }
}
