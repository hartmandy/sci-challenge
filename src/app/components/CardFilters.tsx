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
import Image from "next/image";

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

  useEffect(() => {
    async function fetchOptions() {
      try {
        const res = await fetch("/api/catalog");
        if (!res.ok) throw new Error("Failed to fetch dropdown options");
        const result = await res.json();
        setOptions(result.data);
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

  // NOTE: sorts were rewritten to include URL search params
  function sortCards(key: keyof CardData) {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("sort", key);
    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  }

  function handleSelectHp(hp: string) {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("hp", hp);
    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center w-full">
      <div className="flex items-center rounded-full bg-white p-2">
        <Image src="/ship.png" width={20} height={20} alt="ship icon" />
      </div>

      {/* HP Filter Select */}
      <Select value={hp} onValueChange={handleSelectHp} disabled={loading}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Select HP" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort By Select */}
      <Select value={sortKey} onValueChange={sortCards} disabled={loading}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="set">Set</SelectItem>
          <SelectItem value="cost">Cost</SelectItem>
          <SelectItem value="power">Power</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
