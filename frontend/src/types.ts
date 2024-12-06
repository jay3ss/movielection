export interface Movie {
  id: string | null;
  title: string;
  duration: number; // in minutes
  imdb: string | null;
  premiere_date: string | null;
  rating: string | null;
  image: string | null;
}

export interface Election {
  id: string;
  created_at: string;
  finishes_at: string;
  movies: Movie[];
  winner_id: string | null;
}
