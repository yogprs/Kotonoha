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
export type MediaSource =
  | 'ORIGINAL'
  | 'MANGA'
  | 'LIGHT_NOVEL'
  | 'VISUAL_NOVEL'
  | 'VIDEO_GAME'
  | 'OTHER'
  | 'NOVEL'
  | 'DOUJINSHI'
  | 'ANIME'
  | 'WEB_NOVEL'
  | 'LIVE_ACTION'
  | 'GAME'
  | 'COMIC'
  | 'MULTIMEDIA_PROJECT'
  | 'PICTURE_BOOK';
export type MediaType = 'ANIME' | 'MANGA';
export type MediaRelation =
  | 'ADAPTATION'
  | 'PREQUEL'
  | 'SEQUEL'
  | 'PARENT'
  | 'SIDE_STORY'
  | 'CHARACTER'
  | 'SUMMARY'
  | 'ALTERNATIVE'
  | 'SPIN_OFF'
  | 'OTHER'
  | 'SOURCE'
  | 'COMPILATION'
  | 'CONTAINS';
export type CharacterRole = 'MAIN' | 'SUPPORTING' | 'BACKGROUND';
export type MediaSort =
  | 'START_DATE_DESC'
  | 'SCORE_DESC'
  | 'POPULARITY_DESC'
  | 'TRENDING_DESC'
  | 'TITLE_ROMAJI_DESC'
  | 'SEARCH_MATCH';

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
    timeUntilAiring: number;
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

export interface MediaStudio {
  id: number;
  name: string;
  siteUrl: string;
}

export interface RelationNode {
  id: string;
  title: {
    romaji: string;
    native: string;
    english: string;
  };
  format: MediaFormat;
  coverImage: {
    large: string;
    extraLarge: string;
  };
  chapters: number | null;
  status: MediaStatus;
}

export interface Relation {
  edges: {
    relationType: MediaRelation;
    node: RelationNode;
  }[];
}

export interface MediaDetailRecommendation {
  mediaRecommendation: {
    id: number;
    title: {
      romaji: string;
      english: string;
    };
    coverImage: {
      extraLarge: string;
      large: string;
    };
    episodes: number;
    status: MediaStatus;
    format: MediaFormat;
    nextAiringEpisode: {
      airingAt: number;
      episode: number;
      timeUntilAiring: number;
    };
  };
}

export interface VoiceActor {
  id: number;
  name: {
    first: string;
    middle: string | null;
    last: string | null;
    full: string;
    native: string;
    userPreferred: string;
  };
  image: {
    large: string;
  };
}

export interface CharacterVoiceActor {
  voiceActor: VoiceActor;
}

export interface Character {
  id: number;
  role: CharacterRole;
  node: {
    name: {
      first: string;
      last: string | null;
      full: string;
      native: string;
      userPreferred: string;
    };
    image: {
      large: string;
    };
  };
  voiceActorRoles: CharacterVoiceActor[];
}

export interface MediaDetail extends Media {
  source: MediaSource;
  type: MediaType;
  countryOfOrigin: any;
  studios: {
    nodes: MediaStudio[];
  };
  relations: Relation;
  recommendations: {
    nodes: MediaDetailRecommendation[];
  };
  characters: {
    edges: Character[];
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

export interface VariableSearchValue {
  search?: string;
  seasonYear?: number;
  season?: MediaSeason;
  format?: MediaFormat;
  sort?: MediaSort[] | MediaSort;
  genres?: string[];
  page?: number;
  type?: MediaType;
}
