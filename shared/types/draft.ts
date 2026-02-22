import type { EpisodeRating, WatchStatus } from './animeEntry';

export interface QueryGetDraft {
  id_draft: string;
}

export interface BodyCreateDraft {
  anilistId: number;
  progress: number;
  status: WatchStatus;
  myTotalRating: number;
  episodeRatings: EpisodeRating[];
  id_user: string;
}
