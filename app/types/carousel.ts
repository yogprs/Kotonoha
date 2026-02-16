import type { AnimeStatus } from './data';

export interface CustomCarouselProps {
  useBadgeEp?: boolean;
  media: Media[];
  useIndex?: boolean;
}

export type CustomCarouselItem = {
  id: number;
  title: string;
  img: string;
  status: AnimeStatus;
  format: string;
  episode: number;
  currentEpisode?: number;
};
