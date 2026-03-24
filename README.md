# PetAdopt | Modern P2P Pet Adoption Platform

PetAdopt is a modern, clean, and user-friendly platform designed to connect pet owners directly with potential adopters. It eliminates the middleman, allowing for a heartwarming and transparent adoption journey.

## Features

- **Browse Pets**: Explore a curated list of pets looking for their forever homes with advanced filtering by type, city, and more.
- **Detailed Profiles**: Each pet has a dedicated page with photos, temperament, medical history, and the story of why they need a new home.
- **Post a Pet**: Owners can easily list their pets, providing all necessary details to find the perfect match.
- **Direct Contact**: Integrated adoption request flow that sends inquiries directly to the pet owner.
- **AI-Powered Portraits**: Optionally generate artistic portraits of pets using Genkit and Gemini to help them stand out.

## Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Backend/Database**: [Firebase Firestore](https://firebase.google.com/products/firestore)
- **Authentication**: [Firebase Auth (Anonymous & Google)](https://firebase.google.com/products/auth)
- **AI/GenAI**: [Google Genkit](https://js.sigmacomputing.com/genkit/) & Gemini

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

4. Configure Firebase:
   Update `src/firebase/config.ts` with your Firebase web app configuration.

5. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Database Schema

The project uses two main collections in Firestore:
- `pets`: Stores all pet listings.
- `adoptionRequests`: Stores inquiries sent from adopters to owners.

## License

MIT
