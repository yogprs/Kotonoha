import type { AnimeStatus } from "./data";

export interface TopAnimeProps {
    data: Media[];
    // data: TopAnimeData[];
}

export type TopAnimeData = {
    _id: string;
    title: string;
    coverImage: string;
    genres: string[];
    episodes: number;
    meanScore: number;
    season: string;
    status: AnimeStatus;
    format: string;
}