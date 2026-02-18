<script setup lang="ts">
import type { AnimeDetail } from '~~/server/types/anilist';

const route = useRoute();

// const id = computed(() => route.params.id);
const { data, error } = useLazyFetch<AnimeDetail>(
  `/api/anime/${route.params.id}`,
  {
    server: false,
    watch: [() => route.params.id],
  },
);

// const fetchError = computed(() => error.value);

const anime = computed(() => {
  return data?.value?.anime ?? ({} as MediaDetail);
});

// Helper for formatting dates if needed
const formatDate = (date: { year: number; month: number; day: number }) => {
  if (!date?.year) return 'Unknown';
  return new Date(
    date.year,
    (date.month || 1) - 1,
    date.day || 1,
  ).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatScore = (score: number) => {
  return score ? `${score}%` : 'N/A';
};

const formatSeason = (season: MediaSeason, seasonYear: number): string => {
  if (!season && !seasonYear) return '-';
  if (!season) return `${seasonYear}`;
  if (!seasonYear) return formatStatusText(season);

  return `${formatStatusText(season)} ${seasonYear}`;
};

useHead({
  title: () => anime.value?.title?.romaji ?? 'Anime Detail',
});
</script>

<template>
  <div
    v-if="!anime?.id && !error"
    class="min-h-screen flex items-center justify-center bg-bg-dark"
  >
    <div class="animate-pulse flex flex-col items-center">
      <div
        class="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"
      ></div>
      <p class="text-text-secondary">Loading data...</p>
    </div>
  </div>
  <div
    v-else-if="!anime?.id && error"
    class="min-h-screen flex items-center justify-center bg-bg-dark"
  >
    <div class="text-center p-8 rounded-xl glass">
      <h1 class="text-2xl font-bold text-red-400 mb-2">Error Loading Anime</h1>
      <p class="text-text-secondary">
        {{ error?.message || 'Anime not found' }}
      </p>
      <UButton to="/" variant="ghost" class="mt-4 text-gray-400"
        >Go Back Home</UButton
      >
    </div>
  </div>

  <div
    v-else-if="anime"
    class="min-h-screen bg-bg-dark text-white font-sans pb-20 relative overflow-hidden"
  >
    <!-- Dynamic Background -->
    <div class="absolute inset-0 z-0">
      <NuxtImg
        v-if="anime.bannerImage"
        :src="anime.bannerImage"
        alt="Banner"
        class="w-full h-[60vh] object-cover opacity-20 mask-image-gradient"
      />
      <div
        v-else
        class="w-full h-[60vh] bg-linear-to-b from-surface-dark to-bg-dark opacity-40"
      ></div>
      <div
        class="absolute inset-0 bg-linear-to-b from-transparent via-bg-dark/80 to-bg-dark"
      ></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 pt-24 md:pt-32">
      <!-- Hero Section -->
      <div class="flex flex-col md:flex-row gap-8 lg:gap-12">
        <!-- Cover Art -->
        <div
          class="md:w-1/3 lg:w-1/4 shrink-0 flex justify-center md:justify-start"
        >
          <div class="relative group">
            <NuxtImg
              v-if="anime.coverImage?.extraLarge || anime?.coverImage?.large"
              :src="anime.coverImage?.extraLarge || anime?.coverImage?.large"
              :alt="anime?.title?.romaji ?? '-'"
              class="w-64 md:w-full rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] ring-1 ring-white/10"
            />
            <div
              class="absolute -bottom-4 -right-4 bg-surface-dark border border-white/10 p-3 rounded-xl shadow-lg backdrop-blur-md flex flex-col items-center"
            >
              <span
                class="text-xs text-text-secondary uppercase tracking-wider font-bold"
                >Score</span
              >
              <span class="text-xl font-black text-primary">{{
                anime?.averageScore ? formatScore(anime?.averageScore) : '-'
              }}</span>
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="md:w-2/3 lg:w-3/4 space-y-6">
          <div>
            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-black leading-tight bg-clip-text text-transparent bg-linear-to-r from-white to-text-secondary mb-2"
            >
              {{ anime?.title?.romaji ?? '-' }}
            </h1>
            <h2
              v-if="
                anime?.title?.english &&
                anime?.title?.english !== anime?.title?.romaji
              "
              class="text-xl text-text-secondary italic"
            >
              {{ anime?.title?.english ?? '-' }}
            </h2>
          </div>

          <!-- Quick Stats Row -->
          <div class="flex flex-wrap gap-3">
            <UBadge
              v-if="anime?.format"
              color="primary"
              variant="soft"
              class="capitalize"
              >{{
                anime?.format ? anime?.format?.replace('_', ' ') : '-'
              }}</UBadge
            >
            <!-- :color="anime?.status === 'RELEASING' ? 'green' : 'gray'" -->
            <UBadge
              v-if="anime?.status"
              variant="soft"
              :class="`capitalize ${getStatusColor(anime?.status)} ${getStatusbgColor(anime?.status)}`"
              >{{ anime?.status?.replace('_', ' ') }}</UBadge
            >
            <UBadge
              v-if="anime?.seasonYear"
              variant="soft"
              class="bg-gray-400/10 text-gray-400/"
            >
              {{ formatSeason(anime?.season, anime?.seasonYear) }}
            </UBadge>
            <UBadge
              v-if="anime?.episodes"
              variant="soft"
              class="bg-gray-400/10 text-gray-400/"
              >{{ anime?.episodes }} Episodes</UBadge
            >
          </div>

          <!-- Genres -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="genre in anime?.genres"
              :key="genre"
              class="px-3 py-1 rounded-full text-sm bg-white/5 hover:bg-white/10 border border-white/5 transition-colors cursor-default text-anime-accent"
            >
              {{ genre }}
            </span>
          </div>

          <!-- Description -->
          <div
            class="prose prose-invert prose-sm md:prose-base max-w-none text-gray-300/90 font-light leading-relaxed glass p-6 rounded-2xl"
            v-html="anime?.description"
          ></div>

          <!-- Key Info Grid -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <div
              class="p-4 rounded-xl bg-surface-dark/50 border border-white/5"
            >
              <div
                class="text-xs text-text-secondary uppercase tracking-wider mb-1"
              >
                Studios
              </div>
              <div class="font-medium truncate">
                <span v-if="anime?.studios?.nodes?.length">
                  {{
                    anime?.studios?.nodes
                      .map((s) => capitalizeFirstLetter(s?.name))
                      .join(', ')
                  }}
                </span>
                <span v-else class="text-gray-500">-</span>
              </div>
            </div>
            <div
              class="p-4 rounded-xl bg-surface-dark/50 border border-white/5"
            >
              <div
                class="text-xs text-text-secondary uppercase tracking-wider mb-1"
              >
                Source
              </div>
              <div class="font-medium capitalize">
                {{ anime?.source?.replace('_', ' ').toLowerCase() || '-' }}
              </div>
            </div>
            <div
              class="p-4 rounded-xl bg-surface-dark/50 border border-white/5"
            >
              <div
                class="text-xs text-text-secondary uppercase tracking-wider mb-1"
              >
                Start Date
              </div>
              <div class="font-medium">{{ formatDate(anime?.startDate) }}</div>
            </div>
            <div
              class="p-4 rounded-xl bg-surface-dark/50 border border-white/5"
            >
              <div
                class="text-xs text-text-secondary uppercase tracking-wider mb-1"
              >
                Next Ep
              </div>
              <div class="font-medium">
                {{
                  anime?.nextAiringEpisode
                    ? `Ep ${anime?.nextAiringEpisode?.episode} in ${anime?.nextAiringEpisode ? (anime?.nextAiringEpisode?.timeUntilAiring / 86400).toFixed(0) : '-'} days`
                    : 'Finished'
                }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Characters Section -->
      <div v-if="anime?.characters?.edges?.length" class="mt-12 md:mt-16">
        <h3 class="text-2xl mb-6 flex items-center gap-3">
          <span class="w-1.5 h-8 bg-primary rounded-full"></span>
          Characters
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div
            v-for="character in anime.characters.edges.slice(0, 6)"
            :key="character.id"
            class="flex items-center justify-between bg-surface-dark/40 p-3 rounded-xl border border-white/5 hover:border-primary/50 transition-colors group"
          >
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <NuxtImg
                :src="character.node.image.large"
                :alt="character.node.name.full"
                class="w-14 h-14 rounded-lg object-cover shadow-sm group-hover:scale-105 transition-transform"
              />
              <div class="min-w-0">
                <div
                  class="font-bold text-sm truncate text-gray-100 group-hover:text-primary transition-colors"
                >
                  {{ character.node.name.full }}
                </div>
                <div class="text-xs text-text-secondary capitalize">
                  {{ character.role.toLowerCase() }}
                </div>
              </div>
            </div>

            <div
              v-if="character.voiceActorRoles?.[0]?.voiceActor"
              class="flex items-center gap-3 flex-1 justify-end min-w-0 text-right pl-2 border-l border-white/5 ml-2"
            >
              <div class="min-w-0">
                <div class="font-bold text-sm truncate text-gray-100">
                  {{ character.voiceActorRoles[0].voiceActor.name.full }}
                </div>
                <div class="text-xs text-text-secondary">Japanese</div>
              </div>
              <NuxtImg
                :src="character.voiceActorRoles[0].voiceActor.image.large"
                :alt="character.voiceActorRoles[0].voiceActor.name.full"
                class="w-14 h-14 rounded-lg object-cover shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Section: Relations / Trailer -->
      <div
        v-if="anime?.trailer || anime?.relations?.edges?.length"
        class="mt-16 grid lg:grid-cols-3 gap-8"
      >
        <!-- Trailer -->
        <div v-if="anime?.trailer?.site === 'youtube'" class="lg:col-span-1">
          <h3 class="text-2xl mb-6 flex items-center gap-2">
            <span class="w-2 h-8 bg-anime-accent rounded-full"></span>
            Trailer
          </h3>
          <div
            class="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10 group"
          >
            <iframe
              :src="`https://www.youtube.com/embed/${anime.trailer.id}`"
              title="Trailer"
              frameborder="0"
              allow="
                accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture;
              "
              allowfullscreen
              class="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>

        <!-- Relations -->
        <div
          v-if="anime.relations?.edges?.length"
          :class="[
            anime.trailer?.site === 'youtube'
              ? 'lg:col-span-2'
              : 'lg:col-span-3',
          ]"
        >
          <h3 class="text-2xl mb-6 flex items-center gap-2">
            <span class="w-2 h-8 bg-primary rounded-full"></span>
            Relations
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <NuxtLink
              v-for="edge in anime?.relations?.edges
                .filter(
                  (e) =>
                    e?.node?.format !== 'MANGA' &&
                    e?.node?.format !== 'NOVEL' &&
                    e?.node?.format !== 'ONE_SHOT',
                )
                .slice(0, 8)"
              :key="edge?.node?.id"
              :to="`/anime/${edge?.node?.id}`"
              class="group relative aspect-2/3 rounded-lg overflow-hidden bg-surface-dark ring-1 ring-white/5 transition-all hover:ring-primary"
            >
              <NuxtImg
                :src="edge?.node?.coverImage?.large"
                :alt="edge?.node?.title?.romaji"
                class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-3 flex flex-col justify-end opacity-100 transition-opacity"
              >
                <span
                  class="text-[10px] text-anime-accent font-bold uppercase mb-1"
                  >{{ edge?.relationType.replace('_', ' ') }}</span
                >
                <h4
                  class="text-sm font-medium leading-snug line-clamp-2 text-white group-hover:text-primary transition-colors"
                >
                  {{ edge?.node?.title?.romaji }}
                </h4>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Recommendations Section -->
      <div v-if="anime?.recommendations?.nodes?.length" class="mt-16">
        <h3 class="text-2xl mb-6 flex items-center gap-3">
          <span class="w-1.5 h-8 bg-anime-gold rounded-full"></span>
          Recommendations
        </h3>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <NuxtLink
            v-for="rec in anime?.recommendations?.nodes?.slice(0, 12)"
            :key="rec?.mediaRecommendation?.id"
            :to="`/anime/${rec?.mediaRecommendation?.id}`"
            class="group relative aspect-2/3 rounded-lg overflow-hidden bg-surface-dark ring-1 ring-white/5 transition-all hover:ring-primary"
          >
            <NuxtImg
              :src="rec?.mediaRecommendation?.coverImage?.large"
              :alt="rec?.mediaRecommendation?.title?.romaji"
              class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-3 flex flex-col justify-end opacity-100 transition-opacity"
            >
              <h4
                class="text-[15px] font-medium leading-snug line-clamp-2 text-white group-hover:text-primary transition-colors"
              >
                {{ rec?.mediaRecommendation?.title?.romaji }}
              </h4>
              <div class="flex items-center gap-2 mt-1">
                <span
                  class="text-[12px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300"
                  >{{
                    rec?.mediaRecommendation?.format?.replace('_', ' ')
                  }}</span
                >
                <span
                  v-if="rec?.mediaRecommendation?.episodes"
                  class="text-[12px] text-gray-400"
                  >{{ rec?.mediaRecommendation?.episodes }} ep</span
                >
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mask-image-gradient {
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
}
</style>
