import { MediaDetail, Recommendations } from '~~/shared/types/anilist';

export interface AnimeResponse {
  data: {
    Page: {
      media: Array<{
        id: number;
        title: {
          romaji: string;
        };
        coverImage: {
          large: string;
        };
      }>;
    };
  };
}

export interface TrendingAnimeResponse {
  data: {
    trending: {
      pageInfo: PageInfo;
      media: Media[];
    };
    // trending: AnimePage & MediaAnime[];
  };
}

export interface PopularAnime {
  popular: {
    pageInfo: PageInfo;
    media: Media[];
  };
}

export interface PopularAnimeResponse {
  data: {
    popular: {
      pageInfo: PageInfo;
      media: Media[];
    };
  };
}

export interface TopAnimeResponse {
  data: {
    top: {
      pageInfo: PageInfo;
      media: Media[];
    };
  };
}

export interface RecommendationsAnimeResponse {
  data: {
    recommendation: {
      pageInfo: PageInfo;
      recommendations: Recommendations[];
    };
  };
}

export interface AnimeDetail {
  anime: MediaDetail;
}

export interface AnimeDetailResponse {
  data: AnimeDetail;
}
