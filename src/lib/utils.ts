import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a dynamic placeholder image URL based on breed or species.
 * Formats names to lowercase and removes spaces to improve matching accuracy
 * as requested.
 */
export function getPetImageUrl(species: string, breed?: string): string {
  const cleanSpecies = species.toLowerCase().trim();
  // Remove spaces and lowercase the breed for the seed
  const cleanBreed = breed ? breed.toLowerCase().replace(/\s+/g, '') : 'default';
  
  // Using picsum with a standardized seed derived from species and breed
  return `https://picsum.photos/seed/${cleanSpecies}-${cleanBreed}/600/400`;
}
