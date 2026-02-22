<script setup lang="ts">
import type { Media, PageInfo } from '~~/shared/types/anilist';

const router = useRouter();
const route = useRoute();
const isScrolled = ref(false);

// --- Mobile menu ---
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : '';
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

// --- Search ---
const isSearchOpen = ref(false);
const searchQuery = ref('');
const searchQueryDebounced = ref('');
let searchTimeout: ReturnType<typeof setTimeout>;

const onSearchInput = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    searchQueryDebounced.value = searchQuery.value;
  }, 400);
};

interface AnimeSearchResponse {
  search: {
    pageInfo: PageInfo;
    media: Media[];
  };
}

const searchData = ref<AnimeSearchResponse | null>(null);
const searchLoading = ref(false);

watch(searchQueryDebounced, async (val) => {
  if (!val) {
    searchData.value = null;
    return;
  }
  searchLoading.value = true;
  try {
    const data = await $fetch<AnimeSearchResponse>('/api/anime', {
      params: { search: val, page: 1 },
    });
    searchData.value = data;
  } catch {
    searchData.value = null;
  } finally {
    searchLoading.value = false;
  }
});

const searchResults = computed(() => searchData.value?.search?.media ?? []);
const isSearchLoading = computed(
  () => searchLoading.value && searchQueryDebounced.value !== '',
);
const hasSearchQuery = computed(() => searchQueryDebounced.value.length > 0);

const openSearch = () => {
  isSearchOpen.value = true;
  closeMobileMenu();
  document.body.style.overflow = 'hidden';
  nextTick(() => {
    const input = document.getElementById('navbar-search-input');
    input?.focus();
  });
};

const closeSearch = () => {
  isSearchOpen.value = false;
  searchQuery.value = '';
  searchQueryDebounced.value = '';
  document.body.style.overflow = '';
};

const goToAnime = (id: number) => {
  closeSearch();
  router.push(`/anime/${id}`);
};

const goToFullSearch = () => {
  const query = searchQuery.value;
  closeSearch();
  router.push({ path: '/anime', query: { search: query } });
};

// --- Navigation links ---
const navLinks = [
  { label: 'Anime List', to: '/anime', query: {} },
  { label: 'Trending', to: '/anime', query: { sort: 'TRENDING_DESC' } },
  { label: 'Movies', to: '/anime', query: { format: 'MOVIE' } },
];

const isLinkActive = (link: {
  to: string;
  query: Record<string, string | undefined>;
}) => {
  if (route.path !== link.to) return false;
  if (Object.keys(link.query).length === 0) {
    // "Anime List" is active only if no special query params
    return !route.query.sort && !route.query.format && !route.query.search;
  }
  return Object.entries(link.query).every(
    ([key, value]) => route.query[key] === value,
  );
};

// --- Scroll ---
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const goHome = () => {
  closeMobileMenu();
  closeSearch();
  router.push('/');
};

// --- Keyboard shortcut ---
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (isSearchOpen.value) closeSearch();
    if (isMobileMenuOpen.value) closeMobileMenu();
  }
  // Ctrl/Cmd + K to open search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    if (isSearchOpen.value) closeSearch();
    else openSearch();
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});

// Close mobile menu on route change
watch(
  () => route.fullPath,
  () => {
    closeMobileMenu();
  },
);
</script>

