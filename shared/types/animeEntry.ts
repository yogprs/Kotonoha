export type WatchStatus =
  | 'PLAN_TO_WATCH'
  | 'WATCHING'
  | 'DROPPED'
  | 'COMPLETED';

export interface EpisodeRating {
  episodeNumber: number;
  rating: number; // Float
  createdAt: Date;
}

export interface AnimeEntry {
  anilistId: string;
  progress: number;
  status: WatchStatus;
  myTotalRatings: EpisodeRating[];
}
