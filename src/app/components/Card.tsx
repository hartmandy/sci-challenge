"use client";
import React from 'react';

type CardProps = {
    name: string;
    set: string;
    cost: number;
    power: number;
    hp: string;
    type: string;
    traits: string[];
    rarity: string;
    frontArt: string;
};

export default function Card({ name, set, cost, power, hp, type, traits, rarity, frontArt }: CardProps) {
    return (
        <div
            className="card w-48 h-72 border border-gray-400 rounded-lg p-2 m-2 flex flex-col justify-between items-center text-center text-white font-bold bg-cover bg-center shadow-lg"
            style={{ backgroundImage: `url(${frontArt})` }}
        >
            {/* Image as fallback */}
            {frontArt ? (
                <img src={frontArt} alt={name} className="rounded-lg mb-2 w-full h-auto" />
            ) : (
                <div className="h-32 w-full bg-gray-800 mb-2 rounded-lg" />
            )}
            <h2 className="text-lg">{name}</h2>
            <p>Set: {set}</p>
            <p>Type: {type}</p>
            <p>Traits: {traits?.join(', ')}</p>
            <p>Cost: {cost}</p>
            <p>Power: {power}</p>
            <p>HP: {hp}</p>
            <p>Rarity: {rarity}</p>
        </div>
    );
}
