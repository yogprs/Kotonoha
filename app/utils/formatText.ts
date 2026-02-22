export const formatStatusText = (status?: string) => {
  if (!status) return '-';
  if (status === 'RELEASING') {
    status = 'AIRING';
  }
  return status
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const getStatusColor = (status: MediaStatus): string => {
  switch (status) {
    case 'FINISHED':
      return 'text-blue-500';

    case 'RELEASING':
      return 'text-green-500';

    case 'NOT_YET_RELEASED':
      return 'text-yellow-500';

    case 'CANCELED':
      return 'text-red-500';

    case 'HIATUS':
      return 'text-orange-500';

    default:
      return 'text-gray-400';
  }
};

export const getStatusbgColor = (status: MediaStatus): string => {
  switch (status) {
    case 'FINISHED':
      return 'bg-blue-500/10';

    case 'RELEASING':
      return 'bg-green-500/10';

    case 'NOT_YET_RELEASED':
      return 'bg-yellow-500/10';

    case 'CANCELED':
      return 'bg-red-500/10';

    case 'HIATUS':
      return 'bg-orange-500/10';

    default:
      return 'bg-gray-400/10';
  }
};

export const formatScore = (num: number): number => {
  return num / 10;
};

export const capitalizeFirstLetter = (str: string) => {
  if (str?.length === 0) {
    return ''; // Handle empty strings
  }
  const lowerStr = str?.toLowerCase();
  return lowerStr?.charAt(0).toUpperCase() + lowerStr?.slice(1);
};

export const formatDate = (dateObj: FuzzyDate) => {
  if (!dateObj?.year || !dateObj?.month || !dateObj?.day) return 'TBA';

  // JS Date menggunakan index bulan dari 0 (Januari = 0)
  const date = new Date(dateObj?.year, dateObj?.month - 1, dateObj?.day);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const formatMediaFormat = (type: MediaFormat): string => {
  const keepUpper = ['TV', 'ONA', 'OVA'];

  const withSpaces = type.replace(/_/g, ' ');
  const words = withSpaces.split(' ');

  const formatted = words.map((word) => {
    if (keepUpper.includes(word)) return word;
    return word.charAt(0) + word.slice(1).toLowerCase();
  });

  return formatted.join(' ');
};
