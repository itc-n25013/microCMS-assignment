// app/components/ArtistScroll.tsx
import React from "react";

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
  return (
    /* 1. -mx-6 px-6 を追加して、画面端までスクロールしつつ膨らむ余白を確保 */
    /* 2. scrollbar-hide を追加 */
    <div className="flex gap-4 overflow-x-auto pb-8 pt-2 px-6 -mx-6 scrollbar-hide">
      {GUEST_ARTISTS.map((artist) => (
        <div
          key={artist.id}
          /* 3. 背景を bg-white/5 に、文字を text-white に変更 */
          /* 4. hover:-translate-y-2 を追加して、角が切れない浮遊感を追加 */
          className="min-w-[200px] h-32 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-6 shadow-xl hover:bg-white/10 hover:-translate-y-2 transition-all cursor-pointer group"
        >
          <span className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
            {artist.name}
          </span>
        </div>
      ))}
    </div>
  );
}
