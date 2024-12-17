"use client";
import React, { useState } from "react";
import CardList from "./components/CardList";
import { ModeToggle } from "./components/ModeToggle";
import CardFilters from "./components/CardFilters";

export default function Page() {
  // NOTE: Added toggle for light and dark mode to page
  return (
    <main>
      <div className="sticky top-0 left-0 right-0 dark:bg-zinc-900 bg-zinc-100 border-b z-10">
        <div className="container mx-auto flex justify-between p-4">
          <CardFilters />
          <ModeToggle />
        </div>
      </div>
      <div className="p-4 container mx-auto">
        <CardList />
      </div>
    </main>
  );
}
