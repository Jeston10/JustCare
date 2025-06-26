"use client";
import { useEffect, useState } from "react";

export default function LiveDateTimeButton() {
  const [now, setNow] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const formatted = now.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "medium",
  });

  return (
    <button
      className="fixed top-3 left-3 z-50 rounded-lg bg-background/80 px-3 py-1 text-xs font-mono text-muted-foreground shadow border border-border hover:bg-muted/80 transition-colors"
      title="Current date and time"
      aria-label="Current date and time"
      tabIndex={-1}
      style={{ pointerEvents: "none" }}
    >
      {formatted}
    </button>
  );
} 