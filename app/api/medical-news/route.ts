import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "7";

  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing NEWS_API_KEY" }, { status: 500 });
  }

  const url = `https://newsapi.org/v2/top-headlines?category=health&language=en&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
    const data = await res.json();
    return NextResponse.json({
      articles: data.articles,
      totalResults: data.totalResults,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching news" }, { status: 500 });
  }
} 