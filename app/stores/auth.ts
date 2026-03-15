import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    data: null as null | {
      user: {
        id: string;
        username: string;
        email: string;
        image: string;
      };
      isAuthenticated: false;
      fetched: false;
    },
    user: null as null | {
      id: string;
      username: string;
      email: string;
      image: string;
    },
    // isAuthenticated: false,
    fetched: false,
  }),

  actions: {
    async fetchUser() {
      try {
        const res = await $fetch('/api/user/profile', {
          headers: useRequestHeaders(['cookie']),
          credentials: 'include',
        });
        this.user = res.user;
      } catch {
        this.user = null;
      } finally {
        this.fetched = true;
        // this.isAuthenticated = !!this.user;
      }
    },

    setUser(user: any) {
      console.log('setUser dipanggil', user);
      this.user = user;
    },

    async logout() {
      await $fetch('/api/auth/logout', { method: 'POST' });
      this.user = null;
      // this.isAuthenticated = false;
      this.fetched = false;
    },
  },

  // persist: {
  //   key: 'auth',
  //   storage: {
  //     getItem: (key) => localStorage.getItem(key),
  //     setItem: (key, value) => localStorage.setItem(key, value),
  //     // removeItem: (key) => localStorage.removeItem(key),
  //   },
  // },
});
