import { profileStyle } from '~~/server/utils/profile';
import { verifyAccessToken } from '~~/server/utils/verifyToken';

export default defineEventHandler(async (event) => {
  verifyAccessToken(event);
  const config = useRuntimeConfig();

  const style = profileStyle[Math.floor(Math.random() * profileStyle.length)];

  const seed = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

  const profileData = getProfile(config.dice_bear_image, style, seed);

  return { success: true, data: profileData };
});
