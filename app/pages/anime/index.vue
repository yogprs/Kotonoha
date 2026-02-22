<script setup lang="ts">
import type {
  MediaSeason,
  MediaFormat,
  MediaSort,
  PageInfo,
  Media,
} from '~~/shared/types/anilist';

const route = useRoute();
const router = useRouter();

// Valid values for type-checking route params
const validSorts: MediaSort[] = [
  'POPULARITY_DESC',
  'SCORE_DESC',
  'TRENDING_DESC',
  'START_DATE_DESC',
  'TITLE_ROMAJI_DESC',
  'SEARCH_MATCH',
];
const validFormats: MediaFormat[] = [
  'TV',
  'TV_SHORT',
  'MOVIE',
  'SPECIAL',
  'OVA',
  'ONA',
  'MUSIC',
  'MANGA',
  'NOVEL',
  'ONE_SHOT',
];
const validSeasons: MediaSeason[] = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];

// Filter State
const search = ref('');
const searchDebounced = ref('');
const currentPage = ref(1);
const selectedSeason = ref<MediaSeason | ''>('');
const selectedYear = ref<number | ''>('');
const selectedFormat = ref<MediaFormat | ''>('');
const selectedGenre = ref<string | ''>('');
const selectedSort = ref<MediaSort>('POPULARITY_DESC');

// Apply route query params to filter state
const applyRouteParams = () => {
  const q = route.query;

  // Search
  if (q.search && typeof q.search === 'string') {
    search.value = q.search;
    searchDebounced.value = q.search;
  }

  // Sort
  if (
    q.sort &&
    typeof q.sort === 'string' &&
    validSorts.includes(q.sort as MediaSort)
  ) {
    selectedSort.value = q.sort as MediaSort;
  }

  // Format
  if (
    q.format &&
    typeof q.format === 'string' &&
    validFormats.includes(q.format as MediaFormat)
  ) {
    selectedFormat.value = q.format as MediaFormat;
  }

  // Season
  if (
    q.season &&
    typeof q.season === 'string' &&
    validSeasons.includes(q.season as MediaSeason)
  ) {
    selectedSeason.value = q.season as MediaSeason;
  }

  // Year
  if (q.seasonYear && typeof q.seasonYear === 'string') {
    const year = parseInt(q.seasonYear, 10);
    if (!isNaN(year)) selectedYear.value = year;
  }

  // Genre
  if (q.genres && typeof q.genres === 'string') {
    selectedGenre.value = q.genres;
  }

  // Page
  if (q.page && typeof q.page === 'string') {
    const page = parseInt(q.page, 10);
    if (!isNaN(page) && page >= 1) currentPage.value = page;
  }

  // Auto-open filters if any advanced filter params exist
  if (
    selectedSeason.value ||
    selectedYear.value ||
    selectedFormat.value ||
    selectedGenre.value
  ) {
    showFilters.value = true;
  }
};

// Debounce search input
let searchTimeout: ReturnType<typeof setTimeout>;
const onSearchInput = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    searchDebounced.value = search.value;
    currentPage.value = 1;
  }, 400);
};

// Options
const seasonOptions: { label: string; value: MediaSeason | '' }[] = [
  { label: 'All Seasons', value: '' },
  { label: 'Winter', value: 'WINTER' },
  { label: 'Spring', value: 'SPRING' },
  { label: 'Summer', value: 'SUMMER' },
  { label: 'Fall', value: 'FALL' },
];

const currentYear = new Date().getFullYear();
const yearOptions = [
  { label: 'All Years', value: '' as const },
  ...Array.from({ length: 30 }, (_, i) => ({
    label: `${currentYear + 1 - i}`,
    value: currentYear + 1 - i,
  })),
];

const formatOptions: { label: string; value: MediaFormat | '' }[] = [
  { label: 'All Formats', value: '' },
  { label: 'TV', value: 'TV' },
  { label: 'TV Short', value: 'TV_SHORT' },
  { label: 'Movie', value: 'MOVIE' },
  { label: 'Special', value: 'SPECIAL' },
  { label: 'OVA', value: 'OVA' },
  { label: 'ONA', value: 'ONA' },
  // { label: 'Music', value: 'MUSIC' },
];

const genreOptions = [
  '',
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Ecchi',
  'Fantasy',
  'Horror',
  'Mahou Shoujo',
  'Mecha',
  'Music',
  'Mystery',
  'Psychological',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Sports',
  'Supernatural',
  'Thriller',
];

