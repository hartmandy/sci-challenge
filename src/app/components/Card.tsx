"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";

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
  fronttext: string;
};

export default function Card({
  name,
  set,
  cost,
  power,
  hp,
  type,
  traits,
  rarity,
  frontArt,
  fronttext,
}: CardProps) {
  const [imageDimensions, setImageDimensions] = useState<{
    width: number | null;
    height: number | null;
  }>({
    width: null,
    height: null,
  });

  // NOTE: Updated UI of cards with ShadCN components

  // Handles image load and updates dimensions of card container. I had to do some research to see how this could be done
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageDimensions({
      width: e.currentTarget.naturalWidth,
      height: e.currentTarget.naturalHeight,
    });
  };

  // Determines if the image is portrait view (height > width)
  const isPortrait =
    imageDimensions.height && imageDimensions.width
      ? imageDimensions.height > imageDimensions.width
      : false;
  const cardHeightClass = isPortrait ? "h-auto" : "h-full md:h-[290px]";

  return (
    <div
      className={`border rounded-3xl flex flex-col shadow-xl overflow-hidden ${cardHeightClass}`}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Image
            src={frontArt}
            alt={name}
            width={750}
            height={1050}
            className="w-full object-cover"
            onLoad={handleImageLoad}
          />
        </PopoverTrigger>
        <PopoverContent
          className="w-[300px] h-[270px]"
          align="center"
          sideOffset={-300}
        >
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none text-lg">{name}</h4>
              <div className="text-sm space-x-2 flex justify-between">
                <span className="text-gray-400">
                  C {cost} | PWR {power} | HP {hp}
                </span>
              </div>
              <p className="text-xs">{fronttext}</p>
            </div>
            <div className="grid gap-2 text-xs">
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="width">Set </Label>
                <p>{set}</p>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="width">Type </Label>
                {type}
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="width">Rarity </Label>
                {rarity}
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="width">Traits </Label>
                {traits?.join(", ")}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
