export type ProfileType =
  | 'initials'
  | 'thumbs'
  | 'bottts'
  | 'bottts-neutral'
  | 'avataaars'
  | 'avataaars-neutral';

export type ProfileList = {
  [K in ProfileType]: string;
};

export interface QueryGetProfile {
  seed: string;
}
