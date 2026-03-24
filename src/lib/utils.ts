import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a dynamic placeholder image URL based on pet name, breed, and species.
 * Uses a unique seed to ensure pets with the same breed have different images.
 */
export function getPetImageUrl(species: string, breed: string, name: string): string {
  const cleanName = name.toLowerCase().trim().replace(/\s+/g, '-');
  const cleanSpecies = species.toLowerCase().trim();
  const cleanBreed = breed.toLowerCase().trim().replace(/\s+/g, '-');
  
  // Using picsum with a unique seed derived from name, species and breed
  return `https://picsum.photos/seed/${cleanName}-${cleanSpecies}-${cleanBreed}/600/400`;
}
