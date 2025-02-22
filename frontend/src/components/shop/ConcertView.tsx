"use client";
import { Concert } from "@/types/concert";
import { ConcertCard } from "./ConcertCard";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { getConcerts } from "@/actions/concerts";

export default function ConcertView() {
  const [concerts, setConcerts] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const loadMoreConcerts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const { concerts, nextCursor, hasMore } = await getConcerts(cursor);
      setConcerts((prevItems) => [...prevItems, ...concerts]);
      setCursor(nextCursor);
      setHasMore(hasMore);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setIsLoading(false);
    }
  }, [cursor, isLoading, hasMore]);

  useEffect(() => {
    if (inView) {
      loadMoreConcerts();
    }
  }, [inView, loadMoreConcerts]);

  return (
    <div className="w-full flex flex-col gap-4">
      {concerts.map((concert) => {
        return <ConcertCard concert={concert} key={concert.id} />;
      })}
      {hasMore && (
        <div
          className="text-muted-foreground text-sm flex justify-center"
          ref={ref}
        >
          {isLoading ? "Loading more..." : "Load More"}
        </div>
      )}
      {!hasMore && (
        <div className="text-muted-foreground text-sm flex justify-center">
          No more items
        </div>
      )}
    </div>
  );
}
