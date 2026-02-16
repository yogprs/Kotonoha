export interface HerolSlides {
  id?: string | number;
  title: string;
  subtitle?: string;
  image: string;
  genres?: string[];
  rating?: number;
  synopsis?: string;
  year?: number;
  episodes?: number | string;
}

export interface HeroProps {
  slides: HerolSlides[];
  autoplay?: boolean;
  interval?: number;
  transitionDuration?: number;
  showDots?: boolean;
  showArrows?: boolean;
  height?: string;
}
