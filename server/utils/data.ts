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
