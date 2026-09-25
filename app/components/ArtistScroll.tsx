// app/components/ArtistScroll.tsx
"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const GUEST_ARTISTS = [
  { id: "1", name: "2Pac" },
  { id: "2", name: "Dr. Dre" },
  { id: "3", name: "Snoop Dogg" },
  { id: "4", name: "Kanye West" },
  { id: "5", name: "Backstreet Boys" },
  { id: "6", name: "Smash Mouth" },
  { id: "7", name: "XXXTENTACION" },
  { id: "8", name: "Drake" },
  { id: "9", name: "lilbubblegum" },
  { id: "10", name: "Eminem" },
];

export default function ArtistScroll() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 現在の検索クエリ（?q=xxx）を取得
  const currentQuery = searchParams.get("q") || "";

  const handleArtistClick = (artistName: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // すでにそのアーティストで検索中なら解除（qを削除）、違えば q にセット
    if (currentQuery.toLowerCase() === artistName.toLowerCase()) {
      params.delete("q");
    } else {
      params.set("q", artistName);
    }

    router.replace(`/?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-8 pt-2 px-6 -mx-6 no-scrollbar">
      {GUEST_ARTISTS.map((artist) => {
        // 選択中かどうかの判定（検索キーワードと一致しているか）
        const isSelected =
          currentQuery.length > 0 &&
          artist.name.toLowerCase() === currentQuery.toLowerCase();

        return (
          <div
            key={artist.id}
            onClick={() => handleArtistClick(artist.name)}
            className={`min-w-[200px] h-32 border rounded-2xl flex items-center justify-center p-6 shadow-xl hover:-translate-y-2 transition-all cursor-pointer group ${
              isSelected
                ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-blue-500 ring-2 ring-blue-500/50"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
          >
            <span
              className={`text-lg font-bold transition-colors ${
                isSelected ? "text-blue-400" : "text-white group-hover:text-blue-400"
              }`}
            >
              {artist.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
