// import type { AnimeEntry } from './animeEntry';

export interface RegisterBody {
  name: string;
  username: string;
  email: string;
  image: string;
  password: string;
  //   animeList: AnimeEntry;
}

export interface LoginBody {
  identifier: string;
  password: string;
}
