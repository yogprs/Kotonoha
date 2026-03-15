export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) {
    return;
  }

  if (!to.meta.requiresAuth) return;

  const auth = useAuthStore();

  if (!auth.fetched) {
    await auth.fetchUser();
  }

  if (!auth.user) {
    return navigateTo('/login');
  }
});