<template>
  <!-- NAVBAR -->
  <nav
    id="main-navbar"
    class="w-full fixed z-50 transition-all duration-300"
    :class="
      isScrolled || isMobileMenuOpen
        ? 'bg-surface-dark/80 backdrop-blur-xl shadow-lg shadow-black/20'
        : 'bg-transparent'
    "
  >
    <div class="flex items-center justify-between py-4 px-5 md:px-12 lg:px-18">
      <!-- Left: Logo + Nav Links -->
      <div class="flex items-center gap-8">
        <h1
          id="navbar-logo"
          @click="goHome"
          class="font-surfer text-[28px] hover:cursor-pointer select-none bg-clip-text text-transparent bg-linear-to-r from-white to-text-secondary hover:from-primary hover:to-anime-accent transition-all duration-300"
        >
          Kotonoha
        </h1>

        <!-- Desktop Nav Links -->
        <ul class="h-full hidden md:flex gap-1 items-center">
          <li v-for="link in navLinks" :key="link.label">
            <NuxtLink
              :to="{ path: link.to, query: link.query }"
              class="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              :class="
                isLinkActive(link)
                  ? 'text-white bg-primary/15'
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              "
            >
              {{ link.label }}
              <span
                v-if="isLinkActive(link)"
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary"
              ></span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Right: Search + Account + Mobile Menu Toggle -->
      <div class="flex gap-3 items-center">
        <!-- Search Button -->
        <button
          id="navbar-search-btn"
          @click="openSearch"
          class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/40 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200 cursor-pointer group"
        >
          <UIcon
            name="i-material-symbols:search"
            class="size-5 text-white group-hover:text-white/60 transition-colors"
          />
          <span
            class="hidden lg:inline text-sm text-white group-hover:text-white/60 transition-colors"
            >Search...</span
          >
          <kbd
            class="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] text-white bg-white/5 border border-white/10 font-mono"
          >
            CTRL
          </kbd>
          +
          <kbd
            class="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] text-white bg-white/5 border border-white/10 font-mono"
          >
            K
          </kbd>
        </button>

        <!-- Account (Desktop) -->
        <button
          id="navbar-account-btn"
          class="hidden md:flex items-center justify-center size-10 rounded-xl bg-white/5 border border-white/40 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200 cursor-pointer"
        >
          <UIcon
            name="i-material-symbols:account-circle"
            class="size-6 text-white hover:text-white/60 transition-colors"
          />
        </button>

        <!-- Mobile Menu Toggle -->
        <button
          id="navbar-mobile-toggle"
          class="flex md:hidden items-center justify-center size-10 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 transition-all duration-200 cursor-pointer"
          @click="toggleMobileMenu"
        >
          <UIcon
            :name="
              isMobileMenuOpen
                ? 'i-material-symbols:close'
                : 'i-material-symbols:menu-rounded'
            "
            class="size-6 text-text-secondary transition-transform duration-300"
            :class="{ 'rotate-90': isMobileMenuOpen }"
          />
        </button>
      </div>
    </div>
  </nav>

  <!-- MOBILE MENU DRAWER -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        @click="closeMobileMenu"
      ></div>
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isMobileMenuOpen"
        id="mobile-menu-drawer"
        class="fixed top-0 right-0 z-45 w-72 h-full bg-surface-dark/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl md:hidden flex flex-col"
      >
        <!-- Drawer Header -->
        <div
          class="flex items-center justify-between p-5 border-b border-white/10"
        >
          <span class="font-surfer text-xl text-white">Menu</span>
          <button
            @click="closeMobileMenu"
            class="size-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <UIcon
              name="i-material-symbols:close"
              class="size-5 text-text-secondary"
            />
          </button>
        </div>

        <!-- Drawer Links -->
        <div class="flex-1 overflow-y-auto p-4 space-y-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.label"
            :to="{ path: link.to, query: link.query }"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200"
            :class="
              isLinkActive(link)
                ? 'text-white bg-primary/20 border border-primary/30'
                : 'text-text-secondary hover:text-white hover:bg-white/5'
            "
            @click="closeMobileMenu"
          >
            <UIcon
              :name="
                link.label === 'Anime List'
                  ? 'i-material-symbols:list-alt'
                  : link.label === 'Trending'
                    ? 'i-material-symbols:trending-up'
                    : 'i-material-symbols:movie'
              "
              class="size-5"
            />
            {{ link.label }}
          </NuxtLink>

          <div class="my-4 border-t border-white/10"></div>

          <!-- Search in Mobile -->
          <button
            class="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
            @click="openSearch"
          >
            <UIcon name="i-material-symbols:search" class="size-5" />
            Search Anime
          </button>
        </div>

        <!-- Drawer Footer -->
        <div class="p-4 border-t border-white/10">
          <button
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
          >
            <UIcon name="i-material-symbols:account-circle" class="size-5" />
            Account
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- SEARCH OVERLAY -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isSearchOpen"
        class="fixed inset-0 z-60 bg-black/70 backdrop-blur-md flex items-start justify-center pt-[10vh] md:pt-[15vh] px-4"
        @click.self="closeSearch"
      >
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-4 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 -translate-y-4 scale-95"
        >
          <div
            v-if="isSearchOpen"
            id="search-overlay-panel"
            class="w-full max-w-xl bg-surface-dark/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            <!-- Search Input -->
            <div
              class="flex items-center gap-3 px-5 py-4 border-b border-white/10"
            >
              <UIcon
                name="i-material-symbols:search"
                class="size-6 text-text-secondary shrink-0"
              />
              <input
                id="navbar-search-input"
                v-model="searchQuery"
                type="text"
                placeholder="Search anime..."
                class="flex-1 bg-transparent text-white text-lg placeholder-text-secondary focus:outline-none font-lora"
                autocomplete="off"
                @input="onSearchInput"
                @keydown.enter="goToFullSearch"
                @keydown.escape="closeSearch"
              />
              <button
                v-if="searchQuery"
                @click="
                  searchQuery = '';
                  searchQueryDebounced = '';
                "
                class="size-7 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <UIcon
                  name="i-material-symbols:close"
                  class="size-4 text-text-secondary"
                />
              </button>
              <kbd
                class="hidden md:inline-flex items-center px-2 py-1 rounded text-[11px] text-text-secondary bg-white/5 border border-white/10 font-mono"
              >
                ESC
              </kbd>
            </div>

            <!-- Search Results -->
            <div class="max-h-[50vh] overflow-y-auto">
              <!-- Loading -->
              <div v-if="isSearchLoading" class="p-6 space-y-3">
                <div
                  v-for="n in 4"
                  :key="n"
                  class="flex items-center gap-3 animate-pulse"
                >
                  <div class="w-10 h-14 rounded-lg bg-white/10 shrink-0"></div>
                  <div class="flex-1 space-y-2">
                    <div class="h-4 bg-white/10 rounded w-3/4"></div>
                    <div class="h-3 bg-white/5 rounded w-1/2"></div>
                  </div>
                </div>
              </div>

              <!-- Results List -->
              <div
                v-else-if="hasSearchQuery && searchResults.length > 0"
                class="py-2"
              >
                <button
                  v-for="anime in searchResults.slice(0, 8)"
                  :key="anime.id"
                  @click="goToAnime(anime.id)"
                  class="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors text-left cursor-pointer group"
                >
                  <!-- Thumbnail -->
                  <div
                    class="w-10 h-14 rounded-lg overflow-hidden bg-white/5 shrink-0 ring-1 ring-white/10 group-hover:ring-primary/40 transition-all"
                  >
                    <NuxtImg
                      v-if="anime.coverImage?.large"
                      :src="anime.coverImage.large"
                      :alt="anime.title?.romaji"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <h4
                      class="text-sm font-semibold text-white truncate group-hover:text-primary transition-colors"
                    >
                      {{ anime.title?.romaji || anime.title?.english || '-' }}
                    </h4>
                    <div
                      class="flex items-center gap-2 text-xs text-text-secondary mt-0.5"
                    >
                      <span v-if="anime.format" class="capitalize">{{
                        anime.format?.replace('_', ' ')
                      }}</span>
                      <span
                        v-if="anime.format && anime.seasonYear"
                        class="text-white/20"
                        >•</span
                      >
                      <span v-if="anime.seasonYear">{{
                        anime.seasonYear
                      }}</span>
                      <span v-if="anime.averageScore" class="text-white/20"
                        >•</span
                      >
                      <span
                        v-if="anime.averageScore"
                        class="flex items-center gap-0.5"
                      >
                        <UIcon
                          name="i-material-symbols:star"
                          class="size-3 text-anime-gold"
                        />
                        {{ (anime.averageScore / 10).toFixed(1) }}
                      </span>
                    </div>
                  </div>
                  <UIcon
                    name="i-material-symbols:arrow-forward"
                    class="size-4 text-text-secondary group-hover:text-primary shrink-0 transition-colors"
                  />
                </button>

                <!-- View All -->
                <div class="px-5 py-3 border-t border-white/5">
                  <button
                    @click="goToFullSearch"
                    class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 text-sm text-primary font-medium transition-all cursor-pointer"
                  >
                    View all results for "{{ searchQuery }}"
                    <UIcon
                      name="i-material-symbols:arrow-forward"
                      class="size-4"
                    />
                  </button>
                </div>
              </div>

              <!-- No Results -->
              <div
                v-else-if="
                  hasSearchQuery &&
                  !isSearchLoading &&
                  searchResults.length === 0
                "
                class="p-8 text-center"
              >
                <UIcon
                  name="i-material-symbols:search-off"
                  class="size-12 text-text-secondary mx-auto mb-3 opacity-50"
                />
                <p class="text-text-secondary text-sm">
                  No anime found for "<span class="text-white">{{
                    searchQueryDebounced
                  }}</span
                  >"
                </p>
              </div>

              <!-- Empty State -->
              <div v-else class="p-6">
                <div class="text-center text-text-secondary text-sm space-y-3">
                  <UIcon
                    name="i-material-symbols:search"
                    class="size-10 mx-auto opacity-30"
                  />
                  <p>Type to search anime</p>
                  <div class="flex items-center justify-center gap-4 text-xs">
                    <span class="flex items-center gap-1">
                      <kbd
                        class="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]"
                        >Enter</kbd
                      >
                      to search all
                    </span>
                    <span class="flex items-center gap-1">
                      <kbd
                        class="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]"
                        >Esc</kbd
                      >
                      to close
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Search overlay scrollbar */
#search-overlay-panel ::-webkit-scrollbar {
  width: 4px;
}
#search-overlay-panel ::-webkit-scrollbar-track {
  background: transparent;
}
#search-overlay-panel ::-webkit-scrollbar-thumb {
  background: oklch(0.5 0.1 275 / 0.4);
  border-radius: 10px;
}
</style>
