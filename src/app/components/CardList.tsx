"use client";
import React, { useState, useEffect } from 'react';
import Card from './Card';

type CardData = {
    set: string;
    number: string;
    name: string;
    type: string;
    aspects: string[];
    traits: string[];
    arenas: string[];
    cost: number;
    power: number;
    hp: number;
    fronttext: string;
    doublesided: boolean;
    rarity: string;
    unique: boolean;
    artist: string;
    varianttype: string;
    marketprice: string;
    foilprice: string;
    frontArt: string;
    id?: string;

};

type CardListProps = {
    hp: string;
};


/**
 * A component that displays a list of cards, sorted by a specified key.
 * @param {string} hp - The HP value to filter cards by.
 * @returns {JSX.Element} A component that renders a list of cards.
 */

export default function CardList({ hp }: CardListProps) {
    const [cards, setCards] = useState<CardData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [sortKey, setSortKey] = useState<keyof CardData>('name');

    useEffect(() => {
        if (!hp) return;
        setLoading(true);
        setError(null);

        async function fetchCards() {
            try {
                const res = await fetch(`/api/search?hp=${hp}`);
                if (!res.ok) throw new Error('Failed to fetch cards');
                const data = await res.json();
                console.log("|-o-| CL: data", data);

                const formattedCards = Array.isArray(data.data)
                    ? data.data.map((card: CardData) => ({
                        set: card.set,
                        number: card.number,
                        name: card.name,
                        type: card.type,
                        aspects: card.aspects,
                        traits: card.traits,
                        arenas: card.arenas,
                        cost: card.cost,
                        power: card.power,
                        hp: card.hp,
                        fronttext: card.fronttext,
                        doublesided: card.doublesided,
                        rarity: card.rarity,
                        unique: card.unique,
                        artist: card.artist,
                        varianttype: card.varianttype,
                        marketprice: card.marketprice,
                        foilprice: card.foilprice,
                        frontArt: card.frontArt,
                        id: `${card.set}-${card.number}`, // Ensure ID is dynamically created
                    }))
                    : [];

                setCards(formattedCards);
                setLoading(false);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
                setCards([]);
                setLoading(false);
            }
        }
        fetchCards();
    }, [hp, sortKey]);

    function sortCards(key: keyof CardData) {
        setSortKey(key);
        setCards([...cards].sort((a, b) => (a[key] > b[key] ? 1 : -1)));
    }
    console.log("|-o-| CL: cards", cards);

    return (
        <section className="p-6">
            <div className="flex justify-center gap-4 mb-6">
                <button onClick={() => sortCards('name')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Sort by Name
                </button>
                <button onClick={() => sortCards('set')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Sort by Set
                </button>
                <button onClick={() => sortCards('cost')} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    Sort by Cost
                </button>
                <button onClick={() => sortCards('power')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Sort by Power
                </button>
            </div>
            {loading && <p className="text-center text-lg font-semibold">Loading cards...</p>}
            {error && <p className="text-center text-red-500 text-lg font-semibold">Error: {error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards.map((card) => (
                    <Card key={card.id} {...card} />
                ))}
            </div>
        </section>
    );
}
