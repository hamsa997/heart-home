
import { ImagePlaceholder, PlaceHolderImages } from "./placeholder-images";

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
    imageUrl: PlaceHolderImages.find(img => img.id === "cat-1")?.imageUrl || "https://picsum.photos/seed/cat1/600/400"
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
    imageUrl: PlaceHolderImages.find(img => img.id === "dog-1")?.imageUrl || "https://picsum.photos/seed/dog1/600/400"
  },
  {
    id: "3",
    name: "Thumper",
    species: "Rabbit",
    breed: "Holland Lop",
    age: "1 year",
    gender: "Male",
    size: "Small",
    location: "City Shelter",
    description: "Thumper is a curious little rabbit with a big personality. He enjoys exploring his surroundings and is quite social for a bunny. He needs plenty of hay and space to hop around.",
    personalityTraits: ["Curious", "Social", "Active"],
    likes: ["Carrots", "Fresh hay", "Cardboard boxes"],
    dislikes: ["Being picked up suddenly"],
    status: "Available",
    imageUrl: PlaceHolderImages.find(img => img.id === "rabbit-1")?.imageUrl || "https://picsum.photos/seed/rabbit1/600/400"
  },
  {
    id: "4",
    name: "Rio",
    species: "Bird",
    breed: "Blue-and-Gold Macaw",
    age: "5 years",
    gender: "Male",
    size: "Medium",
    location: "Avian Rescue",
    description: "Rio is a vibrant and intelligent macaw. He can whistle several tunes and is very responsive to human interaction. Macaws are a long-term commitment and require experienced owners.",
    personalityTraits: ["Intelligent", "Vocal", "Social"],
    likes: ["Nuts", "Mirror toys", "Whistling"],
    dislikes: ["Drafty areas"],
    status: "Available",
    imageUrl: PlaceHolderImages.find(img => img.id === "bird-1")?.imageUrl || "https://picsum.photos/seed/bird1/600/400"
  },
  {
    id: "5",
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
    status: "Pending",
    imageUrl: PlaceHolderImages.find(img => img.id === "dog-2")?.imageUrl || "https://picsum.photos/seed/dog2/600/400"
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