const sortOptions: { label: string; value: MediaSort }[] = [
  { label: 'Popularity', value: 'POPULARITY_DESC' },
  { label: 'Score', value: 'SCORE_DESC' },
  { label: 'Trending', value: 'TRENDING_DESC' },
  { label: 'Newest', value: 'START_DATE_DESC' },
  { label: 'Title', value: 'TITLE_ROMAJI_DESC' },
];

// API Query
interface AnimeSearchResponse {
  search: {
    pageInfo: PageInfo;
    media: Media[];
  };
}

const queryParams = computed(() => {
  const params: Record<string, string | number> = {
    page: currentPage.value,
  };
  if (searchDebounced.value) params.search = searchDebounced.value;
  if (selectedSeason.value) params.season = selectedSeason.value;
  if (selectedYear.value) params.seasonYear = selectedYear.value;
  if (selectedFormat.value) params.format = selectedFormat.value;
  if (selectedGenre.value) params.genres = selectedGenre.value;
  if (selectedSort.value) params.sort = selectedSort.value;
  return params;
});

const {
  data: animeData,
  error,
  status,
} = useLazyFetch<AnimeSearchResponse>('/api/anime', {
  server: false,
  query: queryParams,
});

const animeList = computed(() => animeData.value?.search?.media ?? []);
const pageInfo = computed(() => animeData.value?.search?.pageInfo);
const isLoading = computed(() => status.value === 'pending');

// Filter controls
const showFilters = ref(false);

const resetFilters = () => {
  search.value = '';
  searchDebounced.value = '';
  selectedSeason.value = '';
  selectedYear.value = '';
  selectedFormat.value = '';
  selectedGenre.value = '';
  selectedSort.value = 'POPULARITY_DESC';
  currentPage.value = 1;
  // Also clean up the URL
  router.replace({ path: '/anime', query: {} });
};

const hasActiveFilters = computed(() => {
  return (
    searchDebounced.value ||
    selectedSeason.value ||
    selectedYear.value ||
    selectedFormat.value ||
    selectedGenre.value ||
    selectedSort.value !== 'POPULARITY_DESC'
  );
});

// Dynamic page title
const pageTitle = computed(() => {
  if (searchDebounced.value)
    return `Search: "${searchDebounced.value}" | Kotonoha`;
  if (selectedSort.value === 'TRENDING_DESC')
    return 'Trending Anime | Kotonoha';
  if (selectedFormat.value === 'MOVIE') return 'Anime Movies | Kotonoha';
  if (selectedFormat.value)
    return `${formatMediaFormat(selectedFormat.value)} Anime | Kotonoha`;
  return 'Anime List | Kotonoha';
});

// Dynamic page heading
const pageHeading = computed(() => {
  if (searchDebounced.value) return `Search: "${searchDebounced.value}"`;
  if (selectedSort.value === 'TRENDING_DESC') return 'Trending Anime';
  if (selectedFormat.value === 'MOVIE') return 'Anime Movies';
  if (selectedFormat.value)
    return `${formatMediaFormat(selectedFormat.value)} Anime`;
  return 'Anime List';
});

const pageDescription = computed(() => {
  if (searchDebounced.value)
    return `Showing results for "${searchDebounced.value}"`;
  if (selectedSort.value === 'TRENDING_DESC')
    return 'The hottest anime trending right now';
  if (selectedFormat.value === 'MOVIE') return 'Explore the best anime movies';
  return 'Discover and explore anime from the vast AniList data';
});

