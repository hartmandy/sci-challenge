"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Card from "./Card";
import { useSearchParams } from "next/navigation";
import { CardData } from "../types";
import CardLoader from "./CardLoader";

type CardListProps = {
  hp: string;
};

/**
 * A component that displays a list of cards, sorted by a specified key.
 * @param {string} hp - The HP value to filter cards by.
 * @returns {JSX.Element} A component that renders a list of cards.
 */

export default function CardList() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // NOTE: Added URL search params for filters
  const searchParams = useSearchParams();
  const sortKey = (searchParams.get("sort") || "name") as keyof CardData;
  const hp = searchParams.get("hp") || "5";

  useEffect(() => {
    if (!hp) return;
    setLoading(true);
    setError(null);

    async function fetchCards() {
      try {
        const res = await fetch(`/api/search?hp=${encodeURIComponent(hp)}`);
        if (!res.ok) throw new Error("Failed to fetch cards");
        const data = await res.json();
        console.log("|-o-| CL: data", data);

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
  }, [hp]);
  // NOTE: Removed dependency of sortKey here. I found that this eliminated the cards 'jumping' with load, and
  // that means we're not refetching data every time we click a sort button

  const displayedCards = useMemo(() => {
    let filteredCards = cards;

    return filteredCards.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
  }, [hp, sortKey, cards]);

  console.log("|-o-| CL: cards", cards);

  return (
    <section>
      {loading && <CardLoader />}
      {error && (
        <p className="text-center text-red-500 text-lg font-semibold">
          Error: {error}
        </p>
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
