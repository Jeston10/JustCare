'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface NewsArticle {
  title: string;
  url: string;
  urlToImage?: string;
  description?: string;
  publishedAt: string;
  source: { name: string };
}

const PAGE_SIZE = 7;

export const NewsSection: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/medical-news?page=${page}&pageSize=${PAGE_SIZE}`
        );
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        setArticles(data.articles);
        setTotalResults(data.totalResults);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [page]);

  const totalPages = Math.ceil(totalResults / PAGE_SIZE);

  return (
    <div className="mb-8 rounded-xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/30">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Top Medical News</h2>
      {loading && <p className="text-muted-foreground">Loading news...</p>}
      {error && <p className="text-destructive">{error}</p>}
      <ul className="space-y-4">
        {articles.map((article, idx) => (
          <li key={idx} className="flex gap-4 items-start">
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-20 h-20 object-cover rounded-md border border-border/30"
              />
            )}
            <div>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                {article.title}
              </a>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{article.description}</p>
              <div className="text-xs text-muted-foreground mt-1">
                {article.source.name} &middot; {new Date(article.publishedAt).toLocaleDateString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-6">
        <button
          className="shad-secondary-btn"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
        >
          Previous
        </button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <button
          className="shad-secondary-btn"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
}; 