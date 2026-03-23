import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// Defensive export to ensure it's always an array even if JSON is malformed
export const PlaceHolderImages: ImagePlaceholder[] = (data && Array.isArray(data.placeholderImages)) ? data.placeholderImages : [];
