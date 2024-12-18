"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Card from "./Card";
import { useRouter, useSearchParams } from "next/navigation";
import { CardData } from "../types";
import CardLoader from "./CardLoader";
import Image from "next/image";

/**
 * A component that displays a list of cards, sorted by a specified key.
 * @param {string} hp - The HP value to filter cards by.
 * @returns {JSX.Element} A component that renders a list of cards.
 */

export default function CardList() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // NOTE: Added URL search params for filters
  const searchParams = useSearchParams();
  const sortKey = (searchParams.get("sort") || "name") as keyof CardData;
  const hp = searchParams.get("hp");
  const search = searchParams.get("search") || "";
  const router = useRouter();

  // API doesn't have a default show all call, so I'm defaulting it to hp 5 because it needs a query of some kind
  useEffect(() => {
    if (!hp) {
      router.push(`${window.location.pathname}?hp=5`);
    }
  }, []);

  useEffect(() => {
    if (!hp && !search) return;
    setLoading(true);
    setError(null);

    async function fetchCards() {
      try {
        const params = new URLSearchParams();
        if (hp) params.append("hp", hp);
        if (search) params.append("search", search);

        const res = await fetch(`/api/search?${params.toString()}`);

        const data = await res.json();
        // console.log("|-o-| CL: data", data);

        const formattedCards = Array.isArray(data.data)
          ? data.data
              .map((card: any) => ({
                set: card.Set,
                number: card.Number,
                name: card.Name,
                type: card.Type,
                aspects: card.Aspects,
                traits: card.Traits,
                arenas: card.Arenas,
                cost: card.Cost,
                power: card.Power,
                hp: card.HP,
                fronttext: card.FrontText,
                doublesided: card.DoubleSided,
                rarity: card.Rarity,
                unique: card.Unique,
                artist: card.Artist,
                varianttype: card.VariantType,
                marketprice: card.MarketPrice,
                foilprice: card.FoilPrice,
                frontArt: card.FrontArt,
                id: `${card.Set}-${card.Number}`, // Creating a unique ID using set and number
              }))
              .sort(dynamicSort(sortKey))
          : [];

        formattedCards.sort(dynamicSort(sortKey));

        setCards(formattedCards);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        setCards([]);
        setLoading(false);
      }
    }
    fetchCards();
  }, [hp, search]);
  // NOTE: Removed dependency of sortKey here. I found that this eliminated the layout shift with load, and
  // that means we're not refetching data every time we choose from the sort dropdown. I added q for search query.

  const displayedCards = useMemo(() => {
    return [...cards].sort(dynamicSort(sortKey));
  }, [sortKey, cards]);

  // console.log("|-o-| CL: cards", cards);

  return (
    <section>
      {loading && <CardLoader />}

      {error && (
        <p className="text-center text-red-500 text-lg font-semibold">
          Error: {error}
        </p>
      )}

      {!loading && !error && displayedCards.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center">
          <Image src="/grogu.png" alt="Grogu image" width={200} height={200} />
          <p className="text-lg font-semibold mt-4">
            No results. Search again.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!loading &&
          displayedCards.map((card) => <Card key={card.id} {...card} />)}
      </div>
    </section>
  );
}

// NOTE: New sorting function to account for if value is equal, to optimize the sorting
function dynamicSort(key: keyof CardData) {
  return function (a: CardData, b: CardData) {
    if (a[key] < b[key]) {
      return -1;
    } else if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  };
}
