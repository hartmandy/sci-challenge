"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CardData } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useDebounce } from "../hooks/useDebounce";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function CardFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortKey = (searchParams.get("sort") ?? undefined) as
    | keyof CardData
    | undefined;
  const hp = searchParams.get("hp") ?? undefined;
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParam = searchParams.get("search") ?? "";
  const [search, setSearch] = useState<string>(searchParam);
  const debouncedSearchQuery = useDebounce(search, 300);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const res = await fetch("/api/catalog");
        if (!res.ok) throw new Error("Failed to fetch dropdown options");
        const result = await res.json();
        setOptions(["--", ...result.data]);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    }

    fetchOptions();
  }, []);

  // function sortCards(key: keyof CardData) {
  //   const currentParams = new URLSearchParams(window.location.search);
  //   currentParams.set("sort", key);
  //   router.push(`${window.location.pathname}?${currentParams.toString()}`);
  // }

  // NOTE: sorts were rewritten to include URL search params rather than state management and added in asc or desc option
  function sortCards(key: keyof CardData) {
    const currentParams = new URLSearchParams(window.location.search);
    const currentSort = currentParams.get("sort");
    const currentDir = currentParams.get("dir");

    if (currentSort === key) {
      if (!currentDir || currentDir === "asc") {
        currentParams.set("dir", "desc");
      } else {
        currentParams.set("dir", "asc");
      }
    } else {
      currentParams.set("sort", key);
      currentParams.delete("dir");
    }

    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  }

  // Same for the hp and the search query
  function handleSelectHp(hp: string) {
    const currentParams = new URLSearchParams(window.location.search);
    if (hp === "--") {
      currentParams.delete("hp");
    } else {
      currentParams.set("hp", hp);
    }
    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  }

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    if (debouncedSearchQuery) {
      currentParams.set("search", debouncedSearchQuery);
    } else {
      currentParams.delete("search");
    }
    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  }, [debouncedSearchQuery, router]);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full pb-8">
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search for Card..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs"
      />

      {/* HP Filter Select */}
      <Select value={hp} onValueChange={handleSelectHp} disabled={loading}>
        <SelectTrigger className="max-w-[120px]">
          <span className="mr-1">HP:</span>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort By Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button onClick={() => sortCards("name")} disabled={loading}>
          Name
        </Button>
        <Button onClick={() => sortCards("set")} disabled={loading}>
          Set
        </Button>
        <Button onClick={() => sortCards("cost")} disabled={loading}>
          Cost
        </Button>
        <Button onClick={() => sortCards("power")} disabled={loading}>
          Power
        </Button>
      </div>
    </div>
  );
}
