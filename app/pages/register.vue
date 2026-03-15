<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~~/app/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  name: '',
  username: '',
  email: '',
  password: '',
});

const loading = ref(false);
const errorMsg = ref('');

const handleRegister = async () => {
  loading.value = true;
  errorMsg.value = '';
  try {
    const res = await $fetch('/api/auth/register', {
      method: 'POST',
      body: form.value,
    });
    if ((res as any).success) {
      if ((res as any).user) {
        authStore.setUser((res as any).user);
      }
      router.push('/');
    }
  } catch (err: any) {
    errorMsg.value = err.response?._data?.message || 'Registration failed';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-bg-dark py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 glass p-8 rounded-xl shadow-2xl">
      <div>
        <h2
          class="mt-6 text-center text-3xl font-extrabold text-white font-lora"
        >
          Create an account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="name" class="sr-only">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              v-model="form.name"
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-surface-dark bg-bg-dark text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              v-model="form.username"
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-surface-dark bg-bg-dark text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Username"
            />
          </div>
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="form.email"
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-surface-dark bg-bg-dark text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              v-model="form.password"
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-surface-dark bg-bg-dark text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div v-if="errorMsg" class="text-red-500 text-sm text-center">
          {{ errorMsg }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
          >
            {{ loading ? 'Registering...' : 'Register' }}
          </button>
        </div>
      </form>
      <div class="text-center mt-4">
        <NuxtLink
          to="/login"
          class="text-sm text-text-secondary hover:text-white transition-colors"
        >
          Already have an account? Sign in
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
