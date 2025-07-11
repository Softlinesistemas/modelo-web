export interface Photo {
  id: string;
  albumId?: string;
  date: string;
  src: string;
  description?: string;
  likes?: number;
  liked?: boolean;
  isHighlighted?: boolean;
}

export interface Album {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  cover?: string | null;
}