export const filterMediaHero = (media: Media[]) => {
    const filtered = media?.filter(
        (item) =>
        item.trailer &&
        item.trailer.id &&
        item.id !== 21 &&
        item.bannerImage &&
        item.status !== "NOT_YET_RELEASED"
    );

    const randomIndex = Math.floor(Math.random() * filtered.length);
    return {
        ...media[randomIndex],
        index: randomIndex + 1,
    };
}