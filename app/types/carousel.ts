import type { AnimeStatus } from "./data";

export interface CustomCarouselProps {
    useBadgeEp?: boolean;
    items: CustomCarouselItem[];
}

export type CustomCarouselItem = {
    id: string;
    title: string;
    img: string;
    status: AnimeStatus;
    format: string;
    episode: string | number;
    currentEpisode?: string | number;
}

