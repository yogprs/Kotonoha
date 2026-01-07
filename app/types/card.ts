import type { AnimeStatus } from "./carousel";

export interface CustomCardProps {
    hoverable: boolean;
    useBadgeEp: boolean;
    item: {
        title: string;
        img: string;
        status: AnimeStatus;
        format: string;
        episode: string | number;
        currentEpisode?: string | number;
    };
}