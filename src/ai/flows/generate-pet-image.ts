'use server';
/**
 * @fileOverview A Genkit flow to generate realistic and heartwarming pet images.
 *
 * - generatePetImage - A function that handles the pet image generation process.
 * - GeneratePetImageInput - The input type for the generatePetImage function.
 * - GeneratePetImageOutput - The return type for the generatePetImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePetImageInputSchema = z.object({
  species: z.enum(["dog", "cat"]).describe('The species of the pet.'),
  breed: z.string().optional().describe('The breed of the pet.'),
  personalityTraits: z.array(z.string()).optional().describe('Traits to influence the image mood.'),
});
export type GeneratePetImageInput = z.infer<typeof GeneratePetImageInputSchema>;

const GeneratePetImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated pet image.'),
});
export type GeneratePetImageOutput = z.infer<typeof GeneratePetImageOutputSchema>;

export async function generatePetImage(input: GeneratePetImageInput): Promise<GeneratePetImageOutput> {
  return generatePetImageFlow(input);
}

const generatePetImageFlow = ai.defineFlow(
  {
    name: 'generatePetImageFlow',
    inputSchema: GeneratePetImageInputSchema,
    outputSchema: GeneratePetImageOutputSchema,
  },
  async (input) => {
    const traits = input.personalityTraits?.join(', ') || 'friendly';
    const breedInfo = input.breed ? `${input.breed} ` : '';
    
    const promptText = `A professional, high-quality studio portrait of a ${traits} ${breedInfo}${input.species}. 
    The lighting should be soft and warm, highlighting the pet's features. 
    The background should be clean and slightly out of focus. 
    The pet should look healthy, happy, and endearing, suitable for an adoption profile.`;

    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: promptText,
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate image');
    }

    return {
      imageUrl: media.url,
    };
  }
);
