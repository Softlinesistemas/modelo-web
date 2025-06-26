export type Album = {
  id: string;
  name: string;
  description: string;
};

export type Photo = {
  id: string;
  src: string;
  caption?: string;
  albumId?: string; // referência ao Album.id
  isHighlighted?: boolean;
}
