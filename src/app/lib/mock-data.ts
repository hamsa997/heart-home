import { PlaceHolderImages } from "./placeholder-images";

export type PetStatus = "Available" | "Pending" | "Adopted";

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: string;
  size: string;
  location: string;
  description: string;
  personalityTraits: string[];
  likes: string[];
  dislikes: string[];
  status: PetStatus;
  imageUrl: string;
}

export interface Application {
  id: string;
  petId: string;
  petName: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  status: "New" | "Reviewing" | "Approved" | "Rejected";
  submittedAt: string;
}

// Ensure PlaceHolderImages is treated as an array to avoid evaluation errors
const images = Array.isArray(PlaceHolderImages) ? PlaceHolderImages : [];

export const INITIAL_PETS: Pet[] = [
  {
    id: "1",
    name: "Luna",
    species: "Cat",
    breed: "Siamese Mix",
    age: "2 years",
    gender: "Female",
    size: "Small",
    location: "Downtown Shelter",
    description: "Luna is a gentle soul who loves watching birds through the window and curling up in warm spots. She's a Siamese mix with striking blue eyes and a soft, cream-colored coat.",
    personalityTraits: ["Cuddly", "Quiet", "Independent"],
    likes: ["Sunbathing", "Salmon treats", "String toys"],
    dislikes: ["Loud vacuums", "Cold floors"],
    status: "Available",
    imageUrl: images.find(img => img.id === "cat-1")?.imageUrl || "https://picsum.photos/seed/cat1/600/400"
  },
  {
    id: "2",
    name: "Cooper",
    species: "Dog",
    breed: "Golden Retriever",
    age: "3 years",
    gender: "Male",
    size: "Large",
    location: "Suburban Rescue",
    description: "Cooper is the definition of a 'good boy'. He's energetic, friendly with everyone he meets, and always ready for an adventure. He loves the outdoors and needs an active family.",
    personalityTraits: ["Playful", "Loyal", "Energetic"],
    likes: ["Fetch", "Swimming", "Belly rubs"],
    dislikes: ["Being alone for too long"],
    status: "Available",
    imageUrl: images.find(img => img.id === "dog-1")?.imageUrl || "https://picsum.photos/seed/dog1/600/400"
  },
  {
    id: "3",
    name: "Milo",
    species: "Cat",
    breed: "Maine Coon",
    age: "4 years",
    gender: "Male",
    size: "Large",
    location: "City Shelter",
    description: "Milo is a majestic Maine Coon with a heart as big as his paws. He's incredibly affectionate and enjoys being around people.",
    personalityTraits: ["Gentle Giant", "Affectionate", "Calm"],
    likes: ["Head scratches", "Large cat trees", "Grooming"],
    dislikes: ["Small spaces"],
    status: "Available",
    imageUrl: images.find(img => img.id === "cat-2")?.imageUrl || "https://picsum.photos/seed/cat2/600/400"
  },
  {
    id: "4",
    name: "Bella",
    species: "Dog",
    breed: "Border Collie",
    age: "4 years",
    gender: "Female",
    size: "Medium",
    location: "Eastside Shelter",
    description: "Bella is a brilliant Border Collie mix who loves to learn new tricks. She thrives on mental stimulation and would excel in agility training or as a working companion.",
    personalityTraits: ["Smart", "Attentive", "Focused"],
    likes: ["Training", "Frisbee", "Long walks"],
    dislikes: ["Boredom"],
    status: "Available",
    imageUrl: images.find(img => img.id === "dog-2")?.imageUrl || "https://picsum.photos/seed/dog2/600/400"
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: "app1",
    petId: "1",
    petName: "Luna",
    fullName: "John Smith",
    email: "john@example.com",
    phone: "555-0101",
    message: "I've always loved Siamese cats and have a quiet home that would be perfect for Luna.",
    status: "New",
    submittedAt: "2024-05-15T10:30:00Z"
  }
];
