<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~~/app/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const pwdLoading = ref(false);
const pwdMessage = ref('');
const pwdSuccess = ref(false);
const passwords = ref({ current: '', new: '' });

const deleteLoading = ref(false);

const isAvatarModalOpen = ref(false);
const avatarLoading = ref(false);

const AVATAR_OPTIONS = [
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Felix',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Aneka',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Jack',
  'https://api.dicebear.com/9.x/avataaars/svg?seed=1',
  'https://api.dicebear.com/9.x/avataaars/svg?seed=2',
  'https://api.dicebear.com/9.x/bottts/svg?seed=Robot',
  'https://api.dicebear.com/9.x/micah/svg?seed=Artist',
  'https://api.dicebear.com/9.x/notionists/svg?seed=Creator',
  'https://api.dicebear.com/9.x/miniavs/svg?seed=Cool',
  'https://api.dicebear.com/9.x/lorelei/svg?seed=Kitty',
];

onMounted(async () => {
  if (!authStore.user) {
    await authStore.fetchUser();
    if (!authStore.user) router.push('/login');
  }
});

const selectAvatar = async (url: string) => {
  try {
    avatarLoading.value = true;
    await $fetch('/api/user/profile', {
      method: 'PUT',
      body: { image: url },
    });
    if (authStore.user) authStore.user.image = url;
    isAvatarModalOpen.value = false;
  } catch (err) {
    console.error('Failed to change avatar', err);
  } finally {
    avatarLoading.value = false;
  }
};

const randomizeProfile = async () => {
  try {
    avatarLoading.value = true;
    const res = await $fetch<any>('/api/profile/random'); // let's assume we implement this or fetch from dicebear
    if (res.success && res.data) {
      await $fetch('/api/user/profile', {
        method: 'PUT',
        body: { image: res.data },
      });
      if (authStore.user) authStore.user.image = res.data;
      isAvatarModalOpen.value = false;
    }
  } catch (err) {
    console.error('Failed to randomize profile', err);
  } finally {
    avatarLoading.value = false;
  }
};

const changePassword = async () => {
  pwdLoading.value = true;
  pwdMessage.value = '';
  try {
    const res = await $fetch<any>('/api/user/password', {
      method: 'PUT',
      body: {
        currentPassword: passwords.value.current,
        newPassword: passwords.value.new,
      },
    });
    if (res.success) {
      pwdSuccess.value = true;
      pwdMessage.value = res.message;
      passwords.value = { current: '', new: '' };
    }
  } catch (err: any) {
    pwdSuccess.value = false;
    pwdMessage.value = err.response?._data?.message || 'Failed to update';
  } finally {
    pwdLoading.value = false;
  }
};

const deleteAccount = async () => {
  if (
    !confirm(
      'Are you sure you want to delete your account? This action cannot be undone.',
    )
  )
    return;

  deleteLoading.value = true;
  try {
    await $fetch('/api/user/account', { method: 'DELETE' });
    authStore.setUser(null);
    router.push('/');
  } catch (err) {
    console.error('Failed to delete account', err);
  } finally {
    deleteLoading.value = false;
  }
};

definePageMeta({
  requiresAuth: true,
});
</script>

<template>
  <div
    class="min-h-screen bg-bg-dark py-12 px-4 sm:px-6 lg:px-8 font-lora text-white"
  >
    <div v-if="authStore.user" class="max-w-3xl mx-auto space-y-8">
      <!-- Profile Header -->
      <div
        class="glass p-8 rounded-xl shadow-2xl flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8"
      >
        <div class="relative">
          <img
            :src="authStore.user.image"
            alt="Profile"
            class="h-32 w-32 rounded-full object-cover border-4 border-primary shadow-lg"
          />
          <div
            class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 rounded-full transition-opacity cursor-pointer text-sm font-bold"
            @click="isAvatarModalOpen = true"
          >
            Change
          </div>
        </div>
        <div>
          <h2 class="text-3xl font-extrabold text-white">
            {{ authStore.user.name }}
          </h2>
          <p class="text-text-secondary">@{{ authStore.user.username }}</p>
          <p class="text-text-secondary">{{ authStore.user.email }}</p>
        </div>
      </div>

      <!-- Change password -->
      <div class="glass p-8 rounded-xl shadow-2xl space-y-6">
        <h3 class="text-xl font-bold">Change Password</h3>
        <form @submit.prevent="changePassword" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1"
              >Current Password</label
            >
            <input
              v-model="passwords.current"
              type="password"
              required
              class="w-full px-3 py-2 border border-surface-dark bg-bg-dark text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1"
              >New Password</label
            >
            <input
              v-model="passwords.new"
              type="password"
              required
              class="w-full px-3 py-2 border border-surface-dark bg-bg-dark text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <p
            v-if="pwdMessage"
            :class="{
              'text-green-400': pwdSuccess,
              'text-red-400': !pwdSuccess,
            }"
            class="text-sm"
          >
            {{ pwdMessage }}
          </p>
          <button
            type="submit"
            :disabled="pwdLoading"
            class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
          >
            {{ pwdLoading ? 'Updating...' : 'Update Password' }}
          </button>
        </form>
      </div>

      <!-- Delete account -->
      <div
        class="glass p-8 rounded-xl shadow-2xl space-y-6 border border-red-500/20"
      >
        <h3 class="text-xl font-bold text-red-500">Danger Zone</h3>
        <p class="text-text-secondary text-sm">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button
          @click="deleteAccount"
          :disabled="deleteLoading"
          class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
        >
          {{ deleteLoading ? 'Deleting...' : 'Delete Account' }}
        </button>
      </div>
    </div>

    <div v-else class="text-center py-20 text-white">
      <h2 class="text-2xl font-bold mb-4">Please Login</h2>
      <NuxtLink to="/login" class="text-primary hover:text-primary-hover"
        >Go to Login</NuxtLink
      >
    </div>
  </div>
</template>
