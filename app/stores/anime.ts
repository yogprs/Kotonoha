export const useAnimeStore = defineStore('anime', {
    state: () => ({
        trending: {} as TrendingAnime,
    }),

    actions: {
        setTrending(data: TrendingAnime) {
            this.trending = data;
        }
    }
});

// export const useAnimeStore = defineStore('anime', {
//     state: () => ({
//         data: [] as any
//     }),

//     actions: {
//         async getAnime() {
//             const query = `
//                 query($page: Int, $perPage: Int, $genre: String){
//                     Page(page: $page, perPage: $perPage) {
//                         pageInfo {
//                         currentPage
//                         hasNextPage
//                         lastPage
//                         perPage
//                         total
//                         }
//                         media(genre: $genre) {
//                         id
//                         idMal
//                         title {
//                             native
//                             romaji
//                         }
//                         genres
//                         startDate {
//                             day
//                             month
//                             year
//                         }
//                         endDate {
//                             day
//                             month
//                             year
//                         }
//                         season
//                         meanScore
//                         type
//                         format
//                         status
//                         favourites
//                         episodes
//                         coverImage {
//                             color
//                             extraLarge
//                             large
//                             medium
//                         }
//                         bannerImage
//                         averageScore
//                         description
//                         duration
//                         favourites
//                         externalLinks {
//                             id
//                             url
//                             site
//                             siteId
//                             type
//                             language
//                             color
//                             icon
//                             notes
//                             isDisabled
//                         }
//                         isAdult
//                         trending
//                         synonyms
//                         streamingEpisodes {
//                             site
//                             title
//                             url
//                             thumbnail
//                         }
//                         }
//                     }
//                 }`
//             const config = useRuntimeConfig()
//             const url = config.public.anilistAPI as string;
//             console.log(url)

//             const res = await $fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: {
//                     query,
//                     variables: {
//                         "page": 1,
//                         "perPage": 10,
//                         "genre": "slice of life"
//                     }
//                 },
//             })

//             console.log(res)
//         }
//     }
// })