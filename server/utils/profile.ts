import { ProfileType } from '~~/shared/types/profile';

export const profileStyle: ProfileType[] = [
  'initials',
  'thumbs',
  'bottts',
  'bottts-neutral',
  'avataaars',
  'avataaars-neutral',
];

export const getProfile = (url: string, type: ProfileType, seed: string) => {
  //   const profileTypes: ProfileType[] = [
  //     'initials',
  //     'thumbs',
  //     'bottts',
  //     'bottts-neutral',
  //     'avataaars',
  //     'avataaars-neutral',
  //   ];

  const validType: ProfileType = profileStyle.includes(type as ProfileType)
    ? (type as ProfileType)
    : 'initials';

  return `${url}/${validType}/svg?seed=${encodeURIComponent(seed)}`;
};
