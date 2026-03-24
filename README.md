# PetAdopt | Modern P2P Pet Adoption Platform

PetAdopt is a modern, clean, and user-friendly platform designed to connect pet owners directly with potential adopters. It eliminates the middleman, allowing for a heartwarming and transparent adoption journey.

## Features

- **Browse Pets**: Explore a curated list of pets looking for their forever homes with advanced filtering by type, city, and more.
- **Post a Pet**: Owners can easily list their pets, providing all necessary details like temperament and reason for rehoming.
- **Direct Contact**: Integrated adoption request flow that sends inquiries directly to the pet owner.
- **AI-Powered Portraits**: Generate artistic portraits of pets using Genkit and Gemini to help them stand out.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS & Shadcn UI
- **Backend**: Firebase Firestore & Auth
- **AI**: Google Genkit & Gemini

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Firebase Project
- A Google AI (Gemini) API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hamsa997/heart-home.git
   cd heart-home
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your keys:
   ```env
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Troubleshooting Git Push

If you encounter "Authentication failed" or "ECONNREFUSED" when pushing to GitHub, run the following to authorize your terminal using a Personal Access Token (PAT):

```bash
git remote set-url origin https://<your_username>:<your_token>@github.com/hamsa997/heart-home.git
git push -u origin main
```

## License

MIT
