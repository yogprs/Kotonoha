export interface CustomCarouselProps {
    useBadgeEp?: boolean;
    items: {
        title: string;
        img: string;
        status: AnimeStatus;
        format: string;
        episode: string | number;
        currentEpisode?: string | number;
    }[];
}

export type AnimeStatus =
  | 'FINISHED'
  | 'RELEASING'
  | 'NOT_YET_RELEASED'
  | 'CANCELLED'
  | 'HIATUS'