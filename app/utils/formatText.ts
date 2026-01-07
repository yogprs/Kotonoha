import type { AnimeStatus } from "~/types/carousel";

export const formatStatusText = (status: string): string => {
  return status
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export const getStatusColor = (status: AnimeStatus): string => {
  switch (status) {
    case "FINISHED":
      return "text-blue-500";

    case "RELEASING":
      return "text-green-500";

    case "NOT_YET_RELEASED":
      return "text-yellow-500";

    case "CANCELLED":
      return "text-red-500";

    case "HIATUS":
      return "text-orange-500";

    default:
      return "text-gray-400";
  }
};