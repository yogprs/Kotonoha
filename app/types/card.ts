import type { AnimeStatus } from "./data";

export interface CustomCardProps {
    hoverable: boolean;
    useBadgeEp: boolean;
    width?: string;
    height?: string;
    item: {
        id: number;
        title: string;
        img: string;
        status: AnimeStatus;
        format: string;
        episode?: string | number;
        currentEpisode?: string | number;
    };
    imageClass?: string;
    imageSize?: string;
}

export interface CustomCardEmits {
    'toggle': [id: number];
}