// Pagination
const goToPage = (page: number) => {
  if (page < 1 || (pageInfo.value && page > pageInfo.value.lastPage)) return;
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const visiblePages = computed(() => {
  if (!pageInfo.value) return [];
  const last = pageInfo.value.lastPage;
  const current = currentPage.value;
  const pages: (number | string)[] = [];

  if (last <= 7) {
    for (let i = 1; i <= last; i++) pages.push(i);
    return pages;
  }

  pages.push(1);

  if (current > 3) pages.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(last - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < last - 2) pages.push('...');

  pages.push(last);

  return pages;
});

// Watch filter changes to reset to page 1
watch(
  [selectedSeason, selectedYear, selectedFormat, selectedGenre, selectedSort],
  () => {
    currentPage.value = 1;
  },
);

// Watch route query changes (e.g. when user navigates via navbar)
watch(
  () => route.query,
  () => {
    // Reset filters first, then apply new route params
    search.value = '';
    searchDebounced.value = '';
    selectedSeason.value = '';
    selectedYear.value = '';
    selectedFormat.value = '';
    selectedGenre.value = '';
    selectedSort.value = 'POPULARITY_DESC';
    currentPage.value = 1;
    showFilters.value = false;

    applyRouteParams();
  },
);

useHead({
  title: pageTitle,
});

// Apply route params on initial load
applyRouteParams();
</script>

<template>
  <div
    class="min-h-screen bg-bg-dark text-white pb-20 relative overflow-hidden"
  >
    <!-- Background Decoration -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div
        class="absolute top-0 left-1/4 w-150 h-150 bg-primary/5 rounded-full blur-[120px]"
      ></div>
      <div
        class="absolute bottom-1/4 right-0 w-100 h-100 bg-anime-accent/5 rounded-full blur-[100px]"
      ></div>
    </div>

    <div
      class="relative z-10 container mx-auto px-4 md:px-8 lg:px-14 pt-24 md:pt-28"
    >
      <!-- Page Header -->
      <div class="mb-8">
        <h1
          class="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-white via-white to-text-secondary"
        >
          {{ pageHeading }}
        </h1>
        <p class="mt-2 text-text-secondary text-base md:text-lg font-light">
          {{ pageDescription }}
        </p>
      </div>

      <!-- Search & Filter Bar -->
      <div class="mb-6">
        <div class="flex flex-col md:flex-row gap-3">
          <!-- Search Input -->
          <div class="relative flex-1">
            <UIcon
              name="i-material-symbols:search"
              class="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-secondary pointer-events-none z-10"
            />
            <input
              id="anime-search"
              v-model="search"
              type="text"
              placeholder="Search anime..."
              class="w-full pl-12 pr-4 py-3 rounded-xl bg-surface-dark/60 border border-white/10 text-white placeholder-text-secondary focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all backdrop-blur-sm"
              @input="onSearchInput"
            />
          </div>

          <!-- Sort Dropdown -->
          <div class="relative min-w-45">
            <select
              id="anime-sort"
              v-model="selectedSort"
              class="w-full h-full px-4 py-3 rounded-xl bg-surface-dark/60 border border-white/10 text-white appearance-none cursor-pointer focus:outline-none focus:border-primary/60 transition-all backdrop-blur-sm"
            >
              <option
                v-for="opt in sortOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
            <UIcon
              name="i-material-symbols:sort"
              class="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-text-secondary pointer-events-none"
            />
          </div>

          <!-- Toggle Filters -->
          <button
            id="anime-filter-toggle"
            class="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border transition-all cursor-pointer"
            :class="
              showFilters
                ? 'bg-primary/20 border-primary/40 text-primary'
                : 'bg-surface-dark/60 border-white/10 text-text-secondary hover:border-primary/30 hover:text-white'
            "
            @click="showFilters = !showFilters"
          >
            <UIcon name="i-material-symbols:tune" class="size-5" />
            <span class="text-sm font-medium">Filters</span>
            <span
              v-if="hasActiveFilters"
              class="w-2 h-2 rounded-full bg-anime-accent animate-pulse"
            ></span>
          </button>
        </div>

        <!-- Expanded Filters -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-2 max-h-0"
          enter-to-class="opacity-100 translate-y-0 max-h-[500px]"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0 max-h-[500px]"
          leave-to-class="opacity-0 -translate-y-2 max-h-0"
        >
          <div v-if="showFilters" class="mt-4 overflow-hidden">
            <div class="glass rounded-2xl p-5 md:p-6">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <!-- Season -->
                <div>
                  <label
                    class="block text-xs text-text-secondary uppercase tracking-wider mb-2 font-semibold"
                    >Season</label
                  >
                  <select
                    id="anime-filter-season"
                    v-model="selectedSeason"
                    class="w-full px-3 py-2.5 rounded-lg bg-bg-dark/60 border border-white/10 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-primary/60 transition-all"
                  >
                    <option
                      v-for="opt in seasonOptions"
                      :key="opt.value"
                      :value="opt.value"
                    >
                      {{ opt.label }}
                    </option>
                  </select>
                </div>

                <!-- Year -->
                <div>
                  <label
                    class="block text-xs text-text-secondary uppercase tracking-wider mb-2 font-semibold"
                    >Year</label
                  >
                  <select
                    id="anime-filter-year"
                    v-model="selectedYear"
                    class="w-full px-3 py-2.5 rounded-lg bg-bg-dark/60 border border-white/10 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-primary/60 transition-all"
                  >
                    <option
                      v-for="opt in yearOptions"
                      :key="opt.value"
                      :value="opt.value"
                    >
                      {{ opt.label }}
                    </option>
                  </select>
                </div>

                <!-- Format -->
                <div>
                  <label
                    class="block text-xs text-text-secondary uppercase tracking-wider mb-2 font-semibold"
                    >Format</label
                  >
                  <select
                    id="anime-filter-format"
                    v-model="selectedFormat"
                    class="w-full px-3 py-2.5 rounded-lg bg-bg-dark/60 border border-white/10 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-primary/60 transition-all"
                  >
                    <option
                      v-for="opt in formatOptions"
                      :key="opt.value"
                      :value="opt.value"
                    >
                      {{ opt.label }}
                    </option>
                  </select>
                </div>

                <!-- Genre -->
                <div>
                  <label
                    class="block text-xs text-text-secondary uppercase tracking-wider mb-2 font-semibold"
                    >Genre</label
                  >
                  <select
                    id="anime-filter-genre"
                    v-model="selectedGenre"
                    class="w-full px-3 py-2.5 rounded-lg bg-bg-dark/60 border border-white/10 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-primary/60 transition-all"
                  >
                    <option value="">All Genres</option>
                    <option
                      v-for="genre in genreOptions.slice(1)"
                      :key="genre"
                      :value="genre"
                    >
                      {{ genre }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Active Filter Tags & Reset -->
              <div
                v-if="hasActiveFilters"
                class="mt-4 flex items-center flex-wrap gap-2"
              >
                <span
                  v-if="searchDebounced"
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-primary/15 text-primary border border-primary/20"
                >
                  <UIcon name="i-material-symbols:search" class="size-3" />
                  "{{ searchDebounced }}"
                </span>
                <span
                  v-if="selectedSeason"
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-anime-accent/15 text-anime-accent border border-anime-accent/20"
                >
                  {{ formatStatusText(selectedSeason) }}
                </span>
                <span
                  v-if="selectedYear"
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-anime-gold/15 text-anime-gold border border-anime-gold/20"
                >
                  {{ selectedYear }}
                </span>
                <span
                  v-if="selectedFormat"
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-blue-400/15 text-blue-400 border border-blue-400/20"
                >
                  {{ formatMediaFormat(selectedFormat) }}
                </span>
                <span
                  v-if="selectedGenre"
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-green-400/15 text-green-400 border border-green-400/20"
                >
                  {{ selectedGenre }}
                </span>

                <button
                  id="anime-filter-reset"
                  class="ml-auto text-xs text-text-secondary hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                  @click="resetFilters"
                >
                  <UIcon name="i-material-symbols:close" class="size-4" />
                  Reset All
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Results Meta -->
      <div class="flex items-center justify-between mb-6">
        <p class="text-sm text-text-secondary">
          <template v-if="pageInfo?.total">
            <span class="text-white font-semibold">{{
              pageInfo.total.toLocaleString()
            }}</span>
            anime found
          </template>
          <template v-else-if="isLoading"> Searching... </template>
          <template v-else> No results </template>
        </p>
        <p v-if="pageInfo" class="text-sm text-text-secondary">
          Page
          <span class="text-white font-semibold">{{
            pageInfo.currentPage
          }}</span>
          of
          <span class="text-white font-semibold">{{ pageInfo.lastPage }}</span>
        </p>
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoading && animeList.length === 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5"
      >
        <div v-for="n in 20" :key="n" class="animate-pulse">
          <div class="aspect-2/3 rounded-xl bg-surface-dark/60"></div>
          <div class="mt-3 space-y-2">
            <div class="h-4 bg-surface-dark/60 rounded w-3/4"></div>
            <div class="h-3 bg-surface-dark/40 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center py-20"
      >
        <div class="glass p-8 rounded-2xl text-center max-w-md">
          <UIcon
            name="i-material-symbols:error-outline"
            class="size-16 text-red-400 mx-auto mb-4"
          />
          <h2 class="text-xl font-bold text-red-400 mb-2">
            Failed to load anime
          </h2>
          <p class="text-text-secondary text-sm">
            {{ error?.message || 'Something went wrong. Please try again.' }}
          </p>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!isLoading && animeList.length === 0"
        class="flex flex-col items-center justify-center py-20"
      >
        <div class="glass p-8 rounded-2xl text-center max-w-md">
          <UIcon
            name="i-material-symbols:search-off"
            class="size-16 text-text-secondary mx-auto mb-4"
          />
          <h2 class="text-xl font-bold mb-2">No anime found</h2>
          <p class="text-text-secondary text-sm mb-4">
            Try adjusting your search or filter criteria.
          </p>
          <button
            class="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-colors cursor-pointer"
            @click="resetFilters"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Anime Grid (Catalog View) -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5"
        :class="{ 'opacity-50 pointer-events-none': isLoading }"
      >
        <NuxtLink
          v-for="anime in animeList"
          :key="anime.id"
          :to="`/anime/${anime.id}`"
          class="group relative flex flex-col cursor-pointer"
        >
          <!-- Cover Image -->
          <div
            class="relative aspect-2/3 rounded-xl overflow-hidden bg-surface-dark ring-1 ring-white/5 transition-all duration-300 group-hover:ring-primary/60 group-hover:shadow-lg group-hover:shadow-primary/10"
          >
            <NuxtImg
              v-if="anime.coverImage?.extraLarge || anime.coverImage?.large"
              :src="anime.coverImage?.extraLarge || anime.coverImage?.large"
              :alt="anime.title?.romaji"
              class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            <!-- Score Badge -->
            <div
              v-if="anime.averageScore"
              class="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-xs font-bold"
            >
              <UIcon
                name="i-material-symbols:star"
                class="size-3.5 text-anime-gold"
              />
              <span class="text-white">{{
                (anime.averageScore / 10).toFixed(1)
              }}</span>
            </div>

            <!-- Status Badge -->
            <div
              v-if="anime.status === 'RELEASING'"
              class="absolute top-2 left-2 px-2 py-1 rounded-lg bg-green-500/20 backdrop-blur-sm border border-green-500/30"
            >
              <span
                class="text-[10px] font-bold text-green-400 uppercase tracking-wider"
                >Airing</span
              >
            </div>

            <!-- Hover Overlay -->
            <div
              class="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3"
            >
              <!-- Genres -->
              <div class="flex flex-wrap gap-1 mb-2">
                <span
                  v-for="genre in anime.genres?.slice(0, 3)"
                  :key="genre"
                  class="text-[10px] px-1.5 py-0.5 rounded bg-white/15 text-gray-200"
                >
                  {{ genre }}
                </span>
              </div>
              <!-- Airing Info -->
              <div class="flex items-center gap-2 text-[11px] text-gray-300">
                <span v-if="anime.format" class="capitalize">{{
                  anime.format?.replace('_', ' ')
                }}</span>
                <span
                  v-if="anime.format && anime.episodes"
                  class="text-white/30"
                  >•</span
                >
                <span v-if="anime.episodes">{{ anime.episodes }} ep</span>
              </div>
            </div>
          </div>

          <!-- Info Below Card -->
          <div class="mt-2.5 px-0.5 space-y-1">
            <h3
              class="text-sm font-semibold leading-snug line-clamp-2 text-gray-100 group-hover:text-primary transition-colors duration-200"
            >
              {{ anime.title?.romaji || anime.title?.english || '-' }}
            </h3>
            <div class="flex items-center gap-2 text-xs text-text-secondary">
              <span v-if="anime.seasonYear">{{ anime.seasonYear }}</span>
              <span
                v-if="anime.seasonYear && anime.format"
                class="text-white/20"
                >•</span
              >
              <span v-if="anime.format">{{
                formatMediaFormat(anime.format)
              }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Pagination -->
      <div
        v-if="pageInfo && pageInfo.lastPage > 1"
        class="mt-12 flex justify-center"
      >
        <nav class="inline-flex items-center gap-1.5" aria-label="Pagination">
          <!-- Previous -->
          <button
            id="anime-page-prev"
            :disabled="currentPage <= 1"
            class="p-2.5 rounded-xl border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            :class="
              currentPage <= 1
                ? 'border-white/5 text-text-secondary'
                : 'border-white/10 text-white hover:bg-primary/10 hover:border-primary/40'
            "
            @click="goToPage(currentPage - 1)"
          >
            <UIcon name="i-material-symbols:chevron-left" class="size-5" />
          </button>

          <!-- Page Numbers -->
          <template v-for="page in visiblePages" :key="page">
            <span
              v-if="page === '...'"
              class="px-2 text-text-secondary text-sm select-none"
            >
              ⋯
            </span>
            <button
              v-else
              class="min-w-10.5 h-10.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
              :class="
                page === currentPage
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'border border-white/10 text-text-secondary hover:text-white hover:bg-surface-dark/60 hover:border-primary/30'
              "
              @click="goToPage(page as number)"
            >
              {{ page }}
            </button>
          </template>

          <!-- Next -->
          <button
            id="anime-page-next"
            :disabled="!pageInfo.hasNextPage"
            class="p-2.5 rounded-xl border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            :class="
              !pageInfo.hasNextPage
                ? 'border-white/5 text-text-secondary'
                : 'border-white/10 text-white hover:bg-primary/10 hover:border-primary/40'
            "
            @click="goToPage(currentPage + 1)"
          >
            <UIcon name="i-material-symbols:chevron-right" class="size-5" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
select option {
  background: #2d1b3e;
  color: #fff;
}
</style>
