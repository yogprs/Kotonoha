import { profileStyle } from '~~/server/utils/profile';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const query = getQuery(event) as QueryGetProfile;

  let profileData = {} as ProfileList;

  let seed = query?.seed;

  //   const style = styles[Math.floor(Math.random() * styles.length)];

  if (!query?.seed) {
    seed = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
  }

  profileStyle.map((style) => {
    profileData[style] = getProfile(config.dice_bear_image, style, seed);
  });

  return { success: true, data: profileData };
});
