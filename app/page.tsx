import { getSongs } from "@/lib/microcms";
import SongGrid from "./components/SongGrid";
import FilterSection from "./components/FilterSection";
import ArtistScroll from "./components/ArtistScroll";
import ChartScroll from "./components/ChartScroll";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string }>;
}) {
  const allSongs = await getSongs();
  const params = await searchParams;

  const query = params.q?.toLowerCase() || "";
  const tagQuery = params.tag || "";

  const filteredSongs = allSongs.filter((song) => {
    const titleMatch = song.title.toLowerCase().includes(query);
    const artistMatch = song.artists?.some((a) =>
      a.name.toLowerCase().includes(query),
    );
    const searchMatch = titleMatch || artistMatch;

    const tagMatch =
      !tagQuery ||
      tagQuery === "all" ||
      song.tags?.some((t) => t.name === tagQuery);

    return searchMatch && tagMatch;
  });

  const isInitialState =
    query === "" && (tagQuery === "" || tagQuery === "all");

  const displayLimit = isInitialState ? 12 : 20;
  const displaySongs = filteredSongs.slice(0, displayLimit);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <main className="max-w-[1650px] mx-auto px-6 md:px-12 py-12 space-y-24">
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="flex items-start gap-4">
              <div className="w-1.5 h-12 rounded-full bg-gradient-to-b from-[#ff00ff] via-[#bc13fe] to-[#00f2ff] shadow-[0_0_15px_rgba(0,242,255,0.8)]" />
              <div>
                <h2 className="text-xl font-black tracking-[0.2em] text-gray-300 uppercase">
                  RECOMMENDED SONGS
                </h2>
                <p className="text-gray-500 font-bold mt-1 tracking-widest uppercase text-xs">
                  あなたへの特別選曲
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]"></span>
              <span className="text-sm font-black text-blue-500 tracking-tighter uppercase">
                {filteredSongs.length} SONGS FOUND
              </span>
            </div>
          </div>

          {/* FilterSectionは内部でuseSearchParamsを使用するためSuspenseが必要 */}
          <Suspense
            fallback={
              <div className="h-20 w-full bg-white/5 animate-pulse rounded-2xl" />
            }
          >
            <FilterSection />
          </Suspense>

          <SongGrid songs={displaySongs} isExpanded={!isInitialState} />
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
            <h2 className="text-xl font-black tracking-[0.2em] text-gray-300 uppercase">
              Featured Artists
            </h2>
          </div>
	  {/* Suspenseで囲む */}
          <Suspense fallback={<div className="h-32 w-full bg-white/5 animate-pulse rounded-2xl" />}>
          <ArtistScroll />
	  </Suspense>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-8 bg-purple-600 rounded-full" />
            <h2 className="text-xl font-black tracking-[0.2em] text-gray-300 uppercase">
              Top Charts
            </h2>
          </div>
          <ChartScroll />
        </section>
      </main>

      <footer className="py-20 text-center text-gray-600 text-xs tracking-[0.5em] uppercase border-t border-white/5 mx-12">
        © 2026 Music App Portfolio
      </footer>
    </div>
  );
}
