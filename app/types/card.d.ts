import type { AnimeStatus } from "./data";

export interface CustomCardProps {
    hoverable: boolean;
    useBadgeEp: boolean;
    width?: string;
    height?: string;
    item: {
        id: string;
        title: string;
        img: string;
        status: AnimeStatus;
        format: string;
        episode?: string | number;
        currentEpisode?: string | number;
    };
}

export interface CustomCardEmits {
    'toggle': [id: string];
}