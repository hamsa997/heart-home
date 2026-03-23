import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a dynamic placeholder image URL based on breed or name.
 */
export function getPetImageUrl(species: string, breed?: string, name?: string): string {
  const seedBase = (breed || name || species).toLowerCase().replace(/\s+/g, '-');
  const speciesSeed = species.toLowerCase();
  // Using picsum with a seed derived from species and breed for consistency
  return `https://picsum.photos/seed/${speciesSeed}-${seedBase}/600/400`;
}
