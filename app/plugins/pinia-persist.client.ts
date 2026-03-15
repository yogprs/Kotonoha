import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin(() => {
  const pinia = usePinia();
  console.log('Persist plugin loaded ✅');

  pinia.use(piniaPluginPersistedstate);
});
