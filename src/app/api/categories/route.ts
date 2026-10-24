import { NextResponse } from "next/server";
import { getCategories } from "@/lib/api";

export const revalidate = 300;

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch {
    return NextResponse.json(
      { error: "ক্যাটাগরি লোড করা যায়নি।" },
      { status: 502 },
    );
  }
}
