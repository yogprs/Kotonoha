import {
  MediaFormat,
  MediaSeason,
  MediaSort,
  VariableSearchValue,
} from '~~/shared/types/anilist';

export const filterMediaHero = (media: Media[]) => {
  const filtered = media?.filter(
    (item) =>
      item.trailer &&
      item.trailer.id &&
      item.id !== 21 &&
      item.bannerImage &&
      item.status !== 'NOT_YET_RELEASED',
  );

  // const randomIndex = Math.floor(Math.random() * filtered.length);

  const randomIndexes = [...filtered]
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  return randomIndexes?.map((item, index) => ({
    ...item,
    index: index + 1, // Memberikan nomor urut 1-5
  }));
  // return {
  //     ...media[randomIndex],
  //     index: randomIndex + 1,
  // };
};

export const variablesSearch = (
  currentPage: number,
  search?: string,
  year?: number,
  season?: MediaSeason,
  format?: MediaFormat,
  genres?: string[],
  sortBy?: MediaSort[] | MediaSort,
): VariableSearchValue => {
  return {
    ...(search && {
      search: search,
      ...(!sortBy && { sort: 'SEARCH_MATCH' }),
    }),
    type: 'ANIME',
    ...(year && { year }),
    ...(season && { season }),
    ...(format && { format }),
    ...(genres && { genres }),
    ...(sortBy && { sort: sortBy }),
    ...(currentPage && { page: currentPage }),
  };
};

export function isValidEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
