'use server';
/**
 * @fileOverview A Genkit flow to generate engaging and informative pet descriptions.
 *
 * - generatePetDescription - A function that handles the pet description generation process.
 * - GeneratePetDescriptionInput - The input type for the generatePetDescription function.
 * - GeneratePetDescriptionOutput - The return type for the generatePetDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePetDescriptionInputSchema = z.object({
  name: z.string().describe('The name of the pet.'),
  species: z.string().describe('The species of the pet (e.g., dog, cat, bird).'),
  breed: z.string().optional().describe('The breed of the pet (e.g., Golden Retriever, Siamese).'),
  age: z.string().describe('The age of the pet (e.g., 2 years, kitten, senior).'),
  gender: z.string().describe('The gender of the pet (e.g., male, female, unknown).'),
  size: z.string().optional().describe('The size of the pet (e.g., small, medium, large).'),
  personalityTraits: z.array(z.string()).describe('A list of personality traits (e.g., playful, cuddly, independent).'),
  likes: z.array(z.string()).describe('A list of things the pet likes (e.g., belly rubs, toys, sunbathing).'),
  dislikes: z.array(z.string()).optional().describe('A list of things the pet dislikes (e.g., loud noises, being alone).'),
  story: z.string().optional().describe('A brief background or anecdote about the pet.'),
});
export type GeneratePetDescriptionInput = z.infer<typeof GeneratePetDescriptionInputSchema>;

const GeneratePetDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated engaging and informative pet description.'),
});
export type GeneratePetDescriptionOutput = z.infer<typeof GeneratePetDescriptionOutputSchema>;

export async function generatePetDescription(input: GeneratePetDescriptionInput): Promise<GeneratePetDescriptionOutput> {
  return generatePetDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePetDescriptionPrompt',
  input: { schema: GeneratePetDescriptionInputSchema },
  output: { schema: GeneratePetDescriptionOutputSchema },
  prompt: `You are an expert copywriter for a pet adoption agency. Your goal is to create a heartwarming and informative description for a pet that encourages adoption.

Craft a detailed and engaging description for the following pet, focusing on their unique personality, what makes them special, and what kind of home would be best for them. The description should be compelling and highlight their best qualities.

Pet Details:
Name: {{{name}}}
Species: {{{species}}}
Age: {{{age}}}
Gender: {{{gender}}}
{{#if breed}}Breed: {{{breed}}}{{/if}}
{{#if size}}Size: {{{size}}}{{/if}}

Personality Traits:
{{#each personalityTraits}}- {{{this}}}
{{/each}}

Likes:
{{#each likes}}- {{{this}}}
{{/each}}

{{#if dislikes}}
Dislikes:
{{#each dislikes}}- {{{this}}}
{{/each}}
{{/if}}

{{#if story}}
Story/Background: {{{story}}}{{/if}}

Generate a description that is at least 3-5 paragraphs long, and concludes with a call to action to adopt this wonderful pet. Make it warm, positive, and irresistible.`,
});

const generatePetDescriptionFlow = ai.defineFlow(
  {
    name: 'generatePetDescriptionFlow',
    inputSchema: GeneratePetDescriptionInputSchema,
    outputSchema: GeneratePetDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
