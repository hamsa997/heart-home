
'use server';
/**
 * @fileOverview A Genkit flow to generate high-quality, artistic, and heartwarming pet portraits.
 *
 * - generatePetImage - A function that handles the pet image generation process.
 * - GeneratePetImageInput - The input type for the generatePetImage function.
 * - GeneratePetImageOutput - The return type for the generatePetImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePetImageInputSchema = z.object({
  species: z.enum(["dog", "cat"]).describe('The species of the pet.'),
  breed: z.string().optional().describe('The specific breed for accurate features.'),
  personalityTraits: z.array(z.string()).optional().describe('Traits to influence the mood and pose.'),
  style: z.enum(["realistic", "cartoon", "artistic"]).default("cartoon").describe('The visual style of the generated image.'),
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
    
    let stylePrompt = "";
    if (input.style === "cartoon") {
      stylePrompt = "A charming, high-quality 3D animated style character portrait. Expressive eyes, soft lighting, vibrant colors, clean lines, professional studio background.";
    } else if (input.style === "artistic") {
      stylePrompt = "A beautiful digital painting with soft brushstrokes, warm atmospheric lighting, and a focus on soulful expressions.";
    } else {
      stylePrompt = "A professional, high-resolution studio portrait with realistic fur textures, sharp focus on the face, and elegant bokeh background.";
    }

    const promptText = `${stylePrompt} 
    Subject: A ${traits} ${breedInfo}${input.species}. 
    Details: Capturing the unique spirit and character of the pet. The pet should look happy, endearing, and ready to be loved.
    Background: Clean, minimalist, complementary colors, professional lighting.`;

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
