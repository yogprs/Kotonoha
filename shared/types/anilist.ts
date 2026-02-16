export type MediaSeason = 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';
export type MediaFormat =
  | 'TV'
  | 'TV_SHORT'
  | 'MOVIE'
  | 'SPECIAL'
  | 'OVA'
  | 'ONA'
  | 'MUSIC'
  | 'MANGA'
  | 'NOVEL'
  | 'ONE_SHOT';
export type MediaStatus =
  | 'FINISHED'
  | 'RELEASING'
  | 'NOT_YET_RELEASED'
  | 'CANCELED'
  | 'HIATUS';

export interface FuzzyDate {
  day: number;
  month: number;
  year: number;
}

export interface PageInfo {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}

export interface AnimePage {
  pageInfo: PageInfo;
}

export interface Media {
  id: number;
  idMal: number;
  title: {
    romaji: string;
    english: string;
    userPrefered: string;
  };
  coverImage: {
    large: string;
    extraLarge: string;
    color: string;
  };
  description: string;
  bannerImage: string;
  episodes: number;
  status: MediaStatus;
  duration: number;
  genres: string[];
  season: MediaSeason;
  format: MediaFormat;
  averageScore: number;
  popularity: number;
  nextAiringEpisode: {
    airingAt: number;
    episode: number;
  };
  seasonYear: number;
  startDate: FuzzyDate;
  endDate: FuzzyDate;
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  };
}

export interface MediaAnime {
  media: Media;
}

export interface TrendingAnime {
  trending: {
    pageInfo: PageInfo;
    media: Media[];
  };
}

export interface TopAnime {
  top: {
    pageInfo: PageInfo;
    media: Media[];
  };
}

export interface TrendingAnimeWithSection extends TrendingAnime {
  heroSection: Media[];
}

export interface PopularAnime {
  popular: {
    pageInfo: PageInfo;
    media: Media[];
  };
}

export interface Recommendations {
  id: number;
  media: Media;
}

export interface RecommendationsAnime {
  recommendation: {
    pageInfo: PageInfo;
    recommendations: Recommendations[];
  };
}
