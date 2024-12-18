import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hp = searchParams.get("hp") || "";
  const search = searchParams.get("search") || "";
  const dir = searchParams.get("dir") || "asc";

  // NOTE: It took a little trial and error to figure out the way this search query needed to be written, but it seems to work now!

  const queryParts = [];
  if (hp) {
    queryParts.push(`h=${hp}`);
  }
  queryParts.push(search);

  const params = queryParts.join(" ");

  const apiURL = `https://api.swu-db.com/cards/search?q=${encodeURIComponent(
    params
  )}&dir=${dir}&pretty=true`;

  try {
    const res = await fetch(apiURL);
    if (!res.ok) throw new Error("Failed to fetch cards");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch card data" },
      { status: 500 }
    );
  }
}
