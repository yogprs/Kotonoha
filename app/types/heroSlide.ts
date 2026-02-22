export interface HeroSlideData {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  genres?: string[];
  rating?: number;
  synopsis?: string;
  year?: number;
  episodes?: number | string;
}

export interface HeroSlideProps {
  slide: HeroSlideData;
  isActive: boolean;
}
