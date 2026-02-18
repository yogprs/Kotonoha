export const queryGetAnime = `
    query($page: Int, $perPage: Int, $genre: String){
        Page(page: $page, perPage: $perPage) {
            pageInfo {
            currentPage
            hasNextPage
            lastPage
            perPage
            total
            }
            media(genre: $genre) {
            id
            idMal
            title {
                native
                romaji
            }
            genres
            startDate {
                day
                month
                year
            }
            endDate {
                day
                month
                year
            }
            season
            meanScore
            type
            format
            status
            favourites
            episodes
            coverImage {
                color
                extraLarge
                large
                medium
            }
            bannerImage
            averageScore
            description
            duration
            favourites
            externalLinks {
                id
                url
                site
                siteId
                type
                language
                color
                icon
                notes
                isDisabled
            }
            isAdult
            trending
            synonyms
            streamingEpisodes {
                site
                title
                url
                thumbnail
            }
            }
        }
    }`;

export const queryTrendingAnime = `
    query($perPage: Int, $page: Int) {
        trending: Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
            }
            media (sort :TRENDING_DESC, type : ANIME){
                id
                idMal
                title {
                    romaji
                    english
                    userPreferred
                }
                coverImage {
                    large
                    extraLarge
                    color
                }
                description
                bannerImage
                episodes
                status
                duration
                genres
                season
                format
                averageScore
                popularity
                nextAiringEpisode {
                    airingAt
                    episode
                }
                seasonYear
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
                trailer {
                    id
                    site
                    thumbnail
                }
            }
        }
    }
`;

export const queryPopularAnime = `
    query($perPage: Int, $page: Int) {
        popular: Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
            }
            media (sort :POPULARITY_DESC, type : ANIME){
                id
                idMal
                title {
                    romaji
                    english
                    userPreferred
                }
                coverImage {
                    large
                    extraLarge
                    color
                }
                episodes
                status
                duration
                genres
                description
                bannerImage
                season
                format
                averageScore
                popularity
                nextAiringEpisode {
                    airingAt
                    episode
                }
                seasonYear
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
            }
        }
    }
`;

export const queryTopAnime = `
    query($perPage: Int, $page: Int) {
        top: Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
            }
            media (sort :SCORE_DESC, type : ANIME){
                id
                idMal
                title {
                    romaji
                    english
                    userPreferred
                }
                coverImage {
                    large
                    extraLarge
                    color
                }
                episodes
                status
                duration
                genres
                season
                format
                averageScore
                popularity
                nextAiringEpisode {
                    airingAt
                    episode
                }
                seasonYear
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
            }
        }
    }
`;

export const queryRecommendationsAnime = `
     query($perPage: Int, $page: Int) {
        recommendation: Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
            }
            recommendations(sort: RATING_DESC) {
                id
                media {
                    id
                    idMal
                    title {
                        romaji
                        english
                        userPreferred
                    }
                    coverImage {
                        large
                        extraLarge
                        color
                    }
                    episodes
                    status
                    duration
                    genres
                    season
                    format
                    averageScore
                    popularity
                    nextAiringEpisode {
                        airingAt
                        episode
                    }
                    seasonYear
                    startDate {
                        year
                        month
                        day
                    }
                    endDate {
                        year
                        month
                        day
                    }
                }
            }
        }
    }
`;

export const queryDetailAnime = `
    query Media($mediaId: Int) {
        anime: Media(id: $mediaId) {
            id
            idMal
            title {
                romaji
                english
                userPreferred
            }
            coverImage {
                large
                extraLarge
                color
            }
            description
            bannerImage
            episodes
            status
            duration
            genres
            source
            type
            seasonYear
            season
            format
            averageScore
            popularity
            countryOfOrigin
            nextAiringEpisode {
                airingAt
                episode
                timeUntilAiring
            }
            seasonYear
            startDate {
                year
                month
                day
            }
            endDate {
                year
                month
                day
            }
            trailer {
                id
                site
                thumbnail
            }
            studios(isMain: true) {
                nodes {
                    id
                    name
                    siteUrl
                }
            }
            relations {
                edges {
                    relationType(version: 2)
                    node {
                        id
                        title {
                            romaji
                            native
                            english
                        }
                        format
                        coverImage{
                            large
                            extraLarge
                        }
                        episodes
                        chapters
                        status
                    }
                }
            }
            recommendations {
                nodes {
                    mediaRecommendation {
                        id
                        title {
                            romaji
                            english
                        }
                        coverImage {
                            extraLarge
                            large
                        }
                        episodes
                        status
                        format
                        nextAiringEpisode {
                        airingAt
                        timeUntilAiring
                        episode
                        }
                    }
                }
            }
            characters {
                edges { 
                    id
                    role
                    node {
                        name {
                            first
                            last
                            full
                            native
                            userPreferred
                        }
                        image {
                            large
                        }
                    }
                    voiceActorRoles {
                        voiceActor {
                            id
                            name {
                                first
                                middle
                                last
                                full
                                native
                                userPreferred
                            }
                            image {
                                large
                            }
                        }
                    }
                }
            }
        }
    }
`;
