"use client";
import React, { useState } from "react";
import CardList from "./components/CardList";
import { ModeToggle } from "./components/ModeToggle";
import CardFilters from "./components/CardFilters";
import Image from "next/image";

export default function Page() {
  // NOTE: Added toggle for light and dark mode to page. I also added a header bar.
  return (
    <main>
      <div className="sticky top-0 left-0 right-0 dark:bg-zinc-900 bg-zinc-100 border-b z-10">
        <div className="container mx-auto flex justify-between p-4">
          <div className="flex items-center rounded-full bg-white p-2 border">
            <Image src="/ship.png" width={20} height={20} alt="ship icon" />
          </div>
          <ModeToggle />
        </div>
      </div>
      <div className="p-4 container mx-auto">
        <CardFilters />
        <CardList />
      </div>
    </main>
  );
}
